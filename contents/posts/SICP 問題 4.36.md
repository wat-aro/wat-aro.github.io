---
title: "SICP 問題 4.36"
published: 2016/01/11
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>a-pythagorean-triple-between low high<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>i <span class="synSpecial">(</span>an-integer-between low high<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>j <span class="synSpecial">(</span>an-integer-between i high<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>k <span class="synSpecial">(</span>an-integer-between j high<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> i i<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> j j<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> k k<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> i j k<span class="synSpecial">)))))</span>

<span class="synComment">;; an-integer-stating-fromを使った場合</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>a-pythagorean-triple-from low<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>i <span class="synSpecial">(</span>an-integer-starting-from low<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>j <span class="synSpecial">(</span>an-integer-starting-from i<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>k <span class="synSpecial">(</span>an-integer-starting-from j<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span>require <span class="synSpecial">(</span><span class="synIdentifier">=</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> i i<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> j j<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">*</span> k k<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> i j k<span class="synSpecial">)))))</span>
</pre>


<p>後者の<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D4%A5%BF%A5%B4%A5%E9%A5%B9">ピタゴラス</a>数の生成方法だとi->j->kの順番で整数が作られてrequireでテストされる．<br/>
テストが失敗すれば直前の分岐に戻って別の道を選ぶのでこの場合kが変更され，+1される．  <br/>
<code>(*k k)</code>の値が<code>(+ (* i i) (* j j))</code>の値をうわまった時，テストは常に失敗するが，新たなkが生成され続けこの手続きは止まらない．<br/>
　<br/>
前者であれば，kの値が増えていっても上限が決められているのでそこでjの値を変更する分岐に入ることができる．<br/>
そのため後者のように止まらないという事態には陥らない．</p>

