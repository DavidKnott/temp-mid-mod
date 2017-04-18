require "rails_helper"

describe "User can create a link", :type => :feature, :js => true do
  it "When a user enters valid information a link is created" do
    user = create(:user)
    link1 = create(:link, url: "https://www.google.com", title: "Google", read: false)
    link2 = create(:link, url: "https://www.googles.com", title: "Googles", read: false)

    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

    visit links_path

    fill_in :link_title, :with => link2.title
    fill_in :link_url, :with => link2.url

    click_link_or_button "add-link"

    expect(current_path).to eq links_path
    expect(Link.count).to eq 2

    within(".links") do
      expect(page).to have_content link2.title
      expect(page).to have_content link2.url
      expect(page).to have_content "Read?: false"
      expect(page).to have_link "Mark as Read"
      expect(page).to have_link "Edit"
    end
  end
end
