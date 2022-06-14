export function expectTypeOf<T>(input: T) {
}

// Note - does not work with Union
export function expectTypesEqual<T, N>(input: N extends T ? T extends N ? "passed" : never : never) {
}

export function expectTypesNotEqual<T, N>(input: N extends T ? never : "passed") {
}
