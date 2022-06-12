---
title: "SICP 問題1.23"
published: 2015/10/07
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>next n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">2</span><span class="synSpecial">)</span>
      <span class="synConstant">3</span>
      <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">2</span> n<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>find-divisor n test-divisor<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">&gt;</span> <span class="synSpecial">(</span>square test-divisor<span class="synSpecial">)</span> n<span class="synSpecial">)</span> n<span class="synSpecial">)</span>
        <span class="synSpecial">((</span>divides? test-divisor n<span class="synSpecial">)</span> test-divisor<span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>find-divisor n <span class="synSpecial">(</span>next test-divisor<span class="synSpecial">)))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (search-for-primes 1000 1100)

1009 *** 4
1013 *** 4
1019 *** 4
1021 *** 3
1031 *** 4
1033 *** 3
1039 *** 3
1049 *** 3
1051 *** 4
1061 *** 4
1063 *** 4
1069 *** 4
1087 *** 4
1091 *** 4
1093 *** 4
1097 *** 4
#&lt;undef&gt;
gosh&gt; (search-for-primes 10000 10100)

10007 *** 12
10009 *** 11
10037 *** 11
10039 *** 10
10061 *** 11
10067 *** 11
10069 *** 11
10079 *** 10
10091 *** 11
10093 *** 11
10099 *** 10
#&lt;undef&gt;
gosh&gt; (search-for-primes 100000 100100)

100003 *** 35
100019 *** 34
100043 *** 33
100049 *** 33
100057 *** 34
100069 *** 33
#&lt;undef&gt;
gosh&gt; (search-for-primes 1000000 1000100)

1000003 *** 160
1000033 *** 104
1000037 *** 104
1000039 *** 104
1000081 *** 105
1000099 *** 105
#&lt;undef&gt;</pre>


<p>だいたい1.6倍になってる．ちょうど二倍にならないのは<code>next</code>で<code>if</code>を使っているためだと考えられる</p>

