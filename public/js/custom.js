(function($){})(window.jQuery);
$(document).ready(function (){
	var docHeight = $(document).height();
    var windowHeight = $(window).height();
    var bannerHeight = $('#banner').height();
	var avatarWidth = $('#avatar').width();
	var avatarHeight = $('#avatar').height();
	$('#avatar').css({'margin-left' : '-'+(avatarWidth/2)-20+'px',
						'top' : bannerHeight - (avatarHeight)+'px' });
	$('#cover-name').css('padding-top',avatarHeight/2+'px');
	
	// pull-out sidebar
	sideBar = $('#sidebar-menu');
	sideBar.css('margin-left','-30%');
	$('#filter-open-button').click(function() {
		$(this).fadeOut(500);
		sideBar.css({height : docHeight,display : 'block'});
		sideBar.animate({'margin-left': 0},500);

	});
	// pull in sidebar
	$('#sidebar-menu .close').click(function() {
		sideBar.animate({'margin-left': '-30%'},500,function() {
			sideBar.css({display : 'none'});
		});
		$('#filter-open-button').fadeIn(1000);
	});

	//pull out left sidebar
	var leftNav = $('#left-navigation');
	$('#top-left-button').click(function() {
		$(this).fadeOut(500);
		var leftNav = $('#left-navigation');
		leftNav.css({height: windowHeight, display:'block',position:'fixed'});
		var leftnavWidth = leftNav.width();
        if($(window).width() > 992){
		    $('#portfolio-cover').animate({left : leftnavWidth+30+'px'},500);
        }
	});
	//pull in left sidebar
	$('#left-navigation .close').click(function() {
		$('#portfolio-cover').animate({left : 0},500,function() {
			leftNav.css({display:'none'});
			$('#top-left-button').fadeIn(1000);
		});
	});

    // Expand avatar image
    $('#avatar').click(function() {
       $(this).find('i').fadeOut(1);
       var bannerWidth = $('#banner').width();
        if(!$('#avatar').hasClass('open')) {
           $(this).find('i').remove();
           $(this).animate({ width : bannerWidth,
                            height : '100%',
                            top:0,
                            margin : 0,
                            left : 0,
                            backgroundColor : "rgba(0,0,0,0.7)"},500);
            $(this).addClass('open');
        } else {
            $(this).animate({ width : avatarWidth + 40+'px',
                                height : avatarHeight + 40+'px',
                                'margin-left' : '-'+(avatarWidth/2)-20+'px',
                                top : bannerHeight - (avatarHeight)+'px',
                                margin : 0,
                                left : '50%'},500);
            $(this).removeClass('open')
            $('<i></i>').addClass('glyphicon glyphicon-fullscreen').appendTo('#avatar');
        }
    });
    // Avatar hover
    var profileImg = $('#avatar')
        profileImg.hover(function() {
            $(this).find('i').fadeIn(100);
        },function(){
            $(this).find('i').fadeOut(500);
        })

	// making each column the correct height
	$('#content-main').css({'min-height' : docHeight});

    // isotope
    $container = $('#portfolio-sites');
    $container.imagesLoaded( function(){
        $container.isotope({
            itemSelector : '.portfolio-item',
            layoutMode : 'masonry',
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear'
            }
        });
    });
    setWidths();
    $container.isotope({
        resizable: false,
        masonry: { columnWidth: getUnitWidth() }
    });

    $(window).smartresize(function () {
        setWidths();
        $container.isotope({
            masonry: { columnWidth: getUnitWidth() }
        });
    });
    $('.project-nav li a').click(function(){
        var selector = $(this).attr('data-filter');
        var sortName = $(this).attr('href').slice(1);
        $('.project-nav li').removeClass('active');
        $(this).parent('li').addClass('active');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });

});

function getUnitWidth() {
    var width;
    if($(window).width() <= 360) {
        width = $container.width() / 1;
    } else if($(window).width() <= 800) {
        width = $container.width() / 2;
    } else if($(window).width() <= 1200) {
        width = $container.width() / 3;
    } else {
        width = $container.width() / 3;
    }
    return width;
}
function setWidths() {
    var unitWidth = getUnitWidth() -1;
    $container.children().css({ width: unitWidth });
}


$(window).load(function() {

});

$(window).resize(function() {
	var avatarWidth = $('#avatar').width();
	var avatarHeight = $('#avatar').height();
	$('#avatar').css({'margin-left' : '-'+(avatarWidth/2)-20+'px',
						'bottom' : '-'+avatarHeight/2+'px' });
	$('#cover-name').css('padding-top',avatarHeight/2+'px');
});

