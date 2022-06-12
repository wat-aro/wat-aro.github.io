---
title: "schemeでクイックソートとマージソート"
published: 2015/11/29
tags:
  - scheme
---

<p>こういうのを書いてなかったので．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; クイックソート</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>quick-sort lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> lst<span class="synSpecial">)</span>
      lst
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>first <span class="synSpecial">(</span><span class="synIdentifier">car</span> lst<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span>quick-sort <span class="synSpecial">(</span><span class="synIdentifier">filter</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> x first<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">)))</span>
                <span class="synSpecial">(</span><span class="synIdentifier">list</span> first<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>quick-sort <span class="synSpecial">(</span><span class="synIdentifier">filter</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">&gt;=</span> x first<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">)))))))</span>

<span class="synComment">;; マージソート</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>merge-sort lst<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>merge l m<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> l<span class="synSpecial">)</span> m<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">null?</span> m<span class="synSpecial">)</span> l<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">&lt;</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> l<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> m<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> l<span class="synSpecial">)</span> <span class="synSpecial">(</span>merge <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> l<span class="synSpecial">)</span> m<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span>
           <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> m<span class="synSpecial">)</span> <span class="synSpecial">(</span>merge l <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> m<span class="synSpecial">))))))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>divide lst<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> lst<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lst<span class="synSpecial">)))</span>
        lst
        <span class="synSpecial">(</span><span class="synStatement">let*</span> <span class="synSpecial">((</span>list-size <span class="synSpecial">(</span><span class="synIdentifier">length</span> lst<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>half <span class="synSpecial">(</span><span class="synIdentifier">floor</span> <span class="synSpecial">(</span><span class="synIdentifier">/</span> list-size <span class="synConstant">2</span><span class="synSpecial">))))</span>
          <span class="synSpecial">(</span>merge <span class="synSpecial">(</span>divide <span class="synSpecial">(</span>take lst half<span class="synSpecial">))</span>
                 <span class="synSpecial">(</span>divide <span class="synSpecial">(</span>drop lst <span class="synSpecial">(</span><span class="synIdentifier">-</span> list-size half<span class="synSpecial">)))))))</span>
  <span class="synSpecial">(</span>divide lst<span class="synSpecial">))</span>
</pre>


