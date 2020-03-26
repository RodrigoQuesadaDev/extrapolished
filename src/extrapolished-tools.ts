import {useMemo} from "react";
import {AutoExtrapolation, ExtrapolishedOptions, SamplePointsXAxis, useExtrapolished} from "./index";
import {YAxisValue} from "./as-points";
import {defaultTo, mapValues, merge} from "lodash-es";
import {useDistinct} from "./common/use-distinct";

export function createExtrapolishedTools<DL extends string>(defaultBreakpoints: SamplePointsXAxis<DL>, defaultOptions?: Partial<ExtrapolishedOptions>): ExtrapolishedTools<DL>
{
    return {
        useEx: <L extends string = DL>(arg1: SamplePointsXAxis<L> | Partial<ExtrapolishedOptions> | undefined, arg2?: Partial<ExtrapolishedOptions>): ExFunction<L> => {
            let {bps, options} = readArguments(arg1, arg2);
            bps = defaultTo(bps, defaultBreakpoints as SamplePointsXAxis<L>);

            options = useMemo(() => merge({}, defaultOptions, options), [options]);
            options = useDistinct(options);

            const extrapolished = useExtrapolished();
            return useMemo(() => {
                const exFunction = createExFunction(extrapolished, bps!, options) as ExFunction<L>;
                Object.assign(exFunction, mapValues(bps!.select, subBps => createExFunction(extrapolished, subBps, options)));
                return exFunction;
            }, [bps, extrapolished, options]);
        }
    };
}

function readArguments<L extends string>(arg1: SamplePointsXAxis<L> | Partial<ExtrapolishedOptions> | undefined, arg2?: Partial<ExtrapolishedOptions>)
{
    let bps: SamplePointsXAxis<L> | undefined;
    let options: Partial<ExtrapolishedOptions> | undefined;

    if (isSamplePointsXAxis(arg1)) {
        bps = arg1;
        options = arg2;
    }
    else {
        options = arg1;
    }

    return {bps, options};
}

export type ExtrapolishedTools<DL extends string> = {
    useEx: UseExFn<DL>
};

export interface UseExFn<DL extends string> {
    <L extends string = DL>(options?: Partial<ExtrapolishedOptions>): ExFunction<L>
    <L extends string>(bps: SamplePointsXAxis<L>, options?: Partial<ExtrapolishedOptions>): ExFunction<L>
}

export type ExFunction<L extends string = never> = ((...yAxis: YAxisValue[]) => AutoExtrapolation) & {
    [P in L]: ExFunction;
} & {
    first: ExFunction;
    last: ExFunction;
}

function createExFunction(extrapolished: ReturnType<typeof useExtrapolished>, bps: SamplePointsXAxis, options: Partial<ExtrapolishedOptions> | undefined)
{
    return (...yAxis: YAxisValue[]) => extrapolished(bps!(...yAxis), options);
}

function isSamplePointsXAxis(value: any | undefined): value is SamplePointsXAxis
{
    return value?.xAxis !== undefined;
}
