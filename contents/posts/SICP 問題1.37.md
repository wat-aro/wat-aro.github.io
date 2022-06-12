---
title: "SICP 問題1.37"
published: 2015/10/08
tags:
  - scheme
  - SICP
---

<p>無限連分数の近似値</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 再帰的プロセス</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cont-frac n d k<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>recur i<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> i k<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span>n i<span class="synSpecial">)</span> <span class="synSpecial">(</span>d i<span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span>n i<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>d i<span class="synSpecial">)</span> <span class="synSpecial">(</span>recur <span class="synSpecial">(</span><span class="synIdentifier">+</span> i <span class="synConstant">1</span><span class="synSpecial">))))))</span>
  <span class="synSpecial">(</span>recur <span class="synConstant">1</span><span class="synSpecial">))</span>

<span class="synComment">;; 反復的プロセス</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>cont-frac n d k<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter i res<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> i <span class="synConstant">0</span><span class="synSpecial">)</span>
        res
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">-</span> i <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span>n i<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>d i<span class="synSpecial">)</span> res<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">-</span> k <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span>n k<span class="synSpecial">)</span> <span class="synSpecial">(</span>d k<span class="synSpecial">))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; 
1 -&gt; 1.0
2 -&gt; 0.5
3 -&gt; 0.6666666666666666
4 -&gt; 0.6000000000000001
5 -&gt; 0.625
6 -&gt; 0.6153846153846154
7 -&gt; 0.6190476190476191
8 -&gt; 0.6176470588235294
9 -&gt; 0.6181818181818182
10 -&gt; 0.6179775280898876
11 -&gt; 0.6180555555555556
12 -&gt; 0.6180257510729613
13 -&gt; 0.6180371352785146
14 -&gt; 0.6180327868852459
15 -&gt; 0.6180344478216819
16 -&gt; 0.6180338134001252
17 -&gt; 0.6180340557275542
18 -&gt; 0.6180339631667064
19 -&gt; 0.6180339985218034
20 -&gt; 0.6180339850173578</pre>


<p>k = 11以上で有効桁数４桁となる．</p>

