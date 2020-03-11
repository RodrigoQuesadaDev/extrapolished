import {extrapolishedViewBased} from './extrapolished-view-based';
import {SamplePoint} from "./sample-point";

export const extrapolished = extrapolishedViewBased;

export {extrapolishedViewBased, ViewBasedExtrapolation} from './extrapolished-view-based';
export {extrapolishedManual, ManualExtrapolation} from './extrapolished-manual';
export {RangeStartDefinition, RangeEndDefinition} from "./range-definition";
export {SamplePoint, asPoints, AsPointsYAxis} from './sample-point';
export type {Extrapolation, ParameterizedExtrapolation, AutoExtrapolation} from './extrapolation';
