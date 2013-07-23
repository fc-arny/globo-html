/*****************************************************
 **********                               ************
 **********    Document Ready Functions   ************
 **********                               ************
 ******************************************************/
$(function () {
    /* Инициализация плагинов */
    $('.overlayLink').overlay({'posX':'center', 'posY': 'center'});
    $('.entry .title').overlay({'boxParent':this, 'boxHeight':false, end: function(){
      $('.overLayout .entryBoxInfo .tabs input[type="radio"]').each(function(i){
          var id = 'tabs'+i;
          $(this).attr('id', id)
      });
    }});
    $('#basket .bItem').overlay({'zIndex': 9990, start: function($this){
        $('.overLayout .basketShop').css('margin-top',$('#basket').offset().top);
        $('.overLayout .basketShop .bsArrow').css('top', $this.position().top);
        var itemW = $('.overLayout .bscItem').length*($('.overLayout .bscItem').outerWidth()+1);
        $('.bscItemBox').width(itemW);
    },
    end: function(){
        $('.overLayout .basketShopContent').jScrollPane({horizontalDragMinWidth: 50, horizontalDragMaxWidth: 60});
    },
    elsedo: function($this){
        $('.overLayout .basketShop .bsArrow').animate({'top': $this.position().top},200);
      return false;
    }});
    if($('#mainNavWrap .overnav')[0]){
        $('#mainNavWrap .overnav').jcarousel({
            'scroll':1,
            'animation': 300
        });
    }
    if($('#searchForm, #mainNavWrap')[0]){
        $('header.main').sticky({topSpacing:-110});
        $('#searchForm').sticky({topSpacing:109});
        $('#basket').sticky({topSpacing:60});
    }
    if($('#slider')[0]){
      $('.sliderWrap').nslider();
    }
    if($('header.main')[0]){
       $('.overnav').nav();
    }
    if($('select.sity')[0]){
        $('select.sity').ikSelect({
            autoWidth: false,
            ddFullWidth: false,
            customClass: "select_use",
            ddCustomClass: "select_use_block"
        });
        $('.hideAdress').css('display', 'none');
    }
    if($('.orderStepBox')[0]){
        $('.takedate').pickadate();
        $('select').ikSelect({
            autoWidth: false,
            ddFullWidth: false,
            customClass: "select_use",
            ddCustomClass: "select_use_block"
        });
        $('.orderStep:not(.visible)').css({'display': 'none', 'opacity':'0'});
    }
});

/***************************************************/
$(document).on('click', '.next_step', function() {  // Обработка нажатия на кнопку nпродолжения оформления заказа
    steps('next');
    return false;
}).on('click', '.prev_step', function() {  // Обработка нажатия на кнопку возврата оформления заказа
        steps('prev');
        return false;
});
function steps(derect){
  var aStep = $('.orderStep.visible'),
      step, point, post,
      aPoint = $('.orderStepsLine .active'),
      line = $('.orderStepsLine .oslLine'),
      lineFullWidth = line.parent().width(),
      lineWidth = line.width();
    if(derect == 'next'){
        step = aStep.next('.orderStep');
        lineWidth += lineFullWidth/2;
        point = aPoint.next();
        aPoint.addClass('prev');

    }else{
        step = aStep.prev('.orderStep');
        lineWidth -= lineFullWidth/2;
        point = aPoint.prev();
        aPoint.removeClass('prev');
    }
    if(step[0]){
        var BTN = step.attr('data-butTextNext'),
            BTP = step.attr('data-butTextPrev');
        if(BTN != 'undefined'){
          $('.next_step').text(BTN);
        }
        if(BTP != 'undefined'){
          $('.prev_step').text(BTP);
        }
        line.width(lineWidth);
        point.removeClass('prev').addClass('active');
        aPoint.removeClass('active');
        aStep.animate({'opacity': 0}, 600, function(){$(this).css('display', 'none').removeClass('visible'); step.addClass('visible').css('display','block').animate({'opacity': 1}, 800); });

    }
}
$(document).on('click', '.layoutLink', function() {  // Обработка нажатия на кнопки для отображения Layout
    $(this).addClass('active');
    $($(this).attr('href')).fadeIn(300);
    return false;
}).on('click', '.asideBox .abTitle', function() {  // Нажатие на свернутые категории
    if($(window).width() < 1100){
        $(this).next('[class*=Content]').slideToggle(300);
    }
  return false;
}).on('click', '.bsVtrigger', function(){  // видимость корзины
    $('#basket').toggleClass('visib');
    return false;
}).on('click', '.takeinBasket:not(.load)', function(){  // обработка нажатия на кнопку "в корзину" при условии, что не идет загрузка предыущего события
    $(this).parents('.entry').addClass('checked');
    $(this).stop().animate({'margin-left': '50px', 'opacity':'0'}, 350, function(){$(this).parent().css('display','none').next('.uci').fadeIn(200)});
    return false;
}).on('click', '.uciSumRemove', function(){  // обработка нажатия на кнопку удаления купленного товара
        $(this).parents('.entry').removeClass('checked').children('.uci').fadeOut(200, function(){$(this).parent().children('.tkb').fadeIn(200, function(){$(this).children('.takeinBasket').animate({'margin-left': '0px', 'opacity':'1'})})});
        return false;
}).on('click', '.mainNav a', function(){        // обработка нажатия на элемент меню
      $(this).nav('triggerActive');
}).on('mouseover', '.mainNav a', function(){        // обработка нажатия на элемент меню
        $(this).nav('showSub');
}).on('mouseout', '.mainNav a', function(){        // обработка нажатия на элемент меню
        $(this).nav('hideSub');
}).on('click', '.orderLine .orderNumber', function(){              // обработка нажатия на номер заказа
        var act = $(this).hasClass('active');
        $('.orderLine .orderNumber').removeClass('active');
        $('.orderLine .orderMore').slideUp(200);
        if(!act){
            $(this).addClass('active').parents('.orderInfo').next('.orderMore').slideDown(200);
        }
}).on('click', '.addAdress', function(){                         // добавление адреса
        var adres = $('.hideAdress').children().clone().css('display', 'none');
        adres.appendTo('.adressBox').find('select').ikSelect({
            autoWidth: false,
            ddFullWidth: false,
            customClass: "select_use",
            ddCustomClass: "select_use_block"
        }).end().slideDown(200);
        if($('.adressBox .adressLine').length > 1){
            $('.removelink').show();
        }
        return false;
}).on('click', '.removelink', function(){                         // удаление адреса
        $(this).parents('.adressLine').slideUp(200, function(){$(this).remove();
        if( $('.adressBox .adressLine').length <= 1){
          $('.removelink').hide();
        }
        });
        return false;
});
// Обработка нажатия на '+' и '-' при выборе количества товара
$(document).on('click', '.uciValMinus, .uciValPlus', function() {
    var vlInp =  $(this).parent().children('.uciValinput'),
        vl    =  parseInt(vlInp.val()),
        modf    = parseInt($(this).attr('data-val'), 10);
        if(!modf){var modf = 1}
    if($(this).attr('data-sum') == '-'){
         if(vl-modf >= 0){vl -= modf}
    }else{
         if(vl+modf <= 9999){vl += modf}
    }
    vlInp.val(vl);
    return false;
});
// Запрет на ввод в поля количества товара не цифр
$(document).on("change keyup input click", '.uciValinput', function() {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
});
// Описание события при клике для закрытия Layout`ов
$(document).on('click', function(event) {
    if ($(event.target).closest(".layout").length) return;
    layoutClose();
    event.stopPropagation();
}).on('keydown', function(e) {if( e.keyCode === 27 ) {layoutClose();}})  // Закрытие layout по Esc
  .on('click', '#chnList a', function(){            // А это при выборе магазина из списка
    $('#chnList a').removeClass('active');
    $(this).addClass('active');
    $('#chnSp').attr('src', $(this).children('img').attr('src'));
    layoutClose();
    return false
});
// Закрытие layout
function layoutClose(){
    $(".layout").fadeOut(300);
    $('.layoutLink').removeClass('active');
    return false
}
