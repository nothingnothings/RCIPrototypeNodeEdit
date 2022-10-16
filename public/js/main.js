//HTML sanitizer


var toggleButton = document.querySelector('.toggle-button');
var closeBtn = document.querySelector('.closebtn');

console.log('TEST');

$('#carousel-multi').carousel({
  interval: false,
});

$(document).ready(function () {
  var itemsMainDiv = '.multi-carousel';
  var itemsDiv = '.multi-carousel-inner';
  var itemWidth = '';

  $('.leftLst, .rightLst').click(function () {
    var condition = $(this).hasClass('leftLst');
    if (condition) click(0, this);
    else click(1, this);
  });

  ResCarouselSize();

  $(window).resize(function () {
    ResCarouselSize();
  });

  //this function defines the size of the items
  function ResCarouselSize() {
    var incno = 0;
    var dataItems = 'data-items';
    var itemClass = '.item';
    var id = 1;
    var btnParentSb = '';
    var itemsSplit = '';
    var sampwidth = $(itemsMainDiv).width();
    var bodyWidth = $('body').width();
    $(itemsDiv).each(function () {
      id = id + 1;
      var itemNumbers = $(this).find(itemClass).length;
      btnParentSb = $(this).parent().attr(dataItems);
      itemsSplit = btnParentSb.split(',');
      $(this)
        .parent()
        .attr('id', 'multi-carousel' + id);

      if (bodyWidth >= 1200) {
        incno = itemsSplit[3];
        itemWidth = sampwidth / incno;
      } else if (bodyWidth >= 992) {
        incno = itemsSplit[2];
        itemWidth = sampwidth / incno;
      } else if (bodyWidth >= 768) {
        incno = itemsSplit[1];
        itemWidth = sampwidth / incno;
      } else {
        incno = itemsSplit[0];
        itemWidth = sampwidth / incno;
      }
      $(this).css({
        transform: 'translateX(0px)',
        width: itemWidth * itemNumbers,
      });
      $(this)
        .find(itemClass)
        .each(function () {
          $(this).outerWidth(itemWidth);
        });

      $('.leftLst').addClass('over');
      $('.rightLst').removeClass('over');
    });
  }

  //this function moves the items

  function ResCarousel(e, el, s) {
    var leftBtn = '.leftLst';
    var rightBtn = '.rightLst';
    var translateXval = '';
    var divStyle = $(el + ' ' + itemsDiv).css('transform');
    var values = divStyle.match(/-?[\d\.]+/g);
    var xds = Math.abs(values[4]);
    if (e == 0) {
      translateXval = parseInt(xds) - parseInt(itemWidth * s);
      $(el + ' ' + rightBtn).removeClass('over');

      if (translateXval <= itemWidth / 2) {
        translateXval = 0;
        $(el + ' ' + leftBtn).addClass('over');
      }
    } else if (e == 1) {
      var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
      translateXval = parseInt(xds) + parseInt(itemWidth * s);
      $(el + ' ' + leftBtn).removeClass('over');

      if (translateXval >= itemsCondition - itemWidth / 2) {
        translateXval = itemsCondition;
        $(el + ' ' + rightBtn).addClass('over');
      }
    }
    $(el + ' ' + itemsDiv).css(
      'transform',
      'translateX(' + -translateXval + 'px)'
    );
  }

  //It is used to get some elements from btn
  function click(ell, ee) {
    var Parent = '#' + $(ee).parent().attr('id');
    var slide = $(Parent).attr('data-slide');
    ResCarousel(ell, Parent, slide);
  }
});

////smooth scroll
$(document).ready(function () {
  // Add smooth scrolling to all links
  $('a').on('click', function (event) {
    if ($(this).hasClass('nav-link')) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== '') {
        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate(
          {
            scrollTop: $(hash).offset().top,
          },
          800,
          function () {
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          }
        );
      }
    }
  });
});

///2nd carousel

$('#cases-carousel .carousel-wrapper .carousel')
  .carousel({})
  .on('slid.bs.carousel', function (par1, par2) {
    var currentSlide = $('.active');
    if (currentSlide.is(':first-child')) {
      $('.carousel-control-prev')
        .css('pointer-events', 'none')
        .addClass('inactive-control');
      return;
    } else {
      $('.carousel-control-prev')
        .css('pointer-events', 'auto')
        .removeClass('inactive-control');
    }
    if (currentSlide.is(':last-child')) {
      $('.carousel-control-next')
        .css('pointer-events', 'none')
        .addClass('inactive-control');
      return;
    } else {
      $('.carousel-control-next')
        .css('pointer-events', 'auto')
        .removeClass('inactive-control');
    }
  });

$('#cases-carousel .carousel-wrapper .carousel').on(
  'touchstart',
  function (event) {
    var xClick = event.originalEvent.touches[0].pageX;
    $(this).one('touchmove', function (event) {
      var xMove = event.originalEvent.touches[0].pageX;
      if (Math.floor(xClick - xMove) < 5) {
        $('#cases-carousel .carousel-wrapper .carousel').carousel('prev');
      } else if (Math.floor(xClick - xMove) > -5) {
        $('#cases-carousel .carousel-wrapper .carousel').carousel('next');
      }
    });
    $('#cases-carousel .carousel-wrapper .carousel').on(
      'touchend',
      function () {
        $(this).off('touchmove');
      }
    );
  }
);

$('#cases-carousel-2 .carousel-wrapper .carousel')
  .carousel({})
  .on('slid.bs.carousel', function (par1, par2) {
    var currentSlide = $('.active');
    if (currentSlide.is(':first-child')) {
      $('.carousel-control-prev')
        .css('pointer-events', 'none')
        .addClass('inactive-control');
      return;
    } else {
      $('.carousel-control-prev')
        .css('pointer-events', 'auto')
        .removeClass('inactive-control');
    }
    if (currentSlide.is(':last-child')) {
      $('.carousel-control-next')
        .css('pointer-events', 'none')
        .addClass('inactive-control');
      return;
    } else {
      $('.carousel-control-next')
        .css('pointer-events', 'auto')
        .removeClass('inactive-control');
    }
  });

$('#cases-carousel-2 .carousel-wrapper .carousel').on(
  'touchstart',
  function (event) {
    var xClick = event.originalEvent.touches[0].pageX;
    $(this).one('touchmove', function (event) {
      var xMove = event.originalEvent.touches[0].pageX;
      if (Math.floor(xClick - xMove) < 5) {
        $('#cases-carousel .carousel-wrapper .carousel').carousel('prev');
      } else if (Math.floor(xClick - xMove) > -5) {
        $('#cases-carousel .carousel-wrapper .carousel').carousel('next');
      }
    });
    $('#cases-carousel .carousel-wrapper .carousel').on(
      'touchend',
      function () {
        $(this).off('touchmove');
      }
    );
  }
);

///BOOTSTRAP FILTERS (jquery)

function eachBoxes(type, boxes) {
  if (type === 'all') {
    $(boxes).fadeIn();
  } else {
    $(boxes).each(function () {
      if (!$(this).hasClass(type)) {
        $(this).fadeOut('slow');
      } else {
        $(this).fadeIn();
      }
    });
  }
}

////DROPDOWN filter

$('.filter-input').on('change', function () {
  let type = $(this).children('option:selected').val();
  let boxes = $('.article');

  if (type === 'tecnologia') {
    eachBoxes('tecnologia', boxes);
  } else if (type === 'inovacao') {
    eachBoxes('inovacao', boxes);
  } else if (type === 'cooperacao') {
    eachBoxes('cooperacao', boxes);
  } else {
    eachBoxes('all', boxes);
  }
});

///INPUT FIELD filter

$(document).ready(function () {
  $('.search-input').on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $('#articles-filter .container .row .article').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

///NAVBAR
function openNavigation() {
  console.log('TEST');
  document.getElementById('mySidebar').style.width = '260px';
  $('.toggle-button').addClass('active-toggler');
  document.querySelector('main').style.marginLeft = '-260px';
}

function closeNavigation() {
  $('.toggle-button').removeClass('active-toggler');
  document.getElementById('mySidebar').style.width = '0px';
  document.querySelector('main').style.marginLeft = '0px';
}

toggleButton.addEventListener('click', openNavigation);

closeBtn.addEventListener('click', closeNavigation);
