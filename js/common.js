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
  $(this).addClass('is-open');
  $(this).next().fadeIn(300);
});
btn_shop.next().find('li').click(function() {
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

$('.js-cart-popup > li').click(function() {
  $('.cart').addClass('is-open');
  var pos_top = $(this).position().top;
  var height = $(this).height();
  var top = pos_top + height/2 - 14;
  $('.overlay, .cart__popup').show();
  $('.cart__arr').css('top', top);
  //scroll
  $('.js-scroll').jScrollPane( {
    hideFocus: true
    //horizontalDragMaxWidth: 60
  });
});
$('.js-cart-close').click(function() {
  $('.cart__popup').hide();
  $('.overlay').hide();
  $('.cart').removeClass('is-open');
});
$('.overlay').click(function() {
  $(this).hide();
  $('.cart__popup').hide();
  $('.cart').removeClass('is-open');
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
  btn_shop.next().hide(); 
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
}
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
  //var factor = el.find('.weight__val input').attr('data-factor');
  //var val = el.find('.weight__val input');
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
}
weight();

//init
submenu();
slidermenu();
slidermenu_responsive();

//window resize
$(window).resize(function() {
  //init
  slidermenu_responsive()
});

//window scroll
$(window).scroll(function() {
  if ($(window).scrollTop() > 90) {
    $('.wrap').addClass('wrap_fixed');
  }
  else {
    $('.wrap').removeClass('wrap_fixed');
  }
});

});

