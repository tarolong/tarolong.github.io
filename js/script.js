$(document).ready(function () {

    // 화면에서 이동할 수 있는 페이지의 아이디를 저장한다.    
    // 1. move 클래스를 찾는다.
    let move_arr = $('.gnb .move');

    // 2. href 의 #id 글자를 읽는다.
    // 3. screen_arr 완성
    let screen_arr = [];
    $.each(move_arr, function (index, item) {
        let temp = $(this).attr('href');
        screen_arr.push(temp);
    });

    // 전체 화면의 개수 파악
    let screen_total = screen_arr.length;

    // 각각의 화면의 body 태그 기준으로 몇 픽셀 이동하는가?
    let screen_pos_arr = [0];
    for (let i = 0; i < screen_total; i++) {
        let temp = $(screen_arr[i]);
        let temp_y = temp.offset().top;
        temp_y = Math.ceil(temp_y);

        screen_pos_arr.push(temp_y);
    }
    // visual 은 강제로 추가했으므로 
    screen_total += 1;

    $('.logo').click(function (event) {
        event.preventDefault();
        screen_index = 0;
        moveScreen();
    });

    // 메뉴 이동 코드 샘플
    $.each(move_arr, function (index, item) {
        $(this).click(function (event) {
            // href 를 막는다.
            event.preventDefault();

            screen_index = index + 1;
            moveScreen();
        });
    });
    /////////////////////////////////////////////////////////////// 
    let screen_index = 0; // 현재 보이는 화면 번호
    let screen_move_active = true; // 휠 움직임 가능 true

    $(window).bind('mousewheel DOMMouseScroll', function (event) {
        var distance = event.originalEvent.wheelDelta;

        // distance 가 양수이면 사용자가 마우스 중간휠을 위로 스크롤하면 body가 내려간다.
        // distance 가 음수이면 사용자가 마우스 중간휠을 아래로 스크롤하면 body가 올라간다.
        // 만약 distance가 없다면
        if (distance == null) {
            distance = event.originalEvent.detail * -1;
        }
        // console.log(distance); 

        // 햄버거 메뉴가 펼쳐진 상태면 리터~
        if (fix_menu_active == true) {
            return;
        }

        // 연속 휠에 의한 화면이동을 방지한다.
        if (screen_move_active == false) {
            return;
        }

        screen_move_active = false;

        // 화면 번호 갱신
        if (distance < 0) {
            screen_index += 1;
            if (screen_index >= screen_total - 1) {
                screen_index = screen_total - 1;
            }
        } else {
            screen_index -= 1;
            if (screen_index < 0) {
                screen_index = 0;
            }
        }
        // console.log(screen_index);
        moveScreen();
    });

    // 화면 이동 코드
    function moveScreen() {

        // scrollNice 와의 연동 처리
        if (screen_index == 3) {
            $('.front-main').scrollTop(0);
        }

        // 움직임 코드
        $('html, body').stop().animate({
            scrollTop: screen_pos_arr[screen_index]
        }, 500, function () {
            screen_move_active = true;

        });
    }


    // 최초 한번은 자동으로 0 으로 보낸다.
    moveScreen();

    // 햄버거 메뉴
    let fix_wrap = $('.fix-wrap');
    let fix_menu = $('.fix-menu');
    let header = $('.header');
    // 마우스 휠을 막아주기 위한 처리
    let fix_menu_active = false;


    fix_menu.click(function () {
        fix_wrap.toggleClass('fix-wrap-active');
        fix_menu_active = !fix_menu_active;
    });

    // 스크롤바의 위치
    let sc_y = $(window).scrollTop();

    $(window).scroll(function () {
        sc_y = $(window).scrollTop();
        if (sc_y > 0) {
            fix_menu.addClass('fix-menu-active');
            header.hide();
        } else {
            fix_menu.removeClass('fix-menu-active');
            header.show();
        }
    });

    // fix 메뉴 클릭 관련
    let fix_gnb_a = $('.fix-gnb .move');
    $.each(fix_gnb_a, function (index, item) {
        $(this).click(function (event) {
            event.preventDefault();
            screen_index = index + 1;
            moveScreen();
            fix_wrap.removeClass('fix-wrap-active');

            // 마우스 휠을 살려준다.
            fix_menu_active = false;

        });
    });


});

window.onload = function () {

    let sw_publ = new Swiper('.sw-publ', {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });

    $('.sw-publ').mouseenter(function () {
        sw_publ.autoplay.stop();
    });

    $('.sw-publ').mouseleave(function () {
        sw_publ.autoplay.start();
    });


    let sw_design = new Swiper('.sw-design', {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });

    $('.sw-design').mouseenter(function () {
        sw_design.autoplay.stop();
    });

    $('.sw-design').mouseleave(function () {
        sw_design.autoplay.start();
    });


    $(".front-main").niceScroll({
        cursorborder: "none",
        cursorwidth: "5px",
        boxzoom: true,
        dblclickzoom: true,
        bouncescroll: true,
    });

    var bar_html = new ProgressBar.Line(skill_html, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 1400,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {
            width: '100%',
            height: '100%'
        },
        from: {
            color: '#FFEA82'
        },
        to: {
            color: '#ED6A5A'
        },
        step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);
        }
    });

    var bar_css = new ProgressBar.Circle(skill_css, {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: {
            color: '#aaa',
            width: 1
        },
        to: {
            color: '#333',
            width: 4
        },
        // Set default step function for all animate calls
        step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value);
            }

        }
    });
    bar_css.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar_css.text.style.fontSize = '2rem';

    // 스킬 모션을 할 범위를 파악하여야 한다.
    let profile_pos = $('.profile').offset().top;
   
    $(window).scroll(function(){
        var sc_y = $(window).scrollTop();

        if(sc_y >= profile_pos) {
            bar_html.animate(8.5); // Number from 0.0 to 1.0
            bar_css.animate(9.0); // Number from 0.0 to 1.0
        }else{
            // bar_html.set(0); // Number from 0.0 to 1.0
            // bar_css.set(0); // Number from 0.0 to 1.0
        }

    });

    

}