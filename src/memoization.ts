import {useMemo} from "react";
import {Extrapolation} from "./global-types";

type Memoized<E extends Extrapolation> = E & {
    memoized: true,
    unmemoizedVersion: E
};

export function memoize<E extends Extrapolation>(extrapolation: E): Memoized<E>
{
    if (isMemoized(extrapolation)) {
        return extrapolation;
    }
    else {
        const memoizedExtrapolation = ((...args: any[]) => useMemo(
                // @ts-ignore
                () => extrapolation(...args),
                args)
        ) as Memoized<E>;
        memoizedExtrapolation.unmemoizedVersion = extrapolation;
        return memoizedExtrapolation;
    }
}

export function unmemoize<E extends Extrapolation>(extrapolation: E): E
{
    if (!isMemoized(extrapolation)) {
        return extrapolation;
    }
    else {
        return extrapolation.unmemoizedVersion;
    }
}


function isMemoized<E extends Extrapolation>(extrapolation: E): extrapolation is Memoized<E>
{
    return (extrapolation as any).memoized;
}
