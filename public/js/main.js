// Showing park booking form
$('#book-button').on('click', function() {
    $(this).hide();
    $('.booking-form').show();
    console.log('click');
});

// Displaying the Request park images
$(document).ready(function(){
    $(".park-management-card").hover(function(){
      $(".image-1").toggleClass("active");
    });

    $(".tree-planting-card").hover(function(){
        $(".image-2").toggleClass("active");
    });

    $(".plant-nursery-card").hover(function(){
        $(".image-3").toggleClass("active");
    });

    $(".maintenance-card").hover(function(){
        $(".image-4").toggleClass("active");
    });
});

// Displaying the Sidebar Icon for account// Displaying the Sidebar Icon
$(document).ready(function(){
    $('#account-button').on('click', function() {
        $('.sidebar').toggleClass('active');
    });

    $('#close').on('click', function(){
        $('.sidebar').toggleClass('active');
    })
});

// Displaying the sidebar icon for all pages
$(document).ready(function(){
    $('#show-nav').on('click', function() {
        $('.sidebar').toggleClass('active');
    });

    $('#close-btn').on('click', function(){
        $('.sidebar').toggleClass('active');
    })
});

$('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});

