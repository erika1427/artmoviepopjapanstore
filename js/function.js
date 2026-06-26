$(function () {
    //スライドメニュー -----------------------------------------------------------

    $('#btn__burger').on('click', function () { // 👈 修正1: #btn を #btn__burger に変更
        $('#btn__top').toggleClass('rotateTop'); // 👈 修正2: #btn__burger を #btn__top に変更
        $('#btn__middle').toggleClass('hideMiddle');
        $('#btn__bottom').toggleClass('rotateBottom');
        $('#gnav').toggleClass('translateNav');
    });

    $('.gnav__link').on('click', function () {
        if ($('#gnav').hasClass('translateNav')) {
            $('#gnav').removeClass('translateNav');
            $('#btn__top').removeClass('rotateTop');
            $('#btn__middle').removeClass('hideMiddle');
            $('#btn__bottom').removeClass('rotateBottom');
        }
    });
})