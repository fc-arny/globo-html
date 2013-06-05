$("#selectStore").ddslick
  width: "100%"
  background: "#fafafa"

$(".select-store").click (e) ->
  e.stopPropagation();
  $("#selectStore").ddslick "open"
  $('.dd-select').toggleClass('open');


$(".dropdown-menu").columnlist
  size: 2
  class: "column-list"
  incrementClass: "column-list-"


$(".column-list").parent().css width: ($(".dropdown-menu").find(".column-list").outerWidth() * 2) + "px"


$('span.star').click ->
  $(this).toggleClass('active')