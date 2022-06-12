---
title: "SICP 問題 5.22"
published: 2016/01/31
tags:
  - scheme
  - SICP
---

<p>appendとappend!を<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%B8%A5%B9%A5%BF">レジスタ</a>マシン上に実装する．<br/>
　<br/>
append</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> x<span class="synSpecial">)</span>
      y
      <span class="synSpecial">(</span><span class="synIdentifier">cons</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> x<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">append</span> <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> x<span class="synSpecial">)</span> y<span class="synSpecial">))))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synIdentifier">append</span>
  <span class="synSpecial">(</span>make-machine
   <span class="synSpecial">'(</span>x y val continue<span class="synSpecial">)</span>
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cons <span class="synIdentifier">cons</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>null? <span class="synIdentifier">null?</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>car <span class="synIdentifier">car</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cdr <span class="synIdentifier">cdr</span><span class="synSpecial">))</span>
   <span class="synSpecial">'(</span>start
       <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label append-done<span class="synSpecial">))</span>
     x-loop
       <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op null?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg x<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label after-x<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>save x<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>assign x <span class="synSpecial">(</span>op cdr<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg x<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label construct<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label x-loop<span class="synSpecial">))</span>
     after-x
       <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>reg y<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label construct<span class="synSpecial">))</span>
     construct
       <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>restore x<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>assign x <span class="synSpecial">(</span>op car<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg x<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op cons<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg x<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
     append-done<span class="synSpecial">)))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>set-register-contents! <span class="synIdentifier">append</span> <span class="synSpecial">'</span>x <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">))</span>
done
gosh&gt; <span class="synSpecial">(</span>set-register-contents! <span class="synIdentifier">append</span> <span class="synSpecial">'</span>y <span class="synSpecial">'(</span>a b c<span class="synSpecial">))</span>
done
gosh&gt; <span class="synSpecial">(</span>start <span class="synIdentifier">append</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>get-register-contents <span class="synIdentifier">append</span> <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> a b c<span class="synSpecial">)</span>
</pre>


<p>　<br/>
append!</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>append! x y<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">set-cdr!</span> <span class="synSpecial">(</span>last-pair x<span class="synSpecial">)</span> y<span class="synSpecial">)</span>
  x<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> append!
  <span class="synSpecial">(</span>make-machine
   <span class="synSpecial">'(</span>x y temp<span class="synSpecial">)</span>
   <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>set-cdr! <span class="synIdentifier">set-cdr!</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>cdr <span class="synIdentifier">cdr</span><span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>null? <span class="synIdentifier">null?</span><span class="synSpecial">))</span>
   <span class="synSpecial">'(</span>start
       <span class="synSpecial">(</span>assign temp <span class="synSpecial">(</span>reg x<span class="synSpecial">))</span>
     x-loop
       <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op null?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg temp<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label after-loop<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>save temp<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>assign temp <span class="synSpecial">(</span>op cdr<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg temp<span class="synSpecial">))</span>
       <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label x-loop<span class="synSpecial">))</span>
     after-loop
       <span class="synSpecial">(</span>restore temp<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op set-cdr!<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg temp<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg y<span class="synSpecial">))</span>
     append!-done <span class="synSpecial">)))</span>
</pre>


<p>test</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>set-register-contents! append! <span class="synSpecial">'</span>x <span class="synSpecial">'(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span><span class="synSpecial">))</span>
done
gosh&gt; <span class="synSpecial">(</span>set-register-contents! append! <span class="synSpecial">'</span>y <span class="synSpecial">'(</span>a b c<span class="synSpecial">))</span>
done
gosh&gt; <span class="synSpecial">(</span>start append!<span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>get-register-contents append! <span class="synSpecial">'</span>x<span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> a b c<span class="synSpecial">)</span>
</pre>


