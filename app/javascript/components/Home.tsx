import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Typography, Divider, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

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
      <div>
        <Typography variant="h4" color="textPrimary" align="center">
          Hello and welcome to
      </Typography>
        <Typography variant="h3" color="textPrimary" align="center">
          Presented With Context!
      </Typography>
        <Typography variant="subtitle1" color="textSecondary" align="center">
          This is hilariously under construction!
      </Typography>
        <Divider />
        <WishlistDisplay
          wishlist={wishlists[0]}
        />
        <Divider />
        <Button variant="contained" color="secondary" component={RouterLink} to="/wishlist/new">
          Add to your wishlist!
      </Button>
      </div>
    )
  }
}
