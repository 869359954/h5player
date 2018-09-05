//封装渲染模块
(function($,root){
    var $scope = $(document.body);
    //渲染歌曲信息
    function renderInfo(data){
        var html = "<h1 class='song-name'>"+data.song+"</h1>"+"<h3 class='singger-name'>"+data.singer+"</h3>"+"<h3 class='album-name'>"+data.album+"</h3>"
        $scope.find('.song-info').html(html);
    }
    //渲染歌曲图片
    function renderImg(src){
        var img = new Image();
        img.onload = function(){
            $scope.find('.song-img img').attr('src',src);
            root.blurImg(img,$scope);
        }
        img.src = src;
    }
     //渲染喜欢按钮
     function renderLikeBtn(isLike){
        if(isLike){
            $scope.find('.like-btn').addClass('liked');
        }else{
            $scope.find('.like-btn').removeClass('liked');
        }
    }
    root.render = function(data){
        renderInfo(data);
        renderImg(data.image);
        renderLikeBtn(data.isLike);
    }
   
}(window.Zepto,window.player||(window.player = {})))