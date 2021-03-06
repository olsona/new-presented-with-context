# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # I do not intend right now for users to have multiples of these,
  # but I don't want to make things harder down the road.
  has_many :wishlists, dependent: :destroy
  has_many :contexts, dependent: :destroy
end
