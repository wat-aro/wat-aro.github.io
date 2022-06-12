---
title: "SICP 問題 4.64"
published: 2016/01/17
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>rule <span class="synSpecial">(</span>outranked-by ?staff-person ?boss<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span>supervisor ?staff-person ?boss<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>outranked-by ?middle-manager ?boss<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>supervisor ?staff-person ?middle-manager<span class="synSpecial">))))</span>

<span class="synSpecial">(</span>outranked-by <span class="synSpecial">(</span>Bitdiddle Ben<span class="synSpecial">)</span> ?who<span class="synSpecial">)</span>
</pre>


<p>まずoutranked-byの?staff-personにBitdiddle Benが束縛される．<br/>
次に(supervisor ?staff-person ?boss)でBitdiddle Benの上司が?bossに束縛される．これを仮にAとする．<br/>
そしてoutranked-byが?bossがAとして?middle-managerを探す．※<br/>
ここから二周目．<br/>
supervisor行で?bossをAとして部下Bが?staff-personに束縛される．<br/>
andのoutranked-byで?bossをAとして?middle-managerを探す．<br/>
※印をつけたところ同じところを探し始めているのでここで無限ループに陥る．<br/>
正しいoutranked-byは以下の通り．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>rule <span class="synSpecial">(</span>outranked-by ?staff-person ?boss<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span>supervisor ?staff-person ?boss<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>supervisor ?staff-person ?middle-manager<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>outranked-by ?middle-manager ?boss<span class="synSpecial">))))</span>
</pre>


