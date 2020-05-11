import { ICategory } from '../category'

export interface ICompositionData {
  owner: string
  title: string
  parts: {
    [id: string]: {
      category: ICategory
      id: string
      title: string
      price: number
    }
  }
}
