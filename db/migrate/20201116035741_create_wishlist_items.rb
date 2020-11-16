class CreateWishlistItems < ActiveRecord::Migration[6.0]
  def change
    create_table :wishlist_items do |t|
      t.belongs_to :wishlist, null: false, foreign_key: true
      t.text :item, null: false
      t.boolean :checked, default: false

      t.timestamps
    end
  end
end
