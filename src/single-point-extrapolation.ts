import {InternalParameterizedExtrapolation} from './extrapolation';
import {SamplePoint} from './sample-point';
import {useMemo} from "react";

type SinglePointExtrapolationArgs = { point: SamplePoint, speedFactor?: number };

export function singlePointExtrapolation({point, speedFactor = 1}: SinglePointExtrapolationArgs): InternalParameterizedExtrapolation
{
    const [x0, y0] = point;

    const extrapolation = (x: number) => useMemo(() => speedFactor * x * y0 / x0 + (1 - speedFactor) * y0, [x]);
    extrapolation.firstPoint = extrapolation.lastPoint = point;

    return extrapolation;
}
