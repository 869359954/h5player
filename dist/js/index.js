var root = window.player;
var $ = window.Zepto;
var $scope = $(document.body);
var songlist;
var audiomanager;
var renderlist = root.list;
var curindex;
console.log(root);
// var index = 0;
var controlmanager;
var processor = root.processor;
$scope.on("play:change",function(e,index){
    curindex = index;
    var curdata = songlist[index];
    root.render(curdata);
    audiomanager.setAudioSource(curdata.audio);
    if(audiomanager.status == "play"){
        audiomanager.play();
        processor.start();
    }else{
        audiomanager.pause();
    }
    processor.render(curdata.duration);
    
})
$scope.on("click",".prev-btn",function(){
    // if(index == 0){
    //     index = songlist.length - 1;
    // }else{
    //     index --;
    // }
    // root.render(songlist[index]);
    var index = controlmanager.prev();
    $scope.trigger("play:change",[index]);
})
$scope.on("click",".next-btn",function(){
    // if(index == songlist.length - 1){
    //     index = 0;
    // }else{
    //     index ++;
    // }
    // root.render(songlist[index]);
    var index = controlmanager.next();
    $scope.trigger("play:change",[index]);
})
$scope.on("click",".play-btn",function(){
    if(audiomanager.status == "pause"){
        audiomanager.play();
        processor.start();
    }else if(audiomanager.status == "play"){
        audiomanager.pause();
        processor.stop();
    }
    $scope.find(".play-btn").toggleClass('playing');
    autoplay();
})
$scope.on("click",".like-btn",function(){
    console.log(controlmanager.index);
    console.log(songlist[controlmanager.index].isLike);
    if(songlist[controlmanager.index].isLike){
        songlist[controlmanager.index].isLike =false;
        $scope.find('.like-btn').removeClass('liked');
    }else if(!songlist[controlmanager.index].isLike){
        songlist[controlmanager.index].isLike =true;
        $scope.find('.like-btn').addClass('liked');
    };
    
})
//绑定touch事件
function bindTouch(){
    var $sliderPoint = $scope.find('.slide-point');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $sliderPoint.on("touchstart",function(e){
        processor.stop();
    }).on("touchmove",function(e){
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if(percentage > 1){
            percentage = 1
        }else if(percentage < 0){
            percentage = 0
        };
        processor.update(percentage);
        processor.setProcessor(percentage);
    }).on("touchend",function(e){
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if(percentage > 1){
            percentage = 1;
        }else if(percentage < 0){
            percentage = 0;
        }
        if(audiomanager.status == "play"){
            processor.start(percentage);
            console.log(percentage);
        }else{
            processor.start(percentage,false);
        }
        var duration = songlist[controlmanager.index].duration * percentage;
        audiomanager.jumptoplay(duration);
    })
}
function getlist(data){
       $scope.find('.list-btn').on("click",function(){
          $scope.find('.list').css({
              "display":"inline-block"
          });
          $scope.find('.play-control').css({
              "display":"none"
          })
          renderlist(data,curindex);
          console.log(curindex);
          playsong();
       })
       $scope.find('.nobtn').on("click",function(){
           console.log('no');
          $scope.find('.list').css({
            "display":"none"
          });
          $scope.find('.play-control').css({
            "display":"flex"
          })
       })
       
}
function playsong(){
        var allsong = $scope.find('.colsong');   
        for(var i = 0;i < allsong.length;i++){
            (function(n){
                allsong[n].onclick = function(){
                    console.log(n);
                    audiomanager.status = "play";
                    $scope.find('.play-btn').addClass('playing');
                    $scope.trigger("play:change",n);
                    bindTouch();
                    $scope.find('.list').css({
                        "display":"none"
                    });
                    $scope.find('.play-control').css({
                        "display":"flex"
                    })
                }
            }(i));
        }
}
function autoplay(){
    var songframe = requestAnimationFrame(autoplay);
    if(audiomanager.status == "play" && audiomanager.audio.ended == true){
        cancelAnimationFrame(songframe);
        var nextindex = controlmanager.next();
        $scope.trigger("play:change",[nextindex]);
        autoplay();
    }
}
function getdata(url){
    $.ajax({
        url:url,
        type:"GET",
        success:successdFn,
        error:function(){
            console.log('error')
        }
    })
}
function successdFn(data){
    console.log(data);
    songlist = data;
    controlmanager = new root.controlManager(data.length);
    audiomanager = new root.audioManager();
    console.log(data[0]);
    $scope.trigger("play:change",0);
    bindTouch();
    getlist(songlist);
}
getdata("/mock/data.json");