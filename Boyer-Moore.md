# Longest Common Subsequence

## #Boyer Moore 字符串搜索算法

## #实现


```
var boyerMoore = function(content, pattern, fromIndex) {
    var cLen = content.length,
    pLen = pattern.length,
    i = pLen - 1,
    badCharMap = {},
    goodSuffixMap = {},
    index, item, suffix, pre, j;
    fromIndex = fromIndex || i;
    for (; i > 0; i--) {
        item = pattern[i];
        if (badCharMap[item] === undefined) {
            badCharMap[item] = i
        }
        suffix = pattern.slice(i);
        pre = pattern.slice(0, i);
        if (suffix.length <= pre.length) {
            for (j = pre.length - 1; j >= 0; j--) {
                item = pre.slice(j - suffix.length + 1, j + 1);
                if (suffix === item) {
                    if (goodSuffixMap[suffix] === undefined) {
                        goodSuffixMap[suffix] = j - suffix.length + 1
                    }
                }
            }
        }
    }
    var search = function(lastIndex) {
        var i = pLen - 1,
        j = lastIndex,
        g = 0,
        badChar, goodSuffix, goodSuffixMove, badCharMove, badCharIndex, goodSuffixIndex;
        for (; i > 0; i--) {
            badChar = content[j];
            if (badChar === pattern[i]) {
                g++
            } else {
                badCharIndex = badCharMap[badChar];
                if (badCharIndex === undefined) {
                    badCharIndex = -1
                }
                badCharMove = i - badCharIndex;
                if (badCharMove <= 0) {
                    badCharMove = 1
                }
                if (g) {
                    for (i = g; i > 0; i--) {
                        goodSuffix = pattern.slice(0 - i);
                        if (goodSuffix in goodSuffixMap) {
                            goodSuffixIndex = goodSuffixMap[goodSuffix];
                            goodSuffixMove = pLen - i - goodSuffixIndex;
                            break
                        }
                    }
                    if (goodSuffixIndex === undefined) {
                        goodSuffixMove = pLen - g - 1
                    }
                    lastIndex += Math.max(goodSuffixMove, badCharMove)
                } else {
                    lastIndex += badCharMove
                }
                break
            }
            j--
        }
        if (pLen - 1 !== g) {
            if (lastIndex + 1 > cLen) {
                index = -1
            } else {
                search(lastIndex)
            }
        } else {
            index = lastIndex + 1 - pLen
        }
    };
    search(fromIndex);
    return index
};
var content = 'here is a simple example';
var query = 'example';
var index = boyerMoore(content, query);
console.log('boyerMoore : ' + index);
console.log('indexOf : ' + content.indexOf(query));

```
