require 'rails_helper'

describe "TopLinks API" do
  it "can return a list of the top 10 urls" do 
    create_list(:link, 10, read: true)   
    create_list(:link, 5, url:"https://www.google1.com/", read: true)   
    create(:link, url: "https://www.puppy.com", read: false)

    get "/api/v1/top_links"

    json_urls = JSON.parse(response.body)

    expect(response.status).to eq 200
    expect(json_urls.count).to eq 10
    expect(json_urls.first).to eq "https://www.google1.com/" 
  end
end