(function($){
    var methods = {
        init : function( options ) {
            var settings = $.extend( {
                'item'          : 'li',
                'sub'           : '.submenu',
                'subC'          : '.nav',
                'animSpeed'     : '5000'
            }, options);
            return this.each(function(){
                var $this = $(this),
                    data = $this.data('navigationReady');
                if ( ! data ) {
                    $(this).data('navigationReady', {
                        target : $this
                    }).addClass('navigation');
                    $this.find(settings.item).each(function(){
                        if($(this).find(settings.sub)[0]){
                           $(this).addClass('subContainer');
                        }
                    });
                }
            });
        },
        showSub : function( ) {
            return this.each(function(){
                if($(this).parents().hasClass('subContainer') && !$(this).hasClass('activeSub')){
                    var $this = $(this),
                        sub   = $this.next('.submenu'),
                        left  = $(this).parent().position().left + $(this).parent().outerWidth()/6 + $(this).parents('.overnav').position().left;
                    sub.clone().addClass('cloneSub').appendTo('.nav').css('left', left).fadeIn(200);
                    $this.addClass('activeSub');
                }
            })
        },
        hideSub : function( ) {
            return this.each(function(){
                var $this = $(this);
                $(document).on('mouseover', function(event) {
                    if ($(event.target).closest(".cloneSub, .activeSub").length) return;
                    $('.cloneSub').fadeOut(200, function(){$(this).remove();});
                    event.stopPropagation();
                    $this.removeClass('activeSub');
                });
            })
        },
        triggerActive : function() {
            return this.each(function(){
                var $this = $(this);
                if(!$this.hasClass('active')){
                    $('.navigation a').removeClass('active');
                    $this.addClass('active');
                }
            });
        }
    };
    jQuery.fn.nav = function( method ) {
            if ( methods[method] ) {
                return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, arguments );
            } else {
                $.error( 'Метод с именем ' +  method + ' не существует для плагина навигации' );
            }
    };
})(jQuery);