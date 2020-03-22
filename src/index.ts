export {useExtrapolishedViewBased, ViewBasedExtrapolation} from './extrapolished-view-based';
export {extrapolishedManual, ManualExtrapolation} from './extrapolished-manual';
export {RangeStartDefinition, RangeEndDefinition} from "./range-definition";
export {SamplePoint, asPoints, AsPointsYAxis} from './sample-point';
export type {ParameterizedExtrapolation, AutoExtrapolation, Extrapolation} from './global-types';
import {extrapolishedManual} from './extrapolished-manual';
import {useExtrapolishedViewBased} from './extrapolished-view-based';

export const extrapolished = extrapolishedManual;
export const useExtrapolished = useExtrapolishedViewBased;

/*
TODO
    - Add constant extrapolation (e.g. useful to quickly define segments with a value of 0)
    - Add property to AsPoints in order to get original array (raw property?)
    - Add function to select range of points in AsPoints
    - Being able to address breakpoint ranges would be cool (e.g. SMALL, MID, BIG).
        - Would probably help to define start/end for breakpoints
    - Provide discrete interpolations? (e.g useful for images where it might not be desired to scale them up/down)
        - So, one could pass an array of sizes (i.e. image widths and the algorithm would choose the closest value when interpolating).
    - Add support for discrete jumps (e.g. [100, 140/20, 40], which would only contain 2 interpolation ranges).
* */
