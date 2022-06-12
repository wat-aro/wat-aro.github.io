---
title: "SICP 問題 4.58"
published: 2016/01/15
tags:
  - scheme
  - SICP
---

<p>ある人が，自分の勤める部署に勤める監督者がいない場合，その人をbig shotであるとする規則を定義する</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>rule <span class="synSpecial">(</span>big-shot ?person<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>job ?person <span class="synSpecial">(</span>?division <span class="synSpecial">.</span> rest<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>supervisor ?person ?boss<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>job ?boss <span class="synSpecial">(</span>?boss-division <span class="synSpecial">.</span> rest2<span class="synSpecial">))</span>
           <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span>same ?division ?boss-division<span class="synSpecial">))))</span>
</pre>


