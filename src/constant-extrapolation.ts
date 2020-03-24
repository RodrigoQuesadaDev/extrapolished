import {InternalParameterizedExtrapolation} from './extrapolation';
import {asTwoSimplePoints, SamplePoint} from './sample-values';

type ConstantExtrapolationArgs = { point: SamplePoint };

export function constantExtrapolation({point}: ConstantExtrapolationArgs): InternalParameterizedExtrapolation
{
    const [point0, point1] = asTwoSimplePoints(point);
    const [x0, y0] = point0;
    const [, y1] = point1;

    const extrapolation = (x: number) => (x < x0 ? y0 : y1);
    extrapolation.start = point0;
    extrapolation.end = point1;

    return extrapolation;
}
