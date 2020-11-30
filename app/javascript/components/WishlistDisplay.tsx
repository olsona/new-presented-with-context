import React, { ChangeEvent, FormEvent, MouseEvent, ReactElement, useState } from 'react'
import _ from 'lodash'
import axios from 'axios'

import { WishlistT } from '../shared/interfaces/wishlist.interface'

const WishlistDisplay: React.FC<{ wishlist: WishlistT }> = (props) => {
  const [wishlistState, setWishlistState] = useState(props.wishlist.items)
  const [newItem, setNewItem] = useState<string>('')

  const toggleCheckbox = async (event: ChangeEvent) => {
    event.preventDefault()
    const index = parseInt(event.target.id)
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

  const renderedItems: ReactElement[] = wishlistState.map((item, index) => {
    return (
      <div key={item.item}>
        <label>
          {item.checked !== null && <input
            type="checkbox"
            id={`${index}`}
            checked={item.checked}
            onChange={toggleCheckbox}
          />}
          {item.item}
        </label>
      </div>
    )
  })

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
      {renderedItems}
      {newItemForm}
    </div>
  )
}

export default WishlistDisplay;