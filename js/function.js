$(function () {
    // スライドメニュー -----------------------------------------------------------

    $('#btn__burger').on('click', function () {
        $('#btn__top').toggleClass('rotateTop');
        $('#btn__middle').toggleClass('hideMiddle');
        $('#btn__bottom').toggleClass('rotateBottom');
        $('#gnav').toggleClass('translateNav');
        $('body').toggleClass('no-scroll');
    });

    $('.gnav__link').on('click', function () {
        if ($('#gnav').hasClass('translateNav')) {
            $('#gnav').removeClass('translateNav');
            $('#btn__top').removeClass('rotateTop');
            $('#btn__middle').removeClass('hideMiddle');
            $('#btn__bottom').removeClass('rotateBottom');
        }
    });

    // filters
    $('.filters__btn').on('click', function () {
        $('#filters').addClass('translateNav');
    })

    $('.filters__close').on('click', function () {
        $('#filters').removeClass('translateNav');
    })

    // 商品画像のSwiper初期化
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

    // 最新商品（Latest）のスライダー
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


    // --- 商品画像の虫眼鏡ズーム機能（バッファ100px版） --------------------------------

    // ① クリックでON/OFF切り替え
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

    // ② 画面全体（document）でマウスの動きを監視し、100pxのバッファ内なら追従・外なら終了する
    $(document).on('mousemove', function (e) {
        $('.product-slider .swiper-slide.is-zoomed').each(function () {
            var $slide = $(this);
            var $img = $slide.find('img');
            var offset = $slide.offset();
            var width = $slide.width();
            var height = $slide.height();
            var buffer = 100; // 👈 100pxのバッファエリア

            var mouseX = e.pageX;
            var mouseY = e.pageY;

            // 画像の枠 ＋ 100px の範囲内にマウスがいるかどうかを判定
            var isInsideWithBuffer = (
                mouseX >= offset.left - buffer &&
                mouseX <= offset.left + width + buffer &&
                mouseY >= offset.top - buffer &&
                mouseY <= offset.top + height + buffer
            );

            if (isInsideWithBuffer) {
                // バッファエリア内なら、拡大しながらマウスに追従させる
                updateOrigin(e, $slide, $img);
            } else {
                // 100pxを超えて完全に外に出たら、拡大モードを終了
                $slide.removeClass('is-zoomed');
                $img.css({ 'transform-origin': '50% 50%' });
            }
        });
    });

    // ③ 100pxのバッファも含めて全域を滑らかにマッピングする座標計算
    function updateOrigin(e, $slide, $img) {
        var offset = $slide.offset();
        var width = $slide.width();
        var height = $slide.height();
        var buffer = 100; // 👈 バッファの幅を統一

        // バッファを含めた全体の幅・高さを計算
        var totalWidth = width + (buffer * 2);
        var totalHeight = height + (buffer * 2);

        // バッファの左上端を基準（0,0）としたマウスの位置
        var mouseX = e.pageX - (offset.left - buffer);
        var mouseY = e.pageY - (offset.top - buffer);

        // バッファを含めたエリア全体を 0% 〜 100% に割り当てる
        var originX = Math.max(0, Math.min(100, (mouseX / totalWidth) * 100));
        var originY = Math.max(0, Math.min(100, (mouseY / totalHeight) * 100));

        $img.css({
            'transform-origin': originX + '% ' + originY + '%'
        });
    }
});