$(document).ready(function() {
  bindCreateLinkListenerToCreateLink();
  bindEditLinkListenerToEditLink();
  bindEditReadLinkListenerToEditReadLink();
})

function bindEditReadLinkListenerToEditReadLink(){
  $(".links").on("click",".edit-link-read", function(event){
    event.preventDefault();
    const link = {link: {read: false}};
    if ($(this).prev().text() == "Read?: false"){
      $(this).prev().text("Read?: true");
      $(this).prev().css("color", "green");
      $(this).prev().context.innerText = "Mark as Unread";
      $(this).siblings().first().removeClass("hidden");
      link.link.read = true;
    }
    else {
      $(this).prev().text("Read?: false");
      $(this).prev().css("color", "red");
      $(this).prev().context.innerText = "Mark as Read";
      $(this).siblings().first().addClass("hidden");
      link.link.read = false;
    }
    const linkId = $(this).siblings(".link-id").text();
    $.ajax({
      url: "/api/v1/links/" + linkId,
      method: "PATCH",
      data: link
    })
  })
}


function bindEditLinkListenerToEditLink(){
  $(".edit-link").on("click", function(event){
    if (!validLink()) {
      $(".message").slideDown();
      event.preventDefault();
      return;
    }
    $(".message").slideUp();
  })
}

function bindCreateLinkListenerToCreateLink(){
  $("#add-link").on("click", function(event){
    event.preventDefault();
    createLink();
  })
}

function validLink(){
  return checkUrl() && checkTitle();
}

function checkTitle(){
  const title = $("#link_title").val();
  return title != "";
}

function checkUrl(){
  const url = $("#link_url").val();
  return isUrlValid(url);
}

function isUrlValid(url) {
  return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}


function getLink(){
  return {
    link: {
      title: $("#link_title").val(),
      url: $("#link_url").val()
    }
  };
}

function createLink(){
  if (!validLink()) {
    $(".message").slideDown();
    return;
  }
  $(".message").slideUp();
  $.ajax({
    url: "/api/v1/links",
    method: "POST",
    data: getLink()
  })
  .done((newLink) => {
    $(".success-message").slideDown();
    $(".links").prepend(newLink);
    $("#link_title").val("");
    $("#link_url").val("");
  })
  .fail((error) => {
    console.log(error);
  });
}