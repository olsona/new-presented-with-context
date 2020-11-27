import React from 'react'
// import {Link} from 'react-router-dom'

import WishlistDisplay from './WishlistDisplay'
import { WishlistT } from '../shared/interfaces/wishlist.interface'

const testWishlist: WishlistT = {
  id: 1,
  userId: 1,
  items: [
    {
      id: 1,
      wishlistId: 1,
      item: 'A pony',
      checked: false,
    },
    {
      id: 2,
      wishlistId: 1,
      item: 'Watercolor paints',
      checked: true,
    },
  ],
}

export default () => (
  <div className={
    'vw-100 vh-100 primary-color d-flex' +
    'align-items-center justify-content-center'
  }>
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <WishlistDisplay
          wishlist={testWishlist}
        />
      </div>
    </div>
  </div>
)
