$('#selectStore').ddslick
  width: '100%'
  background: '#fafafa'

$('#sort').ddslick
  width: 'auto'
  background: '#fff'

$('.select-store').click (e) ->
  e.stopPropagation();
  $('#selectStore').ddslick 'open'
  $('#selectStore .dd-select').toggleClass('open');


$('span.star').click ->
  $(this).toggleClass('active')


$('.add-basket').click ->
  $(this).parents('.good-item').addClass('active')
  $(this).animate({left: '-200'}, 'fast');
  $(this).siblings('').fadeIn('slow');

$('.del-order').click ->
  $(this).siblings('.add-basket').animate({left: '0'}, 'fast');
  $(this).parents('.good-item').removeClass('active')
  $(this).fadeOut('fast').siblings('.quantity').fadeOut('fast');



$('.checking').click ->
  $(this).find('.check').removeClass('yes')
  if $(this).find('input').is(':checked')
     $(this).find('.check').addClass('yes')


# affix шапки и корзины
$(".scroll, .scroll-header").affix offset:
  top: 100