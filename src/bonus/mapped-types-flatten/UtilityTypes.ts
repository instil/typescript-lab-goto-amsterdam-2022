// Produces a union of the value types of an object
import {expectTypesNotEqual, expectTypeOf, expectTypesEqual} from "./TypeAssertions";

export type ValuesOf<T> = T[keyof T];
// Equates to:  string | number | boolean
type TestValuesOf = ValuesOf<{a: string, b: number, c: boolean}>;
expectTypeOf<TestValuesOf>("abc");
expectTypeOf<TestValuesOf>(123);
expectTypeOf<TestValuesOf>(false);
expectTypesNotEqual<TestValuesOf, Date>("passed");


// Converts a union to an intersection
export type UnionToIntersection<Union extends object | string> =
    ToUnionOfFunctions<Union> extends (_: infer Intersection) => void
        ? Intersection
        : never
// Equates to: string & Date & {a : string}
type TestUnionToIntersection = UnionToIntersection<string | Date | { a: string }>;
expectTypesEqual<TestUnionToIntersection, string & Date & {a: string}>("passed");

// Removes any props that are of type never
export type OmitNeverProps<T> = Omit<T, NeverPropNames<T>>;
// Equates to:  { a: string, d: boolean }
type TestOmitNeverProps = OmitNeverProps<{ a: string, b: never, c: never, d: boolean}>
expectTypesEqual<TestOmitNeverProps, {a: string, d: boolean}>("passed");

// ----- Helpers --------


// Converts a union to a union of functions whose first param is a union member
// This is used to build an intersection of the union
type ToUnionOfFunctions<U> = U extends any ? (_: U) => void : never;

// Produces ((_: string) => void) | ((_: number) => void) | ((_: boolean) => void)
type TestToUnionOfFunctions = ToUnionOfFunctions<string | number | boolean>;


type NeverPropNames<T> = {
    [K in keyof T]: T[K] extends never ? K : never
}[keyof T];

// Produces { a: string, d: boolean }
type TestNeverPropNames = NeverPropNames<{ a: string, b: never, c: never, d: boolean}>
