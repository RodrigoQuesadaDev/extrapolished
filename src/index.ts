import {extrapolishedManual} from './extrapolished-manual';
import {useExtrapolishedViewBased} from './extrapolished-view-based';

export {useExtrapolishedViewBased, ViewBasedExtrapolation} from './extrapolished-view-based';
export {extrapolishedManual, ManualExtrapolation} from './extrapolished-manual';
export {RangeStartDefinition, RangeEndDefinition} from "./range-definition";
export {ExtrapolishedOptions} from "./extrapolished-config";
export {SamplePoint, SimpleSamplePoint, DualSamplePoint, DualValue} from './sample-values';
export {asPoints, SamplePointsXAxis, YAxisValue} from './as-points';
export type {ParameterizedExtrapolation, AutoExtrapolation, Extrapolation} from './global-types';
export {createExtrapolishedTools, ExtrapolishedTools, UseExFn, ExFunction} from './extrapolished-tools';

export const extrapolished = extrapolishedManual;
export const useExtrapolished = useExtrapolishedViewBased;

/*
TODO
    - Being able to address breakpoint ranges would be cool (e.g. SMALL, MID, BIG).
        - Would probably help to define start/end for breakpoints
* */
