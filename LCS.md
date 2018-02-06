# Longest Common Subsequence

## #LCS简介

```

最长公共子序列（Longest Common Subsequence LCS）是从给定的两个序列X和Y中取出尽可能多的一部分字符，按照它们在原序列排列的先后次序排列得到。LCS问题的算法用途广泛，如在软件不同版本的管理中，用LCS算法找到新旧版本的异同处;在软件测试中，用LCS算法对录制和回放的序列进行比较，在基因工程领域，用LCS算法检查患者DNA连与键康DNA链的异同;在防抄袭系统中，用LCS算法检查论文的抄袭率。LCS算法也可以用于程序代码相似度度量，人体运行的序列检索，视频段匹配等方面，所以对LCS算法进行研究具有很高的应用价值。

```

## #实现


```
function LCS(str1, str2) {
    var m = str1.length
    var n = str2.length
    var dp = [new Array(n + 1).fill(0)]
    //第一行全是0
    for (var i = 1; i <= m; i++) {
        //一共有m+1行
        dp[i] = [0]
        //第一列全是0
        for (var j = 1; j <= n; j++) {
            //一共有n+1列
            if (str1[i - 1] === str2[j - 1]) {
                //注意这里，str1的第一个字符是在第二列中，因此要减1，str2同理
                dp[i][j] = dp[i - 1][j - 1] + 1
                //对角＋1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    } 
    return dp[m][n];
}

```
