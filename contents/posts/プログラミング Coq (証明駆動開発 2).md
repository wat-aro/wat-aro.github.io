---
title: "プログラミング Coq (証明駆動開発 2)"
published: 2017/05/11
---

<p><a href="http://www.iij-ii.co.jp/lab/techdoc/coqt/coqt9.html">&#x8A3C;&#x660E;&#x99C6;&#x52D5;&#x958B;&#x767A;&#x5165;&#x9580;(2)</a></p>

<p>上記ページの勉強メモです。</p>

<h1>Extraction</h1>

<p>coq から <a class="keyword" href="http://d.hatena.ne.jp/keyword/OCaml">OCaml</a>, <a class="keyword" href="http://d.hatena.ne.jp/keyword/Haskell">Haskell</a>, <a class="keyword" href="http://d.hatena.ne.jp/keyword/Scheme">Scheme</a> のコードを出力する。<br></p>

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/OCaml">OCaml</a> にコードを出力するにはそのまま<br></p>

<pre class="code" data-lang="" data-unlink>Extraction map.</pre>


<p>とすればいい。<br>
これで</p>

<pre class="code lang-ocaml" data-lang="ocaml" data-unlink><span class="synComment">(** val map : ('a1 -&gt; 'a2) -&gt; 'a1 list -&gt; 'a2 list **)</span>

<span class="synStatement">let</span> <span class="synStatement">rec</span> map f <span class="synStatement">=</span> <span class="synStatement">function</span>
<span class="synStatement">|</span> <span class="synConstant">Nil</span> <span class="synStatement">-&gt;</span> <span class="synConstant">Nil</span>
<span class="synStatement">|</span> <span class="synConstant">Cons</span> <span class="synStatement">(</span>a, t<span class="synStatement">)</span> <span class="synStatement">-&gt;</span> <span class="synConstant">Cons</span> <span class="synStatement">((</span>f a<span class="synStatement">)</span>, <span class="synStatement">(</span>map f t<span class="synStatement">))</span>
</pre>


<p>と出力される。（proof-general を使っています。coq-<a class="keyword" href="http://d.hatena.ne.jp/keyword/ide">ide</a>の場合はcommand pane で実行）<br></p>

<p>この時、list が <a class="keyword" href="http://d.hatena.ne.jp/keyword/OCaml">OCaml</a> 組み込みのリストでなく coq で定義された list になっている。<br>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/OCaml">OCaml</a> 組み込みのリストを使うには<br></p>

<pre class="code" data-lang="" data-unlink>Extract Inductive list =&gt; &#34;list&#34; [&#34;[]&#34; &#34;(::)&#34;].</pre>


<p>を実行する。こうすると<br></p>

<pre class="code lang-ocaml" data-lang="ocaml" data-unlink><span class="synComment">(** val map : ('a1 -&gt; 'a2) -&gt; 'a1 list -&gt; 'a2 list **)</span>

<span class="synStatement">let</span> <span class="synStatement">rec</span> map f <span class="synStatement">=</span> <span class="synStatement">function</span>
<span class="synStatement">|</span> <span class="synConstant">[]</span> <span class="synStatement">-&gt;</span> <span class="synConstant">[]</span>
<span class="synStatement">|</span> a<span class="synStatement">::</span>t <span class="synStatement">-&gt;</span> <span class="synStatement">(</span>f a<span class="synStatement">)::(</span>map f t<span class="synStatement">)</span>
</pre>


<p>と<a class="keyword" href="http://d.hatena.ne.jp/keyword/OCaml">OCaml</a> 組み込みのリストを使ったmap関数が生成される。<br></p>

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/Haskell">Haskell</a>  や <a class="keyword" href="http://d.hatena.ne.jp/keyword/Scheme">Scheme</a> に出力するにはそれぞれ<br>
<code>Extraction Language Haskell.</code> <code>Extraction Language Scheme.</code> としてから<a class="keyword" href="http://d.hatena.ne.jp/keyword/OCaml">OCaml</a>の場合と同じように出力する。<br></p>

<pre class="code" data-lang="" data-unlink>Extraction Language Haskell.
Extract Inductive list =&gt; &#34;list&#34; [&#34;[]&#34; &#34;(::)&#34;].
Extraction map.</pre>




<pre class="code lang-haskell" data-lang="haskell" data-unlink>map <span class="synStatement">::</span> (a1 <span class="synStatement">-&gt;</span> a2) <span class="synStatement">-&gt;</span> (list a1) <span class="synStatement">-&gt;</span> list a2
map f l <span class="synStatement">=</span>
  <span class="synStatement">case</span> l <span class="synStatement">of</span> {
   [] <span class="synStatement">-&gt;</span> [];
   (<span class="synStatement">::</span>) a t <span class="synStatement">-&gt;</span> (<span class="synStatement">::</span>) (f a) (map f t)}
</pre>


<p>正しいけど、あまり綺麗なコードじゃない。<br></p>

<pre class="code lang-haskell" data-lang="haskell" data-unlink>map <span class="synStatement">::</span> (a <span class="synStatement">-&gt;</span> b) <span class="synStatement">-&gt;</span> (list a) <span class="synStatement">-&gt;</span> list b
map f [] <span class="synStatement">=</span> []
map f x<span class="synStatement">::</span>xs <span class="synStatement">=</span> (f x) <span class="synStatement">::</span> (map f xs)
</pre>


<p>くらいには変換してほしいけど、元の形からすると厳しいのかな。<br></p>

<p>次は <a class="keyword" href="http://d.hatena.ne.jp/keyword/scheme">scheme</a>.<br></p>

<pre class="code" data-lang="" data-unlink>Extraction Language Scheme.
Extraction map.</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synIdentifier">map</span> <span class="synSpecial">(</span>lambdas <span class="synSpecial">(</span>f l<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>match l
     <span class="synSpecial">((</span>Nil<span class="synSpecial">)</span> <span class="synSpecial">`(</span>Nil<span class="synSpecial">))</span>
     <span class="synSpecial">((</span><span class="synIdentifier">Cons</span> a t<span class="synSpecial">)</span> <span class="synSpecial">`(</span>Cons <span class="synSpecial">,(</span>f a<span class="synSpecial">)</span> <span class="synSpecial">,(</span>@ <span class="synIdentifier">map</span> f t<span class="synSpecial">))))))</span>
</pre>


<p>おお。lambdas ってなんだ。match なんて RnRSにないぞ。というか、準クオート使ってるし、<code>,</code>使った式展開も入ってる。<br>
Coq Extension <a class="keyword" href="http://d.hatena.ne.jp/keyword/Scheme">Scheme</a> っていうのがあって、lambdas マクロやmatch マクロ、@マクロが定義されているわけか。<br>
lambdas マクロと @マクロはなかなかよい。<br>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/OCaml">OCaml</a> や <a class="keyword" href="http://d.hatena.ne.jp/keyword/Haskell">Haskell</a> っぽく書きたい時は便利そう。<br>
match マクロは define-syntax みたいな感じかな？<br>
直接変換するならたしかにこういうマクロ欲しくなるな。<br></p>

<h2>insertion_sort の変換</h2>

<h3><a class="keyword" href="http://d.hatena.ne.jp/keyword/OCaml">OCaml</a>の場合</h3>

<pre class="code" data-lang="" data-unlink>Extraction Language Ocaml.

Extract Inductive list =&gt; &#34;list&#34; [&#34;[]&#34; &#34;(::)&#34;].
Extract Inductive bool =&gt; &#34;bool&#34; [&#34;true&#34; &#34;false&#34;].
Extract Inductive nat =&gt; int [&#34;0&#34; &#34;succ&#34;] &#34;(fun fO fS n -&gt; if n = 0 then f O () else fS (n-1))&#34;.
Extraction insert.
Extraction insertion_sort.</pre>




<pre class="code lang-ocaml" data-lang="ocaml" data-unlink><span class="synComment">(** val insert : int -&gt; int list -&gt; int list **)</span>

<span class="synStatement">let</span> <span class="synStatement">rec</span> insert a l <span class="synStatement">=</span> <span class="synStatement">match</span> l <span class="synStatement">with</span>
<span class="synStatement">|</span> <span class="synConstant">[]</span> <span class="synStatement">-&gt;</span> a<span class="synStatement">::</span><span class="synConstant">[]</span>
<span class="synStatement">|</span> x<span class="synStatement">::</span>xs <span class="synStatement">-&gt;</span> <span class="synStatement">if</span> <span class="synPreProc">Nat</span>.leb a x <span class="synStatement">then</span> a<span class="synStatement">::</span>l <span class="synStatement">else</span> x<span class="synStatement">::(</span>insert a xs<span class="synStatement">)</span>

<span class="synComment">(** val insertion_sort : int list -&gt; int list **)</span>

<span class="synStatement">let</span> <span class="synStatement">rec</span> insertion_sort <span class="synStatement">=</span> <span class="synStatement">function</span>
<span class="synStatement">|</span> <span class="synConstant">[]</span> <span class="synStatement">-&gt;</span> <span class="synConstant">[]</span>
<span class="synStatement">|</span> x<span class="synStatement">::</span>xs <span class="synStatement">-&gt;</span> insert x <span class="synStatement">(</span>insertion_sort xs<span class="synStatement">)</span>
</pre>


<h3><a class="keyword" href="http://d.hatena.ne.jp/keyword/Haskell">Haskell</a>の場合</h3>

<pre class="code" data-lang="" data-unlink>Extraction Language Haskell.

Extract Inductive list =&gt; &#34;([])&#34; [&#34;[]&#34; &#34;(:)&#34;].
Extract Inductive bool =&gt; &#34;Bool&#34; [&#34;True&#34; &#34;False&#34;].
Extract Inductive nat =&gt; Int [&#34;0&#34; &#34;succ&#34;] &#34;(\fO fS n -&gt; if n == 0 then fO () else fS (n-1))&#34;.</pre>




<pre class="code lang-haskell" data-lang="haskell" data-unlink>insert <span class="synStatement">::</span> Int <span class="synStatement">-&gt;</span> (([]) Int) <span class="synStatement">-&gt;</span> ([]) Int
insert a l <span class="synStatement">=</span>
  <span class="synStatement">case</span> l <span class="synStatement">of</span> {
   [] <span class="synStatement">-&gt;</span> (<span class="synStatement">:</span>) a [];
   (<span class="synStatement">:</span>) x xs <span class="synStatement">-&gt;</span>
    <span class="synStatement">case</span> leb a x <span class="synStatement">of</span> {
     True <span class="synStatement">-&gt;</span> (<span class="synStatement">:</span>) a l;
     False <span class="synStatement">-&gt;</span> (<span class="synStatement">:</span>) x (insert a xs)}}

insertion_sort <span class="synStatement">::</span> (([]) Int) <span class="synStatement">-&gt;</span> ([]) Int
insertion_sort l <span class="synStatement">=</span>
  <span class="synStatement">case</span> l <span class="synStatement">of</span> {
   [] <span class="synStatement">-&gt;</span> [];
   (<span class="synStatement">:</span>) x xs <span class="synStatement">-&gt;</span> insert x (insertion_sort xs)}
</pre>


<h2><a class="keyword" href="http://d.hatena.ne.jp/keyword/Scheme">Scheme</a>の場合</h2>

<pre class="code" data-lang="" data-unlink>Extraction Language Scheme.

Extraction insert.
Extraction insertion_sort.</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> insert <span class="synSpecial">(</span>lambdas <span class="synSpecial">(</span>a l<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>match l
     <span class="synSpecial">((</span>Nil<span class="synSpecial">)</span> <span class="synSpecial">`(</span>Cons <span class="synSpecial">,</span>a <span class="synSpecial">,`(</span>Nil<span class="synSpecial">)))</span>
     <span class="synSpecial">((</span><span class="synIdentifier">Cons</span> x xs<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>match <span class="synSpecial">(</span>@ leb a x<span class="synSpecial">)</span>
          <span class="synSpecial">((</span>True<span class="synSpecial">)</span> <span class="synSpecial">`(</span>Cons <span class="synSpecial">,</span>a <span class="synSpecial">,</span>l<span class="synSpecial">))</span>
          <span class="synSpecial">((</span>False<span class="synSpecial">)</span> <span class="synSpecial">`(</span>Cons <span class="synSpecial">,</span>x <span class="synSpecial">,(</span>@ insert a xs<span class="synSpecial">))))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> insertion_sort <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>l<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>match l
     <span class="synSpecial">((</span>Nil<span class="synSpecial">)</span> <span class="synSpecial">`(</span>Nil<span class="synSpecial">))</span>
     <span class="synSpecial">((</span><span class="synIdentifier">Cons</span> x xs<span class="synSpecial">)</span> <span class="synSpecial">(</span>@ insert x <span class="synSpecial">(</span>insertion_sort xs<span class="synSpecial">))))))</span>
</pre>


<h2>ファイルへの出力</h2>

<pre class="code" data-lang="" data-unlink>Extraction Language Ocaml.
Extraction &#34;insertion_sort.ml&#34; insertion_sort.</pre>


<p>と入力して proof-general で C-c C-n すると以下のようなファイルが生成された。</p>

<pre class="code" data-lang="" data-unlink>module Nat =
 struct
  (** val leb : Int -&gt; Int -&gt; Bool **)

  let rec leb n m =
    (\fO fS n -&gt; if n == 0 then fO () else fS (n-1))
      (fun _ -&gt;
      True)
      (fun n&#39; -&gt;
      (\fO fS n -&gt; if n == 0 then fO () else fS (n-1))
        (fun _ -&gt;
        False)
        (fun m&#39; -&gt;
        leb n&#39; m&#39;)
        m)
      n
 end

(** val insert : Int -&gt; Int ([]) -&gt; Int ([]) **)

let rec insert a l = match l with
| [] -&gt; a:[]
| x:xs -&gt;
  (match Nat.leb a x with
   | True -&gt; a:l
   | False -&gt; x:(insert a xs))

(** val insertion_sort : Int ([]) -&gt; Int ([]) **)

let rec insertion_sort = function
| [] -&gt; []
| x:xs -&gt; insert x (insertion_sort xs)</pre>




<pre class="code" data-lang="" data-unlink>module Nat :
 sig
  val leb : Int -&gt; Int -&gt; Bool
 end

val insert : Int -&gt; Int ([]) -&gt; Int ([])

val insertion_sort : Int ([]) -&gt; Int ([])</pre>


<p>lebも作ってくれるのか。
まあないとコードにならないもんな。</p>

<h2>証明駆動開発のステップ</h2>

<ol>
<li>まず書こうとしているプログラムがどういう性質をみたすべきかを記述し、</li>
<li>Coq でそれをみたすようなプログラムを書き、</li>
<li>実際に最初に考えた性質を証明し、</li>
<li>Extraction して他の言語のコードに変換する</li>
</ol>


<h2>感想</h2>

<p>形式証明が慣れてないからなのかとても難しかった。<br>
ただ、証明のステップを追うのはとても気持ちよかった。<br></p>

<p>次は、最近発売された純粋関数型データ構造読むかなって気分。<br>
SML で書かれているらしいから、<a class="keyword" href="http://d.hatena.ne.jp/keyword/OCaml">OCaml</a> に置き換えながら写経するのが楽かな？<br>
それとも付録に <a class="keyword" href="http://d.hatena.ne.jp/keyword/Haskell">Haskell</a> 実装があるらしいので <a class="keyword" href="http://d.hatena.ne.jp/keyword/Haskell">Haskell</a> に置き換えながら写経して、書けたら答え合わせするほうがいいかな。<br>
悩ましい。</p>

