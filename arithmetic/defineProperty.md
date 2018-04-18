```

var obj = {};
    Object.defineProperty(obj, 'hello', {
        get: function() {
            console.log('get val:'+ val);
            return val;
     　 },
    　　set: function(newVal) {
            val = newVal;
            console.log('set val:'+ val);
        }
    });
obj.hello='111';
obj.hello; 
VM94:9 set val:111
VM94:4 get val:111

````
