var app=angular.module('myapp',['ng','ngRoute']);
app.config(function($routeProvider){
  $routeProvider.when("/first",{
    templateUrl:"tpl/first.html",
    controller:'firstCtrl'
  }).when("/start/:id",{
    templateUrl:"tpl/start.html",
    controller:'startCtrl'
  }).when("/next/:id",{
    templateUrl:"tpl/next.html",
    controller:'nextCtrl'
  }).when("/last",{
    templateUrl:"tpl/last.html",
    controller:'lastCtrl'
  }).otherwise({
    redirectTo:"/first"
  })
});
/*
  //var app=angular.module('myapp',['ng','ui.router']);
  //app.config(($stateProvider,$urlRouterProvider)=>{
  //  $stateProvider.state("first",{
  //    url:"/first",
  //    templateUrl:"tpl/first.html"
  //  }).state("start",{
  //    url:"/start",
  //    templateUrl:"tpl/start.html"
  //  }).state("next",{
  //    url:"/next",
  //    templateUrl:"tpl/next.html"
  //  }).state("last",{
  //    url:"/last",
  //    templateUrl:"tpl/last.html"
  //  });
  //  $urlRouterProvider.otherwise("first");
  //});
*/
var all=null;
app.controller('parentCtrl',['$scope','$http',($scope,$http)=>{
  $scope.user={};
  $scope.obj={};
  $scope.robj={};
  $scope.welcome=()=>{
    var i=$.param($scope.user);
    $http.get('data/selectUser.php?'+i).success((data)=>{
      if(data.result=='succ'){
        sessionStorage['user']=data.user.user;
        sessionStorage['uid']=data.user.uid;
        $('[data-target="#logo_go"]').html(data.user.user).attr('href','#/last').attr('data-toggle','');
        $('.modal').modal('hide');
        $('[data-target="isHidden"]').removeClass('hidden');
      }
    });
  };
  $scope.removeUser=()=>{
    sessionStorage.removeItem('user');
    $('[data-target="#logo_go"]').html('登入').attr('href','').attr('data-toggle','modal');
    $('[data-target="isHidden"]').addClass('hidden');
    location='#/first';
  }
}]);
app.controller('firstCtrl',['$scope','$http',($scope,$http)=>{
  sessionStorage.removeItem('active');
  if(audio.paused){
    audio.play();
  }
  var i=new Date().getDay();
  var num=1;
  if(i==0){i=7}
  $scope.clickPrev=true;
  $scope.clickNext=false;
  $http.get('data/selectWeek.php?udata='+i).success((data)=>{
    $scope.weekList=data.data;
    $scope.weekNextList=data.next;
    $('.list-inline.pull-right').children().eq(i-1).addClass('active');
  });
  $http.get('data/selectLike.php').success((data)=>{
    $scope.likeList=data.firstLike;
    $scope.likeNextList=data.nextLike;
    $scope.goodList=data.firstGood;
    $scope.goodNextList=data.nextGood;
    $scope.chinaList=data.firstChina;
    $scope.chinaNextList=data.nextChina;
    $scope.bigList=data.firstBig;
    $scope.bigNextList=data.nextBig;
    $scope.runList=data.run;
    $scope.runNextList=data.nextRun;
    $scope.runTreeList=data.treeRun;
  });
  $http.get('data/selectType.php').success((data)=>{
    $scope.typeList=data.first;
    $scope.typeTwoList=data.two;
  });
  $http.get(`data/selectNextList.php`).success((data)=>{
    $scope.paihangList=data.all;
    function allList(str){
      $scope.allList=str;
      for(var i=0;i<$scope.allList.length;i++){
        $scope.allList[i].tt_one_type=$scope.allList[i].tt_one_type==1?'完结动漫':$scope.allList[i].tt_one_type==2?'连载动漫':$scope.allList[i].tt_one_type==3?'剧场版':'泡面番';
        $scope.allList[i].tt_tree_type=$scope.allList[i].tt_tree_type==1?'国产':$scope.allList[i].tt_tree_type==2?'日本':$scope.allList[i].tt_tree_type==3?'美国':'其他';
        $scope.allList[i].tt_two_type=$scope.allList[i].tt_two_type==1?'卖肉':$scope.allList[i].tt_two_type==2?'热血':$scope.allList[i].tt_two_type==3?'日常':$scope.allList[i].tt_two_type==4?'玄幻':$scope.allList[i].tt_two_type==5?'科幻':$scope.allList[i].tt_two_type==6?'恐怖':$scope.allList[i].tt_two_type==7?'冒险':$scope.allList[i].tt_two_type==8?'少女':'搞笑';
      }
    }
    allList(data.all);
  });
  $scope.weekUp=(arg)=>{
    i=arg;
    num=1;
    $http.get('data/selectWeek.php?udata='+i).success((data)=>{
      $scope.weekList=data.data;
      $scope.weekNextList=data.next;
      $('.list-inline.pull-right').children().eq(i-1).addClass('active').siblings().removeClass('active');
      if(data.result=='succ'){
        iWidth();
      }
      if(data.more){
        $scope.clickNext=false;
      }
      if(num=1){
        $scope.clickPrev=true;
      }
    })
  };
  $scope.weekLeft=()=>{
    num--;
    $http.get(`data/selectWeek.php?udata=${i}&pag=${num}`).success((data)=>{
      $scope.weekList=data.data;
      $scope.weekNextList=data.next;
      if(data.more){
        $scope.clickNext=false;
      }
      if(num=1){
        $scope.clickPrev=true;
      }
    })
  };
  $scope.weekRight=()=>{
    num++;
    $http.get(`data/selectWeek.php?udata=${i}&pag=${num}`).success((data)=>{
      $scope.weekList=data.data;
      $scope.weekNextList=data.next;
      if(!data.more){
        $scope.clickNext=true;
      }
      if(num!=1){
        $scope.clickPrev=false;
      }
    })
  };
  $scope.jump=(reg,str)=>{
    sessionStorage['t4']=reg;
    sessionStorage['t5']=str;
    location='#/next/5';
  };
  $scope.jumpTwo=(reg,str)=>{
    sessionStorage['t4']=reg;
    sessionStorage['t5']=str;
    location='#/next/6';
  }
}]);
app.controller('startCtrl',['$scope','$routeParams','$http',($scope,$routeParams,$http)=>{
  $http.get(`data/addHost.php?uid=${sessionStorage['uid']}&tid=${$routeParams.id}`).success(function(data){

  });
  $scope.collect='点击收藏';
  sessionStorage.removeItem('active');
  $('#audio')[0].pause();
  if(sessionStorage['user']){
    $http.get(`data/selectUserAll.php?user=${sessionStorage['user']}`).success((data)=>{
      $scope.headImg=data.user.user_img;
    });
    $http.get(`data/selectMove.php?user=${sessionStorage['uid']}&tid=${$routeParams.id}`).success((data)=>{
      if(data=='succ'){
        $scope.collect='已收藏';
      }
    });
    $scope.severMove=()=>{
      $http.get(`data/addMove.php?uid=${sessionStorage['uid']}&tid=${$routeParams.id}`).success(function(data){
        $scope.collect='已收藏';
      });
    };
  }
  $scope.pinglun={};
  $scope.comment={};

  $http.get('data/selectNextList.php').success((data)=>{
    $scope.paihangList=data.all;
  });
  $http.get(`data/selectStartName.php?name=${$routeParams.id}`).success((data)=>{
    $scope.videoSrc=data.all[0].tt_src;
    $scope.numType=data.all[0].tt_name;
  });
  function pinglun(){
    $http.get(`data/pinglunOne.php?tid=${$routeParams.id}`).success((data)=>{
      $scope.commentNum=data.count;
      if(data.all[0]){
        $('#noComment').addClass('hidden');
      }else{
        $('#noComment').removeClass('hidden');
      }
      $scope.commentList=data.all;
      $scope.nextCommentList=data.comment;
      var num=data.more;
    });
  }
  pinglun();
  $scope.commentShow=(reg)=>{
    $('div[id^="s"]').addClass('hidden');
    $('#s'+reg).removeClass('hidden');
  };
  $scope.onePinglun=()=>{
    if($('textarea').val()==''){

    }else{
      $scope.pinglun.tid=$routeParams.id;
      $scope.pinglun.name=sessionStorage['user'];
      var i=$.param($scope.pinglun);
      $http.get('data/addPinglun.php?'+i).success((data)=>{
        if(data=='succ'){
          pinglun();
          $('textarea').val('');
        }
      })
    }
  };
  $scope.twoPinglun=(index,id)=>{
    $scope.comment.reply=$(`#s${index} textarea`).val();
    $scope.comment.tid=$routeParams.id;
    $scope.comment.name=sessionStorage['user'];
    $scope.comment.pid=id;
    var i=$.param($scope.comment);
    $http.get('data/addPinglun.php?'+i).success((data)=>{
      if(data=='succ'){
        pinglun();
        $('textarea').val('');
      }
    })
  }
}]);
app.controller('nextCtrl',['$scope','$routeParams','$http',($scope,$routeParams,$http)=>{
  if(audio.paused){
    audio.play();
  }
  sessionStorage['active']=$routeParams.id;
  sessionStorage.removeItem('t1');
  sessionStorage.removeItem('t2');
  sessionStorage.removeItem('t3');
  $scope.numType=$routeParams.id==1?'动漫分类':$routeParams.id==2?'热血动漫':$routeParams.id==3?'有妖气动漫':$routeParams.id==4?'腾讯动漫':'';
  if($routeParams.id==1){
    $('#canHidden').show()
  }else{
    $('#canHidden').hide();
    if($routeParams.id==2){
      sessionStorage['t2']=$routeParams.id;
    }else if($routeParams.id==3){
      sessionStorage['t3']=1;
      sessionStorage['t2']=9;
    }else if($routeParams.id==4){
      sessionStorage['t3']=1;
    }else if($routeParams.id==5){
      sessionStorage['t1']=sessionStorage['t4'];
      $scope.numType=sessionStorage['t5'];
    }else if($routeParams.id==6){
      sessionStorage['t3']=sessionStorage['t4'];
      $scope.numType=sessionStorage['t5'];
    }
  }
  $http.get('data/selectNextType.php').success((data)=>{
    $scope.groupList=data.group;
    $scope.mainList=data.main;
    $scope.smList=data.sm;
  });
  $http.get(`data/selectNextList.php?${sessionStorage['t1']==undefined?'':('onet='+sessionStorage['t1']+'&')}${sessionStorage['t2']==undefined?'':('twot='+sessionStorage['t2']+'&')}${sessionStorage['t3']==undefined?'':('treet='+sessionStorage['t3'])}}`).success((data)=>{
    $scope.paihangList=data.all;
    function allList(str){
      $scope.allList=str;
      for(var i=0;i<$scope.allList.length;i++){
        $scope.allList[i].tt_one_type=$scope.allList[i].tt_one_type==1?'完结动漫':$scope.allList[i].tt_one_type==2?'连载动漫':$scope.allList[i].tt_one_type==3?'剧场版':'泡面番';
        $scope.allList[i].tt_tree_type=$scope.allList[i].tt_tree_type==1?'国产':$scope.allList[i].tt_tree_type==2?'日本':$scope.allList[i].tt_tree_type==3?'美国':'其他';
        $scope.allList[i].tt_two_type=$scope.allList[i].tt_two_type==1?'卖肉':$scope.allList[i].tt_two_type==2?'热血':$scope.allList[i].tt_two_type==3?'日常':$scope.allList[i].tt_two_type==4?'玄幻':$scope.allList[i].tt_two_type==5?'科幻':$scope.allList[i].tt_two_type==6?'恐怖':$scope.allList[i].tt_two_type==7?'冒险':$scope.allList[i].tt_two_type==8?'少女':'搞笑';
      }
    }
    allList(data.all);
    var sum=data.index;
    $('.pagination').html('<li class="active"><a class="bg-info">1</a></li>')
    for(var i=1;i<sum;i++){
      $('.pagination').html($('.pagination').html()+`<li><a>${i+1}</a></li>`)
    }
    $('.pagination li a').click(function(){
      var i=$(this).html();
      $(this).parent().addClass('active').siblings().removeClass('active');
      $http.get(`data/selectNextList.php?${sessionStorage['t1']==undefined?'':('onet='+sessionStorage['t1']+'&')}${sessionStorage['t2']==undefined?'':('twot='+sessionStorage['t2']+'&')}${sessionStorage['t3']==undefined?'':('treet='+sessionStorage['t3']+'&')}${i==null?'':('pag='+i)}`).success(function(data){
        $scope.allList=data.all;
        allList(data.all);
      })
    })
  });
  function moreList(str,num){
    function list(str){
      $scope.allList=str;
      for(var i=0;i<$scope.allList.length;i++){
        $scope.allList[i].tt_one_type=$scope.allList[i].tt_one_type==1?'完结动漫':$scope.allList[i].tt_one_type==2?'连载动漫':$scope.allList[i].tt_one_type==3?'剧场版':'泡面番';
        $scope.allList[i].tt_tree_type=$scope.allList[i].tt_tree_type==1?'国产':$scope.allList[i].tt_tree_type==2?'日本':$scope.allList[i].tt_tree_type==3?'美国':'其他';
        $scope.allList[i].tt_two_type=$scope.allList[i].tt_two_type==1?'卖肉':$scope.allList[i].tt_two_type==2?'热血':$scope.allList[i].tt_two_type==3?'日常':$scope.allList[i].tt_two_type==4?'玄幻':$scope.allList[i].tt_two_type==5?'科幻':$scope.allList[i].tt_two_type==6?'恐怖':$scope.allList[i].tt_two_type==7?'冒险':$scope.allList[i].tt_two_type==8?'少女':'搞笑';
      }
    }
    list(str);
    var sum=num;
    $('.pagination').html('<li class="active"><a class="bg-info">1</a></li>');
    for(var i=1;i<sum;i++){
      $('.pagination').html($('.pagination').html()+`<li><a>${i+1}</a></li>`)
    }
    $('.pagination li a').click(function(){
      var i=$(this).html();
      $(this).parent().addClass('active').siblings().removeClass('active');
      $http.get(`data/selectNextList.php?${sessionStorage['t1']==undefined?'':('onet='+sessionStorage['t1']+'&')}${sessionStorage['t2']==undefined?'':('twot='+sessionStorage['t2']+'&')}${sessionStorage['t3']==undefined?'':('treet='+sessionStorage['t3']+'&')}${i==null?'':('pag='+i)}`).success(function(data){
        list(data.all);
      })
    })
  }
  $scope.jump=(num,index)=>{
    var i=1;
    if($(`#t${num} a`).eq(index+1).attr('class')=='padding-left-right-10 a-color ng-binding ng-scope text-plur'){
      $(`#t${num} a`).eq(index+1).removeClass('text-plur');
      sessionStorage.removeItem(`t${num}`);
      $http.get(`data/selectNextList.php?${sessionStorage['t1']==undefined?'':('onet='+sessionStorage['t1']+'&')}${sessionStorage['t2']==undefined?'':('twot='+sessionStorage['t2']+'&')}${sessionStorage['t3']==undefined?'':('treet='+sessionStorage['t3']+'&')}${i==null?'':('pag='+i)}`).success(function(data){
        moreList(data.all,data.index);
      })
    }else{
      $(`#t${num} a`).eq(index+1).addClass('text-plur').siblings().removeClass('text-plur');
      sessionStorage[`t${num}`]=index+1;
      $http.get(`data/selectNextList.php?${sessionStorage['t1']==undefined?'':('onet='+sessionStorage['t1']+'&')}${sessionStorage['t2']==undefined?'':('twot='+sessionStorage['t2']+'&')}${sessionStorage['t3']==undefined?'':('treet='+sessionStorage['t3']+'&')}${i==null?'':('pag='+i)}`).success(function(data){
        moreList(data.all,data.index);
      })
    }
  };
}]);
app.controller('lastCtrl',['$scope','$http',($scope,$http)=>{
  sessionStorage.removeItem('active');
  if(audio.paused){
    audio.play();
  }
  if(sessionStorage['user']){
    $http.get(`data/selectUserAll.php?user=${sessionStorage['user']}&pag=8`).success((data)=>{
      console.log(data);
      if(String(data.move)!=''){
        $scope.moveList=data.move;
        $('.col-xs-12.text-center').eq(0).addClass('hidden');
      }
      if(String(data.host)!=''){
        $scope.hostList=data.host;
        $('.col-xs-12.text-center').eq(1).addClass('hidden');
      }
      $scope.userList=data.user;
      $scope.img=data.user.user_img;
      if(data.user.notice){
        $scope.notice=data.user.notice;
        $('img.width-120').eq(0).addClass('hidden').next().addClass('text-thumbnail-text');
      }
      if(data.user.public){
        $scope.public=data.user.public;
        $('img.width-120').eq(1).addClass('hidden').next().addClass('text-thumbnail-text');
      }
      $scope.user=data.user.user;
    });
    $scope.deleteHost=()=>{
      $http.get(`data/deleteHost.php?uid=${sessionStorage['uid']}`).success((data)=>{
        $scope.hostList='';
        $('.col-xs-12.text-center.hidden').eq(1).removeClass('hidden');
      })
    };
    $scope.goMove=()=>{
      $http.get(`data/selectUserAll.php?user=${sessionStorage['user']}`).success((data)=>{
        $scope.moveList=data.move;
        $('.thumbnail.padding-bottom-10').eq(0).addClass('hidden');
        $('.thumbnail.padding-bottom-10').eq(2).addClass('hidden');
        $('.text-people-type').eq(1).children().addClass('active');
        $('.text-people-type').eq(0).children().removeClass('active');
      })
    };
    $scope.goType=()=>{
      $http.get(`data/selectUserAll.php?user=${sessionStorage['user']}&pag=8`).success((data)=>{
        $scope.moveList=data.move;
        $('.thumbnail.padding-bottom-10').eq(0).removeClass('hidden');
        $('.thumbnail.padding-bottom-10').eq(2).removeClass('hidden');
        $('.text-people-type').eq(1).children().removeClass('active');
        $('.text-people-type').eq(0).children().addClass('active');
      })
    }
  }else{
    location='#/first';
  }
}]);
app.run(function($http){
  $http.defaults.headers.post={
    'Content-Type':'application/x-www-form-urlencoded'
  }
});
var timer=null;
var SCREEN_WIDTH = 1920;
var SCREEN_HEIGHT = 1000;
var container;
var particle;
var camera;
var scene;
var renderer;
var mouseX = 0;
var mouseY = 0;
var windowHalfX = 1000; //window.innerWidth / 2;
var windowHalfY = 600; //window.innerHeight / 2;
var particles = [];
var particleImage = new Image();//THREE.ImageUtils.loadTexture( "img/ParticleSmoke.png" );
particleImage.src = 'img/ParticleSmoke.png';
function init() {
  if(timer!=null){
    clearInterval(timer);
    timer=null;
  }
  container = document.createElement('div');
  //document.body.appendChild(container);
  document.getElementById('fix-can').appendChild(container);
  camera = new THREE.PerspectiveCamera( 50, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
  camera.position.z = 1000;
  scene = new THREE.Scene();
  scene.add(camera);
  renderer = new THREE.CanvasRenderer();
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );
  for (var i = 0; i < 1000; i++) {
    particle = new Particle3D( material);
    particle.position.x = Math.random() * 2000 - 1000;
    particle.position.y = Math.random() * 2000 - 1000;
    particle.position.z = Math.random() * 2000 - 1000;
    particle.scale.x = particle.scale.y =  1;
    scene.add( particle );
    particles.push(particle);
  }
  container.appendChild( renderer.domElement );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );
  timer=setInterval( loop, 2000 / 50 );
}
function onDocumentMouseMove( event ) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}
function onDocumentTouchStart( event ) {
  if ( event.touches.length == 1 ) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}
function onDocumentTouchMove( event ) {
  if ( event.touches.length == 1 ) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}
//
function loop() {
  for(var i = 0; i<particles.length; i++)
  {
    var particle = particles[i];
    particle.updatePhysics();
    with(particle.position)
    {
      if(y<-1000) y+=2000;
      if(x>1000) x-=2000;
      else if(x<-1000) x+=2000;
      if(z>1000) z-=2000;
      else if(z<-1000) z+=2000;
    }
  }
  camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
  camera.lookAt(scene.position);
  renderer.render( scene, camera );
}
function iWidth(){
    var width=$('.row.height-30-num').css('width');
    width=parseInt(width);
    $('.row.height-30-num').css({
      'height':width
    })
}
function tWidth(){
  var width=$('.theek').css('width');
  width=parseInt(width);
  $('.theek').css({
    'height':width*0.4
  })
}
window.onresize=function(){
  iWidth();
  tWidth()
};






