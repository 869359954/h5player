//管理进度条
(function($,root){
    var $scope = $(document.body);
    var durationtime;
    var frameId;
    var startTime;
    var lastpercentage = 0;
    var percentage;
    var flug;
    //转换时间
     function formatTime(time){
         time = Math.round(time);
         var minute = Math.floor(time / 60);
         var second = time - minute*60;
         if(minute < 10){
             minute = "0" + minute;
         }if(second < 10){
             second = "0" + second;
         }
         return minute +':' + second;
     }
    //渲染总时间
     function render(duration){
          var alltime = formatTime(duration);
          durationtime = duration;
          updata(0);
          setProcessor(0);
          lastpercentage = 0;
          $scope.find('.all-time').text(alltime);
     }
     function setProcessor(percentage){
         var percent = (percentage - 1)*100 + "%";
         $scope.find('.pro-top').css({
             "transform":"translateX("+ percent +")"
         })
     }
     function updata(percentage){
          var curTime = percentage * durationtime;
          $scope.find('.cur-time').html(formatTime(curTime));
     }
     //渲染当前时间和进度条
     function start(percent,flug){
          if(percent === undefined){
              lastpercentage = lastpercentage;
          }else{
              lastpercentage = percent;
          }
          cancelAnimationFrame(frameId);
          startTime = new Date().getTime();
          function frame(){
              var curTime = new Date().getTime();
              percentage = lastpercentage + (curTime - startTime) / (durationtime*1000);
              if(percentage < 1){
                  setProcessor(percentage);
                  updata(percentage);
                  frameId = requestAnimationFrame(frame)
              }else{
                  cancelAnimationFrame(frameId);
              }
            };  
            if(flug == undefined || flug){
                frame();
            }else if(!flug){
                stop();
            }
            
     }
     //结束进度
     function stop(){
         var curTime = new Date().getTime();
         lastpercentage = lastpercentage + (curTime - startTime) / (durationtime*1000);
         cancelAnimationFrame(frameId);
     }
     root.processor = {
         render : render,
         start : start,
         stop : stop,
         update : updata,
         setProcessor : setProcessor,
     }
}(window.Zepto,window.player || (window.player = {})))