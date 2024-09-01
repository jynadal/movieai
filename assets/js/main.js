/*-----------------------------------------------------------------

Template Name: Prinoz - Printing company &
Service Html Template 
Author:  gramentheme
Author URI: https://themeforest.net/user/gramentheme/portfolio
Version: 1.0.0
Description: Prinoz - Printing company &
Service Html Template <

-------------------------------------------------------------------
CSS TABLE OF CONTENTS
-------------------------------------------------------------------

01. header
02. animated text with swiper slider
03. magnificPopup
04. counter up
05. wow animation
06. nice select
07. scrolldown
08. hover active js
09. swiper slider
10. range sliger
11. quantity
12. quantity cart
13. search popup
14. mousecursor 
15. preloader 


------------------------------------------------------------------*/

(function($) {
    "use strict";

    $(document).ready( function() {

        //>> Mobile Menu Js Start <<//
        $('#mobile-menua').meanmenu({
            meanMenuContainer: '.mobile-menua',
            meanScreenWidth: "1920",
            meanExpand: ['<i class="far fa-plus"></i>'],
        });

        //>> Sidebar Toggle Js Start <<//
        $(".offcanvas__close,.offcanvas__overlay").on("click", function() {
            $(".offcanvas__info").removeClass("info-open");
            $(".offcanvas__overlay").removeClass("overlay-open");
        });
        $(".sidebar__toggle").on("click", function() {
            $(".offcanvas__info").addClass("info-open");
            $(".offcanvas__overlay").addClass("overlay-open");
        });

        //>> Body Overlay Js Start <<//
        $(".body-overlay").on("click", function() {
            $(".offcanvas__area").removeClass("offcanvas-opened");
            $(".df-search-area").removeClass("opened");;
            $(".body-overlay").removeClass("opened");
        });

        //>> Sticky Header Js Start <<//

        $(window).scroll(function() {
            if ($(this).scrollTop() > 250) {
                $("#header-sticky").addClass("sticky");
            } else {
                $("#header-sticky").removeClass("sticky");
            }
        });

        //>> Video Popup Start <<//
        $(".img-popup").magnificPopup({
            type: "image",
            gallery: {
                enabled: true,
            },
        });

        $('.video-popup').magnificPopup({
            type: 'iframe',
            callbacks: {
            }
        });
        
        //>> Counterup Start <<//
        $(".count").counterUp({
            delay: 15,
            time: 4000,
        });

        //>> Wow Animation Start <<//
        new WOW().init();

        //>> Nice Select Start <<//
        $('select').niceSelect();


        //>> Movie Slider Start <<//
        if($('.movie-slider').length > 0) {
            const movieSlider = new Swiper(".movie-slider", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
                breakpoints: {
                    1399: {
                        slidesPerView: 5,
                    },
                    1199: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        if($('.movie-slider-2').length > 0) {
            const movieSlider2 = new Swiper(".movie-slider-2", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                centeredSlides: true,
                autoplay: {
                    delay: 1000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".dot",
                    clickable: true,
                },
                breakpoints: {
                    1399: {
                        slidesPerView: 4,
                    },
                    1199: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        if($('.movie-slider-3').length > 0) {
            const movieSlider3 = new Swiper(".movie-slider-3", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
                breakpoints: {
                    1399: {
                        slidesPerView: 6,
                    },
                    1199: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        if($('.movie-category-slider').length > 0) {
            const movieCategorySlider = new Swiper(".movie-category-slider", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
                breakpoints: {
                    1399: {
                        slidesPerView: 5,
                    },
                    1199: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        //>> Tv Shows Slider Start <<//
        if($('.tv-shows-slider').length > 0) {
            const tvShowsSlider = new Swiper(".tv-shows-slider", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                breakpoints: {
                  
                    1199: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        //>> Exclusive Video Slider Start <<//
        if($('.exclusive-slider').length > 0) {
            const exclusiveSlider = new Swiper(".exclusive-slider", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 3,
                    },
                    991: {
                        slidesPerView: 2,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

         //>> Recently Video Slider Start <<//
         if($('.recently-videos-slider').length > 0) {
            const recentlyVideosSlider = new Swiper(".recently-videos-slider", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

    }); // End Document Ready Function

    function loader() {
        $(window).on('load', function() {
            // Animate loader off screen
            $(".preloader").addClass('loaded');                    
            $(".preloader").delay(600).fadeOut();                       
        });
    }

    loader();
   

})(jQuery); // End jQuery

