import React, { ChangeEvent, ReactElement, useState } from 'react';
import _ from 'lodash';

import { WishlistT } from '../shared/interfaces/wishlist.interface'

const WishlistDisplay: React.FC<{ wishlist: WishlistT }> = (props) => {
  const [wishlistState, setWishlistState] = useState(props.wishlist.items)

  const toggleCheckbox = (event: ChangeEvent) => {
    const newWishlistState = _.cloneDeep(wishlistState)
    const id = parseInt(event.target.id)
    newWishlistState[id].checked = !wishlistState[id].checked
    setWishlistState(newWishlistState)
  }

  const renderedItems: ReactElement[] = wishlistState.map((item, index) => {
    return (
      <div key={item.item}>
        <label>
          <input
            type="checkbox"
            id={`${index}`}
            checked={item.checked}
            onChange={toggleCheckbox}
          />
          {item.item}
        </label>
      </div>
    )
  });

  return (
    <div>
      <p>Hello, I'm a Wishlist Display!</p>
      {renderedItems}
    </div>
  );
}

export default WishlistDisplay;