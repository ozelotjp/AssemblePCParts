export interface IGetAmazonDetailsFunc {
  items: string[]
}

export interface IGetAmazonDetails {
  data: Result[]
}

interface Result {
  id: string
  title: string
  price: number
}
