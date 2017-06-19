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

![雇佣兵日记](images/img201003241707024.jpg)

[(liujunjun's blog && 军军的博客)](https://liujunjiun.github.io/)
