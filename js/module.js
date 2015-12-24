/**
 * Created by Administrator on 2015/8/21.
 */
 
 /*
  __g_modules 相当于一个代码库，

 */
__g_modules = {};

/*
  全局函数，往代码库中增添不同的功能模块。
*/

function module(name, mod)
{
    __g_modules[name] = mod;
}

function myRequire(name)
{
    return __g_modules[name];
}

/*
 全局函数，把第二个对象的属性与方法 赋予 第一个对象
*/
subclass = function (t,cls){
    if(t==undefined || t==null)
        t=[];
    for (var k in cls){
        var v = cls[k];
        if(v!=null && typeof v == 'object'){
            t[k] = [];
            subclass(t[k],v);
        }
        else{
            t[k] = v;
        }
    }
};