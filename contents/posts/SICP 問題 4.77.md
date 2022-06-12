---
title: "SICP 問題 4.77"
published: 2016/01/21
tags:
  - scheme
  - SICP
---

<p>簡略化して．<br/>
(and (not A) B C)を(and B C (not A))に並び替えてからqevalしていく．<br/>
入れ子になっていた場合もqevalでまたcojoinに送られるので対処出来る．<br/>
ただ問題文通りだと，必要な変数を満たす表明が現れたらすぐにnotを実行しなければいけないが，それは難しかったので妥協．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>conjoin conjuncts frame-stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>new <span class="synSpecial">(</span>bring-filter-behind conjuncts<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>empty-conjunction? new<span class="synSpecial">)</span>
      frame-stream
      <span class="synSpecial">(</span>conjoin <span class="synSpecial">(</span>rest-conjuncts new<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>qeval <span class="synSpecial">(</span>first-conjunct new<span class="synSpecial">)</span>
                      frame-stream<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span>put <span class="synSpecial">'</span>and <span class="synSpecial">'</span>qeval conjoin<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>filter? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>not<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>lisp-value<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>bring-filter-behind conjuncts<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> iter <span class="synSpecial">((</span>conjuncts conjuncts<span class="synSpecial">)</span> <span class="synSpecial">(</span>infront <span class="synSpecial">'())</span> <span class="synSpecial">(</span>behind <span class="synSpecial">'()))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> conjuncts<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> infront behind<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span>first-conjunct conjuncts<span class="synSpecial">))</span>
                <span class="synSpecial">(</span>rest <span class="synSpecial">(</span>rest-conjuncts conjuncts<span class="synSpecial">)))</span>
            <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>filter? <span class="synSpecial">(</span>type first<span class="synSpecial">))</span>
                   <span class="synSpecial">(</span>iter rest infront <span class="synSpecial">(</span><span class="synIdentifier">append</span> behind first<span class="synSpecial">)))</span>
                  <span class="synSpecial">(</span><span class="synStatement">else</span>
                   <span class="synSpecial">(</span>iter rest <span class="synSpecial">(</span><span class="synIdentifier">append</span> infront first<span class="synSpecial">)</span> behind<span class="synSpecial">)))))))</span>
</pre>


<p>4.78と4.79はパス．</p>

