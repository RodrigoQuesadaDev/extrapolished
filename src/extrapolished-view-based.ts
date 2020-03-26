import {AutoExtrapolation, SamplePointOrExtrapolation, WindowSize} from './global-types';
import {RangeEndDefinition, RangeStartDefinition} from './range-definition';
import {_internalExtrapolishedManual} from './extrapolished-manual';
import {InternalAutoExtrapolation} from "./extrapolation";
import {memoizeFnArgs} from "./common/memoize-with-function-args-support.util";
import {useWindowSize} from "./common/use-window-dimensions-hook";
import {useCallback} from "react";
import {wrapExtrapolation} from "./utils/extrapolation-wrapping.util";
import {ExtrapolishedOptions} from "./extrapolished-config";

const _memoizedExtrapolishedViewBased = memoizeFnArgs(_internalExtrapolishedViewBased);

function _internalExtrapolishedViewBased(windowSize: WindowSize, ...args: Array<number | SamplePointOrExtrapolation | SamplePointOrExtrapolation[] | RangeStartDefinition | RangeEndDefinition | Partial<ExtrapolishedOptions> | undefined>): InternalAutoExtrapolation
{
    const parameterizedExtrapolation = _internalExtrapolishedManual(...args);

    return wrapExtrapolation(parameterizedExtrapolation,
        original => (() => original(windowSize.width)) as Partial<InternalAutoExtrapolation>
    );
}

//region Types
export type ViewBasedExtrapolation = AutoExtrapolation;
//endregion

//region Hook
export function useExtrapolishedViewBased(): ExtrapolishedViewBasedFunction
{
    const windowSize = useWindowSize();
    return useCallback((...args: any[]) => _memoizedExtrapolishedViewBased(windowSize, ...args), [windowSize]);
}

interface ExtrapolishedViewBasedFunction {
    (point: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (point: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (start: RangeStartDefinition, point: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (start: RangeStartDefinition, point: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (point: SamplePointOrExtrapolation, slope: number, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (point: SamplePointOrExtrapolation, slope: number, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (start: RangeStartDefinition, point: SamplePointOrExtrapolation, slope: number, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (start: RangeStartDefinition, point: SamplePointOrExtrapolation, slope: number, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, point4: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, point4: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, point4: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, point4: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (points: SamplePointOrExtrapolation[], options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (points: SamplePointOrExtrapolation[], end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (start: RangeStartDefinition, points: SamplePointOrExtrapolation[], options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
    (start: RangeStartDefinition, points: SamplePointOrExtrapolation[], end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ViewBasedExtrapolation;
}

//endregion
