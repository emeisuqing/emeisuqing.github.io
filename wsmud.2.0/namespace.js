// 在jquery的原代码中增加一个命名空间的函数
$.namespace = function() {
    var a=arguments, o=null, i, j, d;
    for (i=0; i<a.length; i=i+1) {
        d=a[i].split(".");
        o=window;
        for (j=0; j<d.length; j=j+1) {
            o[d[j]]=o[d[j]] || {};
            o=o[d[j]];
        }
    }
    return o;
};

/* 使用举例
$.namespace("druid.index");
druid.index = function() {
    var i, j; // 定义变量
    return {
        login:function(){
            // ...
        },
        submit:function(){
            //...
        }
    };
}();*/