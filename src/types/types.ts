export interface IUser {
  id: string
  email: string
}
export interface CurrentUserInterface {
  id: string
  email: string
  fullName: string
  avatarUrl?: string
  createAt: string
  role: string
}
