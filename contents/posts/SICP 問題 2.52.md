---
title: "SICP 問題 2.52"
published: 2015/10/24
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink>         <span class="synSpecial">(</span>make-segment <span class="synSpecial">(</span>make-vect <span class="synConstant">0.582</span> <span class="synConstant">0.657</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>make-vect <span class="synConstant">0.640</span> <span class="synConstant">0.857</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>make-segment <span class="synSpecial">(</span>make-vect <span class="synConstant">0.640</span> <span class="synConstant">0.857</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>make-vect <span class="synConstant">0.575</span> <span class="synConstant">1.000</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>make-segment <span class="synSpecial">(</span>make-vect <span class="synConstant">0.419</span> <span class="synConstant">1.000</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>make-vect <span class="synConstant">0.354</span> <span class="synConstant">0.857</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>make-segment <span class="synSpecial">(</span>make-vect <span class="synConstant">0.354</span> <span class="synConstant">0.857</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>make-vect <span class="synConstant">0.411</span> <span class="synConstant">0.657</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>make-segment <span class="synSpecial">(</span>make-vect <span class="synConstant">0.411</span> <span class="synConstant">0.657</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>make-vect <span class="synConstant">0.285</span> <span class="synConstant">0.657</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>make-segment <span class="synSpecial">(</span>make-vect <span class="synConstant">0.285</span> <span class="synConstant">0.657</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>make-vect <span class="synConstant">0.154</span> <span class="synConstant">0.605</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>make-segment <span class="synSpecial">(</span>make-vect <span class="synConstant">0.154</span> <span class="synConstant">0.605</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>make-vect <span class="synConstant">0.000</span> <span class="synConstant">0.857</span><span class="synSpecial">))</span><span class="synError">)))</span>

<span class="synComment">;; b</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>corner-split painter n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">0</span><span class="synSpecial">)</span>
      painter
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>up <span class="synSpecial">(</span>up-split painter <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">)))</span>
            <span class="synSpecial">(</span>right <span class="synSpecial">(</span>right-split painter <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">)))</span>
            <span class="synSpecial">(</span>corner <span class="synSpecial">(</span>corner-split painter <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))))</span>
        <span class="synSpecial">(</span>beside <span class="synSpecial">(</span>below painter up<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>below painter right corner<span class="synSpecial">)))))</span>

<span class="synComment">;; c</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>corner-split painter n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">0</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span>flip-horiz painter<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>up <span class="synSpecial">(</span>up-split painter <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">)))</span>
            <span class="synSpecial">(</span>right <span class="synSpecial">(</span>right-split painter <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))))</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>top-left <span class="synSpecial">(</span>beside up up<span class="synSpecial">))</span>
              <span class="synSpecial">(</span>bottom-right <span class="synSpecial">(</span>below right right<span class="synSpecial">))</span>
              <span class="synSpecial">(</span>corner-split <span class="synSpecial">(</span>painter <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))))</span>
          <span class="synSpecial">(</span>beside <span class="synSpecial">(</span>below painter top-left<span class="synSpecial">)</span>
                  <span class="synSpecial">(</span>below bottom-right corner<span class="synSpecial">))))))</span>
</pre>


