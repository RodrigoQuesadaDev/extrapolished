import {
    InternalExtrapolation,
    InternalParameterizedExtrapolation,
    isAutoExtrapolation,
    sortExtrapolations
} from '../extrapolation';

export function combine(...extrapolations: InternalExtrapolation[]): InternalParameterizedExtrapolation
{
    if (extrapolations.length === 0) throw new Error('[combine] At least 1 extrapolation should be passed.');

    extrapolations = extrapolations.map(it => isAutoExtrapolation(it) ? it.originalExtrapolation : it);
    sortExtrapolations(extrapolations);

    const extrapolation = (x: number): number => {
        const indexAfter = extrapolations.findIndex(it => x < it.start[0]);

        const index = (indexAfter !== -1)
            ? (indexAfter > 0 ? (indexAfter - 1) : indexAfter)
            : (extrapolations.length - 1);

        return extrapolations[index](x);
    };
    extrapolation.start = extrapolations[0].start;
    extrapolation.end = extrapolations[extrapolations.length - 1].end;

    return extrapolation;
}
