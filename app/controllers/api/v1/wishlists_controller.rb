class Api::V1::WishlistsController < ApplicationController
  protect_from_forgery with: :null_session

  before_action :wishlist, only: %i[show destroy]

  def index
    @all_wishlists = Wishlist.all.order(created_at: :desc)
    render json: @all_wishlists
  end

  def create
    params = wishlist_creation_params
    user = User.find(params.user_id)
    @wishlist = user.wishlists.build
    user.save!
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
    render json: { message: 'Wishlist deleted!' }
  end

  private

  def wishlist_creation_params
    params.permit(:user_id)
  end

  def wishlist
    @wishlist ||= Wishlist.find(params[:id])
  end
end
