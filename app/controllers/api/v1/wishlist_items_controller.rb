# frozen_string_literal: true
require 'pry'

class Api::V1::WishlistItemsController < ApplicationController
  before_action :wishlist
  before_action :wishlist_item, only: %i[show update destroy]

  def index
    @all_items = @wishlist.wishlist_items.order(created_at: :asc)
    render json: @all_items
  end

  def create
    binding.pry

    @wishlist_item = @wishlist.wishlist_items.build(wishlist_item_params)
    @wishlist_item.save!
    if @wishlist_item
      render json: @wishlist_item
    else
      render json: @wishlist_item.errors
    end
  end

  def show
    render json: @wishlist_item
  end

  def update
    @wishlist_item.update(wishlist_item_params)
    @wishlist_item.save!
    if @wishlist_item
      render json: @wishlist_item
    else
      render json: @wishlist_item.errors
    end
  end

  def destroy
    @wishlist_item&.destroy
    render json: { message: "Wishlist item deleted!" }
  end

  private

  def wishlist_item_params
    params.fetch(:wishlist_item, {}).permit(:item, :checked, :id, :wishlist_id)
  end

  def wishlist
    @wishlist ||= Wishlist.find(params[:wishlist_id])
  end

  def wishlist_item
    @wishlist_item ||= WishlistItem.find(params[:id])
  end

  def render_own_wishlist_item
    render json: @wishlist_item.except(:checked)
  end
end
