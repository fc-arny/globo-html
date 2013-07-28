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
    var current = el.find('.is-current');
    var width = current.width();
    current.removeClass('is-current').next().addClass('is-current');
    el_scroll.scrollTo('+=' + width + 'px', 400, {
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
    var current = el.find('.is-current');
    var width = current.width();
    current.removeClass('is-current').prev().addClass('is-current');
    el_scroll.scrollTo('-=' + width + 'px', 400, {
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

});

