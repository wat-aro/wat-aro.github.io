---
title: "SICP 問題 5.46"
published: 2016/02/10
tags:
  - scheme
  - SICP
---

<p>5.45と同様に今度は<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D5%A5%A3%A5%DC%A5%CA%A5%C3%A5%C1%BF%F4%CE%F3">フィボナッチ数列</a>の計算でそれぞれ比べる．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span><span class="synStatement">define</span> fib  <span class="synComment">;;一回目以外は省略</span>
        <span class="synSpecial">(</span>make-machine
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>&lt; <span class="synIdentifier">&lt;</span><span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>- <span class="synIdentifier">-</span><span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>+ <span class="synIdentifier">+</span><span class="synSpecial">))</span>
         <span class="synSpecial">'(</span>controller
           <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label fib-done<span class="synSpecial">))</span>
           fib-loop
           <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op &lt;<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
           <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label immediate-answer<span class="synSpecial">))</span>
           <span class="synComment">;; Fib(n-1)を計算するよう設定</span>
           <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-1<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>save n<span class="synSpecial">)</span>                      <span class="synComment">;n の昔の値を退避</span>
           <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op -<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>   <span class="synComment">;n を n-1 に変える</span>
           <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>               <span class="synComment">;再帰呼び出しを実行</span>
           afterfib-n-1                <span class="synComment">;戻った時 Fib(n-1) は val にある</span>
           <span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
           <span class="synComment">;; Fib(n-2)を計算するよう設定</span>
           <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op -<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">2</span><span class="synSpecial">))</span>
           <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label afterfib-n-2<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>save val<span class="synSpecial">)</span>                    <span class="synComment">;Fib(n-1) を退避</span>
           <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fib-loop<span class="synSpecial">))</span>
           afterfib-n-2            <span class="synComment">;戻った時 Fib(n-2) の値は val にある</span>
           <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>    <span class="synComment">;n には Fib(n-2) がある</span>
           <span class="synSpecial">(</span>restore val<span class="synSpecial">)</span>           <span class="synComment">;val には Fib(n-1) がある</span>
           <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>assign val                   <span class="synComment">;Fib(n-1) + Fib(n-2)</span>
                   <span class="synSpecial">(</span>op +<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>   <span class="synComment">;呼び出し側に戻る．答えは val にある</span>
           immediate-answer
           <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>reg n<span class="synSpecial">))</span>          <span class="synComment">;基底の場合: Fib(n)=n</span>
           <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
           fib-done
           <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op print-stack-statistics<span class="synSpecial">)))))</span>

fib
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib <span class="synSpecial">'</span>n <span class="synConstant">1</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">0</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">0</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fib <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">1</span>

gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib <span class="synSpecial">'</span>n <span class="synConstant">2</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">4</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">2</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fib <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">1</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib <span class="synSpecial">'</span>n <span class="synConstant">3</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">8</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">4</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fib <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">2</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib <span class="synSpecial">'</span>n <span class="synConstant">4</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">16</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">6</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fib <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">3</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib <span class="synSpecial">'</span>n <span class="synConstant">5</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">28</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">8</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fib <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">5</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib <span class="synSpecial">'</span>n <span class="synConstant">5</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">28</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">8</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fib <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">5</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib <span class="synSpecial">'</span>n <span class="synConstant">6</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">48</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">10</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fib <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">8</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib <span class="synSpecial">'</span>n <span class="synConstant">7</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">80</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">12</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fib <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">13</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib <span class="synSpecial">'</span>n <span class="synConstant">8</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">132</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">14</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fib <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">21</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib <span class="synSpecial">'</span>n <span class="synConstant">9</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">216</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">16</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fib <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">34</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fib <span class="synSpecial">'</span>n <span class="synConstant">10</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fib<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">352</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">18</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fib <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">55</span>
</pre>


<p>　<br/>
翻訳系</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>compile-and-go
       <span class="synSpecial">'(</span>define <span class="synSpecial">(</span>fib n<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>if <span class="synSpecial">(</span>&lt; n <span class="synConstant">2</span><span class="synSpecial">)</span>
              n
              <span class="synSpecial">(</span>+ <span class="synSpecial">(</span>fib <span class="synSpecial">(</span>- n <span class="synConstant">1</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>fib <span class="synSpecial">(</span>- n <span class="synConstant">2</span><span class="synSpecial">))))))</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">0</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
ok

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">7</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">2</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">15</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">5</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">3</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">23</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">7</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">2</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">4</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">39</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">9</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">3</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">5</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">63</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">11</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">5</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">6</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">103</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">13</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">8</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">7</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">167</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">15</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">13</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">8</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">271</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">17</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">21</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">9</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">439</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">19</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">34</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>fib <span class="synConstant">10</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">711</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">21</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">55</span>
</pre>


<p>　<br/>
積極制御評価器</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>ec-fib n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">&lt;</span> n <span class="synConstant">2</span><span class="synSpecial">)</span>
      n
      <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>ec-fib <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>ec-fib <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">2</span><span class="synSpecial">)))))</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">3</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
ok

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-fib <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">16</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">8</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-fib <span class="synConstant">2</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">72</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">13</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-fib <span class="synConstant">3</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">128</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">18</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">2</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-fib <span class="synConstant">4</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">240</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">23</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">3</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-fib <span class="synConstant">5</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">408</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">28</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">5</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-fib <span class="synConstant">6</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">688</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">33</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">8</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-fib <span class="synConstant">7</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">1136</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">38</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">13</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-fib <span class="synConstant">8</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">1864</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">43</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">21</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-fib <span class="synConstant">9</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">3040</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">48</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">34</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-fib <span class="synConstant">10</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">4944</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">53</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">55</span>
</pre>


<p>プッシュ数</p>

<table>
<thead>
<tr>
<th> n   </th>
<th style="text-align:right;"> 計算機 </th>
<th style="text-align:right;"> 翻訳系 </th>
<th style="text-align:right;"> 評価器 </th>
<th style="text-align:right;"> 評/機 </th>
<th style="text-align:right;"> 翻/機 </th>
</tr>
</thead>
<tbody>
<tr>
<td> 3   </td>
<td style="text-align:right;">    8 </td>
<td style="text-align:right;">  23 </td>
<td style="text-align:right;">   128  </td>
<td style="text-align:right;"> 16.0 </td>
<td style="text-align:right;"> 2.87 </td>
</tr>
<tr>
<td> 4 </td>
<td style="text-align:right;"> 16 </td>
<td style="text-align:right;">  39 </td>
<td style="text-align:right;"> 240 </td>
<td style="text-align:right;"> 15.0 </td>
<td style="text-align:right;"> 2.43 </td>
</tr>
<tr>
<td>5 </td>
<td style="text-align:right;"> 28 </td>
<td style="text-align:right;"> 63 </td>
<td style="text-align:right;"> 408 </td>
<td style="text-align:right;"> 14.57</td>
<td style="text-align:right;"> 2.25 </td>
</tr>
<tr>
<td>6 </td>
<td style="text-align:right;"> 48</td>
<td style="text-align:right;"> 103 </td>
<td style="text-align:right;"> 688 </td>
<td style="text-align:right;"> 14.33 </td>
<td style="text-align:right;">2.14</td>
</tr>
<tr>
<td>7 </td>
<td style="text-align:right;"> 80 </td>
<td style="text-align:right;"> 167</td>
<td style="text-align:right;"> 1136 </td>
<td style="text-align:right;">14.2</td>
<td style="text-align:right;">2.08</td>
</tr>
<tr>
<td>8</td>
<td style="text-align:right;">132</td>
<td style="text-align:right;">271</td>
<td style="text-align:right;">1864</td>
<td style="text-align:right;"> 14.12</td>
<td style="text-align:right;">2.05</td>
</tr>
<tr>
<td>9</td>
<td style="text-align:right;">216</td>
<td style="text-align:right;">439</td>
<td style="text-align:right;">3040</td>
<td style="text-align:right;">14.07</td>
<td style="text-align:right;"> 2.03</td>
</tr>
<tr>
<td>10</td>
<td style="text-align:right;">352</td>
<td style="text-align:right;">711</td>
<td style="text-align:right;">4944</td>
<td style="text-align:right;">14.04</td>
<td style="text-align:right;">2.01|</td>
</tr>
<tr>
<td>20</td>
<td style="text-align:right;">43780</td>
<td style="text-align:right;">87567</td>
<td style="text-align:right;">612936</td>
<td style="text-align:right;">14.0</td>
<td style="text-align:right;">2.0</td>
</tr>
</tbody>
</table>


<p>　<br/>
 最大スタック深さ</p>

<table>
<thead>
<tr>
<th> 計算機</th>
<th> 翻訳系</th>
<th> 評価器 </th>
<th>評/機</th>
<th> 翻/機</th>
</tr>
</thead>
<tbody>
<tr>
<td>2n-2</td>
<td>2n+1</td>
<td>5n+3</td>
<td>2.500</td>
<td>1.00</td>
</tr>
</tbody>
</table>


