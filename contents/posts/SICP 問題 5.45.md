---
title: "SICP 問題 5.45"
published: 2016/02/10
tags:
  - scheme
  - SICP
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>した階乗計算，積極制御評価器の階乗計算，特殊目的計算機のプッシュ数，最大スタック深さを調べて比較する．</p>

<p>まずは<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>したものから</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>compile-and-go
       <span class="synSpecial">'(</span>define <span class="synSpecial">(</span>factorial n<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>if <span class="synSpecial">(</span>= n <span class="synConstant">1</span><span class="synSpecial">)</span>
              <span class="synConstant">1</span>
              <span class="synSpecial">(</span>* <span class="synSpecial">(</span>factorial <span class="synSpecial">(</span>- n <span class="synConstant">1</span><span class="synSpecial">))</span> n<span class="synSpecial">))))</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">0</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
ok


<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">5</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">2</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">7</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">2</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">3</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">9</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">4</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">6</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">4</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">11</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">6</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">24</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">5</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">13</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">8</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">120</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">6</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">15</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">10</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">720</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">7</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">17</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">12</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">5040</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">8</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">19</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">14</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">40320</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">9</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">21</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">16</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">362880</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>factorial <span class="synConstant">10</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">23</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">18</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">3628800</span>
</pre>


<p>プッシュ数は2n+3<br/>
最大スタック深さは2n-2<br/>
　<br/>
次に積極制御評価器で計測する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>ec-factorial n<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">1</span><span class="synSpecial">)</span>
      <span class="synConstant">1</span>
      <span class="synSpecial">(</span><span class="synIdentifier">*</span> <span class="synSpecial">(</span>ec-factorial <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))</span> n<span class="synSpecial">)))</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">3</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">3</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
ok

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-factorial <span class="synConstant">1</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">16</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">8</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">1</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-factorial <span class="synConstant">2</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">48</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">13</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">2</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-factorial <span class="synConstant">3</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">80</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">18</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">6</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-factorial <span class="synConstant">4</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">112</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">23</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">24</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-factorial <span class="synConstant">5</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">144</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">28</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">120</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-factorial <span class="synConstant">6</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">176</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">33</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">720</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-factorial <span class="synConstant">7</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">208</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">38</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">5040</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-factorial <span class="synConstant">8</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">240</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">43</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">40320</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-factorial <span class="synConstant">9</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">272</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">48</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">362880</span>

<span class="synComment">;;; EC-Eval input:</span>
<span class="synSpecial">(</span>ec-factorial <span class="synConstant">10</span><span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">304</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">53</span><span class="synSpecial">)</span>
<span class="synComment">;;; EC-Eval value:</span>
<span class="synConstant">3628800</span>
</pre>


<p>プッシュ数は32n-16<br/>
最大スタック深さは5n+3<br/>
　<br/>
最後に階乗計算のための特殊計算機で計測する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span><span class="synStatement">define</span> fact  <span class="synComment">;; 二回目以降の初期化は省略</span>
        <span class="synSpecial">(</span>make-machine
         <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>* <span class="synIdentifier">*</span><span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>= <span class="synIdentifier">=</span><span class="synSpecial">)</span>
               <span class="synSpecial">(</span><span class="synIdentifier">list</span> <span class="synSpecial">'</span>- <span class="synIdentifier">-</span><span class="synSpecial">))</span>
         <span class="synSpecial">'(</span>controller
           <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label fact-done<span class="synSpecial">))</span>
           fact-loop
           <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op =<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
           <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label base-case<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>save n<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>assign n <span class="synSpecial">(</span>op -<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
           <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label after-fact<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label fact-loop<span class="synSpecial">))</span>
           after-fact
           <span class="synSpecial">(</span>restore n<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op *<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg n<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
           <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
           base-case
           <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
           <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
           fact-done
           <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op print-stack-statistics<span class="synSpecial">)))))</span>
fact
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fact <span class="synSpecial">'</span>n <span class="synConstant">1</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fact<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">0</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">0</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fact <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">1</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fact <span class="synSpecial">'</span>n <span class="synConstant">2</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fact<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">2</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">2</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fact <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">2</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fact <span class="synSpecial">'</span>n <span class="synConstant">3</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fact<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">4</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">4</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fact <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">6</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fact <span class="synSpecial">'</span>n <span class="synConstant">4</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fact<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">6</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">6</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fact <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">24</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fact <span class="synSpecial">'</span>n <span class="synConstant">5</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fact<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">8</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">8</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fact <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">120</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fact <span class="synSpecial">'</span>n <span class="synConstant">6</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fact<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">10</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">10</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fact <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">720</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fact <span class="synSpecial">'</span>n <span class="synConstant">7</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fact<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">12</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">12</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fact <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">5040</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fact <span class="synSpecial">'</span>n <span class="synConstant">8</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fact<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">14</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">14</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fact <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">40320</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fact <span class="synSpecial">'</span>n <span class="synConstant">9</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fact<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">16</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">16</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fact <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">362880</span>
gosh&gt; <span class="synSpecial">(</span>set-register-contents! fact <span class="synSpecial">'</span>n <span class="synConstant">10</span><span class="synSpecial">)</span>
done
gosh&gt; <span class="synSpecial">(</span>start fact<span class="synSpecial">)</span>

<span class="synSpecial">(</span>total-pushes <span class="synIdentifier">=</span> <span class="synConstant">18</span> maximum-depth <span class="synIdentifier">=</span> <span class="synConstant">18</span><span class="synSpecial">)</span>done
gosh&gt; <span class="synSpecial">(</span>get-register-contents fact <span class="synSpecial">'</span>val<span class="synSpecial">)</span>
<span class="synConstant">3628800</span>
</pre>


<p>プッシュ数が2n-2
最大スタック深さが2n-2．</p>

<p>比べると，積極制御評価器は<br/>
total: 32n-16<br/>
max: 5n+3<br/>
　<br/>
翻訳系は<br/>
total: 2n+3<br/>
max: 2n-2<br/>
　<br/>
階乗計算機は<br/>
total: 2n-2<br/>
max: 2n-2<br/>
　<br/>
本来はここで翻訳系と階乗計算機のほうがはるかに優れていることを確認するはずが<br/>
ここまでの問題で最適化したため，ほとんど性能差がなくなっている．<br/>
比率を出すと積極制御評価器とは<br/>
totalが1:16<br/>
maxは2:5の性能差になる．</p>

<p>ここで本当に翻訳系が2nで収まっているのか確認のために<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB">コンパイル</a>した命令列を出力させる．<br/>
saveしているところを確認する．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>compile
       <span class="synSpecial">'(</span>define <span class="synSpecial">(</span>factorial n<span class="synSpecial">)</span>
          <span class="synSpecial">(</span>if <span class="synSpecial">(</span>= n <span class="synConstant">1</span><span class="synSpecial">)</span>
              <span class="synConstant">1</span>
              <span class="synSpecial">(</span>* <span class="synSpecial">(</span>factorial <span class="synSpecial">(</span>- n <span class="synConstant">1</span><span class="synSpecial">))</span> n<span class="synSpecial">)))</span>
       <span class="synSpecial">'</span>val <span class="synSpecial">'</span>next <span class="synSpecial">'())</span>
      <span class="synSpecial">((</span>env<span class="synSpecial">)</span>
       <span class="synSpecial">(</span>val<span class="synSpecial">)</span>
       <span class="synSpecial">((</span>assign val <span class="synSpecial">(</span>op make-compiled-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>label entry1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label after-lambda2<span class="synSpecial">))</span>
        entry1
        <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op compiled-procedure-env<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign env <span class="synSpecial">(</span>op extend-environment<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span>n<span class="synSpecial">))</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">0</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">=</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op false?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label false-branch4<span class="synSpecial">))</span>
        true-branch3
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
        false-branch4
        <span class="synSpecial">(</span>save continue<span class="synSpecial">)</span>  <span class="synComment">;; false-branchのcontinue</span>
        <span class="synSpecial">(</span>save env<span class="synSpecial">)</span>          <span class="synComment">;; false-branchのenv</span>
        <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op get-global-environment<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign proc <span class="synSpecial">(</span>op lookup-variable-value<span class="synSpecial">)</span> <span class="synSpecial">(</span>const factorial<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">0</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>const <span class="synConstant">1</span><span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">-</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign argl <span class="synSpecial">(</span>op <span class="synIdentifier">list</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>test <span class="synSpecial">(</span>op primitive-procedure?<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>branch <span class="synSpecial">(</span>label primitive-branch6<span class="synSpecial">))</span>
        compiled-branch7
        <span class="synSpecial">(</span>assign continue <span class="synSpecial">(</span>label proc-return9<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op compiled-procedure-entry<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
        proc-return9
        <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>reg val<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>label after-call8<span class="synSpecial">))</span>
        primitive-branch6
        <span class="synSpecial">(</span>assign arg1 <span class="synSpecial">(</span>op apply-primitive-procedure<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg proc<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg argl<span class="synSpecial">))</span>
        after-call8
        <span class="synSpecial">(</span>restore env<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>assign arg2 <span class="synSpecial">(</span>op lexical-address-lookup<span class="synSpecial">)</span> <span class="synSpecial">(</span>const <span class="synSpecial">(</span><span class="synConstant">0</span> <span class="synConstant">0</span><span class="synSpecial">))</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>op <span class="synIdentifier">*</span><span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg1<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg arg2<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>restore continue<span class="synSpecial">)</span>
        <span class="synSpecial">(</span>goto <span class="synSpecial">(</span>reg continue<span class="synSpecial">))</span>
        after-if5
        after-lambda2
        <span class="synSpecial">(</span>perform <span class="synSpecial">(</span>op define-variable!<span class="synSpecial">)</span> <span class="synSpecial">(</span>const factorial<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg val<span class="synSpecial">)</span> <span class="synSpecial">(</span>reg env<span class="synSpecial">))</span>
        <span class="synSpecial">(</span>assign val <span class="synSpecial">(</span>const ok<span class="synSpecial">))))</span>
</pre>


<p>false-branchでcontinueとenvをsaveしているだけなので最大スタック深さが2n-2なのは確かなようだ．<br/>
プッシュ数が2n+3なのは(factorial 1)でも5回プッシュされてるところを見ると，<br/>
引数を適用する段階でされているのでこれ以上は無理だろう．<br/>
factorialは基本計算しか使っていないので，open-code最適化がかなり効いてるためのこれだけ性能がよくなってると思われる．</p>

