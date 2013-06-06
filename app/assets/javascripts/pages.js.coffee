$('#selectStore').ddslick
  width: '100%'
  background: '#fafafa'


$('.select-store').click (e) ->
  e.stopPropagation();
  $('#selectStore').ddslick 'open'
  $('.dd-select').toggleClass('open');


$('.dropdown-menu').columnlist
  size: 2
  class: 'column-list'
  incrementClass: 'column-list-'


$('.column-list').parent().css width: ($('.dropdown-menu').find('.column-list').outerWidth() * 2) + 'px'


$('span.star').click ->
  $(this).toggleClass('active')


$('.add-basket').click ->
  $(this).parents('.good-item').addClass('active')
  $(this).animate({left: '-200'}, 'fast');
  $(this).siblings('').fadeIn('slow');

$('.del-order').click ->
  $('.add-basket').animate({left: '0'}, 'fast');
  $(this).parents('.good-item').removeClass('active')
  $(this).fadeOut('fast').siblings('.quantity').fadeOut('fast');



$('.checking').click ->
  $(this).find('.check').removeClass('yes')
  if $(this).find('input').is(':checked')
     $(this).find('.check').addClass('yes')


# side bar
$window = $(window)
setTimeout (->
  $(".scroll").affix offset:
    top: 90
    bottom: 212
), 500
setTimeout (->
  $(".scroll-header").affix offset:
    top: 90
), 100
