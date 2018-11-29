jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.mobile-menu').toggleClass('open');
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

  // Slider
  var heroSlider = new Swiper ('.hero-slider', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  });

  var partnersSlider = new Swiper ('.partners-slider', {
    slidesPerView: 6,
    slidesPerGroup: 6,
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
    }
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

  function simpleParallax(intensity, element) {
    $(window).scroll(function() {
      var scrollTop = $(window).scrollTop();
      var imgPos = scrollTop / intensity + 'px';
      element.css('transform', 'translateY(' + imgPos + ') rotate(45deg)');
    });
  }

  if ($(window).width() >= 992) {
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

  $('.products__item .order_open').click(function() {
    var title = $(this).parents('.products__item').find('h3').find('a').text();
    $('#order h3').text('Заказать ' + title);
    $('#order input[name="subject"]').val('Заказ ' + title);
  });

  $('.products__item .cost_open').click(function() {
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