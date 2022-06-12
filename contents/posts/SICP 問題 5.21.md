---
title: "SICP 問題 5.21"
published: 2016/01/31
tags:
  - scheme
  - SICP
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/scheme">scheme</a>で書いた手続きの<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%BF">レジスタ</a>マシンを実装する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; a</span>
<span class="synComment">;;; 再帰的count-leaves</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>count-leaves tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> tree<span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> tree<span class="synSpecial">))</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
        <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>count-leaves <span class="synSpecial">(</span><span class="synIdentifier">car</span> tree<span class="synSpecial">))</span>
                 <span class="synSpecial">(</span>coutn-leaves <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> tree<span class="synSpecial">))))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> recur-count-leaves-machine
  <span class="synSpecial">(</span>make-machine
   <span class="synSpecial">'(</span>tree val continue<span class="synSpecial">)</span>
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>null? <span class="synIdentifier">null?</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>car <span class="synIdentifier">car</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cdr <span class="synIdentifier">cdr</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>+ <span class="synIdentifier">+</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>pair? <span class="synIdentifier">pair?</span><span class="synSpecial">))</span>
   <span class="synSpecial">'(</span>start
       <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label count-leaves-done<span class="synSpecial">))</span>
     car-loop
       <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op null?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg tree<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label null<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op pair?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg tree<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label pair<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
     pair
       <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label aftercount-car<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>save tree<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>assign tree <span class="synSpecial">(</span>op car<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg tree<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label car-loop<span class="synSpecial">))</span>
     aftercount-car
       <span class="synSpecial">(</span>restore tree<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>assign tree <span class="synSpecial">(</span>op cdr<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg tree<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label aftercount-cdr<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>save val<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label car-loop<span class="synSpecial">))</span>
     aftercount-cdr
       <span class="synComment">;; valの値を一時的にtreeに入れて，後に計算する．goto先はaftercount-carなので</span>
       <span class="synComment">;; そこでtreeはrestoreされる．</span>
       <span class="synSpecial">(</span>restore tree<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op +<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg tree<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
     null
       <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">0</span><span class="synSpecial">))</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
     count-leaves-done<span class="synSpecial">)))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>set-register-contents! recur-count-leaves-machine <span class="synSpecial">'</span>tree <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
done
gosh&gt; <span class="synSpecial">(</span>start recur-count-leaves-machine<span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>get-register-contents recur-count-leaves-machine <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">4</span>
gosh&gt; recur-count-leaves-machine
gosh&gt; <span class="synSpecial">(</span>set-register-contents! recur-count-leaves-machine <span class="synSpecial">'</span>tree <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synSpecial">(</span>a b<span class="synSpecial">)</span> <span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
done
gosh&gt; <span class="synSpecial">(</span>start recur-count-leaves-machine<span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>get-register-contents recur-count-leaves-machine <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">6</span>
</pre>


<p>　</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; b</span>
<span class="synComment">;;; カウンタを陽に持つ再帰的count-leaves</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>count-leaves tree<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>count-iter tree n<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">null?</span> tree<span class="synSpecial">)</span> n<span class="synSpecial">)</span>
          <span class="synSpecial">((</span><span class="synIdentifier">not</span> <span class="synSpecial">(</span><span class="synIdentifier">pair?</span> tree<span class="synSpecial">))</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> n <span class="synConstant">1</span><span class="synSpecial">))</span>
          <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span>count-iter <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> tree<span class="synSpecial">)</span>
                            <span class="synSpecial">(</span>count-iter <span class="synSpecial">(</span><span class="synIdentifier">car</span> tree<span class="synSpecial">)</span> n<span class="synSpecial">)))))</span>
  <span class="synSpecial">(</span>count-iter tree <span class="synConstant">0</span><span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> count-n-leaves
  <span class="synSpecial">(</span>make-machine
   <span class="synSpecial">'(</span>tree continue n<span class="synSpecial">)</span>
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>null? <span class="synIdentifier">null?</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>car <span class="synIdentifier">car</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cdr <span class="synIdentifier">cdr</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>+ <span class="synIdentifier">+</span><span class="synSpecial">)</span>
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>pair? <span class="synIdentifier">pair?</span><span class="synSpecial">))</span>
   <span class="synSpecial">'(</span>start
       <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label count-leaves-done<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>const <span class="synConstant">0</span><span class="synSpecial">))</span>
     car-loop
       <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op null?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg tree<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label null<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op pair?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg tree<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label pair<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op +<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
     pair
       <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label aftercount-car<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>save tree<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>assign tree <span class="synSpecial">(</span>op car<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg tree<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label car-loop<span class="synSpecial">))</span>
     aftercount-car
       <span class="synSpecial">(</span>restore tree<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>assign tree <span class="synSpecial">(</span>op cdr<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg tree<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label aftercount-cdr<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label car-loop<span class="synSpecial">))</span>
     aftercount-cdr
       <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
     <span class="synComment">;; branchは(reg continue)が出来ないので，一度ここに飛ばしてからcontinueに飛ぶ</span>
     null
      <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
     count-leaves-done<span class="synSpecial">)))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>set-register-contents! count-n-leaves <span class="synSpecial">'</span>tree <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synSpecial">(</span>a b<span class="synSpecial">)</span> <span class="synConstant">3</span> <span class="synConstant">4</span><span class="synSpecial">))</span>
done
gosh&gt; <span class="synSpecial">(</span>start count-n-leaves<span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>get-register-contents count-n-leaves <span class="synSpecial">'</span>n<span class="synSpecial">)</span>
<span class="synConstant">6</span>
</pre>


