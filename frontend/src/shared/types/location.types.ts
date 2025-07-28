export interface Region {
  id: number
  name: string
  code: string
  communes: Commune[]
}

export interface Commune {
  id: number
  name: string
  code: string
}

export interface RegionsResponse {
  data: Region[]
}
