
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


```
