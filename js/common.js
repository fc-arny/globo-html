$(document).ready(function() {

//popups
$('.js-login').click(function() {
  $(this).next().fadeIn();
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

$('.js-login').click(function(event){
  event.stopPropagation();
});

$('.js-shops').click(function(event) {
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

$(document).click(function() {
  $('.js-login').next().hide();
  $('.js-shops').removeClass('is-open');
  $('.js-shops').next().hide();  
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

