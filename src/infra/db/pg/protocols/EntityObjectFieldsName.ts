export type TEntityObjectFieldsName<T> = {
  [P in keyof T]?:
  T[P] extends Array<infer U> ? Array<TEntityObjectFieldsName<U>> :
    T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<TEntityObjectFieldsName<U>> :
      TEntityObjectFieldsName<T[P]> | T[P]
}
