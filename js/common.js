$(document).ready(function() {

//popups
$('.js-login').click(function() {
  $(this).next().fadeIn();
});

$('.js-login').click(function(event){
    event.stopPropagation();
});
$(document).click(function() {
  $('.js-login').next().hide();
});

//menu
function menu() {
	var el = $('.menu');
	var el_sub = $('.menu__sub');
	var item = el.find('.menu__list li');
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

//init
menu();

});