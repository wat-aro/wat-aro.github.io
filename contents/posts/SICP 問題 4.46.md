---
title: "SICP 問題 4.46"
published: 2016/01/13
tags:
  - scheme
  - SICP
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%B9%BD%CA%B8%B2%F2%C0%CF">構文解析</a>器が右から左に非<a class="keyword" href="http://d.hatena.ne.jp/keyword/%B1%E9%BB%BB%BB%D2">演算子</a>を評価する時<br/>
perse-noun-phrase中の</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>amb noun-phrase
     <span class="synSpecial">(</span>maybe-extend <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>noun-phrase noun-phrase
                         <span class="synSpecial">(</span>parse-prepositional-phrase<span class="synSpecial">))))</span>
</pre>


<p>で，maybe-extendが先に評価されてしまう．<br/>
すると，実際に名詞が先にきた場合はmaybe-extendは失敗する．<br/>
次のnoun-phraseで成功して処理が終わる．<br/>
名詞の後ろに前置詞がきてる場合はそこの解析は行われない．<br/>
　<br/>
そのためamb評価器は左から右へ評価していく必要が有る．</p>

