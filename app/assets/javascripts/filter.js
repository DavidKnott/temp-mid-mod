$(document).ready(function() {
  bindFilterByTextListenerToFilterByText()
  bindFilterByReadListenerToFilterByRead()
  bindFilterByUnreadListenerToFilterByUnread()
})

function bindFilterByUnreadListenerToFilterByUnread(){
  $(".filter-by-unread").on("click", function(event){
    const links = $(".link")
    for(let i = 0; i < links.length; i++){
      filterByUnread(links[i])
    }
  })
}

function filterByUnread(link){
  if ($(link).children()[3].innerText.split(' ')[1] == "false") $(link).removeClass("hidden");
  else $(link).addClass("hidden");
}

function bindFilterByReadListenerToFilterByRead(){
  $(".filter-by-read").on("click", function(event){
    const links = $(".link")
    for(let i = 0; i < links.length; i++){
      filterByRead(links[i])
    }
  })
}

function filterByRead(link){
  if ($(link).children()[3].innerText.split(' ')[1] == "true") $(link).removeClass("hidden");
  else $(link).addClass("hidden");
}

function bindFilterByTextListenerToFilterByText() {
  $(".filter-by-text").on("keyup", function(event){
    const links = $(".links").children()
    const text = $(this).val().toLowerCase()
    for(let i = 0; i < links.length; i++){
      filterByText(links[i], text)
    }
  })
}

function filterByText(link, text){
  let title = $(link).children()[1].innerText.split(' ')[1].toLowerCase();
  let url = $(link).children()[2].innerText.split(' ')[1].toLowerCase();
  if (title.includes(text) || url.includes(text)) $(link).removeClass("hidden");
  else $(link).addClass("hidden");
}