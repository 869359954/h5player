//管理歌曲模块
(function($,root){
     function audioManager (){
         this.audio = new Audio();
         this.status = "pause";
     }
     audioManager.prototype = {
         //歌曲播放功能
        play : function(){
            this.audio.play();
            this.status = "play";
        },
        //歌曲暂停功能
        pause : function(){
            this.audio.pause();
            this.status = "pause";
        },
        //切换歌曲音频路径
        setAudioSource : function(src){
            this.audio.src = src;
            this.audio.load();
        },
        jumptoplay : function(duration){
            console.log(duration);
            this.audio.currentTime = duration;
            if(this.status == 'play'){
                this.play();
            }else{
                this.pause();
            }
        }
     }
     root.audioManager = audioManager;
}(window.Zepro,window.player || (window.player = {})))