layui.use(['jquery','layer', 'form', 'element'], function(){
  var form = layui.form();
  var $ = layui.jquery;
  var element = layui.element(); 
  var device = layui.device();
  var layer = layui.layer;
  var device = layui.device();
  //导航的hover效果、二级菜单等功能，需要依赖element模块

  //子元素ifram元素模块
  var _ls = layerSilica; 
  var top =window;

  window.iframeConfig = {
    nav_left: {
      attr_name: 'nav_left'
    }
  };
 var iframeName = top.iframeConfig.nav_left.attr_name;
  var parentFrameWin1 = _ls.getFrameWinBy(iframeName, top);
  var navleftelement = parentFrameWin1.layui.element(); 


   //  $("#nav_left").contents().find('*').click(function(e){
   //    e.stopPropagation();
   //  var e =e.target;
   //  console.log(e);
   // })
    //监听导航点击
    $(".layui-nav").find('a').click(function(e){
        e.preventDefault();
    })

    //监听左侧导航新增tab页签
     $("#nav_left").contents().find('a').click(function(e){
        e.preventDefault();
    })
    navleftelement.on('nav(left-nav)', function(elem){
        var fromeDom   = $(elem).children('a'),
            toDom      = $(".layui-tab-title").find('li');
        if ( ! util.compareId (fromeDom,toDom ) ) {
            active.tabAdd(fromeDom);
            active.navTabChange(fromeDom);
        }else{
            active.navTabChange(fromeDom);
        }
      });

      //监听顶部导航,加载左侧菜单
       element.on('nav(top-nav)', function(elem){
        var domText = elem.text();
         layer.msg('你选中了:' +domText+ '菜单');
        navLeftFun.showLeftNav();
      });

    //按钮事件，关于call的用法，切记！
   $('.site-demo-active').on('click', function(){
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
      });
  //触发事件
  var active = {
    tabAdd: function(fromeDom){
        var iLength = fromeDom.children('i').length;
        var title  =  iLength == 1 ? fromeDom.find('cite').text() : fromeDom.text() ;
          element.tabAdd('nav-tab-id', {
            title: title,
            content: title,
            id: fromeDom.attr('data-id') 
          })
    }
    ,
    tabDelete: function(othis){
      //删除指定Tab项
      element.tabDelete('nav-tab-id', '11'); //删除：首页
     
      othis.addClass('layui-btn-disabled');
    }
    ,tabChange: function(othis){
        var pp = othis.data('type');
      //切换到指定Tab项
      element.tabChange('nav-tab-id', 11); //切换到：用户管理
    }
    ,navTabChange: function(fromeDom){
        var index = fromeDom.data('id');
      //切换到指定Tab项
      element.tabChange('nav-tab-id', index); 
    }

  };
  var util ={
    compareId:function(fromeDom,toDom){
        var fromeId = fromeDom.attr('data-id');
        var hasId = false;
        toDom.each(function(){
            var toId = $(this).attr('lay-id');
            if ( toId == fromeId ) {
                hasId =  true;
                return false;
            }else{
                hasId =  false;
            }
        })
        return hasId;
    }
  }
  var buttonFun = {
    showFirstMenu:function(target){
      var targetDom = target;
      targetDom.slideToggle(100,'swing');
    }
  }


//移动端
  if (device.os !="windows") {
  //左上角按钮事件
  $('.icon-reorder').click(function(e){
    e.stopPropagation();
    //展示配置菜单
    var target = $('.main-menu');
    buttonFun.showFirstMenu(target);

    //展示左侧菜单
    var sidebar = $('.sidebar-menu');
    var toLeftFlag = sidebar.data('toleftflag');
    if (toLeftFlag) {
      navLeftFun.toLeft(sidebar,sidebar.width());
    } 

  })

  //监听配置菜单事件，如果点击后 隐藏或者显示配置菜单区域
  $('.main-menu').find('a').click(function(e){
    // e.stopPropagation();
    var leveA = $(this);
    var aL = leveA.next().length;
    var aPd= leveA.parent();
    if (aL == 0 ) {
      var target = $('.main-menu');
      buttonFun.showFirstMenu(target);
    }else if(aPd=='dd'){
      var target = $('.main-menu');
      buttonFun.showFirstMenu(target);
    }  
  })

//监听左侧菜单事件，如果点击后 隐藏或者显示左侧菜单区域
   var leftAsdom =$("#nav_left").contents().find('.layui-side-scroll').find('a');
   leftAsdom.click(function(e){
    // e.stopPropagation();
    var leveA = $(this);
    var aL = leveA.next().length;
    var aPd= leveA.parent();
    if (aL == 0 ) {
      var target = $('.sidebar-menu');

    navLeftFun.toLeft(target,target.width());
    }else if(aPd=='dd'){
      var target = $('.sidebar-menu');

    navLeftFun.toLeft(target,target.width());
    }  
  })
  
  }else if (device.os ="windows") {
    //PC端左上角按钮事件，左侧菜单显示或者隐藏
    $('.icon-reorder').click(function(e){
    e.stopPropagation();
    var target = $('.sidebar-menu');

    navLeftFun.toLeft(target,target.width());

    })
  }

  // 左侧导航收缩事件函数
  var navLeftFun ={
    toLeft:function(targetDom,width){
      var moveDom = targetDom,
          leftWidth = width;
          // 使用data-* 后部分必须全为小写
          var toLeftFlag = moveDom.data('toleftflag');
          if (toLeftFlag==false) {
             moveDom.animate( { left: -leftWidth},100,'swing' );
             moveDom.data('toleftflag',true);
             $('#main-content').css("margin-left","10px");
          } else {
            moveDom.animate( { left: 0},100,'swing' );
            moveDom.data('toleftflag',false);
            $('#main-content').css("margin-left","220px");
          }
         
    },
    showLeftNav:function(){
       $('.sidebar-menu').css("left","0px");
       $('#main-content').css("margin-left","220px");
    }

  }

});
