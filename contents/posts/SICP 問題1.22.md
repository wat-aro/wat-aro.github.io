---
title: "SICP 問題1.22"
published: 2015/10/07
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>timed-prime-test n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">display</span> n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>start-prime-test n <span class="synSpecial">(</span>runtime<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>start-prime-test n start-time<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>prime? n<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>report-prime <span class="synSpecial">(</span><span class="synIdentifier">-</span> <span class="synSpecial">(</span>runtime<span class="synSpecial">)</span> start-time<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>report-prime elapsed-time<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot; *** &quot;</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">display</span> elapsed-time<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>runtime<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>use srfi-11<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>let-values <span class="synSpecial">(((</span>a b<span class="synSpecial">)</span> <span class="synSpecial">(</span>sys-gettimeofday<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> a <span class="synConstant">1000000</span><span class="synSpecial">)</span> b<span class="synSpecial">)))</span>
</pre>


<p>以上を使って指定範囲の連続する奇数について<a class="keyword" href="http://d.hatena.ne.jp/keyword/%C1%C7%BF%F4">素数</a>性を調べる手続き手続きを書く．<br/>
　</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>search-for-primes start end<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter start end<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">&gt;</span> start end<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">))</span>
          <span class="synSpecial">((</span>prime? start<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>timed-prime-test start<span class="synSpecial">)</span>
                               <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">2</span> start<span class="synSpecial">)</span> end<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">2</span> start<span class="synSpecial">)</span> end<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">odd?</span> start<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>iter start end<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> start<span class="synSpecial">)</span> end<span class="synSpecial">)))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (search-for-primes 1000 1100)

1009 *** 6
1013 *** 6
1019 *** 5
1021 *** 5
1031 *** 6
1033 *** 6
1039 *** 6
1049 *** 6
1051 *** 5
1061 *** 6
1063 *** 6
1069 *** 5
1087 *** 6
1091 *** 6
1093 *** 6
1097 *** 6
#&lt;undef&gt;
gosh&gt; (search-for-primes 10000 10100)

10007 *** 28
10009 *** 17
10037 *** 17
10039 *** 17
10061 *** 17
10067 *** 17
10069 *** 17
10079 *** 18
10091 *** 17
10093 *** 17
10099 *** 18
#&lt;undef&gt;
gosh&gt; (search-for-primes 100000 100100)

100003 *** 85
100019 *** 55
100043 *** 55
100049 *** 55
100057 *** 54
100069 *** 54
#&lt;undef&gt;
gosh&gt; (search-for-primes 1000000 1000100)

1000003 *** 195
1000033 *** 172
1000037 *** 172
1000039 *** 172
1000081 *** 176
1000099 *** 176
#&lt;undef&gt;</pre>


<p>nが100倍になると処理時間は概ね10倍となっているので予想通りと言える．</p>

