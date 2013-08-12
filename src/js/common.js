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
var scroll_el = $('.js-scroll');
var popup_el = $('.popup');
var popup_close = $('.popup__btn-close');
var datepicker_el = $('.datepicker__wrap');

popup_close.click(function() {
  popup_el.hide();
  overlay.hide();
});

cart_popup_open.click(function() {
  var pos_top = $(this).position().top;
  var height = $(this).height();
  var top = pos_top + height/2 - 14;
  cart_arr.css('top', top);
  if (!cart_el.hasClass('is-open')) {
    cart_el.addClass('is-open');
    cart_popup.show();  
    cart_show.hide();  
    scroll_init();

    page_top = scroll_top;
    page.css('top', -page_top);
    body.addClass('no-scroll');
    overlay.show();
  }; 
});

cart_close.click(function() {
  var wnd_width = $(window).width();
  cart_popup.hide();
  overlay.hide();
  body.removeClass('no-scroll');   
  cart_el.removeClass('is-open');  
  cart_el.addClass('is-move');  
  if (wnd_width < 1120) {
    cart_show.show(); 
    cart_show.addClass('is-active'); 
  }
  else {
    cart_show.hide(); 
    cart_show.removeClass('is-active'); 
  }
});

overlay.click(function() {
  $(this).hide();
  cart_popup.hide();
  prod.hide();
  popup_el.hide();
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
var page_fixed = $('.js-prod-open');
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

//order accordeon
var order_accord = $('.js-accord-order');
order_accord.click(function() {
   $(this).next().slideToggle();
});

//purchases
var purchases = $('.js-purchases');
purchases.click(function() {
  $(this).next().slideToggle();
});

//scroll init
function scroll_init() {
  scroll_el.jScrollPane( {
    hideFocus: true
  });
};

//cabinet
function cabinet() {
  var el = $('.cabinet__nav');
  var item = $('.cabinet__content');
  item.hide();
  item.first().show();
  el.find('button').click(function() {
    if (!$(this).hasClass('is-active')) {
      item.slideUp();
      el.find('button').removeClass('is-active');
      var val = $(this).attr('data-tab');
      $(this).addClass('is-active');
      $('.' + val).slideDown();
    };
  });
};

//steps
function steps() {
  var el = $('.step');
  el.hide();
  el.first().show();
  var btn = $('.js-step-btn');
  var current = $('.position__value-in');
  btn.click(function() {
    el.slideUp();
    var step = $(this).attr('data-step');     
    $('.' + step).slideDown();     
    current.removeClass('step-first');
    current.removeClass('step-second');
    current.removeClass('step-third');
    current.addClass(step); 
  });
};

//payment
function payment() {
  var el = $('.js-payment');
  var el_btn = el.find('li');
  var item = $('.js-payment-item');
  item.hide();
  item.first().show();
  //item.hide();
  el_btn.click(function() {
    if (!$(this).hasClass('is-active')) {
      el_btn.removeClass('is-active');
      $(this).addClass('is-active');
      item.slideUp();
      var val = $(this).attr('data-payment');
      $('.' + val).slideDown();
    };
  }); 
};

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

//choice_date
function choice_date() {
  var el = $('.js-datepicker');
  var wrap = el.find('.datepicker__wrap');
  if (wrap.length > 0) {
    wrap.datepicker({
      inline: true,
      monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
      'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
      monthNamesShort: ['января','февраля','марта','апреля','мая','июня',
      'июля','августа','сентября','октября','ноября','декабря'],
      dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
      dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
      dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
      minDate: "0",
      dateFormat: "dd M",
      showOtherMonths: true,
      firstDay: 1,
      onSelect: function(date) {
        $(this).prev().html(date);
        $(this).hide();
      }
    });
    el.click(function() {
      $(this).find('.datepicker__wrap').show();
    });
    el.click(function(event){
      event.stopPropagation();
    });
  };
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
  if (!cart_el.hasClass('is-open')) { 
    if (wnd_width < 1120) {
      cart_show.show();
      cart_el.addClass('is-move');
      cart_el.css('right', -280);       
    }
    else {
      cart_show.hide();
      cart_el.removeClass('is-move');
      cart_el.css('right', 20);    
    };
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
choice_date();
payment();
steps();
cabinet();

//window resize
$(window).resize(function() {
  //init
  slidermenu_responsive();
  $(window).scrollTo(page_top + 'px', 0);
  body.removeAttr('style');
  cart();
  scroll_init();
});

//window scroll
var scroll_top = 0;
$(window).scroll(function() {
  scroll_top = $(window).scrollTop();  
  if (!body.hasClass('no-scroll')) {
    if (scroll_top > 90) {
      wrap.addClass('is-fixed');
      cart_el.addClass('is-fixed');
    }
    else {
      wrap.removeClass('is-fixed');
      cart_el.removeClass('is-fixed');
    };    
  };   
});

//click document
$(document).click(function() {
  btn_login.next().hide();
  btn_shop.removeClass('is-open'); 
  btn_sort.next().hide();
  datepicker_el.hide();
  $('.js-select').removeClass('is-open'); 
});

//escape click
$(document).keyup(function(e) {
  if (e.keyCode == 27) { 
    overlay.hide();
    prod.hide();
    cart_el.removeClass('is-open');
    body.removeClass('no-scroll');
    $(window).scrollTo(page_top + 'px', 0);
    body.removeAttr('style');
    cart_popup.hide();
    popup_el.hide();
    datepicker_el.hide();
  } 
});

});

