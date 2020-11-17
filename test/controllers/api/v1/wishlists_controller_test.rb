# frozen_string_literal: true

require "test_helper"

class Api::V1::WishlistsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_wishlists_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_wishlists_create_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_wishlists_show_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_wishlists_destroy_url
    assert_response :success
  end
end
