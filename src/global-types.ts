import {SamplePoint} from './sample-point';
import {InternalExtrapolation} from "./extrapolation";

export type ParameterizedExtrapolation = (x: number) => number;
export type AutoExtrapolation = () => number
export type Extrapolation = ParameterizedExtrapolation | AutoExtrapolation

export type SamplePointOrInternalExtrapolation = SamplePoint | InternalExtrapolation;
export type SamplePointOrExtrapolation = SamplePoint | Extrapolation;
