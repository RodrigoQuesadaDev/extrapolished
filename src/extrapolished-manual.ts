import {InternalExtrapolation, InternalParameterizedExtrapolation} from './extrapolation';
import {RangeEndDefinition, RangeStartDefinition} from './range-definition';
import {DEFAULT, ExtrapolishedOptions} from './extrapolished-config';
import {singlePointExtrapolation} from './single-point-extrapolation';
import {twoPointsExtrapolation} from './two-points-extrapolation';
import {combine} from './utils/extrapolation-combination.util';
import {
    Extrapolation,
    ParameterizedExtrapolation,
    SamplePointOrExtrapolation,
    SamplePointOrInternalExtrapolation
} from './global-types';
import {isSamplePoint, SamplePoint} from './sample-values';
import {memoizeExtrapolation, unmemoizeExtrapolation} from "./memoized-extrapolation";
import {memoizeFnArgs} from "./common/memoize-with-function-args-support.util";
import {defaultsDeep} from "lodash-es";
import {constantExtrapolation} from "./constant-extrapolation";
import {asDiscrete} from "./discrete-extrapolation";

export const extrapolishedManual = memoizeFnArgs(_extrapolishedManual);

function _extrapolishedManual(point: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(point: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, point: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, point: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(point: SamplePointOrExtrapolation, slope: number, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(point: SamplePointOrExtrapolation, slope: number, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, point: SamplePointOrExtrapolation, slope: number, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, point: SamplePointOrExtrapolation, slope: number, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, point4: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, point4: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, point4: SamplePointOrExtrapolation, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, point4: SamplePointOrExtrapolation, end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(points: SamplePointOrExtrapolation[], options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(points: SamplePointOrExtrapolation[], end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, points: SamplePointOrExtrapolation[], options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, points: SamplePointOrExtrapolation[], end: RangeEndDefinition, options?: Partial<ExtrapolishedOptions>): ManualExtrapolation;
function _extrapolishedManual(...args: Array<number | SamplePointOrExtrapolation | SamplePointOrExtrapolation[] | RangeStartDefinition | RangeEndDefinition | Partial<ExtrapolishedOptions> | undefined>): ManualExtrapolation
{
    return _internalExtrapolishedManual(...args);
}

export function _internalExtrapolishedManual(...args: Array<number | SamplePointOrExtrapolation | SamplePointOrExtrapolation[] | RangeStartDefinition | RangeEndDefinition | Partial<ExtrapolishedOptions> | undefined>): InternalParameterizedExtrapolation
{
    let result: InternalParameterizedExtrapolation;
    const {start, pointsOrExtrapolations, end, slope, userOptions} = readArgumentsLevel1(...args);
    unmemoizeExtrapolations(pointsOrExtrapolations);
    sortPointsOrExtrapolations(pointsOrExtrapolations);

    const options = defaultsDeep(userOptions, DEFAULT.options);

    if (pointsOrExtrapolations.length === 1) {
        const pointOrExtrapolation = pointsOrExtrapolations[0];
        if (isExtrapolation(pointOrExtrapolation)) {
            result = pointOrExtrapolation;
        }
        else {
            const rangeDefinition = defaultsDeep({start, end}, DEFAULT.singlePointRangeDefinition);

            result = slope === undefined && options.singlePointExtrapolationMode === 'constant'
                ? constantExtrapolation({point: pointOrExtrapolation})
                : singlePointExtrapolation({point: pointOrExtrapolation, slope, rangeDefinition});
        }
    }
    else {
        const rangeDefinition = defaultsDeep({start, end}, DEFAULT.rangeDefinition);

        const extrapolations: InternalExtrapolation[] = pointsOrExtrapolations.flatMap((it, i: number) => {
            //if last element
            if (i === pointsOrExtrapolations.length - 1) {
                return isExtrapolation(it) ? it : [];
            }

            const nextPoint: SamplePoint = readNextPoint(pointsOrExtrapolations, i);
            if (isExtrapolation(it)) {
                const extrapolations: InternalExtrapolation[] = [it];
                if (it.end[0] < nextPoint[0]) {
                    extrapolations.push(twoPointsExtrapolation({
                        point0: it.end,
                        point1: nextPoint,
                        rangeDefinition
                    }));
                }

                return extrapolations;
            }
            else {
                return twoPointsExtrapolation({point0: it, point1: nextPoint, rangeDefinition});
            }
        });

        result = combine(...extrapolations);
    }

    if (options.discreteValues.length > 0) result = asDiscrete(result, options.discreteValues);

    return memoizeExtrapolation(result);
}

//region Utils
function readNextPoint(pointsOrExtrapolations: SamplePointOrInternalExtrapolation[], currentIndex: number): SamplePoint
{
    const nextPointOrExtrapolation = pointsOrExtrapolations[currentIndex + 1];
    return isExtrapolation(nextPointOrExtrapolation) ? nextPointOrExtrapolation.start : nextPointOrExtrapolation;
}

function readArgumentsLevel1(...args: Array<number | SamplePointOrExtrapolation | SamplePointOrExtrapolation[] | RangeStartDefinition | RangeEndDefinition | Partial<ExtrapolishedOptions> | undefined>)
{
    let start: RangeStartDefinition | undefined;
    let pointsOrExtrapolations: SamplePointOrInternalExtrapolation[] = [];
    let end: RangeEndDefinition | undefined;
    let slope: number | undefined;
    let userOptions: Partial<ExtrapolishedOptions> | undefined;
    args.forEach(value => {
        if (typeof value === 'string') {
            if (value === 'start-open' || value === 'start-closed') {
                start = value;
            }
            else {
                end = value;
            }
        }
        else if (typeof value === 'number') {
            slope = value;
        }
        else if (value !== undefined) {
            if (isSamplePoint(value) || isExtrapolation(value)) {
                pointsOrExtrapolations.push(value as SamplePointOrInternalExtrapolation);
            }
            else if (Array.isArray(value)) {
                pointsOrExtrapolations.push(...(value as SamplePointOrInternalExtrapolation[]));
            }
            else {
                userOptions = value;
            }
        }
    });

    return {start, pointsOrExtrapolations, end, slope, userOptions};
}

function sortPointsOrExtrapolations(pointsOrExtrapolations: SamplePointOrInternalExtrapolation[])
{
    pointsOrExtrapolations.sort((a, b) => getFirstX(a) - getFirstX(b));
}

function unmemoizeExtrapolations(pointsOrExtrapolations: SamplePointOrInternalExtrapolation[])
{
    pointsOrExtrapolations.forEach((it, i) => {
        pointsOrExtrapolations[i] = isExtrapolation(it) ? unmemoizeExtrapolation(it) : it
    });
}

const getFirstX = (obj: SamplePointOrInternalExtrapolation) => isExtrapolation(obj) ? obj.start[0] : obj[0];

function isExtrapolation(value: SamplePointOrExtrapolation | Partial<ExtrapolishedOptions> | any[]): value is InternalExtrapolation | Extrapolation
{
    return typeof value === 'function';
}

//endregion

//region Types
export type ManualExtrapolation = ParameterizedExtrapolation;
//endregion
