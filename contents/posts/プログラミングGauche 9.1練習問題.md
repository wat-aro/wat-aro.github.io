---
title: "プログラミングGauche 9.1練習問題"
published: 2015/09/21
tags:
  - scheme
  - gauche
---

<p><code>delete-1</code>は見つからなかった場合もcond式のelse節でconsしているためにコピーしたリストを返す．<br/>
元のリストを返すように実装する．
以下が元の<code>delete-1</code></p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>delete-1 elt lis <span class="synSpecial">.</span> options<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>let-optionals* options <span class="synSpecial">((</span>cmp-fn <span class="synIdentifier">equal?</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>loop lis<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">[(</span><span class="synIdentifier">null?</span> lis<span class="synSpecial">)</span> <span class="synSpecial">()]</span>
            <span class="synSpecial">[(</span>cmp-fn <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">)</span> elt<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">)]</span>
            <span class="synSpecial">[</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span>loop <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">)))]))</span>
    <span class="synSpecial">(</span>loop lis<span class="synSpecial">)))</span>
</pre>


<ul>
<li><code>cond</code>をつかった実装．</li>
</ul>


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>delete-1 elt lis <span class="synSpecial">.</span> options<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>let-optionals* options <span class="synSpecial">((</span>cmp-fn <span class="synIdentifier">equal?</span><span class="synSpecial">))</span>
    <span class="synComment">;; 見つけた場合の処理</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>loop lis<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">[(</span>cmp-fn <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">)</span> elt<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">)]</span>
            <span class="synSpecial">[</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span>loop <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">)))]))</span>
    <span class="synComment">;; member関数で要素があるか探す</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">[(</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">member</span> elt lis cmp-fn<span class="synSpecial">)</span> <span class="synConstant">#t</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>loop lis<span class="synSpecial">)]</span>
          <span class="synSpecial">[</span><span class="synStatement">else</span> lis<span class="synSpecial">])))</span>
</pre>


<p>見つからない場合の処理はすでに<code>member</code>で行ってるので<code>null?</code>は省略．<br/>
<code>(cond [(and (member elt lis cmp-fn) #t)　(loop lis)]</code>の部分が少しわかりにくい．<br/>
<code>member</code>は要素が見つからなかった場合に元のリストを返すので<code>and</code>に入れてリストが返って来た場合は<code>#t</code>を，<code>#f</code>が返ってきた場合は<code>#f</code>を返すようにした．</p>

<ul>
<li><code>if</code>をつかった実装</li>
</ul>


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>delete-1 elt lis <span class="synSpecial">.</span> options<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>let-optionals* options <span class="synSpecial">((</span>cmp-fn <span class="synIdentifier">equal?</span><span class="synSpecial">))</span>
    <span class="synComment">;; 見つけた場合の処理</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>loop lis<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>cmp-fn <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">)</span> elt<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>loop <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">))))</span>
    <span class="synComment">;; member関数で要素があるか探す</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">member</span> elt lis cmp-fn<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>loop lis<span class="synSpecial">)</span>
        lis<span class="synSpecial">)))</span>
</pre>


<p><code>if</code>ならリストが返って来た場合も<code>then</code>節を実行してくれる．</p>

<p><code>member</code>で末尾<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>で探した後に<code>delete-1</code>で非末尾<a class="keyword" href="http://d.hatena.ne.jp/keyword/%BA%C6%B5%A2">再帰</a>で削除するのは無駄が多い気も．
もっといい書き方あるかな．</p>

<p>[追記]<br/>
ググったらもっといい書き方ありました．</p>

<p><a href="http://www.serendip.ws/archives/1953">&#x30D7;&#x30ED;&#x30B0;&#x30E9;&#x30DF;&#x30F3;&#x30B0;Gauche 9.1 &#x96C6;&#x5408; &#x7DF4;&#x7FD2;&#x554F;&#x984C; : Serendip - Web&#x30C7;&#x30B6;&#x30A4;&#x30F3;&#x30FB;&#x30D7;&#x30ED;&#x30B0;&#x30E9;&#x30DF;&#x30F3;&#x30B0;</a></p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>delete-1 elt lis <span class="synSpecial">.</span> options<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>let-optionals* options <span class="synSpecial">((</span>cmp-fn <span class="synIdentifier">equal?</span><span class="synSpecial">))</span>
                  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>loop lis<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> lis<span class="synSpecial">)</span> <span class="synSpecial">'())</span>
                          <span class="synSpecial">((</span>cmp-fn elt <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">))</span>
                          <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span>loop <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">))</span> lis<span class="synSpecial">)</span>
                          <span class="synSpecial">(</span><span class="synStatement">else</span>
                            <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span>loop <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">))</span>
                                lis
                                <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">)</span> <span class="synSpecial">(</span>loop <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">)))))))</span>
                  <span class="synSpecial">(</span>loop lis<span class="synSpecial">)))</span>
</pre>


<p><code>eq?</code>で比較しろって書かれていたのはこういうことだったのか．<br/>
重複している部分があるので<code>if</code>の分岐を削除して書き換えます</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>delete-1 elt lis <span class="synSpecial">.</span> options<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>let-optionals* options <span class="synSpecial">((</span>cmp-fn <span class="synIdentifier">equal?</span><span class="synSpecial">))</span>
                  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>loop lis<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> lis<span class="synSpecial">)</span> <span class="synSpecial">'())</span>
                          <span class="synSpecial">((</span>cmp-fn elt <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">))</span>
                          <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span>loop <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">))</span> lis<span class="synSpecial">)</span>
                          <span class="synSpecial">(</span><span class="synStatement">else</span>
                           <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> lis<span class="synSpecial">)</span> <span class="synSpecial">(</span>loop <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> lis<span class="synSpecial">))))))</span>
                  <span class="synSpecial">(</span>loop lis<span class="synSpecial">)))</span>
</pre>


<p>元のコードに一行足すだけだったとは・・・</p>

