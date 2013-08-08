$(document).ready(function() {


var body = $('body');
var page = $('.page');
var wrap = $('.wrap');
var header = $('.header');

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

var overlay = $('.overlay');
var cart_el =  $('.cart');
var cart_popup = $('.cart__popup');
var cart_close = $('.js-cart-close');
var cart_popup_open = $('.js-cart-popup > li');
var cart_arr = $('.cart__arr');

cart_popup_open.click(function() {
  var wnd_width = $(window).width();  
  var pos_top = $(this).position().top;
  var height = $(this).height();
  var top = pos_top + height/2 - 14;
  cart_el.addClass('is-open');
  cart_popup.show();
  cart_arr.css('top', top);
  cart_show.hide();  
  if (wnd_width < 1120) {
    cart_popup.css({'width': 'auto', 'left': 315 - wnd_width});
  }
  else {
    cart_popup.css({'width': '760px', 'left': 'auto'});
  } 
  //scroll
  $('.js-scroll').jScrollPane( {
    hideFocus: true
    //horizontalDragMaxWidth: 60
  });
});

cart_close.click(function() {
  cart_popup.hide();
  overlay.hide();
  body.removeClass('no-scroll');
  if (cart_show.hasClass('is-active')) {
    cart_show.show();
  };
  cart_el.removeClass('is-open');  
});

overlay.click(function() {
  $(this).hide();
  cart_popup.hide();
  prod.hide();
  cart_el.removeClass('is-open');
  body.removeClass('no-scroll');
  if (cart_show.hasClass('is-active')) {
    cart_show.show();
  };
});

//product popup
var prod = $('.prod');
var prod_open = $('.js-prod-open');
var prod_close = $('.js-prod-close');
prod_open.click(function() { 
  var prod_height = prod.height();   
  body.css({'min-height': prod_height}); 
  prod.show(); 
});
prod_close.click(function() {
  prod.hide();
  body.removeClass('no-scroll');
});

//buy prod (add prod in cart)
var add_prod = $('.js-add-prod');
var del_prod = $('.js-del-prod')
add_prod.click(function() {
  $(this).parent().parent().animate({left: 0}, 200);
  $(this).parent().parent().parent().parent().addClass('is-selected');
});
del_prod.click(function() {
  $(this).parent().parent().parent().animate({left: '-100%'}, 200);
  $(this).parent().parent().parent().parent().parent().removeClass('is-selected');
});

//page
var page_fixed = $('.js-prod-open, .js-cart-popup > li');
var page_no_fixed = $('.js-prod-close, .js-cart-close, .overlay');
var page_top = 0;

page_fixed.click(function() { 
  page_top = scroll_top;
  page.css('top', -page_top);
  body.addClass('no-scroll');
  overlay.show();
});

page_no_fixed.click(function() {
  overlay.hide();
  $(window).scrollTo(page_top + 'px', 0);
  body.removeAttr('style');
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
      el.find('.tabs__content').slideUp();
      nav_item.removeClass('is-active');
      $(this).addClass('is-active');
      $('.' + val).slideDown();
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

//main slider
function m_slider() {
  var el = $('.js-m-slider');
  var items = el.find('.m-slider__item').length;
  var pager = el.find('.m-slider__pager');
  if (items <= 1) {
    pager.hide();
  };
}

//select
function select() {
  var el = $('.js-select');
  var el_title = el.find('span');
  var item = el.find('li');
  var list = el.find('ul');
  el_title.click(function() { 
    if ($(this).parent().hasClass('is-open')) {
      $(this).parent().removeClass('is-open');
    }
    else {
      el.removeClass('is-open');
      $(this).parent().addClass('is-open');
    };
  });
  item.click(function() {
    var val = $(this).text();
    $(this).parent().prev().addClass('is-selected');
    $(this).parent().prev().html(val + '<i></i>');
    el.removeClass('is-open');
  });
  el_title.click(function(event){
    event.stopPropagation();
  });
};

//init
submenu();
slidermenu();
slidermenu_responsive();
weight();
tabs();
cart();
m_slider();
select();

//window resize
$(window).resize(function() {
  //init
  slidermenu_responsive();
  cart();
  $(window).scrollTo(page_top + 'px', 0);
  body.removeAttr('style');
});

//window scroll
var scroll_top = 0;
$(window).scroll(function() {
  scroll_top = $(window).scrollTop();  
  if (!body.hasClass('no-scroll')) {
    if (scroll_top > 90) {
      wrap.addClass('wrap_fixed');
    }
    else {
      wrap.removeClass('wrap_fixed');
    };    
  };   
});

//click document
$(document).click(function() {
  btn_login.next().hide();
  btn_shop.removeClass('is-open'); 
  btn_sort.next().hide();
  $('.js-select').removeClass('is-open'); 
});

});

