# 字典树
## 基本结构
![基本结构](https://i.loli.net/2020/03/04/ahTqo6tE3kPNfHR.png)
## 核心思想
Trie的核心思想 是空间换时间。利用字符串的公共前缀来降低时间的开销达到提高效率的目的。
## 基本性质
1. 根节点不包含字符，除根节点外每一个节点都只包含一个字符
2. 从根节点到某一节点，路径上经过的字符串连接起来，为该节点对应的字符串。
3. 每个节点的所有子节点包含的字符都不相同。

##　练习
### 208. 实现 Trie (前缀树)
-[implement-trie-prefix-tree](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)


