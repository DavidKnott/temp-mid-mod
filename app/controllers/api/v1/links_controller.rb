class Api::V1::LinksController < ApplicationController

  def update
    link = Link.find(params[:id])
    link.update_attributes(link_params)
    if link.save
      head 200
    end
  end

  def create
    link = current_user.links.create(link_params)
    if link.save
      render partial: 'links/link', locals: {link: link, popular: ""}, layout: false, status: 201
    end
  end

  private


  def link_params
    params.require(:link).permit(:read, :title, :url)
  end
end
