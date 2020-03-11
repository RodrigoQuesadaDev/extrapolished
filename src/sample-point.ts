import zip from 'lodash/zip';

export type SamplePoint = [number, number];

export function isSamplePoint(value: any): value is SamplePoint
{
    return Array.isArray(value)
        && value.length === 2
        && value.every(it => typeof it === 'number');
}

export type AsPointsYAxis = ((yAxis: number[]) => SamplePoint[]) & { x: number[] };

export const asPoints = (xAxis: number[]): AsPointsYAxis => {

    const asPointsYAxis = (yAxis: number[]) => {
        if (xAxis.length !== yAxis.length) throw new Error("[asPoints] 'xAxis' and 'yAxis' should be the same length.");

        return zip(xAxis, yAxis) as SamplePoint[];
    };
    asPointsYAxis.x = xAxis;

    return asPointsYAxis;
};
