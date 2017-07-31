# redis vs memcache

## #webbench -c 2000 -t 20 http://127.0.0.1/redis.php

```
Webbench - Simple Web Benchmark 1.5
Copyright (c) Radim Kolar 1997-2004, GPL Open Source Software.
Benchmarking: GET http://127.0.0.1/redis.php
2000 clients, running 20 sec.
Speed=403335 pages/min, 2135371 bytes/sec.
Requests: 134445 susceed, 0 failed.

```

## #webbench -c 2000 -t 20 http://127.0.0.1/memcached.php

```
Webbench - Simple Web Benchmark 1.5
Copyright (c) Radim Kolar 1997-2004, GPL Open Source Software.
Benchmarking: GET http://127.0.0.1/memcached.php
2000 clients, running 20 sec.
Speed=377220 pages/min, 1967549 bytes/sec.
Requests: 125740 susceed, 0 failed. 
```
### redis.php
```php
<?php

//显示版本
$version = current($redis->info());
echo "Redis Server version:  ".$version ."<br />";;

//保存数据
$redis->set('key1', 'This is first value', 60);
$val = $redis->get('key1');
echo "Get key1 value: " . $val ."<br />";

//替换数据
$redis->set('key1', 'This is replace value', 60);
$val = $redis->get('key1');
echo "Get key1 value: " . $val . "<br />";

//保存数组
$arr = array('aaa', 'bbb', 'ccc', 'ddd');
$redis->set('key2', json_encode($arr), 60);
$val2 = $redis->get('key2');
echo "Get key2 value: ";
print_r(json_decode($val2));
echo "<br />";

//删除数据
$redis->delete('key1');
$val = $redis->get('key1');
echo "Get key1 value: " . $val . "<br />";

//清除所有数据
$redis->flushAll();
$val2 = $redis->get('key2');
echo "Get key2 value: ";
print_r(json_decode($val2));
echo "<br />";


```

### memcached.php
```php
<?php

//显示版本
$version = current($mem->getVersion());
echo "Memcached Server version:  ".$version ."<br />";;

//保存数据
$mem->set('key1', 'This is first value', 60);
$val = $mem->get('key1');
echo "Get key1 value: " . $val ."<br />";

//替换数据
$mem->replace('key1', 'This is replace value', 60);
$val = $mem->get('key1');
echo "Get key1 value: " . $val . "<br />";

//保存数组
$arr = array('aaa', 'bbb', 'ccc', 'ddd');
$mem->set('key2', json_encode($arr), 60);
$val2 = $redis->get('key2');
echo "Get key2 value: ";
print_r(json_decode($val2));
echo "<br />";

//删除数据
$mem->delete('key1');
$val = $mem->get('key1');
echo "Get key1 value: " . $val . "<br />";

//清除所有数据
$mem->flush();
$val2 = $mem->get('key2');
echo "Get key2 value: ";
print_r($val2);
echo "<br />";

```
