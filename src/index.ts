import {extrapolishedManual} from './extrapolished-manual';
import {useExtrapolishedViewBased} from './extrapolished-view-based';

export {useExtrapolishedViewBased, ViewBasedExtrapolation} from './extrapolished-view-based';
export {extrapolishedManual, ManualExtrapolation} from './extrapolished-manual';
export {RangeStartDefinition, RangeEndDefinition} from "./range-definition";
export {
    SamplePoint, SimpleSamplePoint, DualSamplePoint, DualValue, asPoints, SamplePointsXAxis, YAxisValue
} from './sample-values';
export type {ParameterizedExtrapolation, AutoExtrapolation, Extrapolation} from './global-types';
export {createExtrapolishedTools, ExtrapolishedTools, ExFunction} from './extrapolished-tools';

export const extrapolished = extrapolishedManual;
export const useExtrapolished = useExtrapolishedViewBased;

/*
TODO
    - Add options argument at the end (i.e. with option singlePointExtrapolationMode: 'constant' or discreteValues: [250, 500, 1200])
    - Add function to select range of points in AsPoints
    - Being able to address breakpoint ranges would be cool (e.g. SMALL, MID, BIG).
        - Would probably help to define start/end for breakpoints
    - Provide discrete interpolations? (e.g useful for images where it might not be desired to scale them up/down)
        - So, one could pass an array of sizes (i.e. image widths and the algorithm would choose the closest value when interpolating).
* */
