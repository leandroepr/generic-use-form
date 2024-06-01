export type NestedKeyOf<T> =
  T extends object
  ? {
    [K in keyof T]-?:
    K extends string
    ? T[K] extends infer R
    ? R extends object
    ? R extends Array<any>
    ? K
    : `${K & string}${T[K] extends Required<T>[K] ? '' : '?'}${"."}${NestedKeyOf<R>}` | K
    : K
    : never
    : never
  }[keyof T]
  : '';

export type NestedTypeOf<T, P extends NestedKeyOf<T>> =
  P extends keyof T
  ? T[P]
  : P extends `${infer K}?.${infer Rest}`
  ? K extends keyof T
  ? Rest extends NestedKeyOf<NonNullable<T[K]>>
  ? NestedTypeOf<NonNullable<T[K]>, Rest> | undefined
  : never
  : never
  : P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
  ? Rest extends NestedKeyOf<T[K]>
  ? NestedTypeOf<T[K], Rest>
  : never
  : never
  : never;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>

export type ErrorMap<T> = {
  [K in NestedKeyOf<T>]?: string
}
