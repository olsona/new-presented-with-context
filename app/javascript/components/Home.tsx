import React, { useEffect, useState } from 'react'
// import {Link} from 'react-router-dom'
import axios from 'axios'

import WishlistDisplay from './WishlistDisplay'
import { WishlistT } from '../shared/interfaces/wishlist.interface'

const LoadingPage = (
  <div>
    Loading...
  </div>
)

export default () => {
  const [wishlists, setWishlists] = useState<WishlistT[]>([])

  useEffect(() => {
    fetchWishlist();
  }, [])

  const fetchWishlist = async () => {
    try {
      const indexResponse = await axios.get("/api/v1/wishlists");
      setWishlists(indexResponse.data)
    } catch (e) {
      console.log(e)
    }
  }

  if (wishlists.length === 0) {
    return LoadingPage
  } else {
    return (
      <WishlistDisplay
        wishlist={wishlists[0]}
      />
    )
  }
}
