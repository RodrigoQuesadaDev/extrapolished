import {extrapolishedManual} from './extrapolished-manual';
import {useExtrapolishedViewBased} from './extrapolished-view-based';

export {useExtrapolishedViewBased, ViewBasedExtrapolation} from './extrapolished-view-based';
export {extrapolishedManual, ManualExtrapolation} from './extrapolished-manual';
export {RangeStartDefinition, RangeEndDefinition} from "./range-definition";
export {ExtrapolishedOptions} from "./extrapolished-config";
export {SamplePoint, SimpleSamplePoint, DualSamplePoint, DualValue} from './sample-values';
export {asPoints, SamplePointsXAxis, YAxisValue} from './as-points';
export {LabeledNumber, NumberOrLabeledNumber} from './labels';
export type {ParameterizedExtrapolation, AutoExtrapolation, Extrapolation} from './global-types';
export {createExtrapolishedTools, ExtrapolishedTools, UseExFn, ExFunction} from './extrapolished-tools';

export const extrapolished = extrapolishedManual;
export const useExtrapolished = useExtrapolishedViewBased;
