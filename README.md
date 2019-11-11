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
## #10003  events.js:72 throw er; // Unhandled 'error' event  【error on npm run dev】

```
because  your listen‘s port in use ， please check your netstat 。
```

## #10004  [Warning] Ignoring user change to 'mysql' because the user was set to 'mariadb' earlier on the command line
## #10005  Can't find messagefile '/usr/share/mysql/errmsg.sys'
```
maybe apt或yum安装上mysql-client相关的package，导致原有的
[root@mysql91 share]# mysqld_safe --defaults-file=/etc/my.cnf &
[1] 3482
[root@mysql91 share]# 170103 18:48:58 mysqld_safe Logging to '/log/mysql/error.log'.

[1]+  Done                    mysqld_safe --defaults-file=/etc/my.cnf
[root@mysql91 share]# vi /log/mysql/error.log 
............
2017-01-03 18:48:58 140215358961696 [ERROR] Can't find messagefile '/usr/local/mysql/share/mysql/errmsg.sys'
2017-01-03 18:48:58 140215358961696 [ERROR] Aborting
............

[root@mysql91 share]# vi /etc/my.cnf

添加[mysqld]
language = /usr/local/mysql/share/english

[root@mysql91 english]# cd /usr/local/mysql/share/english
[root@mysql91 english]# file errmsg.sys 
errmsg.sys: data     --数据文件，可以不用看了

[root@mysql91 english]# mysqld_safe --defaults-file=/etc/my.cnf &

```
## #10006  Ignoring user change to 'mysql' because the user was set to 'mariadb' earlier on the command line  

```
because  apt-get install some package of mysql
solution： dpkg -P mysql-server mysql-common libmysqlclient15off libmysqlclient15-dev
it will  be fine！
```
## #10007  ERROR 1064 (42000): no enabled local indexes to search

```
(maybe indexer is created in fail)    after a month ,I succeed in creating indexer.
```

## #10008  W: Duplicate sources.list entry when do “sudo apt-get update”

```
注释（或直接删除）掉/etc/apt/sources.list中，内容有重复的那部分，就可以避免此错误了。

```

## #10009   org.elasticsearch.bootstrap.StartupException: java.lang.RuntimeException: can not run elasticsearch as root

```
switch user
```

## #10010   main ERROR Could not register mbeans java.security.AccessControlException: access denied ("javax.management.MBeanTrustPermission" "register")

```
chmod -R 775 config
```

## #10011   /root/sphinx-2.1.9-release/src/sphinx.cpp:26852: undefined reference to `libiconv_open'   ( found in 2016)
## #10012   /root/sphinx-2.1.9-release/src/sphinx.cpp:26870: undefined reference to `libiconv'   ( found in 2016)
## #10013   /root/sphinx-2.1.9-release/src/sphinx.cpp:26876: undefined reference to `libiconv_close'   ( found in 2016)

```
solution:
原因是g++没有添加 -libiconv选项

cd sphinx-2.1.9-release

vi src/MakeFile

LIBS = -lm -lz -lexpat  -L/usr/local/lib -lrt  -lpthread
change to
LIBS = -lm -lz -lexpat  -L/usr/local/lib -lrt  -lpthread   -liconv
```

## #10014   “configure: error: Cannot find libsphinxclient headers”

```
solution:
cd  sphinx/api/libsphinxclient/
./configure 
make && make install
```

## #10015  Make sure you have Sphinx installed, then set the SPHINXBUILD environment variable to point to the full path of the 'sphinx-build' executable. Alternatively you can add the directory with the executable to your PATH. If you don't have Sphinx installed, grab it from http://sphinx-doc.org/.  Stop.


```
solution:
pip install -U Sphinx
```

## #10016  lua.c:82:31: fatal error: readline/readline.h: No such file or directory

```
solution:
 yum install readline-devel
 or
 apt-get install libreadline-dev
```

## #10017  PHP Fatal error:  Maximum recursion depth exceeded in

```
 pedding
```
## #10018  ERROR: The environment variable PTOOLSPATH is outdated! 

```
 pedding
```

## #10019 tcpdump: no suitable device found

```
 maybe it must be root to run.
```

## #10020 git pull error: cannot open .git/FETCH_HEAD: Permission denied

```
 由于用户目录写权限问题(you need get Permission)
```

## #10021  Failed to watch /var/peta; upper limit on inotify watches reached!

```
 solution:
 echo 8192000 > /proc/sys/fs/inotify/max_user_watches
 
```


## #10022  ./ext3.h: 在成员函数‘__u32 Inode::reserved2() const’中:
## #10023  ./ext3.h:113:42: 错误：‘i_reserved2’在此作用域中尚未声明 __u32 reserved2(void) const { return i_reserved2; }
## #10024  ./ext3.h: 在成员函数‘void Inode::set_reserved2(__u32)’中:
## #10025  ./ext3.h:115:37: 错误：‘i_reserved2’在此作用域中尚未声明 void set_reserved2(__u32 val) { i_reserved2 = val; }

```
 solution:  I have do a patch , as follow :
 #ifndef EXT3_H
 #define EXT3_H

+// this trickery needs to happen before ext2_fs is included so
+// bail out if it has already been included by another path
+#ifdef _LINUX_EXT2_FS_H
+  #error please include this file before any other includes of ext2fs/ext2_fs.h
+#endif
+
+// some versions of the ext2 headers call this s_frags_per_group and some
+// call it s_clusters_per_group, define one to the other so our code works
+// with both
+#define s_clusters_per_group s_frags_per_group
+
 // Use the header files from e2progs (http://e2fsprogs.sourceforge.net)
 // We can use these headers and then everything named ext2 or ext3.
 #include <ext2fs/ext2_fs.h>// Definitions of ext2, ext3 and ext4.
@@ -110,6 +121,12 @@
     __u32 faddr(void) const { return i_faddr; }
     __u16 uid_high(void) const { return i_uid_high; }
     __u16 gid_high(void) const { return i_gid_high; }
+#ifndef i_reseved2
+    //i_reseved2 has been split into two fields in recent
+    //versions of the headers, luckilly we can still access
+    //it in one peice through the hurd side of the union
+    #define i_reserved2 osd2.hurd2.h_i_author
+#endif
     __u32 reserved2(void) const { return i_reserved2; }

     void set_reserved2(__u32 val) { i_reserved2 = val; }
```

## #10026  A non well formed numeric value encountered ( in PHP7)
     
```
solution:
    well, the variable is not a non well formed numeric value.
    很有可能不是纯数字的字符串,你可以使用intval()函数等将非格式良好的数据转换成良好的数据类型就行了
```

## #10026  svn: Can't convert string from 'UTF-8' to native encoding
     
```
solution:
    export LC_ALL=zh_CN.UTF-8
    
    locale
```

## #10027  SyntaxError: Non-ASCII character '\xe4' in file tkinter.py on line 2
     
```
solution:
    
在文件开头加入

# -*- coding: UTF-8 -*-    或者  #coding=utf-8
```

## #10029  max_execution_time is not work 

```
solution:
在 php.ini 中，有一个参数 max_execution_time 可以设置 PHP 脚本的最大执行时间，但是，在 php-cgi(php-fpm) 中，该参数不会起效。
真正能够控制 PHP 脚本最大执行时：
<value name="request_terminate_timeout">0s</value>  

如果是使用 mod_php5.so的作为模块的模式运行 max_execution_time 是会生效的，但是如果是php-fpm模式中运行时不生效的。
```

## #10030 (98)Address already in use: AH00072: make_sock: could not bind to address [::]:80
## #10031 (98)Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
## #10032 no listening sockets available, shutting down  AH00015: Unable to open logs

```
0~1024 port，  must be root to run

```

## #10033 fatal: git-write-tree: error building trees

```
git 在fetch时侯报错：
fatal: git-write-tree: error building trees
解决办法：
Use:
git reset --mixed
instead of git reset --hard. You will not lose any changes.

```

## #10034  grep 文件报错 “Binary file ... matches”的处理

```
抱着个错误是因为grep不能处理二进制的文件，

-a, --text Process a binary file as if it were text; this is equivalent to the --binary-files=text option. 

这个时候加上-a参数就解决了 

```

## #10035  N/A: version "N/A -> N/A" is not yet installed.

```
cd ~/.nvm/alias

change default content, and it will be fine!!!!
```

## #10036  Iphone Safari中使用sort的排序函数失败.

```

;(function(w){
    if(/msie|applewebkit.+safari/i.test(w.navigator.userAgent)){
        var _sort = Array.prototype.sort;
        Array.prototype.sort = function(fn){
            if(!!fn && typeof fn === 'function'){
                if(this.length < 2) return this;
                var i = 0, j = i + 1, l = this.length, tmp, r = false, t = 0;
                for(; i < l; i++){
                    for(j = i + 1; j < l; j++){
                        t = fn.call(this, this[i], this[j]);
                        r = (typeof t === 'number' ? t : !!t ? 1 : 0) > 0 ? true : false;
                        if(r){
                            tmp = this[i];
                            this[i] = this[j];
                            this[j] = tmp;
                        }
                    }
                }
                return this;
            } else {
                return _sort.call(this);
            }
        };
    }
})(window);

```

## #10037  php编译的时候为什么要加上 --disable-fileinfo .

```
because 1G以下的内存，编译会出现问题，就需要--disable-fileinfo

```


## #10037  Warning: require(): open_basedir restriction in effect.

```
sudo vim /usr/local/nginx/conf/fastcgi.conf

# fastcgi_param PHP_ADMIN_VALUE "open_basedir=$document_root/:$document_root/../:/tmp/:/proc/";


```

## #10038  Smarty has a deprecated constructor.

```

最近刚把php版本从5.6切换到7.0上，但是再重新打开项目时，报如下错误：

Deprecated: Methods with the same name as their class will not be constructors in a future version of PHP;
Smarty has a deprecated constructor in /www/platform/library/Platform/View/Smarty/Smarty.class.php

do  like this, it will fine!
<?php
        class a{
                function __construct(){
                }
        }
?>

```


## #10039  gulpInst.start.apply(gulpInst, toRun);

```

gulp 3 变成 gulp 4 时，出现了错误Error:gulpInst.start.apply(gulpInst, toRun) 

解决方案：执行命令，npm i -g gulp-cli

```


## #10040  Namespace declaration statement has to be the very first statement in the script.

```

在PHP文件中编写有namespace 时候提示此错误，应该将  <?php  开始前面不能有语句，空行也不行。

如果是在含有<html>语言的混合php 文件里面，且文件里面至少有一个<?php   ?>代码段时候，只要用到namespace,该文件的首行必须以<?php开头.

```

![雇佣兵日记](images/img201003241707024.jpg)

[(liujunjun's blog && 军军的博客)](https://liujunjiun.github.io/)
