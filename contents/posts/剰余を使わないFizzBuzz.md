---
title: "剰余を使わないFizzBuzz"
published: 2016/11/25
tags:
  - Haskell
---

<p>先日ESMで開かれた<a href="https://yochiyochihs.doorkeeper.jp/events/54217">よちよち.hs</a>に参加しました．<br/>
そこで剰余を使わずにzip3と無限リストを使って<a class="keyword" href="http://d.hatena.ne.jp/keyword/FizzBuzz">FizzBuzz</a>を書く話があったので書いてみました．</p>

<pre class="code lang-haskell" data-lang="haskell" data-unlink>fizzbuzz <span class="synStatement">=</span> map fizzbuzz' <span class="synStatement">$</span> zip3 [<span class="synConstant">1</span><span class="synStatement">..</span>] (cycle [<span class="synConstant">&quot;&quot;</span>,<span class="synConstant">&quot;&quot;</span>,<span class="synConstant">&quot;Fizz&quot;</span>]) (cycle [<span class="synConstant">&quot;&quot;</span>, <span class="synConstant">&quot;&quot;</span>, <span class="synConstant">&quot;&quot;</span>, <span class="synConstant">&quot;&quot;</span>,<span class="synConstant">&quot;Buzz&quot;</span>])
  <span class="synType">where</span> fizzbuzz' (_, <span class="synConstant">&quot;Fizz&quot;</span>, <span class="synConstant">&quot;Buzz&quot;</span>) <span class="synStatement">=</span> <span class="synConstant">&quot;FizzBuzz&quot;</span>
        fizzbuzz' (_, <span class="synConstant">&quot;Fizz&quot;</span>, _) <span class="synStatement">=</span> <span class="synConstant">&quot;Fizz&quot;</span>
        fizzbuzz' (_, _, <span class="synConstant">&quot;Buzz&quot;</span>) <span class="synStatement">=</span> <span class="synConstant">&quot;Buzz&quot;</span>
        fizzbuzz' (n, _, _) <span class="synStatement">=</span> show n
</pre>




<pre class="code" data-lang="" data-unlink>*Main&gt; take 100 fizzbuzz
[&#34;1&#34;,&#34;2&#34;,&#34;Fizz&#34;,&#34;4&#34;,&#34;Buzz&#34;,&#34;Fizz&#34;,&#34;7&#34;,&#34;8&#34;,&#34;Fizz&#34;,&#34;Buzz&#34;,&#34;11&#34;,&#34;Fizz&#34;,&#34;13&#34;,&#34;14&#34;,&#34;FizzBuzz&#34;,&#34;16&#34;,&#34;17&#34;,&#34;Fizz&#34;,&#34;19&#34;,&#34;Buzz&#34;,&#34;Fizz&#34;,&#34;22&#34;,&#34;23&#34;,&#34;Fizz&#34;,&#34;Buzz&#34;,&#34;26&#34;,&#34;Fizz&#34;,&#34;28&#34;,&#34;29&#34;,&#34;FizzBuzz&#34;,&#34;31&#34;,&#34;32&#34;,&#34;Fizz&#34;,&#34;34&#34;,&#34;Buzz&#34;,&#34;Fizz&#34;,&#34;37&#34;,&#34;38&#34;,&#34;Fizz&#34;,&#34;Buzz&#34;,&#34;41&#34;,&#34;Fizz&#34;,&#34;43&#34;,&#34;44&#34;,&#34;FizzBuzz&#34;,&#34;46&#34;,&#34;47&#34;,&#34;Fizz&#34;,&#34;49&#34;,&#34;Buzz&#34;,&#34;Fizz&#34;,&#34;52&#34;,&#34;53&#34;,&#34;Fizz&#34;,&#34;Buzz&#34;,&#34;56&#34;,&#34;Fizz&#34;,&#34;58&#34;,&#34;59&#34;,&#34;FizzBuzz&#34;,&#34;61&#34;,&#34;62&#34;,&#34;Fizz&#34;,&#34;64&#34;,&#34;Buzz&#34;,&#34;Fizz&#34;,&#34;67&#34;,&#34;68&#34;,&#34;Fizz&#34;,&#34;Buzz&#34;,&#34;71&#34;,&#34;Fizz&#34;,&#34;73&#34;,&#34;74&#34;,&#34;FizzBuzz&#34;,&#34;76&#34;,&#34;77&#34;,&#34;Fizz&#34;,&#34;79&#34;,&#34;Buzz&#34;,&#34;Fizz&#34;,&#34;82&#34;,&#34;83&#34;,&#34;Fizz&#34;,&#34;Buzz&#34;,&#34;86&#34;,&#34;Fizz&#34;,&#34;88&#34;,&#34;89&#34;,&#34;FizzBuzz&#34;,&#34;91&#34;,&#34;92&#34;,&#34;Fizz&#34;,&#34;94&#34;,&#34;Buzz&#34;,&#34;Fizz&#34;,&#34;97&#34;,&#34;98&#34;,&#34;Fizz&#34;,&#34;Buzz&#34;]</pre>


<p>無限リストが扱いやすくていいですね．<br/>
こういう書き方もあったとは</p>

