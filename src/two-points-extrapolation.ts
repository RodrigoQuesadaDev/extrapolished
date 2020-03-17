import {RangeDefinition} from './range-definition';
import {InternalParameterizedExtrapolation} from './extrapolation';
import {SamplePoint} from './sample-point';

type TwoPointsExtrapolationArgs = { point0: SamplePoint, point1: SamplePoint, rangeDefinition: RangeDefinition };

export function twoPointsExtrapolation(
    {
        point0, point1, rangeDefinition
    }: TwoPointsExtrapolationArgs
): InternalParameterizedExtrapolation
{
    const [x0, y0] = point0;
    const [x1, y1] = point1;

    const extrapolation = (x: number) => {
        if (x < x0 && rangeDefinition.start === 'start-closed') return y0;
        if (x > x1 && rangeDefinition.end === 'end-closed') return y1;

        return (y0 * (x1 - x) + y1 * (x - x0)) / (x1 - x0);
    };
    extrapolation.firstPoint = point0;
    extrapolation.lastPoint = point1;

    return extrapolation;
}
