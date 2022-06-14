import {OmitNeverProps, UnionToIntersection, ValuesOf} from "./UtilityTypes";
import {expectTypeOf, expectTypesEqual, expectTypesNotEqual} from "./TypeAssertions";

export interface Person {
    name: string;
    age: number;
    address: {
        houseNumber: number;
        street: string;
        city: {
            name: string;
            countryCode: string;
        };
    }
}

// TODO: Step 1 - Create a type which get all the string type keys of another type
//       Hint - Use Extract
type StringKeysOf<T> = Extract<keyof T, string>;

// Should Equate to: "a" | "b"
type TestStringKeysOf = StringKeysOf<{ a: number, b: boolean, [_: number]: Date }>
expectTypeOf<TestStringKeysOf>("a");
expectTypeOf<TestStringKeysOf>("b");
expectTypesNotEqual<TestStringKeysOf, "c">("passed");



// TODO: Step 2 - Create a type which will concatenate a parent key and child key
//                The child key should be captilized, if the parent key is not empty
//       Hint - Use a conditional and the Capitalize Utility
type AddPrefixToMemberName<Prefix extends string, Key extends string> =
    Prefix extends "" ? Key : `${Prefix}${Capitalize<Key>}`;

expectTypeOf<AddPrefixToMemberName<"first", "second">>("firstSecond");
expectTypeOf<AddPrefixToMemberName<"aaa", "bbbCcc">>("aaaBbbCcc");
expectTypeOf<AddPrefixToMemberName<"", "second">>("second");



// TODO: Step 3 - Create a type which copies a type but adds a prefix to each member
//       Hint - This will be a mapped type.
//       Hint - Use the StringKeysOf and AddPrefixToMemberName you created above
type AddPrefixToAllMembers<T, Prefix extends string = ""> = {
    [K in StringKeysOf<T> as AddPrefixToMemberName<Prefix, K>]: T[K]
};

expectTypesEqual<AddPrefixToAllMembers<{ aaa: string, bbb: number, ccc: boolean }, "ddd">,
    { dddAaa: string, dddBbb: number, dddCcc: boolean }>("passed");



// TODO: Step 4 - Create a type which picks all properties which are NOT nested object types
//       Hint - This will be a mapped type that maps keys that are objects to "never" and then omits them
//       Hint - Use the provided OmitNeverProps utility and the StringKeysOf you created above
type NonNestedProps<T> = OmitNeverProps<{
    [K in StringKeysOf<T>]: T[K] extends object
        ? never
        : T[K]
}>;
expectTypesEqual<NonNestedProps<Person>,
    { name: string, age: number }>("passed");



// TODO: Step 5 - Create a recursive type that will Flatten a type demonstrated in the test below
//       Hint - You may need more than one type
//       Hint - This will be an intersection of the NonNestProps and a new type that recursively calls Flatten
//       Hint - You may need to use the provided UnionToIntersection and ValuesOf utility types
type NestedProps<T> =  {
    [K in StringKeysOf<T>]: T[K] extends object
        ? Flatten<T[K], K>
        : never
};

export type Flatten<T, Prefix extends string = ""> =
    AddPrefixToAllMembers<NonNestedProps<T>, Prefix> &
    AddPrefixToAllMembers<UnionToIntersection<ValuesOf<NestedProps<T>>>, Prefix>


expectTypesEqual<Flatten<Person>,
    {
        name: string;
        age: number;
        addressHouseNumber: number;
        addressStreet: string;
        addressCityName: string;
        addressCityCountryCode: string;
    }>("passed")

