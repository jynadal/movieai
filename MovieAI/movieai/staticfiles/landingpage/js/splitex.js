// /*
//   1. preloader
//   2. elements.Timeout
//   3. vegas backgrounds
//   4. multiScroll
//   5. owlCarousel
//   6. magnificPopup
//   7. countdown
//   8. menu
//   9. intense IMG
//   10. forms
// */

// staticUrl = "{% static 'landingpage' %}";

$(function () {
  ('use strict');

  $(window).on('load', function () {
    // 1. preloader
    $('#preloader').fadeOut(1200);
    $('.preloader-bg').delay(1000).fadeOut('slow');

    // 2. elements.Timeout
    setTimeout(function () {
      $('.ms-left, .ms-right').addClass('fadeIn');
    }, 1000);
    setTimeout(function () {
      $('.hero-center-container-right, .logo, .border-left').removeClass(
        'left-position'
      );
    }, 1200);
    setTimeout(function () {
      $('.hero-center-container-left, .menu-btn, .border-right').removeClass(
        'right-position'
      );
    }, 1200);
    setTimeout(function () {
      $('.border-top').removeClass('top-position');
    }, 1200);
    setTimeout(function () {
      $('.border-bottom').removeClass('bottom-position');
    }, 1200);
    setTimeout(function () {
      $('.border-middle-left, .border-middle-right').removeClass(
        'fade-position'
      );
    }, 1400);
  });

  // 3. vegas backgrounds
  // home IMG left
  $('#home-bg-left').vegas({
    cover: true,
    align: 'center',
    valign: 'right',
    slides: [
      {
        src: staticUrl + '/img/background/home-bg-left.jpg',
      },
    ],
  });

  // about IMG left
  $('#about-bg-left').vegas({
    cover: true,
    align: 'center',
    valign: 'right',
    slides: [
      {
        src: staticUrl + '/img/background/about-bg-left.jpg',
      },
    ],
  });
  // works IMG left
  $('#works-bg-left').vegas({
    cover: true,
    align: 'center',
    valign: 'right',
    slides: [
      {
        src: staticUrl + '/img/background/works-bg-left.jpg',
      },
    ],
  });
  // contact IMG left
  $('#contact-bg-left').vegas({
    cover: true,
    align: 'center',
    valign: 'right',
    slides: [
      {
        src: staticUrl + '/img/background/contact-bg-left.jpg',
      },
    ],
  });
  // home IMG right
  $('#home-bg-right').vegas({
    cover: true,
    align: 'center',
    valign: 'left',
    slides: [
      {
        src: staticUrl + '/img/background/home-bg-right.jpg',
      },
    ],
  });
  // about IMG right
  $('#about-bg-right').vegas({
    cover: true,
    align: 'center',
    valign: 'left',
    slides: [
      {
        src: staticUrl + '/img/background/about-bg-right.jpg',
      },
    ],
  });
  // works IMG right
  $('#works-bg-right').vegas({
    cover: true,
    align: 'center',
    valign: 'left',
    slides: [
      {
        src: staticUrl + '/img/background/works-bg-right.jpg',
      },
    ],
  });
  // contact IMG right
  $('#contact-bg-right').vegas({
    cover: true,
    align: 'center',
    valign: 'left',
    slides: [
      {
        src: staticUrl + '/img/background/contact-bg-right.jpg',
      },
    ],
  });
  // slider IMG left
  $('#left-bg-1').vegas({
    timer: false,
    delay: 5000,
    cover: true,
    align: 'center',
    valign: 'right',
    transition: 'slideUp',
    slides: [
      {
        src: staticUrl + '/img/background/slide-left-1.jpg',
      },
      {
        src: staticUrl + '/img/background/slide-left-2.jpg',
      },
      {
        src: staticUrl + '/img/background/slide-left-3.jpg',
      },
      {
        src: staticUrl + '/img/background/slide-left-4.jpg',
      },
    ],
  });
  // slider IMG right
  $('#right-bg-1').vegas({
    timer: false,
    delay: 5000,
    cover: true,
    align: 'center',
    valign: 'left',
    transition: 'slideDown',
    slides: [
      {
        src: staticUrl + '/img/background/slide-right-1.jpg',
      },
      {
        src: staticUrl + '/img/background/slide-right-2.jpg',
      },
      {
        src: staticUrl + '/img/background/slide-right-3.jpg',
      },
      {
        src: staticUrl + '/img/background/slide-right-4.jpg',
      },
    ],
  });

  // 4. multiScroll
  var onMobile = false;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    onMobile = true;
  }
  if (onMobile === false) {
    $('#ms-wrapper').multiscroll({
      anchors: ['home', 'about', 'works', 'contact'],
      navigation: true,
      navigationTooltips: ['Home', 'About', 'Works', 'Contact'],
      loopBottom: true,
      loopTop: true,
    });
  } else {
    $('#ms-wrapper').multiscroll({
      anchors: ['home', 'about', 'works', 'contact'],
      navigation: true,
      navigationTooltips: ['Home', 'About', 'Works', 'Contact'],
      loopBottom: true,
      loopTop: true,
    });
    $('#ms-wrapper').multiscroll.destroy();
  }

  // 5. owlCarousel
  $('.about-slider, #works-page-img-carousel').owlCarousel({
    loop: false,
    center: false,
    items: 1,
    margin: 20,
    autoplay: false,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    smartSpeed: 450,
    nav: true,
    navText: [
      "<i class='owl-custom ion-chevron-left'></i>",
      "<i class='owl-custom ion-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      1170: {
        items: 1,
      },
    },
  });

  // 6. magnificPopup
  $('.popup-photo-single').magnificPopup({
    type: 'image',
    gallery: {
      enabled: false,
    },
    removalDelay: 100,
    mainClass: 'mfp-fade',
    fixedContentPos: false,
  });
  $('.popup-photo-gallery').each(function () {
    $(this).magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: {
        enabled: true,
      },
      removalDelay: 100,
      mainClass: 'mfp-fade',
      fixedContentPos: false,
    });
  });

  // 7. countdown
  // countdown setup start
  $('#countdown').countdown(
    {
      date: '01 January 2025 12:00:00', // countdown target date settings
      format: 'off',
    },
    function () {}
  );

  // 7bis. storage
  // storage setup start
  $('#storage').storage(
    {
      nbrMovie: '1800', // storage target date settings
      format: 'off',
    },
    function () {}
  );

  // 8. menu
  // menu button
  $('.menu-btn').on('click', function () {
    $(this).toggleClass('opened');
  });
  $('.main-menu li').on('click', function () {
    $('.menu-btn').removeClass('opened');
  });
  // menu content
  $('.open-menu-content, .main-menu li').on('click', function () {
    $('.menu-overlay').delay(300).fadeIn(600);
    $('.main-menu, .full-screen-wrapper').delay(250).fadeIn(500);
    if ($('.menu-container-right, .menu-container-left').hasClass('open')) {
      $('.menu-container-right, .menu-container-left').removeClass('open');
      $('.menu-container-right, .menu-container-left').addClass('close');
      $('.menu-overlay, .main-menu, .full-screen-wrapper').fadeOut(100);
    } else {
      $('.menu-container-right, .menu-container-left').removeClass('close');
      $('.menu-container-right, .menu-container-left').addClass('open');
    }
  });

  // menu content AVEC CORRECTION
  //   document.getElementById('menu-toggle').addEventListener('click', function () {
  //     const menu = document.getElementById('menu');
  //     menu.classList.toggle('hidden');
  //   });

  //   $('.open-menu-content, .main-menu li').on('click', function () {
  //     const isOpen = $('.menu-container-right, .menu-container-left').hasClass(
  //       console.log('Menu ouvert ?', isOpen)
  //     );

  //     if (isOpen) {
  //       // Fermer le menu
  //       $('.menu-container-right, .menu-container-left')
  //         .removeClass('open')
  //         .addClass('close');
  //       $('.menu-overlay, .main-menu, .full-screen-wrapper').fadeOut(300);
  //     } else {
  //       // Ouvrir le menu
  //       $('.menu-container-right, .menu-container-left')
  //         .removeClass('close')
  //         .addClass('open');
  //       $('.menu-overlay').delay(300).fadeIn(600);
  //       $('.main-menu, .full-screen-wrapper').delay(250).fadeIn(500);
  //     }
  //   });

  // menu active state
  $('.menu-item').on('click', function () {
    $('.menu-item').removeClass('active');
    $(this).addClass('active');
  });

  // 9. intense IMG
  var elements = document.querySelectorAll('.template-image');
  Intense(elements);

  // 10. forms
  $('form#form').on('submit', function () {
    $('form#form .error').remove();
    var s = !1;
    if (
      ($('.requiredField').each(function () {
        if ('' === jQuery.trim($(this).val()))
          $(this).prev('label').text(),
            $(this)
              .parent()
              .append('<span class="error">This field is required</span>'),
            $(this).addClass('inputError'),
            (s = !0);
        else if ($(this).hasClass('email')) {
          var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          r.test(jQuery.trim($(this).val())) ||
            ($(this).prev('label').text(),
            $(this)
              .parent()
              .append('<span class="error">Invalid email address</span>'),
            $(this).addClass('inputError'),
            (s = !0));
        }
      }),
      !s)
    ) {
      $('form#form input.submit').fadeOut('normal', function () {
        $(this).parent().append('');
      });
      var r = $(this).serialize();
      $.post($(this).attr('action'), r, function () {
        $('form#form').slideUp('fast', function () {
          $(this).before(
            '<div class="success">Your email was sent successfully</div>'
          );
        });
      });
    }
    return !1;
  });
  $('form#subscribe').on('submit', function () {
    $('form#subscribe .subscribe-error').remove();
    $.post('subscribe.php');
    var s = !1;
    if (
      ($('.subscribe-requiredField').each(function () {
        if ('' === jQuery.trim($(this).val()))
          $(this).prev('label').text(),
            $(this)
              .parent()
              .append(
                '<span class="subscribe-error">Please enter your Email</span>'
              ),
            $(this).addClass('inputError'),
            (s = !0);
        else if ($(this).hasClass('subscribe-email')) {
          var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          r.test(jQuery.trim($(this).val())) ||
            ($(this).prev('label').text(),
            $(this)
              .parent()
              .append(
                '<span class="subscribe-error">Please enter a valid Email</span>'
              ),
            $(this).addClass('inputError'),
            (s = !0));
        }
      }),
      !s)
    ) {
      $('form#subscribe input.submit').fadeOut('normal', function () {
        $(this).parent().append('');
      });
      var r = $(this).serialize();
      $.post($(this).attr('action'), r, function () {
        $('form#subscribe').slideUp('fast', function () {
          $(this).before(
            '<div class="subscribe-success">Thank you for subscribing</div>'
          );
        });
      });
    }
    return !1;
  });
});
