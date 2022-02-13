export interface IRegisterUser {
  name: string
  email: string
  password: string
}

export interface ILoginUser {
  email: string
  password: string
}

export interface IAuthUser extends ILoginUser {
  name: string
  _id: string
  token: string
}
