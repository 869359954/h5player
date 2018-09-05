var gulp = require("gulp");
var connect = require("gulp-connect");
var less = require("gulp-less");
//转移html
gulp.task("html",function(){
     gulp.src('./src/index.html')
         .pipe(connect.reload())
         .pipe(gulp.dest('./dist'));
})
//监听任务
gulp.task("watch",function(){
    gulp.watch("./src/index.html",["html"]);
    gulp.watch("./src/css/*.less",["less"])
    gulp.watch("./src/js/*.js",["js"])
})
//开服务器
gulp.task("server",function(){
    connect.server({
        port:8090,
        livereload:true
    });
})
//转换less到css
gulp.task("less",function(){
    gulp.src("./src/css/*.less")
        .pipe(less())
        .pipe(connect.reload())
        .pipe(gulp.dest("./dist/css"))
})
//转移js
gulp.task("js",function(){
    gulp.src("./src/js/*.js")
        .pipe(connect.reload())
        .pipe(gulp.dest("./dist/js"))
})
gulp.task('default',["html","watch","server","less","js"]);