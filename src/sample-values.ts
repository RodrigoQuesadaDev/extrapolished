import {zip} from 'lodash-es';

export type SamplePoint = SimpleSamplePoint | DualSamplePoint;

export function isSamplePoint(value: any): value is SamplePoint
{
    return Array.isArray(value)
        && value.length === 2
        && typeof value[0] === 'number'
        && (typeof value[1] === 'number' || isDualValue(value[1]));
}

export type SimpleSamplePoint = [number, number];

export function isSimplePoint(value: any): value is SimpleSamplePoint
{
    return Array.isArray(value)
        && value.length === 2
        && value.every(it => typeof it === 'number');
}

export type DualSamplePoint = [number, DualValue];
export type DualValue = [number, number];

export function isDualPoint(value: any): value is DualSamplePoint
{
    return Array.isArray(value)
        && value.length === 2
        && typeof value[0] === 'number'
        && isDualValue(value[1]);
}

export function isDualValue(value: any): value is DualValue
{
    return Array.isArray(value)
        && value.length === 2
        && value.every(it => typeof it === 'number');
}

export function asSimplePoints(point: DualSamplePoint): [SimpleSamplePoint, SimpleSamplePoint]
{
    return [[point[0], point[1][0]], [point[0], point[1][1]]];
}

export function asTwoSimplePoints(point: SamplePoint): [SimpleSamplePoint, SimpleSamplePoint]
{
    const [point0, point1] = isSimplePoint(point) ? [point, point] : asSimplePoints(point);
    return [point0, point1];
}

export type SamplePointsXAxis = ((...yAxis: YAxisValue[]) => SamplePoint[]) & { xAxis: number[] };

export type YAxisValue = number | DualValue;

export const asPoints = (...xAxis: number[]): SamplePointsXAxis => {

    const asPointsYAxis = (...yAxis: YAxisValue[]) => {
        if (xAxis.length !== yAxis.length) throw new Error("[asPoints] 'xAxis' and 'yAxis' should be the same length.");

        return zip(xAxis, yAxis) as SamplePoint[];
    };
    asPointsYAxis.xAxis = xAxis;

    return asPointsYAxis;
};
