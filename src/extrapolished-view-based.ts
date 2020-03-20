import {useWindowDimensions} from './common/use-window-dimensions-hook';
import {AutoExtrapolation, SamplePointOrExtrapolation} from './global-types';
import {RangeEndDefinition, RangeStartDefinition} from './range-definition';
import {_internalExtrapolishedManual} from './extrapolished-manual';
import {InternalAutoExtrapolation} from "./extrapolation";

export function extrapolishedViewBased(point: SamplePointOrExtrapolation, speedFactor?: number): ViewBasedExtrapolation ;
export function extrapolishedViewBased(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, end?: RangeEndDefinition): ViewBasedExtrapolation;
export function extrapolishedViewBased(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, end?: RangeEndDefinition): ViewBasedExtrapolation;
export function extrapolishedViewBased(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, end?: RangeEndDefinition): ViewBasedExtrapolation;
export function extrapolishedViewBased(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, point4: SamplePointOrExtrapolation, end?: RangeEndDefinition): ViewBasedExtrapolation;
export function extrapolishedViewBased(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, end?: RangeEndDefinition): ViewBasedExtrapolation;
export function extrapolishedViewBased(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, end?: RangeEndDefinition): ViewBasedExtrapolation;
export function extrapolishedViewBased(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, end?: RangeEndDefinition): ViewBasedExtrapolation;
export function extrapolishedViewBased(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, point4: SamplePointOrExtrapolation, end?: RangeEndDefinition): ViewBasedExtrapolation;
export function extrapolishedViewBased(points: SamplePointOrExtrapolation[], end?: RangeEndDefinition): ViewBasedExtrapolation;
export function extrapolishedViewBased(start: RangeStartDefinition, points: SamplePointOrExtrapolation[], end?: RangeEndDefinition): ViewBasedExtrapolation;
export function extrapolishedViewBased(...args: Array<number | SamplePointOrExtrapolation | SamplePointOrExtrapolation[] | RangeStartDefinition | RangeEndDefinition | undefined>): ViewBasedExtrapolation
{
    return _internalExtrapolishedViewBased(...args);
}

function _internalExtrapolishedViewBased(...args: Array<number | SamplePointOrExtrapolation | SamplePointOrExtrapolation[] | RangeStartDefinition | RangeEndDefinition | undefined>): InternalAutoExtrapolation
{
    const parameterizedExtrapolation = _internalExtrapolishedManual(...args);

    const autoExtrapolation = () => {
        const windowDimensions = useWindowDimensions();
        return parameterizedExtrapolation(windowDimensions.width);
    };
    autoExtrapolation.firstPoint = parameterizedExtrapolation.firstPoint;
    autoExtrapolation.lastPoint = parameterizedExtrapolation.lastPoint;
    autoExtrapolation.parameterizedExtrapolation = parameterizedExtrapolation;

    return autoExtrapolation;
}

//region Types
export type ViewBasedExtrapolation = AutoExtrapolation;
//endregion
