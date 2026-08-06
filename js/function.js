$(function () {
    //スライドメニュー -----------------------------------------------------------

    $('#btn__burger').on('click', function () { // 👈 修正1: #btn を #btn__burger に変更
        $('#btn__top').toggleClass('rotateTop'); // 👈 修正2: #btn__burger を #btn__top に変更
        $('#btn__middle').toggleClass('hideMiddle');
        $('#btn__bottom').toggleClass('rotateBottom');
        $('#gnav').toggleClass('translateNav');
        // bodyタグに 'no-scroll' クラスを付け外しする
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
        loop: false, // 最後までいったら最初に戻る
        allowTouchMove: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true, // ドットをクリック可能にする
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // 最新商品（Latest）のスライダー
    let latestSwiper;

    const initLatestSwiper = () => {
        // 画面幅が1024px以上の場合
        if (window.innerWidth >= 1024) {
            if (!latestSwiper) {
                latestSwiper = new Swiper('.latest-swiper', {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    loop: true,
                    navigation: {
                        // 👇 ここを変更：他のスライダーの矢印と喧嘩しないように確実に指定！
                        nextEl: '.latest-swiper .swiper-button-next',
                        prevEl: '.latest-swiper .swiper-button-prev',
                    },
                });
            }
        } else {
            // 1024px未満の場合、Swiperを破壊してただのHTMLに戻す
            if (latestSwiper) {
                latestSwiper.destroy(true, true);
                latestSwiper = undefined;
            }
        }
    };

    // 👇 ここを変更：ページが読み込まれたら '待たずに' 即実行させる！
    initLatestSwiper();
    window.addEventListener('resize', initLatestSwiper);
})