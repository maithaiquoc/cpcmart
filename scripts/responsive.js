$('.mini-user').hover(function(){
    $('.mini-login').show();
    $('.mini-angle').show();
});

$('.mini-login').hover(
    function(){
        $('.mini-login').show(); $('.mini-angle').show();
    },
    function(){
        $('.mini-login').hide(); $('.mini-angle').hide();
    });

$(window).load(function() {
    $('#slider').nivoSlider({
        effect: 'random',
        controlNav: false,
        directionNav: false,
        control: false,
        afterChange: function(){
            var totalSlides = $('#slider a img').length;
            var currentSlide = $('#slider').data('nivo:vars').currentSlide;
            $('.m-slider').css("background-color", $("#aSlider"+currentSlide).css('background-color'));
        }
    });

    $('.m-slider').css("background-color", $("#aSlider"+0).css('background-color'));

    var $document, didScroll, offset;
    offset = $('.menu').position().top;
    $document = $(document);
    didScroll = false;
    $(window).on('scroll touchmove', function() {
        return didScroll = true;
    });
    var k = 0;
    return setInterval(function() {
        if (didScroll) {
            $('.menu').toggleClass('fixed', $document.scrollTop() > offset);
            if($document.scrollTop() == offset){
                $('.dmsp3').css('top', '119px');
            }
            else{
                $('.dmsp3').css('top', '37px');
            }
            if(k == 0){
                $( ".menu" ).fadeIn(3000);
                k++;
            }
            return didScroll = false;
        }
    }, 250);
});

window.onload = function(){
    autoHome();
    $(window).resize(function () {
        autoHome();
    });
};

function autoHome(){
    var windowSize = $(window).width();
    if($(window).width() < 992){
        $('.m-wrap, .dmsp4-3, .ads-home, .btn-gh3, .form_dn, .form_dn ul li, .l-fcont, .r-fcont' +
            ', .sli-fcon-1 .bx-wrapper .bx-viewport, .filter-Prod, .content').css('width', windowSize);
        $('.divProductLine1, .divProductOverlay1').css('width', windowSize/2 - 2);
        $('.sli-fcon-1').css('width', windowSize - 2);
        $('.li-Pc1').css('width', windowSize/2 - 23);
        $('.ul-ifoot li, .menu').css('width', '100%');
        $('.arrowCategory').css('width', windowSize - 52);
        $('.t-Pnb').css('max-width', windowSize - 2);
        $('.hotline').attr('style', 'margin: 0 0 0 5px !important;');
        $('.dmsp4-3').css('max-width', windowSize);
        $('.prod_row1').css('width', windowSize/2 - 20);

        for(var i = 0; i < 8; i++){
            if($('#aCategoryName'+i).height() > 14){
                $('#divCategoryID'+i).css('padding', '5px 0 0 0');
            }
        }
    }

    if($(window).width() >= 992){
        $('.m-wrap, .f-cont').css('max-width', 1210);
        $('.m-wrap, .f-cont').css('width', '100%');
        $('.menu').css('width', '100%');
        $('.mini-bar').css('width', '3%');
        $('.form_dn').css('width', windowSize - 139);
        $('.dmsp4-3').css('width', windowSize - 190 - 390 - 139);
        $('.ads-home').css('max-width', windowSize - 190 - 190 - 139);
        $('.btn-gh3').css('width', 190);
        $('.arrowCategory').css('width', 135);
        $('.btn-gh3').css('width', 190);
        $('.form_dn ul li').css('width', 480);
        $('.divProductLine1, .divProductOverlay1').css('width', 198);
        $('.ul-ifoot li').css('width', '25%');
        $('.news li, .yahoo li').css('width', '100%');
        $('.sli-fcon-1 .bx-wrapper .bx-viewport').css('width', '100%');
        $('.t-Pnb, .filter-Prod, .content').css('max-width', 1000);
        $('.li-Pc1').css('width', 173);
        $('.hotline').attr('style', 'margin: 10px 30px 10px 30px !important;');
        $('.prod_row1').css('width', 'inherit');
        $('.t-Pnb').css('width', windowSize - 412);
        $('.content').css('width', windowSize - 350);
        $('#slider').css('left', (windowSize - 1210) / 2);

        for(var i = 0; i < 8; i++){
            if($('#aCategoryName'+i).height() > 14){
                $('#divCategoryID'+i).css('padding', '5px 0 11px 0');
            }
        }
    }
}