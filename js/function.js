$(function () {

    // スライドメニュー 
    $('#btn__burger').on('click', function () {
        $('#btn__top').toggleClass('rotateTop');
        $('#btn__middle').toggleClass('hideMiddle');
        $('#btn__bottom').toggleClass('rotateBottom');
        
        if ($('#gnav').hasClass('translateNav')) {
            $('#gnav').removeClass('translateNav');
            setTimeout(function() {
                $('body').removeClass('no-scroll');
            }, 500); 
        } else {
            $('#gnav').addClass('translateNav');
            $('body').addClass('no-scroll');
        }
    });

    $('.gnav__link').on('click', function () {
        if ($('#gnav').hasClass('translateNav')) {
            $('#gnav').removeClass('translateNav');
            $('#btn__top').removeClass('rotateTop');
            $('#btn__middle').removeClass('hideMiddle');
            $('#btn__bottom').removeClass('rotateBottom');
            
            setTimeout(function() {
                $('body').removeClass('no-scroll');
            }, 500);
        }
    });

    // filters
    // $('.filters__btn').on('click', function () {
    //     $('#filters').addClass('translateNav');
    //     // $('body').toggleClass('no-scroll');

    //     if ($('.filters__btn').hasClass('translateNav')) {
    //         $('.filters__btn').removeClass('translateNav');
    //         $('body').removeClass('no-scroll');
    //     } else {
    //         $('.filters__btn').addClass('translateNav');
    //         $('body').addClass('no-scroll');
    //     }
    // })

    $('.filters__btn').on('click', function () {
        $('#filters').addClass('translateNav');
        $('body').addClass('is-filter-open'); // スクロール停止（ブレンドはキープ）
    });

    $('.filters__item').on('click', function () {
        $(this).toggleClass('is-active');

        let activeFilters = [];
        $('.filters__item.is-active').each(function () {
            activeFilters.push($(this).data('filter'));
        });

        var count = $('.filters__item.is-active').length;
        $('.filters__count').text('FILTERS (' + count + ')');

        // 商品の絞り込み
        if (activeFilters.length === 0) {
            $('.items__box').fadeIn(300);
        } else {
            $('.items__box').each(function () {
                let categoryAttr = $(this).data('category') || "";
                let itemCategories = categoryAttr.split(' ');

                let isMatch = activeFilters.some(filter => itemCategories.includes(filter));

                if (isMatch) {
                    $(this).fadeIn(300);
                } else {
                    $(this).fadeOut(300);
                }
            });
        }
    })

    $('.filters__clear').on('click', function () {
        $('.filters__item').removeClass('is-active');
        $('.filters__count').text('FILTERS (0)');
        $('.items__box').fadeIn(300);
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('#filters').length && !$(e.target).closest('.filters__btn').length) {
            if ($('#filters').hasClass('translateNav')) {
                $('#filters').removeClass('translateNav');
                $('body').removeClass('is-filter-open');
            }
        }
    });

    $('.filters__close').on('click', function () {
        $('#filters').removeClass('translateNav');
        $('body').removeClass('is-filter-open');
    });

    var productSlider = new Swiper('.product-slider', {
        loop: false,
        allowTouchMove: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    let latestSwiper;

    const initLatestSwiper = () => {
        if (window.innerWidth >= 1024) {
            if (!latestSwiper) {
                latestSwiper = new Swiper('.latest-swiper', {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    loop: false,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.latest__slider-wrapper .swiper-button-next',
                        prevEl: '.latest__slider-wrapper .swiper-button-prev',
                    },
                });
            }
        } else {
            if (latestSwiper) {
                latestSwiper.destroy(true, true);
                latestSwiper = undefined;
            }
        }
    };

    initLatestSwiper();
    window.addEventListener('resize', initLatestSwiper);

    // Similar Items のスライダー
    let similarSwiper;

    const initSimilarSwiper = () => {
        if (window.innerWidth >= 1024) {
            if (!similarSwiper) {
                similarSwiper = new Swiper('.similar-swiper', {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    loop: false,
                    navigation: {
                        nextEl: '.similar .swiper-button-next',
                        prevEl: '.similar .swiper-button-prev',
                    },
                });
            }
        } else {
            if (similarSwiper) {
                similarSwiper.destroy(true, true);
                similarSwiper = undefined;
            }
        }
    };

    initSimilarSwiper();
    window.addEventListener('resize', initSimilarSwiper);

    // Pick Items のスライダー
    let picksSwiper;

    const initPicksSwiper = () => {
        if (window.innerWidth >= 1024) {
            if (!picksSwiper) {
                picksSwiper = new Swiper('.picks-swiper', {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    loop: false,
                    navigation: {
                        nextEl: '.picks .swiper-button-next',
                        prevEl: '.picks .swiper-button-prev',
                    },
                });
            }
        } else {
            if (picksSwiper) {
                picksSwiper.destroy(true, true);
                picksSwiper = undefined;
            }
        }
    };

    initPicksSwiper();
    window.addEventListener('resize', initPicksSwiper);


    // 虫眼鏡
    $('.product-slider .swiper-slide').on('click', function (e) {
        var $slide = $(this);
        var $img = $slide.find('img');

        $slide.toggleClass('is-zoomed');

        if ($slide.hasClass('is-zoomed')) {
            updateOrigin(e, $slide, $img);
        } else {
            $img.css({ 'transform-origin': '50% 50%' });
        }
    });

    $(document).on('mousemove', function (e) {
        $('.product-slider .swiper-slide.is-zoomed').each(function () {
            var $slide = $(this);
            var $img = $slide.find('img');
            var offset = $slide.offset();
            var width = $slide.width();
            var height = $slide.height();
            var buffer = 100;

            var mouseX = e.pageX;
            var mouseY = e.pageY;

            var isInsideWithBuffer = (
                mouseX >= offset.left - buffer &&
                mouseX <= offset.left + width + buffer &&
                mouseY >= offset.top - buffer &&
                mouseY <= offset.top + height + buffer
            );

            if (isInsideWithBuffer) {
                updateOrigin(e, $slide, $img);
            } else {
                $slide.removeClass('is-zoomed');
                $img.css({ 'transform-origin': '50% 50%' });
            }
        });
    });

    function updateOrigin(e, $slide, $img) {
        var offset = $slide.offset();
        var width = $slide.width();
        var height = $slide.height();
        var buffer = 100;

        var totalWidth = width + (buffer * 2);
        var totalHeight = height + (buffer * 2);

        var mouseX = e.pageX - (offset.left - buffer);
        var mouseY = e.pageY - (offset.top - buffer);

        var originX = Math.max(0, Math.min(100, (mouseX / totalWidth) * 100));
        var originY = Math.max(0, Math.min(100, (mouseY / totalHeight) * 100));

        $img.css({
            'transform-origin': originX + '% ' + originY + '%'
        });
    }
});