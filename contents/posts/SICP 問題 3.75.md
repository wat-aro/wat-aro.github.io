---
title: "SICP 問題 3.75"
published: 2015/12/17
tags:
  - scheme
  - SICP
---

<p>バグを探す問題</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-zero-crossings input-stream last-value<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>avpt <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>stream-car input-stream<span class="synSpecial">)</span> last-value<span class="synSpecial">)</span> <span class="synConstant">2</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>cons-stream <span class="synSpecial">(</span>sign-change-detector avpt last-value<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>make-zero-crossings <span class="synSpecial">(</span>stream-cdr input-stream<span class="synSpecial">)</span>
                                      avpt<span class="synSpecial">))))</span>

<span class="synComment">;; s1 s2 s3という順番でストリームが流れてくる時，この手続きでは</span>
<span class="synComment">;; s1とs2の平均a1をとし，次のs3のところでa1とs3の平均a2とする．</span>
<span class="synComment">;; ここではs2とs3の平均をとってa2として欲しいので引数を一つ増やす．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-zero-crossings input-stream last-value last-avpt<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let*</span> <span class="synSpecial">((</span>s1 <span class="synSpecial">(</span>stream-car input-stream<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>avpt <span class="synSpecial">(</span><span class="synIdentifier">/</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> s1 last-value<span class="synSpecial">)</span> <span class="synConstant">2</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>cons-stream <span class="synSpecial">(</span>sign-change-detector avpt last-avpt<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>make-zero-crossings <span class="synSpecial">(</span>stream-cdr input-stream<span class="synSpecial">)</span>
                                      s1 avpt<span class="synSpecial">))))</span>
</pre>


