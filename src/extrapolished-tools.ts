import {useCallback, useMemo} from "react";
import {AutoExtrapolation, ExtrapolishedOptions, SamplePointsXAxis, useExtrapolished} from "./index";
import {YAxisValue} from "./as-points";
import {defaultTo, merge} from "lodash-es";
import {useDistinct} from "./common/use-distinct";

export function createExtrapolishedTools(defaultBreakpoints: SamplePointsXAxis, defaultOptions?: Partial<ExtrapolishedOptions>): ExtrapolishedTools
{
    return {
        useEx: (arg1: SamplePointsXAxis | Partial<ExtrapolishedOptions> | undefined, arg2?: Partial<ExtrapolishedOptions>) => {
            let {bps, options} = readArguments(arg1, arg2);
            bps = defaultTo(bps, defaultBreakpoints);

            options = useMemo(() => merge({}, defaultOptions, options), [options]);
            options = useDistinct(options);

            const extrapolished = useExtrapolished();
            return useCallback((...yAxis: YAxisValue[]) => extrapolished(bps!(...yAxis), options), [bps, extrapolished, options]);
        }
    };
}

function readArguments(arg1: SamplePointsXAxis | Partial<ExtrapolishedOptions> | undefined, arg2?: Partial<ExtrapolishedOptions>)
{
    let bps: SamplePointsXAxis | undefined;
    let options: Partial<ExtrapolishedOptions> | undefined;

    if (isSamplePointsXAxis(arg1)) {
        bps = arg1;
        options = arg2;
    }
    else {
        options = arg1;
    }

    return {bps, options};
}

export type ExtrapolishedTools = {
    useEx: UseExFn
};

export interface UseExFn {
    (options?: Partial<ExtrapolishedOptions>): ExFunction
    (bps: SamplePointsXAxis, options?: Partial<ExtrapolishedOptions>): ExFunction
}

export type ExFunction = ((...yAxis: YAxisValue[]) => AutoExtrapolation);

function isSamplePointsXAxis(value: any | undefined): value is SamplePointsXAxis
{
    return value?.xAxis !== undefined;
}
