
// 跳至页首和页尾; 依赖 JQuery

$( function (){
    $( "#back-to-top" ).click( function (){
        jQuery( "html,body" ).animate({
            scrollTop:300
        },0);
    });
    $(window).scroll( function () {
        if  ( $( this ).scrollTop() > 100){
            $( '#back-to-top' ).fadeIn( "fast" );
        } else  {
            $( '#back-to-top' ).stop().fadeOut( "fast" );
        }
    });
});
$( function (){
    $( "#back-to-bottom" ).click( function (){
        jQuery( "html,body" ).animate({
            scrollTop:300
        },0);
    });
    $(window).scroll( function () {
        if  ( $( this ).scrollTop() > 50){
            $( '#back-to-bottom' ).fadeIn( "fast" );
        } else  {
            $( '#back-to-bottom' ).stop().fadeOut( "fast" );
        }
    });
});
