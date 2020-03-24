import {zip} from "lodash-es";
import {DualValue, SamplePoint} from "./sample-values";

export type SamplePointsXAxis = ((...yAxis: YAxisValue[]) => SamplePoint[]) & {
    xAxis: number[],
    first: number,
    last: number,
    select: SelectFn,
    range: RangeFn
};

export type YAxisValue = number | DualValue;

type SelectFn = (...values: Array<number | 'first' | 'last'>) => SamplePointsXAxis
type RangeFn = (from: number | 'start', to?: number | 'end') => SamplePointsXAxis

export const asPoints = (...xAxis: number[]): SamplePointsXAxis => {

    const asPointsYAxis = (...yAxis: YAxisValue[]) => {
        if (xAxis.length !== yAxis.length) throw new Error("[asPoints] 'xAxis' and 'yAxis' should be the same length.");

        return zip(xAxis, yAxis) as SamplePoint[];
    };
    asPointsYAxis.xAxis = xAxis;
    asPointsYAxis.first = xAxis[0];
    asPointsYAxis.last = xAxis[xAxis.length - 1];
    asPointsYAxis.select = (...values: Array<number | 'first' | 'last'>) => {
        return asPoints(...values.map(it => xAxis[it === 'first' ? 0 : (it === 'last' ? xAxis.length - 1 : it)]));
    };
    asPointsYAxis.range = (from: number | 'start', to?: number | 'end') => {
        return asPoints(...xAxis.slice(
            from === 'start' ? 0 : from,
            to === 'end' ? xAxis.length : (to === undefined ? to : to + 1)));
    };

    return asPointsYAxis;
};
