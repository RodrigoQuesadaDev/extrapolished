import {InternalExtrapolation, InternalParameterizedExtrapolation} from './extrapolation';
import {RangeEndDefinition, RangeStartDefinition} from './range-definition';
import {DEFAULT} from './default-values';
import {singlePointExtrapolation} from './single-point-extrapolation';
import {twoPointsExtrapolation} from './two-points-extrapolation';
import {combine} from './utils/extrapolation-combination.util';
import {
    ParameterizedExtrapolation,
    SamplePointOrExtrapolation,
    SamplePointOrInternalExtrapolation
} from './global-types';
import {isSamplePoint, SamplePoint} from './sample-values';
import {memoizeExtrapolation, unmemoizeExtrapolation} from "./memoization";
import {memoizeFnArgs} from "./common/memoize-with-function-args-support.util";

export const extrapolishedManual = memoizeFnArgs(_extrapolishedManual);

function _extrapolishedManual(point: SamplePointOrExtrapolation, slope?: number): ManualExtrapolation;
function _extrapolishedManual(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, end?: RangeEndDefinition): ManualExtrapolation;
function _extrapolishedManual(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, end?: RangeEndDefinition): ManualExtrapolation;
function _extrapolishedManual(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, end?: RangeEndDefinition): ManualExtrapolation;
function _extrapolishedManual(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, point4: SamplePointOrExtrapolation, end?: RangeEndDefinition): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, end?: RangeEndDefinition): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, end?: RangeEndDefinition): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, end?: RangeEndDefinition): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, point4: SamplePointOrExtrapolation, end?: RangeEndDefinition): ManualExtrapolation;
function _extrapolishedManual(points: SamplePointOrExtrapolation[], end?: RangeEndDefinition): ManualExtrapolation;
function _extrapolishedManual(start: RangeStartDefinition, points: SamplePointOrExtrapolation[], end?: RangeEndDefinition): ManualExtrapolation;
function _extrapolishedManual(...args: Array<number | SamplePointOrExtrapolation | SamplePointOrExtrapolation[] | RangeStartDefinition | RangeEndDefinition | undefined>): ManualExtrapolation
{
    return _internalExtrapolishedManual(...args);
}

export function _internalExtrapolishedManual(...args: Array<number | SamplePointOrExtrapolation | SamplePointOrExtrapolation[] | RangeStartDefinition | RangeEndDefinition | undefined>): InternalParameterizedExtrapolation
{
    let result: InternalParameterizedExtrapolation;
    const {start, pointsOrExtrapolations, end, slope} = readArgumentsLevel1(...args);
    unmemoizeExtrapolations(pointsOrExtrapolations);
    sortPointsOrExtrapolations(pointsOrExtrapolations);

    const rangeDefinition = {
        start: start || DEFAULT.rangeDefinition.start,
        end: end || DEFAULT.rangeDefinition.end
    };

    if (pointsOrExtrapolations.length === 1) {
        const pointOrExtrapolation = pointsOrExtrapolations[0];
        if (isExtrapolation(pointOrExtrapolation)) {
            result = pointOrExtrapolation;
        }
        else {
            result = singlePointExtrapolation({point: pointOrExtrapolation, slope});
        }
    }
    else {
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
    return memoizeExtrapolation(result);
}

//region Utils
function readNextPoint(pointsOrExtrapolations: SamplePointOrInternalExtrapolation[], currentIndex: number): SamplePoint
{
    const nextPointOrExtrapolation = pointsOrExtrapolations[currentIndex + 1];
    return isExtrapolation(nextPointOrExtrapolation) ? nextPointOrExtrapolation.start : nextPointOrExtrapolation;
}

function readArgumentsLevel1(...args: Array<number | SamplePointOrExtrapolation | SamplePointOrExtrapolation[] | RangeStartDefinition | RangeEndDefinition | undefined>)
{
    let start: RangeStartDefinition | undefined;
    let pointsOrExtrapolations: SamplePointOrInternalExtrapolation[] = [];
    let end: RangeEndDefinition | undefined;
    let slope: number | undefined;
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
            if (Array.isArray(value) && !isSamplePoint(value)) {
                pointsOrExtrapolations.push(...(value as SamplePointOrInternalExtrapolation[]));
            }
            else {
                pointsOrExtrapolations.push(value as SamplePointOrInternalExtrapolation);
            }
        }
    });

    return {start, pointsOrExtrapolations, end, slope};
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

function isExtrapolation(pointOrExtrapolation: SamplePointOrExtrapolation): pointOrExtrapolation is InternalExtrapolation
{
    return typeof pointOrExtrapolation === 'function';
}

//endregion

//region Types
export type ManualExtrapolation = ParameterizedExtrapolation;
//endregion
