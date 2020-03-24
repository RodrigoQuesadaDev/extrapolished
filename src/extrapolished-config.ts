import {RangeDefinition} from './range-definition';

export type ExtrapolishedOptions = {
    singlePointExtrapolationMode: 'constant' | 'linear',
    discreteValues: number[]
};

export const DEFAULT = {
    rangeDefinition: {
        start: 'start-closed',
        end: 'end-closed'
    } as RangeDefinition,
    options: {
        singlePointExtrapolationMode: 'constant',
        discreteValues: []
    } as ExtrapolishedOptions
};
