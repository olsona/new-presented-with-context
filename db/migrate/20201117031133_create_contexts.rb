# frozen_string_literal: true

class CreateContexts < ActiveRecord::Migration[6.0]
  def change
    create_table :contexts do |t|
      t.text :free_form
      t.text :do_not_want
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
