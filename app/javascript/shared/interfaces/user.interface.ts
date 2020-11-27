import { ContextT } from '../interfaces/context.interface'
import { WishlistT } from '../interfaces/wishlist.interface'

export interface User {
  id: number,
  email: string,
  name: string,
  contexts: ContextT[],
  wishlists: WishlistT[]
}