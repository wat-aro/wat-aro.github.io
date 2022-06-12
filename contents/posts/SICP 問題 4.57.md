---
title: "SICP 問題 4.57"
published: 2016/01/15
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; jiroの仕事をtaroができるかどうか</span>
<span class="synSpecial">(</span>rule <span class="synSpecial">(</span>replacible ?person1 ?person2<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>job ?person2 ?job2<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>job ?person1 ?job2<span class="synSpecial">))</span> <span class="synComment">;person2とperosn1の仕事が同じ</span>
               <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>job ?person1 ?job1<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>can-do-job ?job1 ?job2<span class="synSpecial">)))</span> <span class="synComment">;person1はperson2の仕事job2もできる</span>
           <span class="synSpecial">(</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span>same ?person1 ?person2<span class="synSpecial">))))</span>

<span class="synComment">;; a Cy D. Fectに代われる人すべて</span>
<span class="synSpecial">(</span>replacible ?person <span class="synSpecial">(</span>Fect Cy D<span class="synSpecial">))</span>

<span class="synComment">;; b</span>
<span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>salary ?person ?salary<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>replacible ?person ?somebody<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>salary ?somebody ?somebody-salary<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>lisp-value <span class="synIdentifier">&gt;</span> ?somebody-salary ?salary<span class="synSpecial">))</span>
</pre>


