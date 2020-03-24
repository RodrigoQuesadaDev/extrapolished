import {SimpleSamplePoint} from './sample-values';
import {WrappedExtrapolationInfo} from "./utils/extrapolation-wrapping.util";

type ExtrapolationInfo = { start: SimpleSamplePoint, end: SimpleSamplePoint };

export type InternalParameterizedExtrapolation = ExtrapolationInfo & ((x: number) => number);
export type InternalAutoExtrapolation =
    ExtrapolationInfo
    & (() => number)
    & WrappedExtrapolationInfo<InternalParameterizedExtrapolation>
export type InternalExtrapolation = InternalParameterizedExtrapolation | InternalAutoExtrapolation

export function isExtrapolation(value: any): value is InternalExtrapolation
{
    return typeof value === 'function' && value.point0 !== undefined;
}

export function isAutoExtrapolation(extrapolation: InternalExtrapolation): extrapolation is InternalAutoExtrapolation
{
    return extrapolation.length === 0;
}

export const sortExtrapolations = (extrapolations: InternalExtrapolation[]) => extrapolations.sort((e1, e2) => e1.start[0] - e2.start[0]);
