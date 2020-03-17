import {SamplePoint} from './sample-point';

type ExtrapolationInfo = { firstPoint: SamplePoint, lastPoint: SamplePoint };

export type InternalParameterizedExtrapolation = ExtrapolationInfo & ((x: number) => number);
export type InternalAutoExtrapolation =
    ExtrapolationInfo
    & (() => number)
    & { parameterizedExtrapolation: InternalParameterizedExtrapolation };
export type InternalExtrapolation = InternalParameterizedExtrapolation | InternalAutoExtrapolation

export function isExtrapolation(value: any): value is InternalExtrapolation
{
    return typeof value === 'function' && value.point0 !== undefined;
}

export function isAutoExtrapolation(extrapolation: InternalExtrapolation): extrapolation is InternalAutoExtrapolation
{
    return extrapolation.length === 0;
}

export const sortExtrapolations = (extrapolations: InternalExtrapolation[]) => extrapolations.sort((e1, e2) => e1.firstPoint[0] - e2.firstPoint[0]);
