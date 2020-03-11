import {useWindowDimensions} from './common/use-window-dimensions-hook';
import {SamplePointOrExtrapolation} from './global-types';
import {RangeEndDefinition, RangeStartDefinition} from './range-definition';
import {_internalExtrapolishedManual} from './extrapolished-manual';

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
    return () => {
        const windowDimensions = useWindowDimensions();
        return _internalExtrapolishedManual(...args)(windowDimensions.width);
    };
}

//region Types
export type ViewBasedExtrapolation = () => number;
//endregion
