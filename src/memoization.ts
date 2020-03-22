import {InternalAutoExtrapolation, InternalExtrapolation, isAutoExtrapolation} from "./extrapolation";
import memoizeOne from "memoize-one";
import memoize from "fast-memoize";
import {wrapExtrapolation, WrappedExtrapolation} from "./utils/extrapolation-wrapping.util";

type Memoized<E extends InternalExtrapolation> = WrappedExtrapolation<E> & {
    memoized: true
};

export function memoizeExtrapolation<E extends InternalExtrapolation>(extrapolation: E): Memoized<E>
{
    if (isMemoized(extrapolation)) {
        return extrapolation;
    }
    else {
        return wrapExtrapolation<E, Memoized<E>>(extrapolation,
            original => isAutoExtrapolation(original)
                ? memoizeOne(original as InternalAutoExtrapolation)
                : memoize(original as InternalExtrapolation)
        );
    }
}

export function unmemoizeExtrapolation<E extends InternalExtrapolation>(extrapolation: E): E
{
    return isMemoized(extrapolation) ? extrapolation.originalExtrapolation : extrapolation;
}


function isMemoized<E extends InternalExtrapolation>(extrapolation: E): extrapolation is E & Memoized<E>
{
    return (extrapolation as any).memoized;
}
