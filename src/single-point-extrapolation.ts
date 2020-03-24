import {InternalParameterizedExtrapolation} from './extrapolation';
import {asTwoSimplePoints, SamplePoint} from './sample-values';
import {constantExtrapolation} from "./constant-extrapolation";

type SinglePointExtrapolationArgs = { point: SamplePoint, slope?: number };

export function singlePointExtrapolation({point, slope = 1}: SinglePointExtrapolationArgs): InternalParameterizedExtrapolation
{
    const [point0, point1] = asTwoSimplePoints(point);
    const [x0,] = point0;
    const y0 = constantExtrapolation({point});

    const extrapolation = (x: number) => slope * (x - x0) + y0(x);
    extrapolation.start = point0;
    extrapolation.end = point1;

    return extrapolation;
}
