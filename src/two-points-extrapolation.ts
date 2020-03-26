import {RangeDefinition} from './range-definition';
import {InternalParameterizedExtrapolation} from './extrapolation';
import {asTwoSimplePoints, SamplePoint} from './sample-values';
import {constantExtrapolation} from "./constant-extrapolation";

type TwoPointsExtrapolationArgs = { point0: SamplePoint, point1: SamplePoint, rangeDefinition: RangeDefinition };

export function twoPointsExtrapolation({point0, point1, rangeDefinition}: TwoPointsExtrapolationArgs): InternalParameterizedExtrapolation
{
    const x0 = point0[0];
    const y0 = constantExtrapolation({point: point0});
    const x1 = point1[0];
    const y1 = constantExtrapolation({point: point1});

    const extrapolation = (x: number) => {
        if (x < x0 && rangeDefinition.start === 'start-closed') return y0(x);
        if (x >= x1 && rangeDefinition.end === 'end-closed') return y1(x);

        return (y0(x) * (x1 - x) + y1(x) * (x - x0)) / (x1 - x0);
    };
    extrapolation.start = asTwoSimplePoints(point0)[1];
    extrapolation.end = asTwoSimplePoints(point1)[0];

    return extrapolation;
}
