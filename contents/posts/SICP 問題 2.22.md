---
title: "SICP 問題 2.22"
published: 2015/10/19
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>square-list items<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter things answer<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> things<span class="synSpecial">)</span>
        answer
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> things<span class="synSpecial">)</span>
              <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>square <span class="synSpecial">(</span><span class="synIdentifier">car</span> things<span class="synSpecial">))</span>
                    answer<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span>iter items nil<span class="synSpecial">))</span>
<span class="synComment">;; iter内でのconsで(square (car things))とanswerを引数として取っている．</span>
<span class="synComment">;; この場，次のcdrでconsされるのは(square (car (cdr things))) と((square (car things)) answer)．</span>
<span class="synComment">;; ここで順番が逆になっている．</span>
<span class="synComment">;; このまま続けていくと欲しかったリストの逆順が返される．</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>square-list items<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>iter things answer<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> things<span class="synSpecial">)</span>
        answer
        <span class="synSpecial">(</span>iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> things<span class="synSpecial">)</span>
              <span class="synSpecial">(</span><span class="synIdentifier">cons</span> answer
                    <span class="synSpecial">(</span>square <span class="synSpecial">(</span><span class="synIdentifier">car</span> things<span class="synSpecial">))))))</span>
  <span class="synSpecial">(</span>iter items nil<span class="synSpecial">))</span>
<span class="synComment">;; 始めのconsで作られるのは(() . 1)．</span>
<span class="synComment">;; 次の繰り返しでconsすると((() . 1) . 2)ができる．</span>
<span class="synComment">;; 始めのconsで作られたドット対を要素としたドット対ができる．</span>
<span class="synComment">;; これを繰り返すのでうまくいかない．</span>
</pre>


