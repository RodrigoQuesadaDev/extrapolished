import {InternalExtrapolation, InternalParameterizedExtrapolation} from './extrapolation';
import {RangeEndDefinition, RangeStartDefinition} from './range-definition';
import {DEFAULT} from './default-values';
import {singlePointExtrapolation} from './single-point-extrapolation';
import {twoPointsExtrapolation} from './two-points-extrapolation';
import {combine} from './extrapolation-combination';
import {
    ParameterizedExtrapolation,
    SamplePointOrExtrapolation,
    SamplePointOrInternalExtrapolation
} from './global-types';
import {isSamplePoint, SamplePoint} from './sample-point';
import {useMemo} from "react";
import flatMapDeep from 'lodash/flatMapDeep';
import {memoize, unmemoize} from "./memoization";

export function extrapolishedManual(point: SamplePointOrExtrapolation, speedFactor?: number): ManualExtrapolation ;
export function extrapolishedManual(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, end?: RangeEndDefinition): ManualExtrapolation;
export function extrapolishedManual(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, end?: RangeEndDefinition): ManualExtrapolation;
export function extrapolishedManual(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, end?: RangeEndDefinition): ManualExtrapolation;
export function extrapolishedManual(point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, point4: SamplePointOrExtrapolation, end?: RangeEndDefinition): ManualExtrapolation;
export function extrapolishedManual(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, end?: RangeEndDefinition): ManualExtrapolation;
export function extrapolishedManual(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, end?: RangeEndDefinition): ManualExtrapolation;
export function extrapolishedManual(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, end?: RangeEndDefinition): ManualExtrapolation;
export function extrapolishedManual(start: RangeStartDefinition, point0: SamplePointOrExtrapolation, point1: SamplePointOrExtrapolation, point2: SamplePointOrExtrapolation, point3: SamplePointOrExtrapolation, point4: SamplePointOrExtrapolation, end?: RangeEndDefinition): ManualExtrapolation;
export function extrapolishedManual(points: SamplePointOrExtrapolation[], end?: RangeEndDefinition): ManualExtrapolation;
export function extrapolishedManual(start: RangeStartDefinition, points: SamplePointOrExtrapolation[], end?: RangeEndDefinition): ManualExtrapolation;
export function extrapolishedManual(...args: Array<number | SamplePointOrExtrapolation | SamplePointOrExtrapolation[] | RangeStartDefinition | RangeEndDefinition | undefined>): ManualExtrapolation
{
    return _internalExtrapolishedManual(...args);
}

export function _internalExtrapolishedManual(...args: Array<number | SamplePointOrExtrapolation | SamplePointOrExtrapolation[] | RangeStartDefinition | RangeEndDefinition | undefined>): InternalParameterizedExtrapolation
{
    //TODO add back memoization optimization (at this call level)
        let result: InternalParameterizedExtrapolation;
        const {start, pointsOrExtrapolations, end, speedFactor} = readArgumentsLevel1(...args);
        unmemoizeExtrapolations(pointsOrExtrapolations);
        sortPointsOrExtrapolations(pointsOrExtrapolations);

        const rangeDefinition = {
            start: start || DEFAULT.rangeDefinition.start,
            end: end || DEFAULT.rangeDefinition.end
        };

        if (pointsOrExtrapolations.length === 1) {
            const pointOrExtrapolation = pointsOrExtrapolations[0];
            if (isSamplePoint(pointOrExtrapolation)) {
                result = singlePointExtrapolation({point: pointOrExtrapolation, speedFactor});
            }
            else {
                result = pointOrExtrapolation;
            }
        }
        else {
            const extrapolations: InternalExtrapolation[] = pointsOrExtrapolations.flatMap((it, i: number) => {
                //if last element
                if (i === pointsOrExtrapolations.length - 1) {
                    return isSamplePoint(it) ? [] : it;
                }

                const nextPoint: SamplePoint = readNextPoint(pointsOrExtrapolations, i);
                if (isSamplePoint(it)) {
                    return twoPointsExtrapolation({point0: it, point1: nextPoint, rangeDefinition});
                }
                else {
                    const extrapolations: InternalExtrapolation[] = [it];
                    if (it.lastPoint[0] < nextPoint[0]) {
                        extrapolations.push(twoPointsExtrapolation({
                            point0: it.lastPoint,
                            point1: nextPoint,
                            rangeDefinition
                        }));
                    }

                    return extrapolations;
                }
            });

            result = combine(...extrapolations);
        }
        return memoize(result);
}

//region Utils
function readNextPoint(pointsOrExtrapolations: SamplePointOrInternalExtrapolation[], currentIndex: number): SamplePoint
{
    const nextPointOrExtrapolation = pointsOrExtrapolations[currentIndex + 1];
    return isSamplePoint(nextPointOrExtrapolation) ? nextPointOrExtrapolation : nextPointOrExtrapolation.firstPoint;
}

function readArgumentsLevel1(...args: Array<number | SamplePointOrExtrapolation | SamplePointOrExtrapolation[] | RangeStartDefinition | RangeEndDefinition | undefined>)
{
    let start: RangeStartDefinition | undefined;
    let pointsOrExtrapolations: SamplePointOrInternalExtrapolation[] = [];
    let end: RangeEndDefinition | undefined;
    let speedFactor: number | undefined;
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
            speedFactor = value;
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

    return {start, pointsOrExtrapolations, end, speedFactor};
}

function sortPointsOrExtrapolations(pointsOrExtrapolations: SamplePointOrInternalExtrapolation[])
{
    pointsOrExtrapolations.sort((a, b) => getFirstX(a) - getFirstX(b));
}

function unmemoizeExtrapolations(pointsOrExtrapolations: SamplePointOrInternalExtrapolation[])
{
    pointsOrExtrapolations.forEach((it, i) => {
        pointsOrExtrapolations[i] = isSamplePoint(it) ? it : unmemoize(it)
    });
}

const getFirstX = (obj: SamplePointOrInternalExtrapolation) => isSamplePoint(obj) ? obj[0] : obj.firstPoint[0];
//endregion

//region Types
export type ManualExtrapolation = ParameterizedExtrapolation;
//endregion
