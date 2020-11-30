export interface WishlistItemT {
  id: number,
  wishlistId: number,
  item: string,
  checked?: boolean
};

export interface WishlistT {
  id: number,
  userId: number,
  items: WishlistItemT[]
};