# frozen_string_literal: true

class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token ## DO NOT LAUNCH

  before_action :authenticate_user!
end
