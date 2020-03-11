import {SamplePoint} from './sample-point';

type ExtrapolationInfo = { firstPoint: SamplePoint, lastPoint: SamplePoint };

export type ParameterizedExtrapolation = ExtrapolationInfo & ((x: number) => number);
export type AutoExtrapolation =
    ExtrapolationInfo
    & (() => number)
    & { parameterizedExtrapolation: ParameterizedExtrapolation };
export type Extrapolation = ParameterizedExtrapolation | AutoExtrapolation

export function isExtrapolation(value: any): value is Extrapolation
{
    return typeof value === 'function' && value.point0 !== undefined;
}

export function isAutoExtrapolation(extrapolation: Extrapolation): extrapolation is AutoExtrapolation
{
    return extrapolation.length === 0;
}

export const sortExtrapolations = (extrapolations: Extrapolation[]) => extrapolations.sort((e1, e2) => e1.firstPoint[0] - e2.firstPoint[0]);
