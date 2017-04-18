require "rails_helper"

describe "User read a link", :type => :feature, :js => true do
  it "User can filter for read links" do
    user = create(:user)
    link1 = create(:link, url: "https://www.google.com", title: "Google", read: true)
    link2 = create(:link, url: "https://www.googles.com", title: "Paul", read: false)
    user.links << link1
    user.links << link2

    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

    visit links_path

    within(".links") do
      expect(page).to have_content link1.title
      expect(page).to have_content link1.url
      expect(page).to have_content link2.title
      expect(page).to have_content link2.url
    end

    click_link_or_button "Only Read Links"

    expect(current_path).to eq links_path

    within(".links") do
      expect(page).to_not have_content link2.title
      expect(page).to_not have_content link2.url
    end
  end

  it "User can filter for unread links" do
    user = create(:user)
    link1 = create(:link, url: "https://www.sup.com", title: "SUP", read: true)
    link2 = create(:link, url: "https://www.googles.com", title: "Paul", read: false)
    user.links << link1
    user.links << link2

    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

    visit links_path

    within(".links") do
      expect(page).to have_content link1.title
      expect(page).to have_content link1.url
      expect(page).to have_content link2.title
      expect(page).to have_content link2.url
    end

    click_link_or_button "Only Unread Links"

    expect(current_path).to eq links_path

    within(".links") do
      expect(page).to_not have_content link1.title
      expect(page).to_not have_content link1.url
    end
  end
end
