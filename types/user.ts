export interface IUser {
  _id: string
  name: string
  password: string
  email: string
  image: string
  role: string
  order: { [index: string]: string }
  exhibition: { [index: string]: string }
}
