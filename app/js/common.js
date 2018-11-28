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

  function simpleParallax(intensity, element) {
    $(window).scroll(function() {
      var scrollTop = $(window).scrollTop();
      var imgPos = scrollTop / intensity + 'px';
      element.css('transform', 'translateY(' + imgPos + ') rotate(45deg)');
    });
  }

  simpleParallax(5, $('.parallax-square-1'));
  simpleParallax(-5, $('.parallax-square-2'));
  simpleParallax(-7, $('.parallax-square-3'));
  simpleParallax(10, $('.parallax-square-4'));

});