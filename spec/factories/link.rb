FactoryGirl.define do
  factory :link do
    title "Google"
    sequence :url do |n| 
      "https://www.google#{n}.com/"
    end
    read false
  end
end