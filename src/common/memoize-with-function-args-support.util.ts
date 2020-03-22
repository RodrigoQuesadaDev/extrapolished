import memoize, {Options} from "fast-memoize";

const FAST_MEMOIZE_OPTIONS: Options<any> = {

    strategy: memoize.strategies.variadic,

    serializer: (args: any[]) => {
        return JSON.stringify(Array.from(args)
            .map(x => typeof x === 'function' ? memoizedId(x) : x)
        )
    }
};

export function memoizeFnArgs<F extends Func>(fn: F): F
{
    return memoize(fn, FAST_MEMOIZE_OPTIONS);
}

//region MemoizeId
let id = 0;

function memoizedId(x: Partial<MemoizedId>): MemoizedId
{
    if (!x.__memoizedId) x.__memoizedId = ++id;

    return {__memoizedId: x.__memoizedId}
}

type MemoizedId = { __memoizedId: number };
//endregion

//region Types
type Func = (...args: any[]) => any;
//endregion
