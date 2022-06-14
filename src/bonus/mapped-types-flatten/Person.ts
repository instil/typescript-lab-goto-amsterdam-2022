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

// TODO: Create a type that will transform an input type into a flatten version
//       Assume the shape will only be strings, numbers or nested objects
//       For person, the result should be
//       {
//         name: string;
//         age: number;
//         addressHouseNumber: number;
//         addressStreet: string;
//         addressCityName: string;
//         addressCityCountryCode: string;
//       }

// Note: All of this is in type space, the compiler is doing the work
//       Study and make use of the types in the Utility Types file
//       Do not worry if you do not finish this exercise. Getting some steps working is very good.
//       The steps to one solution are below. There are tests to help you see if your type is correct.
//       Uncomment the tests are you come to them.

// TODO: Step 1 - Create a type which get all the string type keys of another type
//       Hint - Use Extract
// Should Equate to: "a" | "b"
// type TestStringKeysOf = StringKeysOf<{ a: number, b: boolean, [_: number]: Date }>
// expectTypeOf<TestStringKeysOf>("a");
// expectTypeOf<TestStringKeysOf>("b");
// expectTypesNotEqual<TestStringKeysOf, "c">("passed");



// TODO: Step 2 - Create a type which will concatenate a parent key and child key
//                The child key should be captilized, if the parent key is not empty
//       Hint - Use a conditional and the Capitalize Utility
// expectTypeOf<AddPrefixToMemberName<"first", "second">>("firstSecond");
// expectTypeOf<AddPrefixToMemberName<"aaa", "bbbCcc">>("aaaBbbCcc");



// TODO: Step 3 - Create a type which copies a type but adds a prefix to each member
//       Hint - This will be a mapped type.
//       Hint - Use the StringKeysOf and AddPrefixToMemberName you created above
// expectTypesEqual<
//     AddPrefixToAllMembers<{ aaa: string, bbb: number, ccc: boolean }, "ddd">,
//     { dddAaa: string, dddBbb: number, dddCcc: boolean }
// >("passed");



// TODO: Step 4 - Create a type which picks all properties which are NOT nested object types
//       Hint - This will be a mapped type that maps keys that are objects to "never" and then omits them
//       Hint - Use the provided OmitNeverProps utility and the StringKeysOf you created above
// expectTypesEqual<
//     NonNestedProps<Person>,
//     { name: string, age: number }
// >("passed");



// TODO: Step 5 - Create a recursive type that will Flatten a type demonstrated in the test below
//       Hint - You may need more than one type
//       Hint - This will be an intersection of the NonNestProps and a new type that recursively calls Flatten
//       Hint - You may need to use the provided UnionToIntersection and ValuesOf utility types

// expectTypesEqual<
//     Flatten<Person>,
//     {
//         name: string;
//         age: number;
//         addressHouseNumber: number;
//         addressStreet: string;
//         addressCityName: string;
//         addressCityCountryCode: string;
//     }
// >("passed")

