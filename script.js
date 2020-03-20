var mobile;
const scrollSpeed = 600;
$(document).ready(function() {
  var menuH = $(".menu").height() - 1;
  var mmenuH = $("div.nav").height() - 1;
  var scroll = $(window).scrollTop();

  mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
    navigator.userAgent
  );

  if (!mobile) {
    //BETTER BLOCK APPEAR
    $(".block").each(function() {
      var top = $(this).offset().top - $(window).height() * 0.8;
      if (scroll <= top && !$(this).hasClass("anim-block")) {
        $(this).css("visibility", "hidden");
      }
    });
  }

  //RIGHT OFFSET
  var rightH;
  if (mobile) rightH = mmenuH;
  else rightH = menuH;

  //SMOOTH SCROLL
  $("a").on("click", function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;

      //OFFSET
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - rightH
        },
        scrollSpeed
      );
    }
  });

  //SLIDE DOWN
  $(".arrow-expand, .tab > h1").click(function() {
    var index = $(this)
      .parent()
      .index();
    if (
      $(this)
        .parent()
        .hasClass("skill")
    ) {
    } else if (
      $(this)
        .parent()
        .hasClass("project")
    ) {
      index += $(".skills > .wrap > .tab").length;
    }

    //EXPAND
    $(".tab > .info:parent")
      .eq(index)
      .slideToggle(500);

    //H1 CLASS
    var c = $(this)
      .parent()
      .find("h1")
      .toggleClass("active");

    //ROTATE ARROW
    var c = $(this)
      .parent()
      .find(".arrow-expand");
    if (c.hasClass("rotated")) {
      c.removeClass("rotated");
    } else {
      c.addClass("rotated");
    }
  });

  //ARROW APPEAR
  $(".arrow-d")
    .hide()
    .fadeIn(scrollSpeed);

  //HIDE OVERLAY
  $(".overlay").click(function() {
    $(this).fadeOut(300);
  });

  //MENU SLIDE
  $(".nav > .menu-i").click(function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $("nav").animate(
        {
          width: "0"
        },
        200
      );
    } else {
      $(this).addClass("active");
      $("nav").animate(
        {
          width: "45%"
        },
        200
      );
    }
  });

  //MENU SLIDE BACK ON CLICK
  $("nav > ul > a").on("click", function(event) {
    if ($(window).width() <= 480) {
      $("nav").animate(
        {
          width: "0"
        },
        200
      );
      $(".nav > .menu-i").removeClass("active");
    }
  });

  // //COLOR ICONS ON HOVER
  // $(".icons > i").hover(
  //   function() {
  //     $(this).addClass("colored");
  //   },
  //   function() {
  //     $(this).removeClass("colored");
  //   }
  // );

  //GET COLOR TO ALL EXCEPT HOME
  $(".tab > .info > .icons > i").addClass("colored");

  //EXPAND TABS ON ICON CLICK
  $(".home > .icons > i").click(function() {
    var ccl = $(this)
      .attr("class")
      .replace(" colored", "");

    //RIGHT OFFSET
    var rightH;
    if (mobile) rightH = mmenuH;
    else rightH = menuH;

    //SCROLL TO CONTACT
    $("html").animate(
      {
        scrollTop: $("#skills").offset().top - rightH
      },
      scrollSpeed
    );
  });
});

$(window).scroll(function() {
  var scroll = $(window).scrollTop();

  if (!mobile) {
    //PARALLAX
    var cpos = $(".parallax").css("background-position");
    $(".parallax").css(
      "background-position",
      "center " + (50 + scroll * 0.2) + "%"
    );
    $(".parallax2").css(
      "background-position",
      "center " + (30 + scroll * 0.02) + "%"
    );

    //BLOCK APPEAR
    $(".block").each(function() {
      var top = $(this).offset().top - $(window).height() * 0.8;
      if (!$(this).hasClass("anim-block")) {
        if (scroll >= top) {
          $(this).addClass("anim-block");
          $(this).css("visibility", "unset");
        }
      }
    });

    //COLOR ICONS ON SCROLL
    $(".icons > i").each(function() {
      var top = $(this).offset().top - $(window).height() * 0.8;
      if (scroll >= top) {
        $(this).addClass("colored");
      } else {
        $(this).removeClass("colored");
      }
    });
  }

  //ARROWS
  $(".arrow-d").fadeOut();

  //ANIMATIONS ON START
  if (scroll == 0) {
    $(".arrow-d").fadeIn();
    $(".arrow-u").fadeOut(500);
  }

  //SCROOL ANIMATIONS
  if ($(window).width() > 480) {
    if (scroll > $(window).height() * 0.3) {
      $("nav").addClass("moved");
      $(".arrow-u").fadeIn();
      $(".home > h1").fadeOut();
      $(".home > .icons").fadeOut(300);
    } else {
      $("nav").removeClass("moved");
      $(".home > h1").fadeIn();
      $(".home > .icons").fadeIn();
    }
  }
});

//FIX NAV ON RESIZE
$(window).resize(function() {
  if ($(window).width() >= 470) {
    $("nav").css("width", "100%");
    $(".nav > .menu-i").removeClass("active");
  } else {
    if (!$("nav > .menu-i").hasClass("active")) {
      $("nav").css("width", 0);
    }
  }
});
