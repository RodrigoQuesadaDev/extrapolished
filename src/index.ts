export {extrapolishedViewBased, ViewBasedExtrapolation} from './extrapolished-view-based';
export {extrapolishedManual, ManualExtrapolation} from './extrapolished-manual';
export {RangeStartDefinition, RangeEndDefinition} from "./range-definition";
export {SamplePoint, asPoints, AsPointsYAxis} from './sample-point';
export type {ParameterizedExtrapolation, AutoExtrapolation, Extrapolation} from './global-types';
import {extrapolishedViewBased} from './extrapolished-view-based';

export const extrapolished = extrapolishedViewBased;
