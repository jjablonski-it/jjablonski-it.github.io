var mobile;
$(document).ready(function(){
    var menuH = $('.menu').height()-1
    var mmenuH = $('div.nav').height()-1
    var scroll = $(window).scrollTop();

    mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

    if (!mobile){
      
      //BETTER BLOCK APPEAR     
      $('.block').each(function(){
        var top = $(this).offset().top - $(window).height()*.8;
        if(scroll<=top && !$(this).hasClass('anim-block')){
          $(this).css('visibility','hidden');
        }
      })
    }

    //RIGHT OFFSET
    var rightH;
    if(mobile)
      rightH = mmenuH;
    else
      rightH = menuH;

    //SMOOTH SCROLL
    $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;

        //OFFSET
        $('html, body').animate({
          scrollTop: $(hash).offset().top - rightH
        }, 800);
      }       
    });
    
    //SLIDE DOWN
    $('.arrow-expand, .tab > h1').click(function(){
      var index = $(this).parent().index();
      if($(this).parent().hasClass('skill')){
          //W sumie to nic
      }else if($(this).parent().hasClass('project')){
        index += $('.skills > .wrap > .tab').length;
      }
      
      //EXPAND
      $('.tab > .info:parent').eq(index).slideToggle(500);
      
      //H1 CLASS
      var c = $(this).parent().find('h1').toggleClass('active');

      //ROTATE ARROW
      var c = $(this).parent().find('.arrow-expand');
      if(c.hasClass('rotated')){
        c.removeClass('rotated');
      }else{
        c.addClass('rotated');
      }
      
      //LOAD PREVIEW
      var prev = $(this).parent().find('.preview')
      if(!prev.hasClass('done')){
        //LOAD IMAGES
        prev.load('load.html > #'+prev.attr('id')+' > img');
        $(document).ajaxComplete(function(){   
          //ADD ON CLICK FUNCTION      
          prev.find('img').click(function(){
            var imgsrc = $(this).attr('src');
            $('.overlay > img').attr('src',imgsrc);
            $('.overlay').fadeIn(300);
          })           
        })
        prev.hide().delay(400).slideDown(500);
        prev.addClass('done');        
      } 
    })  
    
    //ARROW APPEAR
    $('.arrow-d').hide().fadeIn(800);

    //HIDE OVERLAY
    $('.overlay').click(function(){
      $(this).fadeOut(300);
    })

    //MENU SLIDE
    $('.nav > .menu-i').click(function(){
        if($(this).hasClass('active')){
          $(this).removeClass('active');
          $('nav').animate({
            width:'0'
          },200);
        }
        else{
          $(this).addClass('active');
          $('nav').animate({

            width:'45%'
          },200);    
        }    
      })

      //MENU SLIDE BACK ON CLICK
      $("nav > ul > a").on('click', function(event){
        if($(window).width()<=480){
          $('nav').animate({
            width:'0'
          },200);
          $('.nav > .menu-i').removeClass('active');
        }
      })

      //COLOR ICONS ON HOVER
      $('.home > .icons > i').hover(function(){
        $(this).addClass('colored');
       },function(){
        $(this).removeClass('colored');
       })
       
       //GET COLOR TO ALL EXCEPT HOME
       $('.tab > .info > .icons > i').addClass('colored')

      //EXPAND TABS ON ICON CLICK
      $('.home > .icons > i').click(function(){
        var ccl = $(this).attr('class').replace(' colored','');
         
        //HIDE ALL OPEN
          $('h1').each(function(){
            if($(this).hasClass('active'))
              $(this).click();
          })

        //RIGHT OFFSET
        var rightH;
        if(mobile)
          rightH = mmenuH;
        else
          rightH = menuH;

        //SCROLL TO SKILLS
         $('html').animate({
          scrollTop: $('#skills').offset().top - rightH
        },800, function(){    
          $('.tab > .info > .icons > i.'+ccl).each(function(){
              $(this).parent().parent().parent().find('.arrow-expand').click();
          });
          })
      })

      //RESET BARS
      $('.fill').addClass('start');   
      $('.fill').css('transition','width 1.5s ease-in')   
      var top = $('.stats > .wrap').offset().top - $(window).height();
      if(scroll>=top){
        $('.fill').removeClass('start');     
      }  
  });

$(window).scroll(function(){
    var scroll = $(window).scrollTop();

    if (!mobile){
      //PARALLAX
      var cpos = $('.parallax').css('background-position');
      $('.parallax').css('background-position','center '+(50 + scroll*.2) + '%')
      $('.parallax2').css('background-position','center '+(30 + scroll*.02) + '%')

      //BLOCK APPEAR
      $('.block').each(function(){
        var top = $(this).offset().top - $(window).height()*.8;
        if(!$(this).hasClass('anim-block')){
          if(scroll>=top){
            $(this).addClass('anim-block');
            $(this).css('visibility','unset');
          }
        }
        if (scroll == 0){
          //$(this).removeClass('anim-block');
        } 
      })
    }
   
    //LOAD STAT BARS
    $('.stats > .wrap').each(function(){
      var top = $(this).offset().top - $(window).height()*.8;
      if(!$(this).hasClass('done') && scroll>top){
        $('.stats > .wrap > .element > .box > .fill').delay(200).removeClass('start');
        $(this).addClass('done');
      }
    })

     //LOAD STAT BARS
     $('.coming > .wrap').each(function(){
      var top = $(this).offset().top - $(window).height()*.8;
      if(!$(this).hasClass('done') && scroll>top){
        $('.coming > .wrap > .skill > .fill').delay(200).removeClass('start');
        $(this).addClass('done');
      }
    })
    
    //ARROWS
    $('.arrow-d').fadeOut();
    
    //ANIMATIONS ON START
    if (scroll == 0){
     $('.arrow-d').fadeIn();
     $('.arrow-u').fadeOut(500);
    }
    
    //SCROOL ANIMATIONS
    if($(window).width()>480){
      if(scroll>$(window).height()*.3){
        $('nav').addClass('moved');
        $('.arrow-u').fadeIn();
        $('.home > h1').fadeOut();
        $('.home > .icons').fadeOut(300);
      }
      else{
        $('nav').removeClass('moved');
        $('.home > h1').fadeIn();
        $('.home > .icons').fadeIn();
      }
    }

    //CLOSE ALL TABS ON ARROW UP
    $('.arrow-u').click(function(){
      $('h1').each(function(){
        if($(this).hasClass('active'))
          $(this).click();
      })
    })
});

//FIX NAV ON RESIZE
$(window).resize(function(){
  if($(window).width()>=470){
    $('nav').css('width','100%');
    $('.nav > .menu-i').removeClass('active');
  }
  else{
    if(!$('nav > .menu-i').hasClass('active')){
      $('nav').css('width',0);
    }
  }
});
