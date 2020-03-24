import {SamplePoint} from './sample-values';
import {InternalExtrapolation} from "./extrapolation";

export type ParameterizedExtrapolation = (x: number) => number;
export type AutoExtrapolation = () => number
export type Extrapolation = ParameterizedExtrapolation | AutoExtrapolation

export type SamplePointOrInternalExtrapolation = SamplePoint | InternalExtrapolation;
export type SamplePointOrExtrapolation = SamplePoint | Extrapolation;

export type WindowSize = { width: number, height: number };
