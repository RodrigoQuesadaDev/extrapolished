import {InternalExtrapolation} from "../extrapolation";

export type WrappedExtrapolationInfo<O extends Partial<InternalExtrapolation>> = { originalExtrapolation: O };

export type WrappedExtrapolation<O extends Partial<InternalExtrapolation>> =
    InternalExtrapolation
    & WrappedExtrapolationInfo<O>;

const NOOP = () => {};

export function wrapExtrapolation<O extends InternalExtrapolation, W extends WrappedExtrapolation<O>>(
    extrapolation: O,
    doWrap: (original: O) => Partial<W>,
    postProcess: (wrapped: Partial<W>) => void = NOOP
): W
{
    const wrappedExtrapolation = doWrap(extrapolation);
    wrappedExtrapolation.start = extrapolation.start;
    wrappedExtrapolation.end = extrapolation.end;
    wrappedExtrapolation.originalExtrapolation = extrapolation;

    postProcess(wrappedExtrapolation);

    return wrappedExtrapolation as W;
}
