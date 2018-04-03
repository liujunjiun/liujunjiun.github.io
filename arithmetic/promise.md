
```
var rightPromiseOuter =
    new Promise(function (resolve) {
        setTimeout(function () {
            resolve('outerResponse');
        }, 1000);
    });

rightPromiseOuter
.then(Response => {
    console.log(Response);
    return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve('innerResponse');
                }, 1000);
            })
})
.then(Response => {
    console.log(Response);
})    


代码1
var promise = new Promise(function(resolve, reject) {
    resolve("ok");
    throw new Error('wtf')
    //setTimeout(function() { throw new Error('test') }, 0)
});
promise.then(function(value) { console.log(value) })
    .catch((err)=>{
        console.log(err)
    })
process.on('unhandledRejection', function (err, p) {
    console.error('catch exception:',err.stack)
});
结果为：
ok
代码2
var promise = new Promise(function(resolve, reject) {
    resolve("ok");
    //throw new Error('wtf')
    setTimeout(function() { throw new Error('test') }, 0)
});
promise.then(function(value) { console.log(value) })
    .catch((err)=>{
        console.log(err)
    })
process.on('unhandledRejection', function (err, p) {
    console.error('catch exception:',err.stack)
});
结果为:
ok
/Users/yj/WebstormProjects/ife_solution/task0/async/asyn2.js:7
    setTimeout(function() { throw new Error('test') }, 0)
                            ^

Error: test
    at null._onTimeout (/Users/yj/WebstormProjects/ife_solution/task0/async/asyn2.js:7:35)
    at Timer.listOnTimeout (timers.js:92:15)
代码3
var promise = new Promise(function(resolve, reject) {
    resolve("ok");
    throw new Error('wtf')
    setTimeout(function() { throw new Error('test') }, 0)
});
promise.then((value)=>{
    console.log(value) })
    .catch((err)=>{
        console.log(err)
    })
process.on('unhandledRejection', function (err, p) {
    console.error('catch exception:',err.stack)
});
结果为
ok

代码1：因为已经resolved了，所以抛出的异常被系统吞掉了。
代码2：虽然已经resolved了，但是抛出的异常是在timer的回掉函数中，和promise无关，所以没有吞掉。
代码3：因为抛出异常了，下面setTimeout没有执行，所以没有异常。
```

