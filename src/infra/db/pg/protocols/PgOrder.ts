export type TOrder = {
  [P in keyof {ASC?: string, DESC?: string}]: P
}[keyof {ASC?: string, DESC?: string}]
