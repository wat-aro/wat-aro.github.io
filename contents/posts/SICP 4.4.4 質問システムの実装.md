---
title: "SICP 4.4.4 質問システムの実装"
published: 2016/01/21
tags:
  - scheme
  - SICP
---

<p>なかなか処理の流れがわからなかったのでコメントを多めにつけてみた．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; 駆動ループ</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> input-prompt <span class="synConstant">&quot;;;; Query input:&quot;</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> output-prompt <span class="synConstant">&quot;;;; Query result:&quot;</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>prompt-for-input <span class="synIdentifier">string</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synIdentifier">string</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>query-driver-loop<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>prompt-for-input input-prompt<span class="synSpecial">)</span>       <span class="synComment">;最初の印字</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>q <span class="synSpecial">(</span>query-syntax-process <span class="synSpecial">(</span><span class="synIdentifier">read</span><span class="synSpecial">))))</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>assertion-to-be-added? q<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>add-rule-or-assertion! <span class="synSpecial">(</span>add-assertion-body q<span class="synSpecial">))</span>
           <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">display</span> <span class="synConstant">&quot;Assertion added to data base.&quot;</span><span class="synSpecial">)</span>
           <span class="synSpecial">(</span>query-driver-loop<span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span>
           <span class="synSpecial">(</span><span class="synIdentifier">newline</span><span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">display</span> output-prompt<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>display-stream
            <span class="synComment">;; このstream-mapで回答のストリームが作られる．</span>
            <span class="synSpecial">(</span>stream-map
             <span class="synComment">;; フレームを取り，変数を具体化したもともとの質問のコピーからなるストリームを作る</span>
             <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>frame<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>instantiate q frame
                            <span class="synComment">;; unbound-handlerに渡す部分．</span>
                            <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>v f<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span>contract-question-mark v<span class="synSpecial">))))</span>
             <span class="synComment">;; 質問を満たすフレームのストリーム</span>
             <span class="synSpecial">(</span>qeval q <span class="synSpecial">(</span>singleton-stream <span class="synSpecial">'()))))</span>
           <span class="synSpecial">(</span>query-driver-loop<span class="synSpecial">)))))</span>

<span class="synComment">;; qevalで作られたストリームのフレームをとqを取る．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>instantiate <span class="synIdentifier">exp</span> frame unbound-var-handler<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>copy <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>var? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
           <span class="synComment">;; binding-in-frameで(? x)と対応した((? x) Aull DeWitt)のような形で取り出す．</span>
           <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>binding <span class="synSpecial">(</span>binding-in-frame <span class="synIdentifier">exp</span> frame<span class="synSpecial">)))</span>
             <span class="synSpecial">(</span><span class="synStatement">if</span> binding
                 <span class="synComment">;; 取り出した((? x) Aull DeWitt)を(Aull DeWitt)にしてcopyに渡す．</span>
                 <span class="synSpecial">(</span>copy <span class="synSpecial">(</span>binding-value binding<span class="synSpecial">))</span>
                 <span class="synComment">;; (? 5 x)を?x-5に変える</span>
                 <span class="synSpecial">(</span>unbound-var-handler <span class="synIdentifier">exp</span> frame<span class="synSpecial">))))</span>
          <span class="synSpecial">((</span><span class="synIdentifier">pair?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>copy <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>copy <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span> <span class="synComment">;リストの形は維持したままcarとcdrをcopyする</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
  <span class="synSpecial">(</span>copy <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synComment">;; 評価機</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>qeval query frame-stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>qproc <span class="synSpecial">(</span>get <span class="synSpecial">(</span>type query<span class="synSpecial">)</span> <span class="synSpecial">'</span>qeval<span class="synSpecial">)))</span> <span class="synComment">;queryがandかorから始まるかのチェック</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> qproc
        <span class="synSpecial">(</span>qproc <span class="synSpecial">(</span>contents query<span class="synSpecial">)</span> frame-stream<span class="synSpecial">)</span> <span class="synComment">;and, orで始まる場合</span>
        <span class="synSpecial">(</span>simple-query query frame-stream<span class="synSpecial">))))</span>  <span class="synComment">;それ以外</span>

<span class="synComment">;; 単純質問</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>simple-query query-pattern frame-stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-flatmap
   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>frame<span class="synSpecial">)</span>
     <span class="synComment">;; carがnullならcdrをforceするappend.find-assertionsでマッチするassertionがなければcdrへ．</span>
     <span class="synSpecial">(</span>stream-append-delayed
      <span class="synSpecial">(</span>find-assertions query-pattern frame<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">delay</span> <span class="synSpecial">(</span>apply-rules query-pattern frame<span class="synSpecial">))))</span>
   frame-stream<span class="synSpecial">))</span>

<span class="synComment">;; 合成質問</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>conjoin conjuncts frame-stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>empty-conjunction? conjuncts<span class="synSpecial">)</span>
      frame-stream
      <span class="synSpecial">(</span>conjoin <span class="synSpecial">(</span>rest-conjuncts conjuncts<span class="synSpecial">)</span>
               <span class="synSpecial">(</span>qeval <span class="synSpecial">(</span>first-conjunct conjuncts<span class="synSpecial">)</span>
                      frame-stream<span class="synSpecial">))))</span>

<span class="synSpecial">(</span>put <span class="synSpecial">'</span>and <span class="synSpecial">'</span>qeval conjoin<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>disjoin disjuncts frame-stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>empty-disjunction? disjuncts<span class="synSpecial">)</span>
      the-empty-stream
      <span class="synSpecial">(</span>interleave-delayed
       <span class="synSpecial">(</span>qeval <span class="synSpecial">(</span>first-disjunct disjuncts<span class="synSpecial">)</span> frame-stream<span class="synSpecial">)</span>
       <span class="synSpecial">(</span><span class="synStatement">delay</span> <span class="synSpecial">(</span>disjoin <span class="synSpecial">(</span>rest-disjuncts disjuncts<span class="synSpecial">)</span>
                       frame-stream<span class="synSpecial">)))))</span>

<span class="synSpecial">(</span>put <span class="synSpecial">'</span>or <span class="synSpecial">'</span>qeval disjoin<span class="synSpecial">)</span>

<span class="synComment">;; フィルタ</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>negate operands frame-stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-flatmap
   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>frame<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? <span class="synSpecial">(</span>qeval <span class="synSpecial">(</span>negated-query operands<span class="synSpecial">)</span>
                              <span class="synSpecial">(</span>singleton-stream frame<span class="synSpecial">)))</span>
         <span class="synSpecial">(</span>singleton-stream frame<span class="synSpecial">)</span>
         the-empty-stream<span class="synSpecial">))</span>
   frame-stream<span class="synSpecial">))</span>

<span class="synSpecial">(</span>put <span class="synSpecial">'</span>not <span class="synSpecial">'</span>qeval negate<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>lisp-value call frame-stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-flatmap
   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>frame<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>execute <span class="synSpecial">(</span>instantiate call
                               frame
                               <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>v f<span class="synSpecial">)</span>
                                 <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown pat var -- LISP-VALUE&quot;</span> v<span class="synSpecial">))))</span>
         <span class="synSpecial">(</span>singleton-stream frame<span class="synSpecial">)</span>
         the-empty-stream<span class="synSpecial">))</span>
   frame-stream<span class="synSpecial">))</span>

<span class="synSpecial">(</span>put <span class="synSpecial">'</span>lisp-value <span class="synSpecial">'</span>qeval lisp-value<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>execute <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">apply</span> <span class="synSpecial">(</span><span class="synIdentifier">eval</span> <span class="synSpecial">(</span>predicate <span class="synIdentifier">exp</span><span class="synSpecial">)</span> user-initial-environment<span class="synSpecial">)</span>
         <span class="synSpecial">(</span>args <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>always-true ignore frame-stream<span class="synSpecial">)</span> frame-stream<span class="synSpecial">)</span>

<span class="synSpecial">(</span>put <span class="synSpecial">'</span>always-true <span class="synSpecial">'</span>qeval always-true<span class="synSpecial">)</span>

<span class="synComment">;; パターンマッチにより表明を見つける</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>find-assertions pattern frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-flatmap <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>datum<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>check-an-assertion datum pattern frame<span class="synSpecial">))</span>
                  <span class="synComment">;; patternの先頭を見て，それにマッチするassertionをストリームで返す．</span>
                  <span class="synSpecial">(</span>fetch-assertions pattern frame<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>check-an-assertion assertion query-pat query-frame<span class="synSpecial">)</span>
  <span class="synComment">;;パターンマッチされ，failedになったフレームか，拡張されたフレームが入っている．</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>match-result
         <span class="synSpecial">(</span>pattern-match query-pat assertion query-frame<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> match-result <span class="synSpecial">'</span>failed<span class="synSpecial">)</span>
        the-empty-stream                <span class="synComment">;failedなら空のストリームを返す</span>
        <span class="synSpecial">(</span>singleton-stream match-result<span class="synSpecial">))))</span> <span class="synComment">;フレームなら空ストリームとcons-streamしたストリームを返す</span>

<span class="synComment">;; パターンとデータが同じならフレームを返し，パターンが(? x)ならextendするか既にある値を返す．</span>
<span class="synComment">;; マッチしなければそのフレームをfailedにする．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>pattern-match pat dat frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> frame <span class="synSpecial">'</span>failed<span class="synSpecial">)</span> <span class="synSpecial">'</span>failed<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">equal?</span> pat dat<span class="synSpecial">)</span> frame<span class="synSpecial">)</span>
        <span class="synSpecial">((</span>var? pat<span class="synSpecial">)</span>                     <span class="synComment">;patternが(? x)のような形なら</span>
         <span class="synSpecial">(</span>extend-if-consistent pat dat frame<span class="synSpecial">))</span> <span class="synComment">;ここで値となって戻るか，拡張されて戻る</span>
        <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> pat<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> dat<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>pattern-match <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> pat<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> dat<span class="synSpecial">)</span>
                        <span class="synSpecial">(</span>pattern-match <span class="synSpecial">(</span><span class="synIdentifier">car</span> pat<span class="synSpecial">)</span>
                                       <span class="synSpecial">(</span><span class="synIdentifier">car</span> dat<span class="synSpecial">)</span>
                                       frame<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">'</span>failed<span class="synSpecial">)))</span>

<span class="synComment">;; varは(? x)のような形で渡される．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>extend-if-consistent var dat frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>binding <span class="synSpecial">(</span>binding-in-frame var frame<span class="synSpecial">)))</span> <span class="synComment">;assocでframeにvarがあるか探す</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> binding
        <span class="synComment">;; frameにすでにvarがあればそのvalueを返してパターンマッチにかける</span>
        <span class="synSpecial">(</span>pattern-match <span class="synSpecial">(</span>binding-value binding<span class="synSpecial">)</span> dat frame<span class="synSpecial">)</span>
        <span class="synComment">;; なければフレームを拡張する．</span>
        <span class="synSpecial">(</span>extend var dat frame<span class="synSpecial">))))</span>

<span class="synComment">;; 規則とユニフィケーション</span>
<span class="synComment">;; stream-flatmapはstream-carのストリームをマップしてからstream-cdrにいく</span>
<span class="synComment">;; interleave-delayedもしているのでcarがnullならばstream-cdrのcarを評価する．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>apply-rules pattern frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-flatmap <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>rule<span class="synSpecial">)</span>
                    <span class="synSpecial">(</span>apply-a-rule rule pattern frame<span class="synSpecial">))</span>
                  <span class="synSpecial">(</span>fetch-rules pattern frame<span class="synSpecial">)))</span> <span class="synComment">;patternで使っているルールを引っ張ってくる</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>apply-a-rule rule query-pattern query-frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>clean-rule <span class="synSpecial">(</span>rename-variables-in rule<span class="synSpecial">)))</span> <span class="synComment">;(? x)を(? id x)にしてclean-ruleに束縛</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>unify-result
           <span class="synSpecial">(</span>unify-match query-pattern
                        <span class="synSpecial">(</span>conclusion clean-rule<span class="synSpecial">)</span>
                        query-frame<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> unify-result <span class="synSpecial">'</span>failed<span class="synSpecial">)</span>
          the-empty-stream
          <span class="synSpecial">(</span>qeval <span class="synSpecial">(</span>rule-body clean-rule<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>singleton-stream unify-result<span class="synSpecial">))))))</span>

<span class="synComment">;; ruleの中で(? x)となっている部分をすべて(? id x)にして返す</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rename-variables-in rule<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>rule-application-id <span class="synSpecial">(</span>new-rule-application-id<span class="synSpecial">)))</span> <span class="synComment">;rule-counterに１足してidに保存</span>
    <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>tree-walk <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>var? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
             <span class="synComment">;; (? x)=&gt;(? id x)</span>
             <span class="synSpecial">(</span>make-new-variable <span class="synIdentifier">exp</span> rule-application-id<span class="synSpecial">))</span>
            <span class="synSpecial">((</span><span class="synIdentifier">pair?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
             <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>tree-walk <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
                   <span class="synSpecial">(</span>tree-walk <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>
    <span class="synSpecial">(</span>tree-walk rule<span class="synSpecial">)))</span>

<span class="synComment">;; pattern-matchとほぼ同じ．</span>
<span class="synComment">;; ユニファイの場合はフレームに入っている値が(? x)の形の場合もあるのでそれに対応</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>unify-match p1 p2 frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">eq?</span> frame <span class="synSpecial">'</span>failed<span class="synSpecial">)</span> <span class="synSpecial">'</span>failed<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">equal?</span> p1 p2<span class="synSpecial">)</span> frame<span class="synSpecial">)</span>
        <span class="synSpecial">((</span>var? p1<span class="synSpecial">)</span> <span class="synSpecial">(</span>extend-if-possible p1 p2 frame<span class="synSpecial">))</span>
        <span class="synSpecial">((</span>var? p2<span class="synSpecial">)</span> <span class="synSpecial">(</span>extend-if-possible p2 p1 frame<span class="synSpecial">))</span>
        <span class="synSpecial">((</span><span class="synStatement">and</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> p1<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> p2<span class="synSpecial">))</span>
         <span class="synSpecial">(</span>unify-match <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> p1<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> p2<span class="synSpecial">)</span>
                      <span class="synSpecial">(</span>unify-match <span class="synSpecial">(</span><span class="synIdentifier">car</span> p1<span class="synSpecial">)</span>
                                   <span class="synSpecial">(</span><span class="synIdentifier">car</span> p2<span class="synSpecial">)</span>
                                   frame<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">'</span>failed<span class="synSpecial">)))</span>

<span class="synComment">;; (? x)が値を指していればその値を返す．(? y)となっていれば，さらにその値を探す．</span>
<span class="synComment">;; varもvalも(? x)同じものを指していればfailedが返る．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>extend-if-possible var val frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>binding <span class="synSpecial">(</span>binding-in-frame var frame<span class="synSpecial">)))</span> <span class="synComment">;フレームからvarに対応するvalを探して束縛</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">(</span>binding
           <span class="synSpecial">(</span>unify-match <span class="synSpecial">(</span>binding-value binding<span class="synSpecial">)</span> val frame<span class="synSpecial">))</span>
          <span class="synComment">;; 上のletで探してきたvalもまた(? y)という形だった場合は更にフレームから探してくる．</span>
          <span class="synSpecial">((</span>var? val<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>binding <span class="synSpecial">(</span>binding-in-frame val frame<span class="synSpecial">)))</span>
             <span class="synSpecial">(</span><span class="synStatement">if</span> binding
                 <span class="synSpecial">(</span>unify-match var <span class="synSpecial">(</span>binding-value binding<span class="synSpecial">)</span> frame<span class="synSpecial">)</span>
                 <span class="synSpecial">(</span>extend var val frame<span class="synSpecial">))))</span> <span class="synComment">;見つからなければフレームを拡張</span>
          <span class="synSpecial">((</span>depends-on? val var frame<span class="synSpecial">)</span>     <span class="synComment">;valとvarが同じく(? x)だった場合はfailed</span>
           <span class="synSpecial">'</span>failed<span class="synSpecial">)</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>extend var val frame<span class="synSpecial">)))))</span>


<span class="synComment">;; vatとexpが同じ(? x)の場合は#tを返す．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>depends-on? <span class="synIdentifier">exp</span> var frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>tree-walk e<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span>var? e<span class="synSpecial">)</span>                     <span class="synComment">;(? id x)という形</span>
           <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">equal?</span> var e<span class="synSpecial">)</span>           <span class="synComment">;varもeも(? x)と同じだった場合</span>
               <span class="synConstant">#t</span>
               <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>b <span class="synSpecial">(</span>binding-in-frame e frame<span class="synSpecial">)))</span> <span class="synComment">;eの値を更にフレームから探してくる</span>
                 <span class="synSpecial">(</span><span class="synStatement">if</span> b
                     <span class="synSpecial">(</span>tree-walk <span class="synSpecial">(</span>binding-value b<span class="synSpecial">))</span>
                     <span class="synConstant">#f</span><span class="synSpecial">))))</span>
          <span class="synSpecial">((</span><span class="synIdentifier">pair?</span> e<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span>tree-walk <span class="synSpecial">(</span><span class="synIdentifier">car</span> e<span class="synSpecial">))</span>
               <span class="synSpecial">(</span>tree-walk <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> e<span class="synSpecial">))))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synConstant">#f</span><span class="synSpecial">)))</span>
  <span class="synSpecial">(</span>tree-walk <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synComment">;; データベース</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> THE-ASSERTIONS the-empty-stream<span class="synSpecial">)</span>

<span class="synComment">;; patternの先頭に合うassertionをストリームにして返す</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fetch-assertions pattern frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>use-index? pattern<span class="synSpecial">)</span>              <span class="synComment">;patternの先頭がsymbolならtrue</span>
      <span class="synComment">;; (job ?x ?y)ならjobから始まるデータベースの表明すべてを取ってきてストリームにして返す</span>
      <span class="synSpecial">(</span>get-indexed-assertions pattern<span class="synSpecial">)</span>
      <span class="synComment">;; データベースのTHE-ASSERTIONSを返す</span>
      <span class="synSpecial">(</span>get-all-assertions<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>get-all-assertions<span class="synSpecial">)</span> THE-ASSERTIONS<span class="synSpecial">)</span>

<span class="synComment">;; patternの先頭にマッチするassertionを取ってきてストリームにして返す</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>get-indexed-assertions pattern<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>get-stream <span class="synSpecial">(</span>index-key-of pattern<span class="synSpecial">)</span> <span class="synSpecial">'</span>assertion-stream<span class="synSpecial">))</span>

<span class="synComment">;; 表の中からkey1 key2に対応するものを探す</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>get-stream key1 key2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>s <span class="synSpecial">(</span>get key1 key2<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> s s the-empty-stream<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> THE-RULES the-empty-stream<span class="synSpecial">)</span>


<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>fetch-rules pattern frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>use-index? pattern<span class="synSpecial">)</span>              <span class="synComment">;patternの先頭がsymbolならtrue</span>
      <span class="synComment">;; patternと先頭の要素が同じruleと先頭が?のruleがstream-appendされて返ってくる．</span>
      <span class="synSpecial">(</span>get-indexed-rules pattern<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>get-all-rules<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>get-all-rules<span class="synSpecial">)</span> THE-RULES<span class="synSpecial">)</span>

<span class="synComment">;; patternと先頭の要素が同じruleと先頭の要素が?のruleがstream-appendされる．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>get-indexed-rules pattern<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>stream-append
   <span class="synSpecial">(</span>get-stream <span class="synSpecial">(</span>index-key-of pattern<span class="synSpecial">)</span> <span class="synSpecial">'</span>rule-stream<span class="synSpecial">)</span>
   <span class="synSpecial">(</span>get-stream <span class="synSpecial">'</span>? <span class="synSpecial">'</span>rule-stream<span class="synSpecial">)))</span>

<span class="synComment">;; ruleならadd-rule!へ．ruleでなければadd-assertionへ．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>add-rule-or-assertion! assertion<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>rule? assertion<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>add-rule! assertion<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>add-assertion! assertion<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>add-assertion! assertion<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>store-assertion-in-index assertion<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>old-assertions THE-ASSERTIONS<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">set!</span> THE-ASSERTIONS
          <span class="synSpecial">(</span>cons-stream assertion old-assertions<span class="synSpecial">))</span>
    <span class="synSpecial">'</span>ok<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>add-rule! rule<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>store-rule-in-index rule<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>old-rules THE-RULES<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">set!</span> THE-RULES <span class="synSpecial">(</span>cons-stream rule old-rules<span class="synSpecial">))</span>
    <span class="synSpecial">'</span>ok<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>store-assertion-in-index assertion<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>indexable? assertion<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>key <span class="synSpecial">(</span>index-key-of assertion<span class="synSpecial">)))</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>current-assertion-stream
               <span class="synSpecial">(</span>get-stream key <span class="synSpecial">'</span>assertion-stream<span class="synSpecial">)))</span>
          <span class="synSpecial">(</span>put key
               <span class="synSpecial">'</span>assertion-stream
               <span class="synSpecial">(</span>cons-stream assertion
                            current-assertion-stream<span class="synSpecial">))))))</span>

<span class="synComment">;; ruleは(rule (some thing else))という形なので(conclusion rule)で(some thing else)という形にしてpatternに束縛する</span>
<span class="synComment">;; indexiableならrule-streamにkeyを登録する．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>store-rule-in-index rule<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>pattern <span class="synSpecial">(</span>conclusion rule<span class="synSpecial">)))</span>    <span class="synComment">;rule本体をpatternに束縛</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>indexable? pattern<span class="synSpecial">)</span>            <span class="synComment">;symbol or ?xのような形で#t</span>
        <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>key <span class="synSpecial">(</span>index-key-of pattern<span class="synSpecial">)))</span> <span class="synComment">;(? key)なら?,(key)ならkeyをkeyに束縛</span>
          <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>current-rule-stream
                 <span class="synSpecial">(</span>get-stream key <span class="synSpecial">'</span>rule-stream<span class="synSpecial">)))</span> <span class="synComment">;'rule-streamの中からkeyのストリームを探す</span>
            <span class="synSpecial">(</span>put key
                 <span class="synSpecial">'</span>rule-stream
                 <span class="synSpecial">(</span>cons-stream rule
                              current-rule-stream<span class="synSpecial">)))))))</span>

<span class="synComment">;; symbolか?xのような形ならtrueを返す</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>indexable? pat<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">or</span> <span class="synSpecial">(</span>constant-symbol? <span class="synSpecial">(</span><span class="synIdentifier">car</span> pat<span class="synSpecial">))</span>
      <span class="synSpecial">(</span>var? <span class="synSpecial">(</span><span class="synIdentifier">car</span> pat<span class="synSpecial">))))</span>

<span class="synComment">;; リストの先頭が?か調べ，?なら?を．違っていれば先頭の要素をそのまま帰す</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>index-key-of pat<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>key <span class="synSpecial">(</span><span class="synIdentifier">car</span> pat<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>var? key<span class="synSpecial">)</span> <span class="synSpecial">'</span>? key<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>use-index? pat<span class="synSpecial">)</span>
  <span class="synComment">;; (symbol? (car pat))</span>
  <span class="synSpecial">(</span>constant-symbol? <span class="synSpecial">(</span><span class="synIdentifier">car</span> pat<span class="synSpecial">)))</span>

<span class="synComment">;; ストリーム演算</span>


<span class="synComment">;; carがnullならcdrをforceするstream-append</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-append-delayed s1 delayed-s2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? s1<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">force</span> delayed-s2<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>cons-stream
       <span class="synSpecial">(</span>stream-car s1<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>stream-append-delayed <span class="synSpecial">(</span>stream-cdr s1<span class="synSpecial">)</span> delayed-s2<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>interleave-delayed s1 delayed-s2<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? s1<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">force</span> delayed-s2<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>cons-stream
       <span class="synSpecial">(</span>stream-car s1<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>interleave-delayed <span class="synSpecial">(</span><span class="synIdentifier">force</span> delayed-s2<span class="synSpecial">)</span>
                           <span class="synSpecial">(</span><span class="synStatement">delay</span> <span class="synSpecial">(</span>stream-cdr s1<span class="synSpecial">))))))</span>

<span class="synComment">;; stream-mapをした後にflatten-streamにかけられる．</span>
<span class="synComment">;; そこでstream-nullなら空ストリームが返る．</span>
<span class="synComment">;; そこからcdrをdelayしてinterleave-delayedに送られる．</span>
<span class="synComment">;; carがnullならcdrはforceされる．</span>
<span class="synComment">;; nullでなければ第一引数のcarをcons-streamし，</span>
<span class="synComment">;; delayed-s2,(cdr s2)をintegerleave-delayedで交互にconsしていく．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>stream-flatmap proc s<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>flatten-stream <span class="synSpecial">(</span>stream-map proc s<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>flatten-stream stream<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>stream-null? stream<span class="synSpecial">)</span>
      the-empty-stream
      <span class="synSpecial">(</span>interleave-delayed
       <span class="synSpecial">(</span>stream-car stream<span class="synSpecial">)</span>
       <span class="synSpecial">(</span><span class="synStatement">delay</span> <span class="synSpecial">(</span>flatten-stream <span class="synSpecial">(</span>stream-cdr stream<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>singleton-stream x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>cons-stream x the-empty-stream<span class="synSpecial">))</span>

<span class="synComment">;; 質問の構文手続き</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>type <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression TYPE&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>contents <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span>error <span class="synConstant">&quot;Unknown expression CONTENTS&quot;</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>

<span class="synComment">;; リストの先頭がassert!か判定する</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>assertion-to-be-added? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span>type <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">'</span>assert!<span class="synSpecial">))</span>

<span class="synComment">;; assert!のbody部を返す．(assert! (some thing else))</span>
<span class="synComment">;; (contents exp)でcdrを返し，そのcarを返すので(some thing else)になる．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>add-assertion-body <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synSpecial">(</span>contents <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>empty-conjunction? exps<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> exps<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>first-conjunct exps<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> exps<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rest-conjuncts exps<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> exps<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>empty-disjunction? exps<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> exps<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>first-disjunct exps<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> exps<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rest-disjuncts exps<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> exps<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>negated-query exps<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> exps<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>predicate exps<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> exps<span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>args exps<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> exps<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rule? statement<span class="synSpecial">)</span>
  <span class="synSpecial">(</span>tagged-list? statement <span class="synSpecial">'</span>rule<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>conclusion rule<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> rule<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>rule-body rule<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> <span class="synSpecial">(</span><span class="synIdentifier">cddr</span> rule<span class="synSpecial">))</span>
      <span class="synSpecial">'(</span>always-true<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> rule<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>query-syntax-process <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>map-over-symbols expand-question-mark <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synComment">;; すべての?xとなっているシンボルを(? x)という形に変える．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>map-over-symbols proc <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">pair?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>map-over-symbols proc <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
               <span class="synSpecial">(</span>map-over-symbols proc <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> <span class="synIdentifier">exp</span><span class="synSpecial">))))</span>
        <span class="synSpecial">((</span><span class="synIdentifier">symbol?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>proc <span class="synIdentifier">exp</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synIdentifier">exp</span><span class="synSpecial">)))</span>

<span class="synComment">;; symbolの先頭の文字が?なら(? x)に変える．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>expand-question-mark symbol<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>chars <span class="synSpecial">(</span><span class="synIdentifier">symbol-&gt;string</span> symbol<span class="synSpecial">)))</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">string=?</span> <span class="synSpecial">(</span><span class="synIdentifier">substring</span> chars <span class="synConstant">0</span> <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synConstant">&quot;?&quot;</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>?
              <span class="synSpecial">(</span><span class="synIdentifier">string-&gt;symbol</span>
               <span class="synSpecial">(</span><span class="synIdentifier">substring</span> chars <span class="synConstant">1</span> <span class="synSpecial">(</span><span class="synIdentifier">string-length</span> chars<span class="synSpecial">))))</span>
        symbol<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>var? <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
  <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> <span class="synSpecial">'</span>?<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>constant-symbol? <span class="synIdentifier">exp</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol?</span> <span class="synIdentifier">exp</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> rule-counter <span class="synConstant">0</span><span class="synSpecial">)</span>

<span class="synComment">;; rule-counterを1増やして返す</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>new-rule-application-id<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">set!</span> rule-counter <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synConstant">1</span> rule-counter<span class="synSpecial">))</span>
  rule-counter<span class="synSpecial">)</span>

<span class="synComment">;; (? x)=&gt;(? id x)</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-new-variable var rule-application-id<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">'</span>? <span class="synSpecial">(</span><span class="synIdentifier">cons</span> rule-application-id <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> var<span class="synSpecial">))))</span>

<span class="synComment">;; (? 5 x)のような形なら&quot;?x-5&quot;にしてから?x-5にする．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>contract-question-mark variable<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">string-&gt;symbol</span>
   <span class="synSpecial">(</span><span class="synIdentifier">string-append</span> <span class="synConstant">&quot;?&quot;</span>
                  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">number?</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> variable<span class="synSpecial">))</span>
                      <span class="synSpecial">(</span><span class="synIdentifier">string-append</span> <span class="synSpecial">(</span><span class="synIdentifier">symbol-&gt;string</span> <span class="synSpecial">(</span><span class="synIdentifier">caddr</span> variable<span class="synSpecial">))</span>
                                     <span class="synConstant">&quot;-&quot;</span>
                                     <span class="synSpecial">(</span><span class="synIdentifier">number-&gt;string</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> variable<span class="synSpecial">)))</span>
                      <span class="synSpecial">(</span><span class="synIdentifier">symbol-&gt;string</span> <span class="synSpecial">(</span><span class="synIdentifier">cadr</span> variable<span class="synSpecial">))))))</span>

<span class="synComment">;; フレームと束縛</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-binding variable value<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> variable value<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>binding-variable binding<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">car</span> binding<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>binding-value binding<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> binding<span class="synSpecial">))</span>

<span class="synComment">;; フレームからvariableに対応したvalueを取り出す．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>binding-in-frame variable frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">assoc</span> variable frame<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>extend variable value frame<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span>make-binding variable value<span class="synSpecial">)</span> frame<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>tagged-list? <span class="synIdentifier">exp</span> tag<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">eq?</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> <span class="synIdentifier">exp</span><span class="synSpecial">)</span> tag<span class="synSpecial">)</span>
      <span class="synConstant">#f</span><span class="synSpecial">))</span>
</pre>


