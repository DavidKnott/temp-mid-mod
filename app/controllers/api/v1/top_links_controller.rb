class Api::V1::TopLinksController < ApplicationController

  def index
    render json: Link.get_top_10, status: 200
  end
end