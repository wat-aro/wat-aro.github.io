---
title: "SICP 問題 4.59"
published: 2016/01/15
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>meeting accounting <span class="synSpecial">(</span>Monday <span class="synError">9am</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>meeting administration <span class="synSpecial">(</span>Monday <span class="synError">10am</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>meeting computer <span class="synSpecial">(</span>Wednesday <span class="synError">3pm</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>meeting administration <span class="synSpecial">(</span>Friday <span class="synError">1pm</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span>meeting whole-company <span class="synSpecial">(</span>Wednesday <span class="synError">4pm</span><span class="synSpecial">))</span>

<span class="synComment">;; a 金曜の朝に今日ある会議をすべて質問する</span>
<span class="synSpecial">(</span>meeting ?all <span class="synSpecial">(</span>Friday ?time<span class="synSpecial">))</span>

<span class="synComment">;; b ある人の会議は，全社会議とその人の部門会議をすべて含む</span>
<span class="synSpecial">(</span>rule <span class="synSpecial">(</span>meeting-time ?person ?day-and-time<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span>meeting whole-company ?day-and-time<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>job ?person <span class="synSpecial">(</span>?division <span class="synSpecial">.</span> ?rest<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>meeting ?division ?day-and-time<span class="synSpecial">))))</span>

<span class="synComment">;; c Alyssaが水曜に会議の時間を質問する</span>
<span class="synSpecial">(</span>meeting-time <span class="synSpecial">(</span>Hacker Alyssa P<span class="synSpecial">)</span> <span class="synSpecial">(</span>Wednesday ?time<span class="synSpecial">))</span>
</pre>


