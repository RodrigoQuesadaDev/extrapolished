export type Labeled<L extends string> = { readonly labels: L[] };

export type LabeledNumber<L extends string> = { readonly value: number } & Labeled<L>;

export type NumberOrLabeledNumber<L extends string> = number | LabeledNumber<L>;
