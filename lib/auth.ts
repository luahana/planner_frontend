export interface Auth {
  user_id: string
  email: string
  name: string
  isAdmin: boolean
}

export const defaultAuth: Auth = {
  user_id: '',
  email: '',
  name: '',
  isAdmin: false,
}
