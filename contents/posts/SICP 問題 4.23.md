---
title: "SICP 問題 4.23"
published: 2015/12/31
tags:
  - scheme
  - SICP
---

<p>本文中のanalyze-sequenceと問題文のanalyze-sequenceの比較．<br/>
リーダーマクロを使って実行する．<br/>
本文のanalyze-sequence</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze-sequence exps<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>sequentially proc1 proc2<span class="synSpecial">)</span>
    <span class="synError">#?=</span><span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>proc1 env<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>proc2 env<span class="synSpecial">)))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>loop first-proc rest-procs<span class="synSpecial">)</span>
    <span class="synError">#?=</span><span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> rest-procs<span class="synSpecial">)</span>
           first-proc
           <span class="synSpecial">(</span>loop <span class="synSpecial">(</span>sequentially first-proc <span class="synSpecial">(</span><span class="synIdentifier">car</span> rest-procs<span class="synSpecial">))</span>
                 <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> rest-procs<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>procs <span class="synSpecial">(</span><span class="synIdentifier">map</span> analyze exps<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> procs<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>error <span class="synConstant">&quot;Empty sequence: ANALYZE&quot;</span><span class="synSpecial">)</span>
        <span class="synError">#?=</span><span class="synSpecial">(</span>loop <span class="synSpecial">(</span><span class="synIdentifier">car</span> procs<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> procs<span class="synSpecial">)))))</span>
</pre>


<p>Alyssa P.Hacker版</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>analyze-sequence exps<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>execute-sequence procs env<span class="synSpecial">)</span>
    <span class="synError">#?=</span><span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> procs<span class="synSpecial">))</span> <span class="synSpecial">((</span><span class="synIdentifier">car</span> procs<span class="synSpecial">)</span> env<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">((</span><span class="synIdentifier">car</span> procs<span class="synSpecial">)</span> env<span class="synSpecial">)</span>
                <span class="synSpecial">(</span>execute-sequence <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> procs<span class="synSpecial">)</span> env<span class="synSpecial">))))</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>procs <span class="synSpecial">(</span><span class="synIdentifier">map</span> analyze exps<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> procs<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>error <span class="synConstant">&quot;Empty sequence -- ANALYZE&quot;</span><span class="synSpecial">))</span>
    <span class="synError">#?=</span><span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env<span class="synSpecial">)</span> <span class="synSpecial">(</span>execute-sequence procs env<span class="synSpecial">))))</span>
</pre>


<p><code>(analyze-sequcence '(+ 1 1))</code>を実行した結果<br/>
本文版</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>analyze-sequence <span class="synSpecial">'((</span>+ <span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">)))</span>
<span class="synError">#?=</span><span class="synConstant">&quot;(standard input)&quot;</span>:3192:<span class="synSpecial">(</span>loop <span class="synSpecial">(</span><span class="synIdentifier">car</span> procs<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> procs<span class="synSpecial">))</span>
<span class="synError">#?=</span><span class="synConstant">&quot;(standard input)&quot;</span>:3185:<span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> rest-procs<span class="synSpecial">)</span> first-proc <span class="synSpecial">(</span>loop <span class="synSpecial">(</span>sequentially first-p ...
<span class="synError">#?-</span>    <span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>analyze-application analyze-application<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span>
<span class="synError">#?-</span>    <span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>analyze-application analyze-application<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span>
<span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>analyze-application analyze-application<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span>
</pre>


<p>Alyssa版　</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>analyze-sequence <span class="synSpecial">'((</span>+ <span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">)))</span>
<span class="synError">#?=</span><span class="synConstant">&quot;(standard input)&quot;</span>:3215:<span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env<span class="synSpecial">)</span> <span class="synSpecial">(</span>execute-sequence procs env<span class="synSpecial">))</span>
<span class="synError">#?-</span>    <span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>analyze-sequence analyze-sequence<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span>
<span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>analyze-sequence analyze-sequence<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span>
</pre>


<p>本文版は<code>(解析された (+ 1 1))</code>を返す．
Alyssa版は<br/>
<code>(lambda (env) (execute-sequence (解析された (+ 1 1) env))</code>を返す．
　　　　<br/>
次に<code>(analyze-sequence '((+ 1 1) (+ 2 2)))</code>を実行する．</p>

<p>本文版</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>analyze-sequence <span class="synSpecial">'((</span>+ <span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>+ <span class="synConstant">2</span> <span class="synConstant">2</span><span class="synSpecial">)))</span>
<span class="synError">#?=</span><span class="synConstant">&quot;(standard input)&quot;</span>:3258:<span class="synSpecial">(</span>loop <span class="synSpecial">(</span><span class="synIdentifier">car</span> procs<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> procs<span class="synSpecial">))</span>
<span class="synError">#?=</span><span class="synConstant">&quot;(standard input)&quot;</span>:3251:<span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> rest-procs<span class="synSpecial">)</span> first-proc <span class="synSpecial">(</span>loop <span class="synSpecial">(</span>sequentially first-p ...
<span class="synError">#?=</span><span class="synConstant">&quot;(standard input)&quot;</span>:3247:<span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env<span class="synSpecial">)</span> <span class="synSpecial">(</span>proc1 env<span class="synSpecial">)</span> <span class="synSpecial">(</span>proc2 env<span class="synSpecial">))</span>
<span class="synError">#?-</span>    <span class="synError">#&lt;closure</span> <span class="synSpecial">((</span>analyze-sequence loop<span class="synSpecial">)</span> sequentially<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span>
<span class="synError">#?=</span><span class="synConstant">&quot;(standard input)&quot;</span>:3251:<span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> rest-procs<span class="synSpecial">)</span> first-proc <span class="synSpecial">(</span>loop <span class="synSpecial">(</span>sequentially first-p ...
<span class="synError">#?-</span>    <span class="synError">#&lt;closure</span> <span class="synSpecial">((</span>analyze-sequence loop<span class="synSpecial">)</span> sequentially<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span>
<span class="synError">#?-</span>    <span class="synError">#&lt;closure</span> <span class="synSpecial">((</span>analyze-sequence loop<span class="synSpecial">)</span> sequentially<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span>
<span class="synError">#?-</span>    <span class="synError">#&lt;closure</span> <span class="synSpecial">((</span>analyze-sequence loop<span class="synSpecial">)</span> sequentially<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span>
<span class="synError">#&lt;closure</span> <span class="synSpecial">((</span>analyze-sequence loop<span class="synSpecial">)</span> sequentially<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span>
</pre>


<p>Alyssa版</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>analyze-sequence <span class="synSpecial">'((</span>+ <span class="synConstant">1</span> <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>+ <span class="synConstant">2</span> <span class="synConstant">2</span><span class="synSpecial">)))</span>
<span class="synError">#?=</span><span class="synConstant">&quot;(standard input)&quot;</span>:3269:<span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>env<span class="synSpecial">)</span> <span class="synSpecial">(</span>execute-sequence procs env<span class="synSpecial">))</span>
<span class="synError">#?-</span>    <span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>analyze-sequence analyze-sequence<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span>
<span class="synError">#&lt;closure</span> <span class="synSpecial">(</span>analyze-sequence analyze-sequence<span class="synSpecial">)</span><span class="synIdentifier">&gt;</span>
</pre>


<p>本文版は</p>

<pre class="code" data-lang="" data-unlink>(lambda (env) ((解析された (+ 1 1)) env) ((解析された (+ 2 2)) env))</pre>


<p>を返す．<br/>
　<br/>
Alyssa版は</p>

<pre class="code" data-lang="" data-unlink>(execute-sequence ((解析された (+ 1 1)) (解析された (+ 2 2))) env)</pre>


<p>を返す．<br/>
　<br/>
本文版は並びが解析されenvを受け取って評価するlambdaが返される．
Alyssa版では並びが解析されていない．execute-sequenceが解析の外で並びを表している．<br/>
解析と評価を分けるという趣旨に反するのでこれではいけない．</p>

