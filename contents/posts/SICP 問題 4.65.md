---
title: "SICP 問題 4.65"
published: 2016/01/17
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>rule <span class="synSpecial">(</span>wheel ?person<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">and</span> <span class="synSpecial">(</span>supervisor ?middle-manager ?person<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>supervisor ?x ?middle-manager<span class="synSpecial">)))</span>
</pre>


<p>wheelはまず?personにデータベースの先頭から人を束縛して，and以下を満たすかを試していく．<br/>
なので<br/>
Ben -> Oliver -> X<br/>
alyssa -> Ben -> Oliver<br/>
Fect -> Ben -> Oliver<br/>
Lem -> Ben -> Oliver<br/>
Louis -> Alyssa Ben<br/>
Oliver -> X<br/>
Eben -> Oliver -> X<br/>
Robert -> Eben -> Oliver<br/>
Dewitt -> Oliver -> X<br/>
となり，Wawrbucks Oliverが４回出力される．</p>

