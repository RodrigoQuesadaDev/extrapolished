import {InternalExtrapolation} from "./extrapolation";
import {wrapExtrapolation, WrappedExtrapolation} from "./utils/extrapolation-wrapping.util";
import {minBy} from "lodash-es";

export function asDiscrete<E extends InternalExtrapolation>(extrapolation: E, discreteValues: number[]): WrappedExtrapolation<E>
{
    if (discreteValues.length === 0) throw new Error('[asDiscrete] At least 1 discrete value must be passed.');

    return wrapExtrapolation<E, WrappedExtrapolation<E>>(extrapolation,
        original => ((x: number) => {
            return closestValue(original(x), discreteValues);
        }) as InternalExtrapolation
    );
}

function closestValue(value: number, discreteValues: number[]): number
{
    return minBy(discreteValues, it => Math.abs(it - value))!;
}
