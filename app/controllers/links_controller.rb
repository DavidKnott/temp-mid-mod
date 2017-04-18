class LinksController < ApplicationController
  before_action :require_login

  def index
    @links = Link.top_links_for(current_user)
    @link = current_user.links.new
  end

  def edit
    @link = Link.find(params[:id])
  end

  def update
    link = current_user.links.find(params[:id])
    link.update_attributes(link_params)
    if link.save
      flash[:success] = "You've successfully updated a link!"
      redirect_to links_path
    end
  end

  private

  def link_params
    params.require(:link).permit(:title, :url, :read)
  end

  def require_login
    unless current_user
      flash[:danger] = "Please login first"
      redirect_to root_path
    end
  end
end
