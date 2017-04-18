class Link < ActiveRecord::Base
  belongs_to :user

  def self.get_top_link()
    self.get_top_10().first
  end

  def self.get_top_10()
    where(read: true).group(:url).count.sort_by {|k, v| -v}.to_h.keys[0,10]
  end

  def self.top_links_for(current_user)
    hot_links = self.get_top_10
    top_link = hot_links.shift
    links = current_user.reload.links.reverse.map do |link|
      a = [0, link] 
      a = [2, link] if link.url == top_link
      a = [1, link] if hot_links.include?(link.url)
      a
    end
    order_by_popularity(links)
  end

  def self.order_by_popularity(links)
    links.sort_by {|k, v| v}
  end
end
