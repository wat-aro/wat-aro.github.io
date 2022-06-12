---
title: "SICP 問題 3.32"
published: 2015/11/26
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; A-&gt;B-&gt;Cという順に並んだ回線があったとする．</span>
<span class="synComment">;; FIFOの場合Aが変化するとそれがBに伝わり，次のactionが実行されCに伝わる．</span>
<span class="synComment">;; FILOの場合Aが変化してもまずB-C間のactionが実行されCは変化しない．</span>
<span class="synComment">;; そのあとA-B間のactionが実行されるAの変化がBに伝わる．</span>
<span class="synComment">;; FILOの場合は最後まで変化が伝わらないためFIFOが使われている．</span>
</pre>


