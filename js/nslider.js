(function($){
    jQuery.fn.nslider = function( options ) {
        var settings = $.extend( {
            'radio'         : 'slider__radio',
            'pagination'    : 'slider__number',
            'item'          : '.item',
            'animSpeed'     : '5000'
        }, options);
        return this.each(function() {
           var slider = $(this),
               count  = slider.children(settings.item).length,
               pagi   = '.'+settings.pagination,
               sliderclass  = 'slider_count_' + count;
           if(!slider.hasClass(sliderclass)){slider.addClass(sliderclass)}
           slider.append('<div class="'+settings.pagination+'"></div>');
           pagi = slider.find(pagi);
            for(var i= 1; i < count+1; i++){
                slider.prepend('<input name="imagetape" id="imagetape'+i+'" class="'+settings.radio+'" type="radio">');
                pagi.append('<label for="imagetape'+(count+1-i)+'"></label>');
            }
            var cRadio = '.'+settings.radio, iel;
            $('.'+settings.radio).eq(0).attr('checked', 'checked');
            function chnR(){

                if($(cRadio+':checked').index() == $(cRadio).length-1){
                    pagi.find('label')[0].click();
                }else{
                    pagi.find('label')[$(cRadio+':checked').next().index()].click();
                }
                return false
            }
            var timerID = setInterval(function() { chnR()}, settings.animSpeed);
            pagi.find('label').on('click', function(){
                clearInterval(timerID);
                timerID = setInterval(function() { chnR()}, settings.animSpeed);
            });
        });
    };
})(jQuery);