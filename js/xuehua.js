$(window).scroll(function(){
  var doc=$(document).scrollTop();
  //console.log(doc);
  if(doc>195){
    $('#fixd').addClass('fixd');
  }else{
    $('#fixd').removeClass('fixd');
  }
});

