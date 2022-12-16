"use strict";

function toggleCrumbs(e) {
  "A" !== event.target.nodeName && e.classList.add("open");
}

var b = 0;
var num = 0;

function decrease(e) {
  e.classList.add('disabled');
  b = e.nextElementSibling.value;
  num = Number(b);

  if (b > 0) {
    num -= 1;
    e.nextElementSibling.value = num;
  }

  if (num > 0) {
    e.classList.remove('disabled');
  }

  if (num === 0) {
    e.classList.add('disabled');
  }
}

function increase(e) {
  b = e.previousElementSibling.value;
  num = Number(b);
  num += 1;
  e.previousElementSibling.value = num;
  var parent = e.parentElement;
  var minus = parent.children[0];

  if (num > 0) {
    minus.classList.remove('disabled');
  }
}

var toggleFilter = function toggleFilter() {
  var items = document.querySelectorAll('.filter .item');
  items.forEach(function (el) {
    el.addEventListener('click', function () {
      el.classList.toggle('active');
    });
  });
};

toggleFilter();

var clearChecks = function clearChecks() {
  var clear = document.querySelector('.clear'),
      check = document.querySelectorAll('.check input');

  if (clear) {
    clear.addEventListener('click', function () {
      check.forEach(function (el) {
        return el.checked = false;
      });
    });
  }
};

clearChecks(); //Simple validation

var form = document.querySelector('.form');

if (form) {
  var userName = form.querySelector(".user-name");
  var userPhone = form.querySelector(".user-phone");

  var sendForm = function sendForm() {
    var successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';
    var statusMessage = document.createElement('div');
    statusMessage.style.color = '#000000';
    statusMessage.style.marginTop = '25px';

    var clear = function clear() {
      setTimeout(function () {
        form.querySelectorAll('input').forEach(function (element) {
          element.value = '';
        });
        form.querySelectorAll('textarea').forEach(function (element) {
          element.value = '';
        });
        form.querySelectorAll('.form__wrapper').forEach(function (el) {
          return el.classList.remove('success');
        });
        statusMessage.textContent = '';
        var modal = document.querySelector(".modal");

        if (modal) {
          modal.classList.remove('active');
        }
      }, 3000);
    }; //Show Error Message //


    function showError(input, message) {
      var formField = input.parentElement;
      formField.className = "form__wrapper error";

      if (formField.className = "form__wrapper error") {
        var alert_message = formField.querySelector(".alert-message");
        alert_message.classList.add('active');
        alert_message.innerText = message;
      }
    } //Show Success //


    function showSuccess(input) {
      var formField = input.parentElement;
      formField.className = "form__wrapper success";

      if (formField.className = "form__wrapper success") {
        var alert_message = formField.querySelector(".alert-message");
        alert_message.classList.remove('active');
      }
    }

    if (userName.value === "" || userName.value.length < 3 || userPhone.value === "" || userPhone.value.length < 3) {
      showError(userName, "Поле не может быть пустым");
      showError(userPhone, "Введите номер телефона");
    } else {
      showSuccess(userName);
      showSuccess(userPhone);
      form.appendChild(statusMessage);
      statusMessage.textContent = successMessage;
      clear();
    }

    userName.addEventListener('input', function () {
      showSuccess(userName);
    });
    userPhone.addEventListener('input', function () {
      if (userPhone.value.length > 10) {
        showSuccess(userPhone);
      }
    });

    if (userName.value !== "") {
      showSuccess(userName);
    }

    if (userPhone.value !== "") {
      showSuccess(userPhone);
    }
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    sendForm();
  });
  userPhone.addEventListener('input', function () {
    userPhone.value = userPhone.value.replace(/[^0-9+]/g, '');
    userPhone.value = userPhone.value.replace(/\w{13,}/g, '');
  });
}

var baseScrollTop = function baseScrollTop() {
  var btnTop = document.querySelector('.up');

  var TopscrollTo = function TopscrollTo() {
    if (window.scrollY !== 0) {
      setTimeout(function () {
        window.scrollTo(0, window.scrollY - 30);
        TopscrollTo();
      }, 5);
    }
  };

  btnTop.addEventListener('click', TopscrollTo);
};

baseScrollTop();

function getCookie(name) {
  var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function checkCookie() {
  var cookie = getCookie('confirm_cookie'),
      modal = document.getElementById('cookie');

  if (typeof cookie === "undefined") {
    modal.classList.add('active');
  }
}

function cookieConfirm() {
  var date = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      modal = document.getElementById('cookie');
  date = date.toUTCString();
  document.cookie = "confirm_cookie=" + 1 + "; expires=" + date + "; path=/";
  modal.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    checkCookie();
  }, 10000);
});

var openSearch = function openSearch() {
  var buttonSearch = document.querySelector('.button-search'),
      imgSearch = document.querySelector('.button-search .img-search'),
      imgClose = document.querySelector('.button-search .img-close');

  if (buttonSearch) {
    imgSearch.addEventListener('click', function () {
      return buttonSearch.classList.add('active');
    });
    imgClose.addEventListener('click', function () {
      return buttonSearch.classList.remove('active');
    });
  }
};

openSearch();

function hideAll() {
  var el = document.querySelectorAll('.menu .item');

  for (var i = 0; i < el.length; i++) {
    el[i].classList.remove('active');
  }
}

var toggleMenu = function toggleMenu() {
  var burger = document.querySelector('.burger'),
      menu = document.querySelector('.menu');
  burger.addEventListener('click', function () {
    menu.classList.toggle('active');
    burger.classList.toggle('active');
    hideAll();
  });
};

var toggleMenuItems = function toggleMenuItems() {
  var accordion = document.querySelector('.menu');
  accordion.addEventListener('click', change);

  function change(event) {
    var target = event.target;
    if (!target.classList.contains('toggle')) return;
    var parent = target.parentNode.parentNode;

    if (parent.classList.contains('active')) {
      hideAll();
    } else {
      hideAll();
      parent.classList.add('active');
    }
  }
};

if (window.innerWidth < 768) {
  toggleMenu();
  toggleMenuItems();
}

var headerTop = document.querySelector('.root-top');
window.addEventListener('scroll', function () {
  window.scrollY > 0 ? headerTop.classList.add("active") : headerTop.classList.remove("active");
});

var aboutSlider = function aboutSlider() {
  var swiper = new Swiper(".aboutNext", {
    pagination: {
      clickable: true
    },
    loop: true,
    speed: 1600,
    dots: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true
    },
    navigation: {
      nextEl: ".about-next",
      prevEl: ".about-prev"
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        }
      }
    }
  });
};

aboutSlider();

var articlesSlider = function articlesSlider() {
  var swiper = new Swiper(".articles", {
    speed: 1500,
    dots: false,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    spaceBetween: 10,
    slidersPerView: 1,
    navigation: {
      nextEl: ".articles-next",
      prevEl: ".articles-prev"
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  });
};

articlesSlider();

var actionPaginationItems = function actionPaginationItems() {
  var articlesPagination = document.querySelector('.articles-pagination'),
      prev = document.querySelector('#prev');

  if (prev) {
    articlesPagination.addEventListener('click', function (event) {
      event.preventDefault();

      if (!event.target.classList.contains('default')) {
        prev.classList.remove('default');
      }

      if (event.target.classList.contains('first')) {
        prev.classList.add('default');
      }
    });
  }
};

actionPaginationItems();

var certificatesSlider = function certificatesSlider() {
  var swiper = new Swiper(".certificatesSlider", {
    slidesPerView: "auto",
    spaceBetween: 20,
    dots: true,
    pagination: {
      clickable: true
    },
    speed: 600,
    breakpoints: {
      320: {
        slidesPerView: 1.5,
        spaceBetween: 12,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        }
      },
      576: {
        slidesPerView: 2.5,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        }
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        }
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        }
      }
    }
  });
};

certificatesSlider();
var myMap;
var mapBox = document.getElementById('map');

if (mapBox) {
  ymaps.ready(function () {
    myMap = new ymaps.Map('map', {
      center: [55.762014, 37.585170],
      zoom: 15
    }, {
      searchControlProvider: 'yandex#search'
    });
    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('typeSelector');
    myMap.controls.remove('fullscreenControl');
    myMap.controls.remove('rulerControl');
    myMap.behaviors.disable('scrollZoom');
    var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: '',
      balloonContent: 'а'
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'images/point.svg',
      iconImageSize: [32, 41],
      iconImageOffset: [-5, -38]
    });
    myMap.geoObjects.add(myPlacemark);
  });
}

var employeesSlider = function employeesSlider() {
  var swiper = new Swiper(".team", {
    speed: 1500,
    dots: false,
    loop: true,
    pagination: {
      clickable: true
    },
    spaceBetween: 10,
    slidersPerView: 1,
    navigation: {
      nextEl: ".team-next",
      prevEl: ".team-prev"
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: false
      }
    }
  });
};

employeesSlider();

function acc() {
  var accordions = document.querySelectorAll('.faq');

  if (accordions) {
    accordions.forEach(function (elem) {
      elem.addEventListener('click', change);

      function change(event) {
        var target = event.target;
        if (!target.classList.contains('faq__title')) return;

        if (target.classList.contains('active')) {
          hideAll();
        } else {
          hideAll();
          target.classList.add('active');
          showText(target.nextElementSibling);
          target.parentNode.classList.add('active');
        }
      }

      function hideAll() {
        var el = elem.querySelectorAll('.faq__item');
        var titleEl = elem.querySelectorAll('.faq__title');
        var contentEl = elem.querySelectorAll('.faq__content');

        for (var i = 0; i < titleEl.length; i++) {
          titleEl[i].classList.remove('active');
        }

        for (var _i = 0; _i < el.length; _i++) {
          el[_i].classList.remove('active');
        }

        for (var _i2 = 0; _i2 < contentEl.length; _i2++) {
          contentEl[_i2].style.height = '0';
        }
      }

      function showText(textEl) {
        textEl.style.height = textEl.scrollHeight + 30 + 'px';
      }
    });
  }
}

acc();

var tabsFunc = function tabsFunc() {
  'use strict';

  var tab = document.querySelectorAll('.header-tab'),
      header = document.querySelector('.tabs'),
      tabContent = document.querySelectorAll('.tab-content');

  function hideTabContent(a) {
    for (var i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
      tab[i].classList.remove('active');
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
      tab[b].classList.add('active');
    }
  }

  if (header) {
    header.addEventListener('click', function (event) {
      var target = event.target;

      if (target && target.classList.contains('header-tab')) {
        for (var i = 0; i < tab.length; i++) {
          if (target == tab[i]) {
            hideTabContent(0);
            showTabContent(i);
            break;
          }
        }
      }
    });
  }
};

window.addEventListener('DOMContentLoaded', function () {
  tabsFunc();
});
var SwiperTop = new Swiper('.partners-top', {
  spaceBetween: 0,
  centeredSlides: true,
  speed: 6000,
  autoplay: {
    delay: 1
  },
  loop: true,
  slidesPerView: 'auto',
  allowTouchMove: false,
  disableOnInteraction: true
});

var projectSlider = function projectSlider() {
  var swiper = new Swiper(".projectSlider", {
    speed: 1500,
    dots: false,
    fadeEffect: {
      crossFade: true
    },
    virtualTranslate: true,
    loop: true,
    navigation: {
      nextEl: ".project-next",
      prevEl: ".project-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: true
    },
    slidersPerView: 1,
    effect: "fade"
  });
};

projectSlider();

var projectRelated = function projectRelated() {
  var swiper = new Swiper(".projectRelated", {
    speed: 2500,
    dots: true,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: true
    },
    pagination: {
      clickable: true
    },
    spaceBetween: 10,
    slidersPerView: 1,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        }
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        }
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        }
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        }
      }
    }
  });
};

projectRelated();

var reviewsSliderNext = function reviewsSliderNext() {
  var swiper = new Swiper(".reviewsSlider-next", {
    spaceBetween: 30,
    pagination: {
      clickable: true
    },
    autoplay: false,
    loop: true,
    speed: 1600,
    dots: true,
    on: {
      init: onInit,
      transitionEnd: removeClass
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 50,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        }
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        }
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        }
      }
    }
  });
};

reviewsSliderNext();

var reviewsSlider = function reviewsSlider() {
  var swiper = new Swiper(".reviewsSlider", {
    spaceBetween: 30,
    pagination: {
      clickable: true
    },
    autoplay: false,
    loop: true,
    speed: 1600,
    dots: true,
    on: {
      init: onInit,
      transitionEnd: removeClass
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 120,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        }
      }
    }
  });
};

reviewsSlider();

function onInit(slider) {
  slider.slides.forEach(function (el) {
    el.addEventListener('click', function (e) {
      return e.target.classList.contains('button') ? el.classList.add('active') : '';
    });
  });
}

function removeClass(slider) {
  slider.slides.forEach(function (el) {
    return el.classList.remove('active');
  });
}

var servicesSlider = function servicesSlider() {
  var swiper = new Swiper(".services", {
    speed: 1500,
    dots: false,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: true
    },
    spaceBetween: 10,
    slidersPerView: 1,
    navigation: {
      nextEl: ".slider-next",
      prevEl: ".slider-prev"
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  });
};

servicesSlider();

var sidebarGallery = function sidebarGallery() {
  var swiper = new Swiper(".sidebar-gallery", {
    speed: 1500,
    dots: false,
    loop: true,
    navigation: {
      nextEl: ".gallery-next",
      prevEl: ".gallery-prev"
    },
    pagination: {
      clickable: true
    },
    slidersPerView: 1
  });
};

sidebarGallery();

var serviceGallery = function serviceGallery() {
  var swiper = new Swiper(".service-gallery", {
    speed: 1500,
    dots: false,
    loop: true,
    navigation: {
      nextEl: ".service-next",
      prevEl: ".service-prev"
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: true
    },
    pagination: {
      clickable: true
    },
    slidersPerView: 1
  });
};

serviceGallery();

var introSlider = function introSlider() {
  var swiper = new Swiper(".slider", {
    speed: 2500,
    dots: false,
    fadeEffect: {
      crossFade: true
    },
    virtualTranslate: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: true
    },
    slidersPerView: 1,
    effect: "fade"
  });
};

introSlider();

var actionFilter = function actionFilter() {
  var tariffs = document.querySelector('.tariffs'),
      toggleBtn = document.querySelector('.tariffs .button'),
      substrate = document.querySelector('.tariffs .substrate'),
      filter = document.querySelector('.filter-tariffs');

  if (tariffs) {
    toggleBtn.addEventListener('click', function () {
      filter.classList.toggle('active');
      toggleBtn.classList.toggle('active');
      substrate.classList.toggle('active');
    });
  }
};

if (window.innerWidth < 1200) {
  actionFilter();
}