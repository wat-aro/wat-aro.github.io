---
title: "anagramの別解考えた"
published: 2016/10/04
tags:
  - ruby
---

<p>まず二つの文字列のサイズを計測して，それらが等しくなければfalseを返す．
同じ場合は一文字ずつカウントしながらハッシュに入れていく．
この時，s1の文字はインクリメントして，s2の文字はデクリメントする．
最後にハッシュのバリューを取りだして，すべてゼロならtrue.
ひとつでもゼロでなければfalse.
それで書いたのが以下．</p>

<pre class="code lang-ruby" data-lang="ruby" data-unlink><span class="synPreProc">def</span> <span class="synIdentifier">anagram</span>(s1, s2)
  <span class="synStatement">return</span> <span class="synConstant">false</span> <span class="synStatement">if</span> s1.size != s2.size

  compare(s1.downcase, s2.downcase, s1.size)
<span class="synPreProc">end</span>

<span class="synPreProc">def</span> <span class="synIdentifier">compare</span>(s1, s2, size)
  counts = <span class="synType">Hash</span>.new(<span class="synConstant">0</span>)
  <span class="synStatement">for</span> i <span class="synStatement">in</span> <span class="synConstant">0</span>..(size-<span class="synConstant">1</span>) <span class="synStatement">do</span>
    counts[s1[i]] += <span class="synConstant">1</span>
    counts[s2[i]] -= <span class="synConstant">1</span>
  <span class="synStatement">end</span>

  counts.values.all?{ |<span class="synIdentifier">value</span>| value == <span class="synConstant">0</span> }
<span class="synPreProc">end</span>
</pre>


<p>んー</p>

<p>追記
<a class="keyword" href="http://d.hatena.ne.jp/keyword/%C1%C7%BF%F4">素数</a>の積を取るやり方を<a class="keyword" href="http://d.hatena.ne.jp/keyword/reddit">reddit</a>で教えてもらったので．</p>

<pre class="code lang-ruby" data-lang="ruby" data-unlink><span class="synPreProc">def</span> <span class="synIdentifier">str_product</span>(str)
  <span class="synType">PRIMES</span> = [<span class="synConstant">2</span>,   <span class="synConstant">3</span>,  <span class="synConstant">5</span>,  <span class="synConstant">7</span>, <span class="synConstant">11</span>, <span class="synConstant">13</span>, <span class="synConstant">17</span>, <span class="synConstant">19</span>, <span class="synConstant">23</span>, <span class="synConstant">29</span>,
            <span class="synConstant">31</span>, <span class="synConstant">37</span>, <span class="synConstant">41</span>, <span class="synConstant">43</span>, <span class="synConstant">47</span>, <span class="synConstant">53</span>, <span class="synConstant">59</span>, <span class="synConstant">61</span>, <span class="synConstant">67</span>, <span class="synConstant">71</span>,
            <span class="synConstant">73</span>, <span class="synConstant">79</span>, <span class="synConstant">83</span>, <span class="synConstant">89</span>, <span class="synConstant">97</span>, <span class="synConstant">101</span>, <span class="synConstant">103</span>, <span class="synConstant">107</span>, <span class="synConstant">109</span>, <span class="synConstant">113</span>,
            <span class="synConstant">127</span>, <span class="synConstant">131</span>, <span class="synConstant">137</span>, <span class="synConstant">139</span>, <span class="synConstant">149</span>, <span class="synConstant">151</span>, <span class="synConstant">157</span>, <span class="synConstant">163</span>, <span class="synConstant">167</span>, <span class="synConstant">173</span>,
            <span class="synConstant">179</span>, <span class="synConstant">181</span>, <span class="synConstant">191</span>, <span class="synConstant">193</span>, <span class="synConstant">197</span>, <span class="synConstant">199</span>, <span class="synConstant">211</span>, <span class="synConstant">223</span>, <span class="synConstant">227</span>, <span class="synConstant">229</span>,
            <span class="synConstant">233</span>, <span class="synConstant">239</span>, <span class="synConstant">241</span>, <span class="synConstant">251</span>, <span class="synConstant">257</span>, <span class="synConstant">263</span>, <span class="synConstant">269</span>, <span class="synConstant">271</span>, <span class="synConstant">277</span>, <span class="synConstant">281</span>,
            <span class="synConstant">283</span>, <span class="synConstant">293</span>, <span class="synConstant">307</span>, <span class="synConstant">311</span>, <span class="synConstant">313</span>, <span class="synConstant">317</span>, <span class="synConstant">331</span>, <span class="synConstant">337</span>, <span class="synConstant">347</span>, <span class="synConstant">349</span>,
            <span class="synConstant">353</span>, <span class="synConstant">359</span>, <span class="synConstant">367</span>, <span class="synConstant">373</span>, <span class="synConstant">379</span>, <span class="synConstant">383</span>, <span class="synConstant">389</span>, <span class="synConstant">397</span>, <span class="synConstant">401</span>, <span class="synConstant">409</span>,
            <span class="synConstant">419</span>, <span class="synConstant">421</span>, <span class="synConstant">431</span>, <span class="synConstant">433</span>, <span class="synConstant">439</span>, <span class="synConstant">443</span>, <span class="synConstant">449</span>, <span class="synConstant">457</span>, <span class="synConstant">461</span>, <span class="synConstant">463</span>,
            <span class="synConstant">467</span>, <span class="synConstant">479</span>, <span class="synConstant">487</span>, <span class="synConstant">491</span>, <span class="synConstant">499</span>, <span class="synConstant">503</span>, <span class="synConstant">509</span>, <span class="synConstant">521</span>, <span class="synConstant">523</span>, <span class="synConstant">541</span>,
            <span class="synConstant">547</span>, <span class="synConstant">557</span>, <span class="synConstant">563</span>, <span class="synConstant">569</span>, <span class="synConstant">571</span>, <span class="synConstant">577</span>, <span class="synConstant">587</span>, <span class="synConstant">593</span>, <span class="synConstant">599</span>, <span class="synConstant">601</span>,
            <span class="synConstant">607</span>, <span class="synConstant">613</span>, <span class="synConstant">617</span>, <span class="synConstant">619</span>, <span class="synConstant">631</span>, <span class="synConstant">641</span>, <span class="synConstant">643</span>, <span class="synConstant">647</span>, <span class="synConstant">653</span>, <span class="synConstant">659</span>,
            <span class="synConstant">661</span>, <span class="synConstant">673</span>, <span class="synConstant">677</span>, <span class="synConstant">683</span>, <span class="synConstant">691</span>, <span class="synConstant">701</span>, <span class="synConstant">709</span>, <span class="synConstant">719</span>]
  result = <span class="synConstant">0</span>
  (<span class="synConstant">0</span>..(str.size - <span class="synConstant">1</span>)).each <span class="synStatement">do</span> |<span class="synIdentifier">i</span>|
    result +=<span class="synType">PRIMES</span>[str[i].downcase.ord]
  <span class="synStatement">end</span>
  result
<span class="synPreProc">end</span>

<span class="synPreProc">def</span> <span class="synIdentifier">anagram</span>(s1, s2)
  str_product(s1) == str_product(s2)
<span class="synPreProc">end</span>
</pre>


<p>これはいい</p>

