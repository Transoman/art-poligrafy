$(window).on('load', function () {
  $preloader = $('.preloader'),
  $loader = $preloader.find('.preloader__wrap');
  if ( localStorage.getItem('preloader') != 'hide') {
    $loader.delay(2000).fadeOut();
    $preloader.delay(2000).fadeOut('slow');
    localStorage.setItem('preloader', 'hide');
  }
  $loader.fadeOut();
  $preloader.fadeOut('slow');

  setTimeout(function() {
    $loader.remove();
    $preloader.remove();
  }, 3000);
});

jQuery(document).ready(function($) {

  AOS.init({
    duration: 800
  });

  if ( localStorage.getItem('preloader') == 'hide') {
    $preloader = $('.preloader'),
    $loader = $preloader.find('.preloader__wrap');
    $loader.remove();
  }

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.mobile-menu').toggleClass('open');
  });

  var fixedHeader = function() {
    if($(this).scrollTop() >= 85) {
      $('.header__bottom').addClass('fixed');
    }
    else {
      $('.header__bottom').removeClass('fixed');
    }
  }

  fixedHeader();

  $(window).scroll(function() {
    fixedHeader();
  });

  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  $('.widget__title').click(function() {
    $(this).toggleClass('active');
    $(this).next().toggleClass('active');
  });

  $('a[href="#"]').click(function(e) {
    e.preventDefault();
  });

  // Smooth scroll
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        var heightHeader = $('.header').outerHeight();
        var offset = heightHeader + 50;
        $('.mobile-menu').removeClass('open');
        $('.nav-toggle').removeClass('active');
        $('html, body').animate({
          scrollTop: target.offset().top - offset
        }, 1000);
      }
    }
  });

  // Slider
  var heroSlider = new Swiper ('.hero-slider', {
    speed: 1000,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    autoplay: {
      delay: 5000,
    },
  });

  var partnersSlider = new Swiper ('.partners-slider', {
    slidesPerView: 6,
    slidesPerGroup: 6,
    speed: 1000,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {
      1200: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      992: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      767: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      480: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    },
    autoplay: {
      delay: 5000,
    },
  });

  var testimonialSlider = new Swiper ('.testimonial-slider', {
    slidesPerView: 3,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {
      1200: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
    }
  });

  var productSlider = new Swiper ('.product__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  $().fancybox({
    selector : '[data-fancybox="group"]',
    thumbs   : false,
    hash     : false,
    // animationEffect : "fade",
    beforeClose : function(instance) {
      if ($('.product__slider').length) {
        // Update position of the slider
        productSlider.slideTo( instance.currIndex, 0 );
      }
    }
  });

  function simpleParallax(intensity, element) {
    $(window).scroll(function() {
      var scrollTop = $(window).scrollTop();
      var imgPos = scrollTop / intensity + 'px';
      element.css('transform', 'translateY(' + imgPos + ') rotate(45deg)');
    });
  }

  if ($(window).width() >= 768) {
    simpleParallax(5, $('.parallax-square-1'));
    simpleParallax(-5, $('.parallax-square-2'));
    simpleParallax(-7, $('.parallax-square-3'));
    simpleParallax(10, $('.parallax-square-4'));
    simpleParallax(5, $('.parallax-square-5'));
    simpleParallax(-2, $('.parallax-square-6'));
    simpleParallax(5, $('.parallax-square-7'));
    simpleParallax(-5, $('.parallax-square-8'));
    simpleParallax(5, $('.parallax-square-9'));
    simpleParallax(-5, $('.parallax-square-10'));
    simpleParallax(5, $('.parallax-square-11'));
    simpleParallax(5, $('.parallax-square-12'));
    simpleParallax(-5, $('.parallax-square-13'));
  }

  // Masked input
  var element = document.querySelectorAll('input[type="tel"]');
  var maskOptions = {
    mask: '+{7} (000) 000-00-00'
  };

  if (element) {
    for (var i = 0; i < element.length; i++) {
      var mask = new IMask(element[i], maskOptions);
    }
  }

  $('body').on('click', '.products__item .order_open', function() {
    var title = $(this).parents('.products__item').find('h3').find('a').text();
    $('#order h3').text('Заказать ' + title);
    $('#order input[name="subject"]').val('Заказ ' + title);
  });

  $('body').on('click', '.products__item .cost_open', function() {
    var title = $(this).parents('.products__item').find('h3').find('a').text();
    $('#cost input[name="subject"]').val('Узнать стоимость (' + title + ')');
  });

  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
    return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, "Введите Ваш телефон");

  /* Валидация формы */
  $('.repeat-form').each(function(i, el) {
    $(this).addClass('repeat-form-' + i);

    $(".repeat-form-" + i).validate({
      messages: {
        name: "Введите Ваше имя",
        phone: "Введите Ваш телефон",
        testimonial: "Введите Ваш отзыв",
      },
      rules: {
        "phone": {
          required: true,
          phoneno: true
        }
      },
      submitHandler: function(form) {
        var t = $('.repeat-form-' + i).serialize();
        ajaxSend('.repeat-form-' + i, t);
      }
    });
  });

  /* Функцыя для отправки формы */
  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }
});