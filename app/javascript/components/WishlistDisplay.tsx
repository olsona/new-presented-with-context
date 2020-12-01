import React, { ChangeEvent, FormEvent, MouseEvent, ReactElement, useState } from 'react'
import _ from 'lodash'
import axios from 'axios'
import { List, ListItem, ListItemText, ListItemIcon, Checkbox, ListItemSecondaryAction, IconButton, Grid, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { WishlistT, WishlistItemT } from '../shared/interfaces/wishlist.interface'

const WishlistDisplay: React.FC<{ wishlist: WishlistT }> = (props) => {
  const [wishlistState, setWishlistState] = useState(props.wishlist.items)
  const [newItem, setNewItem] = useState<string>('')

  const toggleCheckbox = async (index: number) => {
    const newWishlistState = _.cloneDeep(wishlistState)
    const updatedWishlistItem = newWishlistState[index]
    updatedWishlistItem.checked = !wishlistState[index].checked
    const url = `/api/v1/wishlists/${props.wishlist.id}/wishlist_items/${wishlistState[index].id}`
    const body = { "item": updatedWishlistItem.item, "checked": updatedWishlistItem.checked }
    const toggleResponse = await axios.patch(url, body)
    newWishlistState[index] = updatedWishlistItem
    setWishlistState(newWishlistState)
    console.log("Toggle response", toggleResponse)
  }

  const addNewItemToWishlist = async (event: FormEvent) => {
    event.preventDefault()
    const url = `/api/v1/wishlists/${props.wishlist.id}/wishlist_items`
    const body = { "item": newItem }
    const addResponse = await axios.post(url, body)
    setNewItem('')
    console.log("Add response", addResponse)
  }

  const deleteWishlistItem = async (index: number) => {
    const itemToDelete = wishlistState[index]
    const url = `/api/v1/wishlists/${props.wishlist.id}/wishlist_items/${itemToDelete.id}`
    const deleteResponse = await axios.delete(url)
    const newWishlistState = wishlistState.splice(index, 1)
    setWishlistState(newWishlistState)
    console.log("Delete response", deleteResponse)
  }

  const listDisplay = (
    <List>
      {wishlistState.map((wishlistItem: WishlistItemT, index: number) => {
        return (
          <ListItem key={index}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={wishlistItem.checked}
                onChange={() => toggleCheckbox(index)}
              />
            </ListItemIcon>
            <ListItemText primary={wishlistItem.item} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => deleteWishlistItem(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )


  const newItemForm = (
    <form onSubmit={addNewItemToWishlist}>
      <label>
        Enter the item you want to add to your wishlist:
          <input type="text" id="new-item-input" onChange={e => setNewItem(e.target.value)} />
      </label>
      <input type="submit" value="Add!" />
    </form>
  )

  return (
    <div>
      <p>Hello, I'm a Wishlist Display!</p>
      {listDisplay}
      {newItemForm}
    </div>
  )
}

export default WishlistDisplay;