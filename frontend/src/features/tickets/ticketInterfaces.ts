export interface ITicket {
  product: string
  description: string
}

export interface ISavedTicket extends ITicket {
  _id: string
  status: string
  createdAt: string
}
