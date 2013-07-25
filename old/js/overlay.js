(function($){
    jQuery.fn.overlay = function( options ) {
        var sW;
        function createoverLay(){
            $('body').wrapInner($("<div class='overWrap'><div class='overWrapContent'></div></div>")).append('<div class="overLayout"><div class="overlayWrap"><div class="overback"></div><div class="layWrap"></div></div></div>').addClass('overlayexist');

            var div = document.createElement('div');
            div.style.overflowY = 'scroll';
            div.style.width =  '50px';
            div.style.height = '50px';
            div.style.visibility = 'hidden';
            document.body.appendChild(div);
            sW = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);
            $('body').attr('data-sW', sW);
        }
        if(!$('body').hasClass('overlayexist')){createoverLay()}
        sW = $('body').attr('data-sW');
        var settings = $.extend( {
                'animSpeed'     : '500',
                'boxParent'     : 'body',
                'zIndex'        : 10010,
                'boxHeight'     : true,
                'posX'          : false,
                'posY'          : false,
                elseHide        : false,
                start   : function() {},
                end     : function() {},
                complete: function() {},
                finish  : function() {},
                elsedo  : function() {}
            }, options),
            over = $('.overLayout'),
            ovw  = $('.overWrap'),
            ovc  = ovw.children('.overWrapContent'),
            lay  = $('.layWrap'),
            sTop;
        function hideOverlay(){
            if(over.hasClass('visible')){
                var elemParent;
                elemParent = $('.overlayBox').attr('data-parent');
                sTop = -parseInt(ovw.css('margin-top'));
                ovc.css({'width':'auto'});
                ovw.css({'height':'auto', 'margin-top':0});
                $('.is-sticky header.main').width('98%');
                $('.is-sticky #basket').css('margin-right', '0px');
                $(window).scrollTop(sTop);
                over.fadeOut(settings.animSpeed, function(){$('.'+elemParent).append($('.overlayBox').attr('style','').removeClass('overlayBox').clone()).removeClass(elemParent); lay.empty()}).removeClass('visible');
                $('#basket').removeClass('overlayBasket');
                return false;
            }
        }
        $(document).on('click', '.overLayout .overback, .overlayClose', function(){
            hideOverlay();
        }).on('keydown', function(e) {if( e.keyCode === 27 ) {hideOverlay();}});
        return this.each(function() {
            function showOverlay(elem, $this){
                if(!over.hasClass('visible')){
                    var sT    = $(window).scrollTop(),
                        wH    = $(window).height(),
                        wW    = $(window).width(),
                        pTop  = wH/2 - $(elem).height()/2,
                        pLeft = - $(elem).width()/2,
                        elemParent = $(elem).parent(),
                        rand = new Date(),
                        id = 'box'+(rand.getSeconds())%100;
                    elemParent.addClass(id);
                    over.css('z-index', settings.zIndex);
                    ovc.css({'width': wW});
                    lay.css({'width': wW});
                    ovw.css({'margin-top':-sT, 'height': sT+wH});
                    $('.is-sticky header.main').width( $('.is-sticky header.main').width() - sW);
                    $('.is-sticky #basket').css('margin-right', sW+'px');
                    $(elem).clone().attr('data-parent', id).addClass('overlayBox').appendTo(lay);
                    $(elem).remove();
                    if(settings.boxHeight){$('overlayBox').height($(elem).height())}
                    if(settings.posX == 'center'){ lay.children(elem).css({'left':pLeft, 'margin-left':'50%'}); }
                    if(settings.posY == 'center'){ lay.children(elem).css({'margin-top':pTop}); }
                    lay.children(elem).css('display', 'block');
                    over.fadeIn(settings.animSpeed).addClass('visible');
                    settings.start($this);
                    settings.complete();
                    settings.end();
                }else{
                  settings.elsedo($this);
                }
            }
            $(this).on('click', function(e){
                e.preventDefault();
                var $this = $(this),
                    url  = $this.attr('href'),
                    elem = $(settings.boxParent).find(url);
                showOverlay(elem, $this);
            });
        });
    };
})(jQuery);