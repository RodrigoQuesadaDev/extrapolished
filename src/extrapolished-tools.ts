import {useCallback} from "react";
import {AutoExtrapolation, SamplePointsXAxis, useExtrapolished} from "./index";
import {YAxisValue} from "./as-points";

export function createExtrapolishedTools(defaultBreakpoints: SamplePointsXAxis): ExtrapolishedTools
{
    return {
        useEx: (bps: SamplePointsXAxis = defaultBreakpoints) => {
            const extrapolished = useExtrapolished();

            return useCallback((...yAxis: YAxisValue[]) => extrapolished(bps(...yAxis)), [bps, extrapolished]);
        }
    };
}

export type ExtrapolishedTools = {
    useEx: (bps?: SamplePointsXAxis) => ExFunction
};
export type ExFunction = ((...yAxis: YAxisValue[]) => AutoExtrapolation);
