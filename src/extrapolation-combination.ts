import {Extrapolation, isAutoExtrapolation, ParameterizedExtrapolation, sortExtrapolations} from './extrapolation';

export function combine(...extrapolations: Extrapolation[]): ParameterizedExtrapolation
{
    if (extrapolations.length === 0) throw new Error('[combine] At least 1 extrapolation should be passed.');

    extrapolations = extrapolations.map(it => isAutoExtrapolation(it) ? it.parameterizedExtrapolation : it);
    sortExtrapolations(extrapolations);

    const extrapolation = (x: number): number => {
        const indexAfter = extrapolations.findIndex(it => x < it.firstPoint[0]);

        const index = (indexAfter !== -1)
            ? (indexAfter > 0 ? (indexAfter - 1) : indexAfter)
            : (extrapolations.length - 1);

        return extrapolations[index](x);
    };
    extrapolation.firstPoint = extrapolations[0].firstPoint;
    extrapolation.lastPoint = extrapolations[extrapolations.length - 1].lastPoint;

    return extrapolation;
}