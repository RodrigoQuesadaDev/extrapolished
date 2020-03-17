export {extrapolishedViewBased, ViewBasedExtrapolation} from './extrapolished-view-based';
export {extrapolishedManual, ManualExtrapolation} from './extrapolished-manual';
export {RangeStartDefinition, RangeEndDefinition} from "./range-definition";
export {SamplePoint, asPoints, AsPointsYAxis} from './sample-point';

import {extrapolishedViewBased} from './extrapolished-view-based';

export const extrapolished = extrapolishedViewBased;

export type ParameterizedExtrapolation = (x: number) => number;
export type AutoExtrapolation = () => number
export type Extrapolation = ParameterizedExtrapolation | AutoExtrapolation
