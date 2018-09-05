(function($,root){
    var $scope = $(document.body);
    function list(data,index){
        var html='';
        var len = data.length;
        for(var i = 0;i < data.length;i++){
            html += "<li class = 'colsong'><p>"+data[i].song+"</p></li>"
        };
        $scope.find('.slist').html(html);
        console.log($scope.find('.colsong').eq(index));
        $scope.find('.colsong').eq(index).css({
            "color":"#ffdf3bcf"
        })
        if(len > 3){
            $scope.find('.slist').css({
                "height":"138px",
            })
        }if(len < 3){
            $scope.find('.slist').css({
                "height":"auto"
            })
        }
    }
    root.list = list;
}(window.Zepto,window.player || (window.player == {})))