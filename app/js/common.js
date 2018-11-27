jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.header__nav').toggleClass('open');
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
    },
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

});