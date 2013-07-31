$(document).ready(function() {

//popups
var btn_login = $('.js-login');
btn_login.click(function() {
  $(this).next().fadeIn(300);
});
btn_login.click(function(event){
  event.stopPropagation();
});

var btn_shop = $('.js-shops');
btn_shop.click(function() {
  $(this).toggleClass('is-open');
});
btn_shop.find('li').click(function() {
  var pic = $(this).find('img').attr('src');
  $(this).parent().parent().next().find('img').attr('src', pic);
});
btn_shop.click(function(event) {
  event.stopPropagation();
});

var btn_sort = $('.js-sort');
btn_sort.click(function() {
  $(this).next().fadeIn(300);
})
btn_sort.next().find('li').click(function() {
  var val = $(this).text();
  $(this).parent().prev().html(val);
});
btn_sort.click(function(event) {
  event.stopPropagation();
});

var cart_show = $('.js-cart-show');
cart_show.click(function() {
  if ($(this).hasClass('is-active')) {
    $(this).parent().animate({right: -280} , 300);
    $(this).removeClass('is-active');
  }
  else {
    $(this).parent().animate({right: 20} , 300);
    $(this).addClass('is-active');
  };  
});

$('.js-cart-popup > li').click(function() {
  var wnd_width = $(window).width();
  $('.cart').addClass('is-open');
  var pos_top = $(this).position().top;
  var height = $(this).height();
  var top = pos_top + height/2 - 14;
  $('.overlay, .cart__popup').show();
  $('.cart__arr').css('top', top);
  cart_show.hide();  
  if (wnd_width < 1120) {
    cart_popup.css({'width': 'auto', 'left': 315 - wnd_width});
  };  
  //scroll
  $('.js-scroll').jScrollPane( {
    hideFocus: true
    //horizontalDragMaxWidth: 60
  });
});

var cart_popup = $('.cart__popup');
var overlay = $('.overlay');
$('.js-cart-close').click(function() {
  cart_popup.hide();
  overlay.hide();
  if (cart_show.hasClass('is-active')) {
    cart_show.show();
  };
  $('.cart').removeClass('is-open');  
});
overlay.click(function() {
  $(this).hide();
  $('.cart__popup').hide();
  $('.prod').hide();
  $('.cart').removeClass('is-open');
  if (cart_show.hasClass('is-active')) {
    cart_show.show();
  };
});
var prod = $('.prod');
var prod_open = $('.js-prod-open');
prod_open.click(function() {
  var wnd_width = $(window).width();
  var wnd_height = $(window).height();
  prod.show();
  overlay.show();
});
$('.js-prod-close').click(function() {
  prod.hide();
  overlay.hide();
});

//buy prod (add prod in cart)
$('.js-add-prod').click(function() {
  $(this).parent().parent().animate({left: 0}, 200);
  $(this).parent().parent().parent().parent().addClass('is-selected');
});
$('.js-del-prod').click(function() {
  $(this).parent().parent().parent().animate({left: '-100%'}, 200);
  $(this).parent().parent().parent().parent().parent().removeClass('is-selected');
});

$(document).click(function() {
  btn_login.next().hide();
  btn_shop.removeClass('is-open'); 
  btn_sort.next().hide();
});

//menu - sub
function submenu() {
	var el = $('.menu');
	var el_sub = $('.menu__sub');
	var item = el.find('.menu__list-in > li');
  var arr = el.find('.menu__sub-arr');
	item.hover(		
    function () {
    	var item_sub = $(this).attr('data-item');
      var item_cur = $('#' + item_sub);
      var width = $(this).width();
      var width_parent = el.width();
      var width_sub = item_cur.width(); 
    	var pos_left = $(this).position().left;    	
    	var arr_left = pos_left + width/2 - 7;
      arr.css('left', arr_left);   
      arr.show(); 	   	    
      item_cur.hover(
      	function() {          
      		$(this).show();
          arr.show();
      	},
      	function() {
      		$(this).hide();
          arr.hide();
      	}
      );      
      if (width_parent - width_sub > pos_left) {
      	item_cur.css({'left': pos_left, 'right': 'auto'}).show();
    	}
    	else {
    		item_cur.css({'left': 'auto', 'right': '-30px'}).show();
    	}
    },
    function() {
      arr.hide();   
      el_sub.hide();
    }
  );
};
//menu - slider
function slidermenu_responsive() {
  var el = $('.menu');
  var prev = el.find('.menu__btn-prev');
  var next = el.find('.menu__btn-next');
  var items = el.find('.menu__list-in li');
  var width_parent = el.width();
  var width_list = 0;
  items.each(function() {
    width_list += $(this).width();
    return(width_list);
  });
  if (width_parent < width_list) {
    el.addClass('is-slider');
    next.show();
  }
  else {
    el.removeClass('is-slider');
    next.hide();
    prev.hide();
  }
};
function slidermenu() {
  var el = $('.menu');
  var el_scroll = el.find('.menu__list');
  var prev = el.find('.menu__btn-prev');
  var next = el.find('.menu__btn-next');
  var items = el.find('.menu__list-in li');
  el.find('.menu__list-in li:first').addClass('is-current');
  var width_parent = el.width();
  var width_list = 0;
  items.each(function() {
    width_list += $(this).width();
    return(width_list);
  });
  next.click(function() {
    prev.show();
    var width_parent = el.width();
    el_scroll.scrollTo('+=200px', 400, {
      onAfter: function() {    
        var pos_left = el.find('.menu__list-in').position().left;
        if (pos_left == width_parent - width_list) {     
          next.hide();
        };
      }
    });
  });
  prev.click(function() {
    next.show();
    el_scroll.scrollTo('-=200px', 400, {
      onAfter: function() {    
        var pos_left = el.find('.menu__list-in').position().left;
        if (pos_left == 0) {     
          prev.hide();
        };
      }
    });
  });
};

//weight
function weight() {
  var el = $('.js-weight');
  var plus = el.find('.weight__btn-plus');
  var minus = el.find('.weight__btn-minus');
  plus.click(function() {
    var val = $(this).parent().find('.weight__val input').val();
    var factor = el.parent().find('.weight__val input').attr('data-factor');
    var sum = parseInt(val) + parseInt(factor);
    $(this).parent().find('.weight__val input').val(sum);
  });
  minus.click(function() {
    var val = $(this).parent().find('.weight__val input').val();
    var factor = el.parent().find('.weight__val input').attr('data-factor');
    var res = parseInt(val) - parseInt(factor);
    if (res > 0) {
       $(this).parent().find('.weight__val input').val(res);
    };   
  });
};

//tabs
function tabs() {
  var el = $('.js-tabs');
  var nav_item = el.find('.tabs__nav button');
  el.find('.tabs__content:not(:first)').hide();
  nav_item.click(function() {
    if (!$(this).hasClass('is-active')) {
      var val = $(this).attr('data-tab');    
      el.find('.tabs__content').hide();
      nav_item.removeClass('is-active');
      $(this).addClass('is-active');
      $('.' + val).show();
    };
  });
};

function cart() {
  var wnd_width = $(window).width();
  var cart = $('.cart');
  cart_show.removeClass('is-active'); 
  cart_popup.hide();   
  if (wnd_width < 1120) {
    cart_show.show();
    cart.addClass('is-move');
    cart.css('right', -280);       
  }
  else {
    cart_show.hide();
    cart.removeClass('is-move');
    cart.css('right', 20);    
  };
};

//init
submenu();
slidermenu();
slidermenu_responsive();
weight();
tabs();
cart();

//window resize
$(window).resize(function() {
  //init
  slidermenu_responsive();
  cart();
  prod.hide();
  overlay.hide();
});

//window scroll
$(window).scroll(function() {
  if ($(window).scrollTop() > 90) {
    $('.wrap').addClass('wrap_fixed');
  }
  else {
    $('.wrap').removeClass('wrap_fixed');
  };
});

});

