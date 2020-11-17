# frozen_string_literal: true

require "test_helper"

class Api::V1::ContextsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_contexts_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_contexts_create_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_contexts_show_url
    assert_response :success
  end

  test "should get update" do
    get api_v1_contexts_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_contexts_destroy_url
    assert_response :success
  end
end
