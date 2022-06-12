---
title: "プログラミングGauche 19.7 簡易な例外機構のまとめ"
published: 2015/09/25
tags:
  - scheme
  - gauche
---

<p>マクロと<code>call/cc</code>を使った<code>catch</code>と<code>throw</code>の実装の解説を備忘録として残します．<br/>
　</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 簡易例外機構</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synConstant">*signals*</span> <span class="synSpecial">'())</span>

<span class="synSpecial">(</span><span class="synStatement">define-syntax</span> catch
  <span class="synSpecial">(</span><span class="synStatement">syntax-rules</span> <span class="synSpecial">(</span>finally<span class="synSpecial">)</span>
    <span class="synSpecial">[(</span>_ <span class="synSpecial">(</span>sig body ...<span class="synSpecial">)</span> <span class="synSpecial">(</span>finally follow ...<span class="synSpecial">))</span>
     <span class="synSpecial">(</span><span class="synStatement">let*</span> <span class="synSpecial">((</span>signals-backup <span class="synConstant">*signals*</span><span class="synSpecial">)</span>
            <span class="synSpecial">(</span>val <span class="synSpecial">(</span><span class="synIdentifier">call/cc</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>k<span class="synSpecial">)</span>
                            <span class="synSpecial">(</span><span class="synStatement">set!</span> <span class="synConstant">*signals*</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>sig k<span class="synSpecial">)</span> <span class="synConstant">*signals*</span><span class="synSpecial">))</span>
                            body ...<span class="synSpecial">))))</span>
       <span class="synSpecial">(</span><span class="synStatement">set!</span> <span class="synConstant">*signals*</span> signals-backup<span class="synSpecial">)</span>
       follow ...
       val<span class="synSpecial">)]</span>
    <span class="synSpecial">[(</span>_ <span class="synSpecial">(</span>sig body ...<span class="synSpecial">))</span>
     <span class="synSpecial">(</span>catch <span class="synSpecial">(</span>sig body ...<span class="synSpecial">)</span> <span class="synSpecial">(</span>finally<span class="synSpecial">))]))</span>

<span class="synSpecial">(</span><span class="synStatement">define-syntax</span> throw
  <span class="synSpecial">(</span><span class="synStatement">syntax-rules</span> <span class="synSpecial">()</span>
    <span class="synSpecial">[(</span>_ sig val<span class="synSpecial">)</span> <span class="synSpecial">((</span><span class="synIdentifier">cdr</span> <span class="synSpecial">(</span><span class="synIdentifier">assq</span> <span class="synSpecial">'</span>sig <span class="synConstant">*signals*</span><span class="synSpecial">))</span> val<span class="synSpecial">)]))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; サンプルコード</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>div n d<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> d <span class="synConstant">0</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span>throw DivedeZeroError
             <span class="synSpecial">(</span>print <span class="synError">#`</span><span class="synConstant">&quot;ERROR: Divide Zero Error Occured...\n divide ,n by ZERO!\n--------------------&quot;</span><span class="synSpecial">))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">/</span> n d<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>percentage a b<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>catch <span class="synSpecial">(</span>DivedeZeroError
          <span class="synSpecial">(</span>print <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span>div a b<span class="synSpecial">)</span> <span class="synConstant">100.0</span><span class="synSpecial">)</span> <span class="synConstant">&quot;%&quot;</span><span class="synSpecial">))</span>
         <span class="synSpecial">(</span>finally
          <span class="synSpecial">(</span>print <span class="synConstant">&quot;follow ...&quot;</span><span class="synSpecial">))))</span>
</pre>


<p>　<br/>
　<br/>
処理の流れを説明します．<br/>
<code>*signal*</code>の初期値を<code>signals-backup</code>に束縛します．<br/>
その後<code>*signal*</code>には<code>(set! *signal* ...)</code>の行で<code>car</code>にシグナル，<code>cdr</code>に継続を渡すk，というペアのリストが束縛されます．<br/>
<code>((sig . k))</code>という形になります．<br/>
サンプルコードでは<code>((DivisedZeroError . k))</code>が入ります．<br/>
その後<code>body</code>が実行されます．<br/>
サンプルコードでは<code>percentage</code>の最初の<code>print</code>行．<br/>
ここで<code>div</code>が呼ばれます．<br/>
<code>(= d 0)</code>のが真の時に<code>throw</code>が呼ばれます．<br/>
<code>(cdr (assq 'sig *signals*))</code>が評価され継続を表す<code>k</code>が返され，<code>(k val)</code>で<code>throw</code>の<code>print</code> 行を実行し，戻り値が<code>catch</code>のvalに束縛されます．<br/>
（※　<a class="keyword" href="http://d.hatena.ne.jp/keyword/twitter">twitter</a>でkeenさん(@blackenedgold)さんから，継続を渡す<code>k</code>ではなく，継続を表す<code>k</code>と教えていただいたので訂正しました．）<br/>
ここではまってたのですが，<code>(= d 0)</code>なのにシグナルが違っていた場合は<code>(cdr #f)</code>となりエラーが返ります.<br/>
シグナルを間違えるなって話ですね．<br/>
<code>(= d 0)</code>が<code>#f</code>の時は<code>(/ n d)</code>が実行され値が返ります．<br/>
　<br/>
<code>catch</code>に返ってくると<code>*signals*</code>にシグナルの初期値を戻します．<br/>
そして<code>finally ...</code>を実行します．<br/>
最後にvalに束縛した値を返して終了です．
ここでは<code>percentage</code>は<code>print</code>してるので<code>#&lt;undef&gt;</code>が返ります．<br/>
　<br/>
こうして一つ一つ追えばそんなに難しくないですね．<br/>
でも理解するのに時間かかりました．．．<br/>
最後に実行例紹介して終わります．<br/>
　　<br/>
　</p>

<pre class="code" data-lang="" data-unlink>gosh&gt; (percentage 1 40)
2.5%
follow ...
#&lt;undef&gt;
gosh&gt; (percentage 10 0)
ERROR: Divide Zero Error Occured...
 divide 10 by ZERO!
--------------------
follow ...
#&lt;undef&gt;</pre>


<p>　<br/>
マクロもcall/ccも難しい</p>

