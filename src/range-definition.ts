export type RangeStartDefinition = 'start-open' | 'start-closed';
export type RangeEndDefinition = 'end-open' | 'end-closed';

export type RangeDefinition = { start: RangeStartDefinition, end: RangeEndDefinition };
