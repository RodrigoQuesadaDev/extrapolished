import {useMemo} from "react";
import {InternalExtrapolation} from "./extrapolation";

type Memoized<E extends InternalExtrapolation> = E & {
    memoized: true,
    unmemoizedVersion: E
};

export function memoize<E extends InternalExtrapolation>(extrapolation: E): Memoized<E>
{
    if (isMemoized(extrapolation)) {
        return extrapolation;
    }
    else {
        //TODO add back memoize optimization (yeah, don't use useMemo)
        // @ts-ignore
        const memoizedExtrapolation = ((...args: any[]) => extrapolation(...args)) as Memoized<E>;
        memoizedExtrapolation.firstPoint = extrapolation.firstPoint;
        memoizedExtrapolation.lastPoint = extrapolation.lastPoint;
        memoizedExtrapolation.unmemoizedVersion = extrapolation;
        return memoizedExtrapolation;
    }
}

export function unmemoize<E extends InternalExtrapolation>(extrapolation: E): E
{
    if (!isMemoized(extrapolation)) {
        return extrapolation;
    }
    else {
        return extrapolation.unmemoizedVersion;
    }
}


function isMemoized<E extends InternalExtrapolation>(extrapolation: E): extrapolation is Memoized<E>
{
    return (extrapolation as any).memoized;
}
