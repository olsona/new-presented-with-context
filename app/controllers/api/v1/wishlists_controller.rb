class Api::V1::WishlistsController < ApplicationController
  before_action :wishlist, only: %i[show destroy]

  def index
    @all_user_wishlists = current_user.wishlists.order(created_at: :asc)
    render json: @all_user_wishlists
  end

  def create
    if current_user.wishlists.count.positive?
      render json: {message: "User already has a wishlist!"}
      return
    end

    @wishlist = current_user.wishlists.build
    @wishlist.save!
    if @wishlist
      render json: @wishlist
    else
      render json: @wishlist.errors
    end
  end

  def show
    render json: @wishlist
  end

  def destroy
    @wishlist&.destroy
    render json: {message: "Wishlist deleted!"}
  end

  private

  def wishlist
    @wishlist ||= Wishlist.find(params[:id])
  end
end
