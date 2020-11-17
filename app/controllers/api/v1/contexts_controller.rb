class Api::V1::ContextsController < ApplicationController
  before_action :context, only: %i[show update destroy]

  def index
    @all_user_contexts = current_user.contexts.order(created_at: :asc)
    render json: @all_user_contexts
  end

  def create
    if current_user.contexts.count.positive?
      render json: { message: "User already has a context!" }
      return
    end

    @context = current_user.contexts.build
    @context.save!
    if @context
      render json: @context
    else
      render json: @context.errors
    end
  end

  def show
    render json: @context
  end

  def update
    @context.update(context_params)
    @context.save!
    if @context
      render json: @context
    else
      render json: @context.errors
    end
  end

  def destroy
    @context&.destroy
    render json: { message: "Context deleted!" }
  end

  private

  def context_params
    params.permit(:free_form, :do_not_want)
  end

  def context
    @context ||= Context.find(params[:id])
  end
end
