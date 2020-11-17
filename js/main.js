// wow = new WOW({
//     boxClass:     'wow',      
//     animateClass: 'animated', 
//     offset:       0,          
//     mobile:       false,       
//     live:         true        
// })
// wow.init();

function sliders() {
    $('.cat--unit__for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.cat--unit__nav'
    });
    $('.cat--unit__nav').slick({
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.cat--unit__for',
        dots: false,
        arrows: true,
        focusOnSelect: true,
        vertical: true,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });
}

sliders();

$(function(){

    $('.title').on('click', function() {
        $(this).children('.trigger').toggleClass('opened');
        $(this).siblings('.dropdown-menu').slideToggle();
    });
    $('.title .trigger').on('click', function() {
        $(this).toggleClass('opened');
        $(this).siblings('.dropdown-menu').slideToggle();
    });

    $('.rev-slider').slick({
        autoplay: true,
        slidesToShow: 3,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 710,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 430,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.open--modal').on('click', function(){
        var modal = $(this).attr('data-modal');
        $(modal).fadeIn();
        return false;
    });

    $('.trigger').on('click', function() {
        $(this).toggleClass('opened');
        $(this).siblings('.dropdown-menu').slideToggle();
    });

    $('.modal .close, .modal__layer').on('click', function(){
        $(this).parents('.modal').fadeOut();
        return false;
    });

    $('.steps_card').on('mouseover', function() {
        $(this).children('.popover').fadeIn();
    });
    $('.steps_card').on('mouseleave', function() {
        $(this).children('.popover').fadeOut();
    });

    $('.nav--btn').on('click', function(){
        if ($('header .nav').is(':visible')) {
            $('header .nav').slideUp();
            $(this).removeClass('open');
        } else {
            $('header .nav').slideDown();
            $(this).addClass('open');
        }
        return false;
    });

    $('.tel').inputmask('+7 (999) 999-99-99');
});

$(window).on("load",function(e){
    if ($(window).width() <= '1025'){
        $('header .submenu > a').on('click', function(){
            $(this).next().slideToggle();
            $('.preload').addClass('load').removeClass('loadR');
            return false;
        });
        $('header .submenu > a').attr('href', '#');
        $('.submenu').on('mouseleave', function(){
            $(this).children('.submenu__block').slideUp();
        });
    } else {
        $('header .submenu > a').on('mouseover', function(){
            $(this).next().fadeIn();
        });
        $('.submenu').on('mouseleave', function(){
            $(this).children('.submenu__block').fadeOut();
        });
    }
});

setTimeout(function(){
    $('.preload').addClass('load');
    wow = new WOW({
        boxClass:     'wow',      
        animateClass: 'animated', 
        offset:       0,          
        mobile:       false,       
        live:         true        
    })
    wow.init();
}, 600);

$('a:not([href^="mailto\\:"], [href$="\\#"], [href^="tel\\:"], [target="_blank"], [data-fancybox])').click(function(e) {
    var anchor = $(this), h;
    h = anchor.attr('href');
    e.preventDefault();
    setTimeout(function(){
        window.location = h;
    }, 250);
    $('.preload').addClass('loadR');
});

window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload() 
    }
};

// $(function(){
//     $('.btn--up').bind('click.smoothscroll',function (e) {
//         e.preventDefault();
//         var target = this.hash,
//         $target = $(target);

//         $('html, body').stop().animate({
//             'scrollTop': $target.offset().top
//             }, 1000, 'swing', function () {
//             window.location.hash = target;
//         });
//     });

//     $(window).scroll(function(){
//         var bo = $(this).scrollTop();
//         var a = $(".btn--up").css('opacity')
//         if ( bo >= 200 && a == 0) {$(".btn--up").stop().animate({'opacity':'1'},400)};
//         if ( bo < 200 && a == 1) {$(".btn--up").stop().animate({'opacity':'0'},400)};
//     });
// });


/* lazyload 2 */
    /*!
 * Lazy Load - JavaScript plugin for lazy loading images
 *
 * Copyright (c) 2007-2019 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://appelsiini.net/projects/lazyload
 *
 * Version: 2.0.0-rc.2
 *
 */

(function (root, factory) {
if (typeof exports === "object") {
    module.exports = factory(root);
    } else if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.LazyLoad = factory(root);
    }
}) (typeof global !== "undefined" ? global : this.window || this.global, function (root) {

    "use strict";

    if (typeof define === "function" && define.amd){
        root = window;
    }

    const defaults = {
        src: "data-src",
        srcset: "data-srcset",
        selector: ".lazyload",
        root: null,
        rootMargin: "0px",
        threshold: 0
    };

    /**
    * Merge two or more objects. Returns a new object.
    * @private
    * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
    * @param {Object}   objects  The objects to merge together
    * @returns {Object}          Merged values of defaults and options
    */
    const extend = function ()  {

        let extended = {};
        let deep = false;
        let i = 0;
        let length = arguments.length;

        /* Check if a deep merge */
        if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
            deep = arguments[0];
            i++;
        }

        /* Merge the object into the extended object */
        let merge = function (obj) {
            for (let prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    /* If deep merge and property is an object, merge properties */
                    if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
                        extended[prop] = extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        /* Loop through each object and conduct a merge */
        for (; i < length; i++) {
            let obj = arguments[i];
            merge(obj);
        }

        return extended;
    };

    function LazyLoad(images, options) {
        this.settings = extend(defaults, options || {});
        this.images = images || document.querySelectorAll(this.settings.selector);
        this.observer = null;
        this.init();
    }

    LazyLoad.prototype = {
        init: function() {

            /* Without observers load everything and bail out early. */
            if (!root.IntersectionObserver) {
                this.loadImages();
                return;
            }

            let self = this;
            let observerConfig = {
                root: this.settings.root,
                rootMargin: this.settings.rootMargin,
                threshold: [this.settings.threshold]
            };

            this.observer = new IntersectionObserver(function(entries) {
                Array.prototype.forEach.call(entries, function (entry) {
                    if (entry.isIntersecting) {
                        self.observer.unobserve(entry.target);
                        let src = entry.target.getAttribute(self.settings.src);
                        let srcset = entry.target.getAttribute(self.settings.srcset);
                        if ("img" === entry.target.tagName.toLowerCase()) {
                            if (src) {
                                entry.target.src = src;
                            }
                            if (srcset) {
                                entry.target.srcset = srcset;
                            }
                        } else {
                            entry.target.style.backgroundImage = "url(" + src + ")";
                        }
                    }
                });
            }, observerConfig);

            Array.prototype.forEach.call(this.images, function (image) {
                self.observer.observe(image);
            });
        },

        loadAndDestroy: function () {
            if (!this.settings) { return; }
            this.loadImages();
            this.destroy();
        },

        loadImages: function () {
            if (!this.settings) { return; }

            let self = this;
            Array.prototype.forEach.call(this.images, function (image) {
                let src = image.getAttribute(self.settings.src);
                let srcset = image.getAttribute(self.settings.srcset);
                if ("img" === image.tagName.toLowerCase()) {
                    if (src) {
                        image.src = src;
                    }
                    if (srcset) {
                        image.srcset = srcset;
                    }
                } else {
                    image.style.backgroundImage = "url('" + src + "')";
                }
            });
        },

        destroy: function () {
            if (!this.settings) { return; }
            this.observer.disconnect();
            this.settings = null;
        }
    };

    root.lazyload = function(images, options) {
        return new LazyLoad(images, options);
    };

    if (root.jQuery) {
        const $ = root.jQuery;
        $.fn.lazyload = function (options) {
            options = options || {};
            options.attribute = options.attribute || "data-src";
            new LazyLoad($.makeArray(this), options);
            return this;
        };
    }

    return LazyLoad;
});


let timerStartStr = Date.parse("November 1 2020 23:59:59 GMT+0600");

let sector1time = Date.parse("March 1 2021 23:59:59 GMT+0600");
let sector2time = Date.parse("March 25 2021 23:59:59 GMT+0600");
let sector3time = Date.parse("April 5 2021 23:59:59 GMT+0600");
let sector4time = Date.parse("April 12 2021 23:59:59 GMT+0600");

let simpleNow = Date.parse(new Date());

function updateNow() {
    simpleNow = new Date();
    simpleNow = Date.parse(simpleNow);
    return simpleNow;
}

let pointer = document.createElement('div');
pointer.className = "pointer";
pointer.id="pointer";

let timerstart= timerStartStr;
let fulltime= sector1time - timerstart;
let currtime = updateNow() - timerstart;

let difference = fulltime - currtime;

let tryit = currtime*100;
tryit = tryit / fulltime;

function updateArr() {
    let simpleNow = updateNow();

if (simpleNow <= sector1time) {
    let timerstart= timerStartStr;
    let fulltime= sector1time - timerstart;
    let currtime = simpleNow - timerstart;
    let difference = fulltime - currtime;
    let tryit = currtime*100;
    tryit = tryit / fulltime;
    initializeClock('countdown', sector1time);
    $('.sector1').append(pointer);
    $('#pointer').css({'left': tryit + '%'});
    console.log(tryit + '%');
    } else if (simpleNow <= sector2time) {
        let timerstart= sector1time;
        let fulltime= sector2time - timerstart;
        let currtime = simpleNow - timerstart;
        let difference = fulltime - currtime;
        let tryit = currtime*100;
        tryit = tryit / fulltime;
        initializeClock('countdown', sector2time);
        $('.sector2').append(pointer);

    } else if (simpleNow <= sector3time) {
        let timerstart= sector2time;
        let fulltime= sector3time - timerstart;
        let currtime = simpleNow - timerstart;
        let difference = fulltime - currtime;
        let tryit = currtime*100;
        tryit = tryit / fulltime;
        initializeClock('countdown', sector3time);
        $('.sector3').append(pointer);

    } else if (simpleNow <= sector4time) {
        let timerstart= sector3time;
        let fulltime= sector4time - timerstart;
        let currtime = simpleNow - timerstart;
        let difference = fulltime - currtime;
        let tryit = currtime*100;
        tryit = tryit / fulltime;
        initializeClock('countdown', sector4time);
        $('.sector4').append(pointer);
    }

}

setInterval(() => updateArr(), 2000)



function getTimeRemaining(endtime) {
    var t = endtime - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  
  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
      var t = getTimeRemaining(endtime);

  
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
  
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }

