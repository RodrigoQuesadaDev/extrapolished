import {compact, flatMap, groupBy, map, mapValues, zip} from "lodash-es";
import {DualValue, SamplePoint} from "./sample-values";
import {LabeledNumber, NumberOrLabeledNumber} from "./labels";
import memoize from "fast-memoize";

export type SamplePointsXAxis<L extends string = never> = ((...yAxis: YAxisValue[]) => SamplePoint[]) & {
    xAxis: number[],
    first: number,
    last: number,
    select: SelectFn<L>,
    range: RangeFn
};

export type YAxisValue = number | DualValue;

type SelectFnBody<L extends string> =
    ((...values: Array<SelectFnArg<L>>) => SamplePointsXAxis)
type SelectFnArg<L extends string> = number | 'first' | 'last' | L;
type SelectFnProps<L extends string> = Record<L | 'first' | 'last', SamplePointsXAxis>;
type SelectFn<L extends string> = SelectFnBody<L> & SelectFnProps<L>
type RangeFn = (from: number | 'start', to?: number | 'end') => SamplePointsXAxis

export function asPoints<V extends NumberOrLabeledNumber<string> | string = never>(
    ...labeledNumbersOrLabels: Array<NumberOrLabeledNumber<string> | V>
): SamplePointsXAxis<Extract<V, string>>
{
    return _asPoints(...labeledNumbersOrLabels);
}

function _asPoints<L extends string = never>(
    ...labeledNumbersOrLabels: Array<NumberOrLabeledNumber<L> | L>
): SamplePointsXAxis<L>
{
    const labeledXAxis = toLabeledNumbers(labeledNumbersOrLabels);

    const asPointsYAxis = (...yAxis: YAxisValue[]) => {
        if (labeledXAxis.length !== yAxis.length) throw new Error("[asPoints] 'xAxis' and 'yAxis' should be the same length.");

        return zip(labeledXAxis, yAxis).map(([x, y]) => [x!.value, y!] as SamplePoint);
    };

    const xAxisByLabel = mapValues(
        groupBy(
            flatMap(labeledXAxis, x => x.labels.map(label => [label, x])),
            pair => pair[0]
        ),
        pairs => pairs.map(pair => pair[1])
    ) as Partial<Record<L, LabeledNumber<L>[]>>;

    const xAxis = labeledXAxis.map(it => it.value);
    asPointsYAxis.xAxis = labeledXAxis.map(it => it.value);
    asPointsYAxis.first = xAxis[0];
    asPointsYAxis.last = xAxis[xAxis.length - 1];

    asPointsYAxis.select = memoize((...values: Array<SelectFnArg<L>>) => _asPoints(
        ...(map(compact(flatMap(values, it => {
                if (it === 'first') {
                    return [labeledXAxis[0]];
                }
                else if (it === 'last') {
                    return [labeledXAxis[labeledXAxis.length - 1]];
                }
                else {
                    return typeof it === 'string' ? xAxisByLabel[it] : [labeledXAxis[it]];
                }
            })),
            (labeledValue: LabeledNumber<L>) => labeledValue.value)))
    ) as SelectFnBody<L> as SelectFn<L>;
    Object.assign(asPointsYAxis.select, mapValues(xAxisByLabel, (_, label: L) => asPointsYAxis.select(label)));
    if (xAxis.length === 1) {
        Object.assign(asPointsYAxis.select, {
            first: asPointsYAxis,
            last: asPointsYAxis
        });
    }
    else {
        Object.assign(asPointsYAxis.select, {
            first: asPointsYAxis.select('first'),
            last: asPointsYAxis.select('last')
        });
    }

    asPointsYAxis.range = memoize((from: number | 'start', to?: number | 'end') => {
        return _asPoints(...xAxis.slice(
            from === 'start' ? 0 : from,
            to === 'end' ? xAxis.length : (to === undefined ? to : to + 1)));
    });

    return asPointsYAxis as SamplePointsXAxis<L>;
}

function toLabeledNumbers<L extends string>(labeledNumbersOrLabels: Array<NumberOrLabeledNumber<L> | L>): LabeledNumber<L>[]
{
    const labeledNumbers: LabeledNumber<L>[] = [];

    let labelsBefore: L[] = [];
    let labeledNumber: LabeledNumber<L> | undefined;
    let labelsAfter: L[] = [];
    const updateLabeledNumber = () => {
        if (labeledNumber !== undefined) {
            labeledNumber.labels.push(...labelsBefore, ...labelsAfter);
            labeledNumbers.push(labeledNumber);
        }
    };
    labeledNumbersOrLabels.forEach((it, i) => {

        if (isLabel(it)) {
            labelsAfter.push(it);
        }
        else {
            updateLabeledNumber();

            labelsBefore = labelsAfter;
            labeledNumber = typeof it === 'number'
                ? {value: it, labels: []}
                : {value: it.value, labels: it.labels.slice()};
            labelsAfter = [];
        }
    });
    updateLabeledNumber();

    return labeledNumbers;
}

function isLabel<L extends string>(value: NumberOrLabeledNumber<L> | L): value is L
{
    return typeof value === 'string';
}
