# liujunjiun
liujunjiun's website 2016 03 01

  九宫格游戏技术要点：
  
  *  头九脚一中间五，左肩扛二右扛四，左臂来七右来三，左手拿六右拿八
  
  
扛住100亿次请求？我们来试一试：[扛住100亿次请求？我们来试一试]( http://www.guoyanbin.com/%E6%89%9B%E4%BD%8F100%E4%BA%BF%E6%AC%A1%E8%AF%B7%E6%B1%82%EF%BC%9F%E6%88%91%E4%BB%AC%E6%9D%A5%E8%AF%95%E4%B8%80%E8%AF%95/)

# some issues on programming

## #10000 npm 2.15.1 is too low, be sure npm version >= 3.0.0

```
solution: npm install npm -g
```

## #10001 cp: cannot stat 'ltmain.sh': No such file or directory  （6 months ago）
```
https://github.com/mongodb/mongo-php-driver/issues/255

if your php version >= 7.0, please ignore it! because its is php5.   
```

## #10002  PHP Startup: Unable to load dynamic library '/usr/local/php/lib/php/extensions/no-debug-non-zts-20160303/swoole.so' - /usr/local/php/lib/php/extensions/no-debug-non-zts-20160303/swoole.so: wrong ELF class: ELFCLASS32 in Unknown on line 0

```
    ELFCLASS32， it meas that you have changed your PC into 64 version，caused error of compiled 
```
## #10002  events.js:72 throw er; // Unhandled 'error' event  【error on npm run dev】

```
because  your listen‘s port in use ， please check your netstat 。
```

![雇佣兵日记](images/img201003241707024.jpg)

[(liujunjun's blog && 军军的博客)](https://liujunjiun.github.io/)
