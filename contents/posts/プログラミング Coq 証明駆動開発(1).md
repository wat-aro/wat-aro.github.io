---
title: "プログラミング Coq 証明駆動開発(1)"
published: 2017/05/11
---

<p><a href="http://www.iij-ii.co.jp/lab/techdoc/coqt/coqt8.html">&#x8A3C;&#x660E;&#x99C6;&#x52D5;&#x958B;&#x767A;&#x5165;&#x9580;(1)</a></p>

<p><code>何かを読む会</code> という社内勉強会が発足されました。
読んだ本の内容を共有しよう。
一人で勉強していてもダレるので共有することで無理やり進捗を出そう。
他の人の発表を聞いて読んだ気になろう。
っていう緩めの会です。
途中まで読んで放置していたプログラミング Coq の続きを読んでまとめました。</p>

<h1>挿入ソートを証明する。</h1>

<p>証明したいことは次の二点。</p>

<ul>
<li>挿入前と挿入後で要素に変化がないこと(isort_permutation)</li>
<li>挿入後に要素が整列されていること(isort_sorted)</li>
</ul>


<p>上記を型で示すと以下のようになる。</p>

<pre class="code" data-lang="" data-unlink>isort_permutation : forall (l : list nat), Permutation l (insertion_sort l)
isort_sorted      : forall (l : list nat), LocallySorted le (insertion_sort l)</pre>


<h2>実装</h2>

<pre class="code" data-lang="" data-unlink>Require Import List.
Require Import Arith.

Fixpoint insert (a : nat) (l : list nat) : list nat :=
  match l with
  | nil =&gt; a :: nil
  | x :: xs =&gt; if leb a x then a :: l else x :: insert a xs
  end.

Fixpoint insertion_sort (l : list nat) : list nat :=
  match l with
  | nil =&gt; nil
  | x :: xs =&gt; insert x (insertion_sort xs)
  end.</pre>


<h2>要素の変化がないこと</h2>

<p>あるリストがあるリストと同じ要素で成り立っているのは以下のモジュールで定義されている。</p>

<pre class="code" data-lang="" data-unlink>Inductive Permutation : list A -&gt; list A -&gt; Prop :=
  | perm_nil: Permutation [] []
  | perm_skip x l l&#39; : Permutation l l&#39; -&gt; Permutation (x::l) (x::l&#39;)
  | perm_swap x y l : Permutation (y::x::l) (x::y::l)
  | perm_trans l l&#39; l&#39;&#39; : Permutation l l&#39; -&gt; Permutation l&#39; l&#39;&#39; -&gt; Permutation l l&#39;&#39;.</pre>


<ol>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/nil">nil</a> と <a class="keyword" href="http://d.hatena.ne.jp/keyword/nil">nil</a> は同じ要素から成り立つ</li>
<li>l と l' が同じ要素から成り立つならば x :: l と x :: l' も同じ要素から成り立つ</li>
<li>y :: x :: l と x :: y :: l は同じ要素から成り立つ</li>
<li>(l と l' が同じ要素から成り立ち、l' と l'&lsquo; が同じ要素から成り立つ) ならば l と l&rsquo;&lsquo; も同じ要素から成り立つ</li>
</ol>


<h2>isort_permutation の証明</h2>

<p>isort_permutation の型</p>

<pre class="code" data-lang="" data-unlink>forall (l : list nat), Permutation l (insertion_sort l)</pre>


<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%B5%A2%C7%BC%CB%A1">帰納法</a>を使う。
l が <a class="keyword" href="http://d.hatena.ne.jp/keyword/nil">nil</a> の時は insertion_sort l は <a class="keyword" href="http://d.hatena.ne.jp/keyword/nil">nil</a> なので
Permutation <a class="keyword" href="http://d.hatena.ne.jp/keyword/nil">nil</a> <a class="keyword" href="http://d.hatena.ne.jp/keyword/nil">nil</a> となり自明。</p>

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%B5%A2%C7%BC%CB%A1">帰納法</a>のため、nの場合にあたる仮定は</p>

<pre class="code" data-lang="" data-unlink>forall (l : list nat), Permutation xs (insertion_sort xs)</pre>


<p>n + 1 に当たる命題は</p>

<pre class="code" data-lang="" data-unlink>forall (l : list nat), Permutation x :: xs (insertion_sort x::xs)</pre>


<p>となり、</p>

<pre class="code" data-lang="" data-unlink>forall (l : list nat), Permutation x :: xs (insert x (insertion_sort xs)</pre>


<p>と変形できる。</p>

<p>つまり</p>

<pre class="code" data-lang="" data-unlink>forall (l : list nat), Permuation x :: xs (x :: insertion_sort xs)</pre>


<p>と</p>

<pre class="code" data-lang="" data-unlink>forall (l : lsit nat), Permutation (x :: insertion_sort xs) (insert x (insertion_sort xs)</pre>


<p>を示すことで perm_trans から</p>

<pre class="code" data-lang="" data-unlink>forall l l&#39; l&#39;&#39; , Permutation l l&#39; -&gt; Permutation l&#39; l&#39;&#39; -&gt; Permutation l l&#39;&#39;</pre>




<pre class="code" data-lang="" data-unlink>Permutation (x :: xs) (x :: insertion_sort xs) -&gt;
  Permutation (x :: insertion_sort xs) (insert x (insertion_sort xs)) -&gt;
    Permutation (x :: xs) (insert x (insertion_sort xs))</pre>


<p>となり、導ける。</p>

<p>A  については 仮定と Permutation のコンストラクタ</p>

<pre class="code" data-lang="" data-unlink>perm_skip : forall x l l&#39;, Permutation l l&#39; -&gt; Permutation (x :: l) (x :: l&#39;)</pre>


<p>から導ける。</p>

<p>まず B を<a class="keyword" href="http://d.hatena.ne.jp/keyword/%CA%E4%C2%EA">補題</a>として証明する。</p>

<p>isort_permutaiton の証明は以下。</p>

<table>
<thead>
<tr>
<th> 命令 </th>
<th> 説明 </th>
</tr>
</thead>
<tbody>
<tr>
<td> intros </td>
<td> forall などから変数を仮定へ移動する </td>
</tr>
<tr>
<td> simpl </td>
<td> 簡約 </td>
</tr>
<tr>
<td> apply </td>
<td> 仮定や定理などを適用 </td>
</tr>
<tr>
<td> destruct </td>
<td> 条件分岐しているものなどを subgoal に分ける </td>
</tr>
<tr>
<td> induction </td>
<td> <a class="keyword" href="http://d.hatena.ne.jp/keyword/%B5%A2%C7%BC%CB%A1">帰納法</a>を実施するために subgoal に分ける </td>
</tr>
</tbody>
</table>


<p>どういうふうに証明が進むかは coq <a class="keyword" href="http://d.hatena.ne.jp/keyword/ide">ide</a> や proof-general 使って見てください。</p>

<pre class="code" data-lang="" data-unlink>Require Import List.
Require Import Arith.
Require Import Sorting.Permutation.
Require Import Sorting.Sorted.

(* isort_permutation *)

Lemma insert_perm : forall (x : nat)(l : list nat), Permutation (x :: l) (insert x l).
  induction l.
  intros.
  simpl.
  apply Permutation_refl.

  intros.
  simpl.
  destruct (leb x a).

  apply Permutation_refl.

  apply perm_trans with (a :: x :: l).
  apply perm_swap.

  apply perm_skip.
  apply IHl.
Qed.

Theorem isort_permutation : forall (l : list nat), Permutation l (insertion_sort l).
  induction l.
  apply perm_nil.
  simpl.
  apply perm_trans with (a :: insertion_sort l).
  apply perm_skip.
  apply IHl.
  apply insert_perm.
Qed.</pre>


<h2>整列の定義</h2>

<p>リスト l が整列されていることはSorting.Sortedモジュールで定義されている.</p>

<pre class="code" data-lang="" data-unlink>Induction LocallySorted (A : Type) (R : A -&gt; A -&gt; Prop) : list A :=
  | LSorted_nil : LocallySorted R nil
  | LSorted_cons1 : forall a : A, LocallySorted R (a :: nil)
  | LSorted_consn : forall (a b : A) (l : list A),
    LocallySorted R (b :: l) -&gt;
      R a b -&gt; LocallySorted R (a :: b :: l)</pre>


<p>上の定義は次のような意味です。
R a b は a &lt; b のようなものです。</p>

<ol>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/nil">nil</a> は整列している</li>
<li>x :: <a class="keyword" href="http://d.hatena.ne.jp/keyword/nil">nil</a> は整列している</li>
<li>b :: l が整列しているとき, R a b ならば a :: b :: l は整列している</li>
</ol>


<h2>整列されていることの証明</h2>

<p>こちらでも<a class="keyword" href="http://d.hatena.ne.jp/keyword/%B5%A2%C7%BC%CB%A1">帰納法</a>で考える。
まず l が <a class="keyword" href="http://d.hatena.ne.jp/keyword/nil">nil</a> の場合は insertion_sort <a class="keyword" href="http://d.hatena.ne.jp/keyword/nil">nil</a> = <a class="keyword" href="http://d.hatena.ne.jp/keyword/nil">nil</a> となり、LSorted_<a class="keyword" href="http://d.hatena.ne.jp/keyword/nil">nil</a> : LocallySorted le <a class="keyword" href="http://d.hatena.ne.jp/keyword/nil">nil</a> から明らか。</p>

<p>LocallySort le (insertion_sort l) -> LocallySort le (insertion_sort (a :: l)) の場合を考える。
LocallySort le (insertion_sort (a ::l) は LocallySort le (insert a (insertion_sort l))と変形できる。
この時、insertion_sort l は仮定より整列しているため、</p>

<pre class="code" data-lang="" data-unlink>insert_sorted : forall (a : nat) (l : list a), LocallySort le l -&gt; LocallySorted le (insert a l)</pre>


<p>を示すことができれば証明できる。</p>

<p>これを<a class="keyword" href="http://d.hatena.ne.jp/keyword/%CA%E4%C2%EA">補題</a>として証明をすすめる。</p>

<h2>整列の証明</h2>

<pre class="code" data-lang="" data-unlink>Lemma insert_sorted : forall (a : nat) (l : list nat),
    LocallySorted le l -&gt; LocallySorted le (insert a l).
  induction l.
  constructor.

  intro.
  simpl.
  remember (leb a a0).
  destruct b.

  apply LSorted_consn.
  apply H.
  apply leb_complete.
  congruence.

  inversion H.
  simpl.
  apply LSorted_consn.
  apply LSorted_cons1.
  apply lt_le_weak.
  apply leb_complete_conv.
  congruence.

  subst.
  simpl.
  simpl in IHl.
  remember (leb a b).

  destruct b0.
  apply LSorted_consn.
  apply IHl.
  apply H2.

  apply lt_le_weak.
  apply leb_complete_conv.
  congruence.

  apply LSorted_consn.
  apply IHl.
  apply H2.
  apply H3.
Qed.</pre>




<pre class="code" data-lang="" data-unlink>Theorem isort_sorted : forall (l : list nat) , LocallySorted le (insertion_sort l).
  induction l.
  constructor.

  simpl.

  apply insert_sorted.
  apply IHl.
Qed.</pre>


<p>これで isertion_sort はソートの前後で要素が変わらないことと、ソート後に整列されていることが証明できた。</p>

