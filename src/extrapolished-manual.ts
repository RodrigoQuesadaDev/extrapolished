import {InternalExtrapolation} from './extrapolation';
import {RangeEndDefinition, RangeStartDefinition} from './range-definition';
import {DEFAULT} from './default-values';
import {singlePointExtrapolation} from './single-point-extrapolation';
import {twoPointsExtrapolation} from './two-points-extrapolation';
import {combine} from './extrapolation-combination';
import {SamplePointOrExtrapolation} from './global-types';
import {isSamplePoint, SamplePoint} from './sample-point';

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

export function _internalExtrapolishedManual(...args: Array<number | SamplePointOrExtrapolation | SamplePointOrExtrapolation[] | RangeStartDefinition | RangeEndDefinition | undefined>): ManualExtrapolation
{
    const {start, pointsOrExtrapolations, end, speedFactor} = readArgumentsLevel1(...args);
    sortPointsOrExtrapolations(pointsOrExtrapolations);

    const rangeDefinition = {
        start: start || DEFAULT.rangeDefinition.start,
        end: end || DEFAULT.rangeDefinition.end
    };

    if (pointsOrExtrapolations.length === 1) {
        const pointOrExtrapolation = pointsOrExtrapolations[0];
        if (isSamplePoint(pointOrExtrapolation)) {
            return singlePointExtrapolation({point: pointOrExtrapolation, speedFactor});
        }
        else {
            return pointOrExtrapolation;
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

        return combine(...extrapolations);
    }
}

//region Utils
function readNextPoint(pointsOrExtrapolations: SamplePointOrExtrapolation[], currentIndex: number): SamplePoint
{
    const nextPointOrExtrapolation = pointsOrExtrapolations[currentIndex + 1];
    return isSamplePoint(nextPointOrExtrapolation) ? nextPointOrExtrapolation : nextPointOrExtrapolation.firstPoint;
}

function readArgumentsLevel1(...args: Array<number | SamplePointOrExtrapolation | SamplePointOrExtrapolation[] | RangeStartDefinition | RangeEndDefinition | undefined>)
{
    let start: RangeStartDefinition | undefined;
    let pointsOrExtrapolations: SamplePointOrExtrapolation[] = [];
    let end: RangeEndDefinition | undefined;
    let speedFactor: number | undefined;
    args.forEach(it => {
        if (typeof it === 'string') {
            if (it === 'start-open' || it === 'start-closed') {
                start = it;
            }
            else {
                end = it;
            }
        }
        else if (typeof it === 'number') {
            speedFactor = it;
        }
        else if (it !== undefined) {
            if (Array.isArray(it) && !isSamplePoint(it)) {
                pointsOrExtrapolations.push(...it);
            }
            else {
                pointsOrExtrapolations.push(it);
            }
        }
    });

    return {start, pointsOrExtrapolations, end, speedFactor};
}

function sortPointsOrExtrapolations(pointsOrExtrapolations: SamplePointOrExtrapolation[])
{
    pointsOrExtrapolations.sort((a, b) => getFirstX(a) - getFirstX(b));
}

const getFirstX = (obj: SamplePointOrExtrapolation) => isSamplePoint(obj) ? obj[0] : obj.firstPoint[0];
//endregion

//region Types
export type ManualExtrapolation = (x: number) => number;
//endregion
