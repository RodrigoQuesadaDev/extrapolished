import {InternalParameterizedExtrapolation} from './extrapolation';
import {asTwoSimplePoints, SamplePoint} from './sample-values';
import {constantExtrapolation} from "./constant-extrapolation";
import {RangeDefinition} from "./range-definition";

type SinglePointExtrapolationArgs = { point: SamplePoint, slope?: number, rangeDefinition: RangeDefinition };

export function singlePointExtrapolation({point, slope = 1, rangeDefinition}: SinglePointExtrapolationArgs): InternalParameterizedExtrapolation
{
    const [point0, point1] = asTwoSimplePoints(point);
    const [x0,] = point0;
    const y0 = constantExtrapolation({point});

    const extrapolation = (x: number) => {
        if (x < x0 && rangeDefinition.start === 'start-closed') return y0(x);
        if (x >= x0 && rangeDefinition.end === 'end-closed') return y0(x);

        return slope * (x - x0) + y0(x);
    };
    extrapolation.start = point0;
    extrapolation.end = point1;

    return extrapolation;
}
