---
title: "SICP 問題 4.21"
published: 2015/12/27
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; a</span>
<span class="synError">以下の式が階乗を計算すること確かめた後，フィボナッチ数を計算する手続きを作る．</span>
<span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>n<span class="synSpecial">)</span>
  <span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>fact<span class="synSpecial">)</span>
     <span class="synSpecial">(</span>fact fact n<span class="synSpecial">))</span>
   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>ft k<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> k <span class="synConstant">1</span><span class="synSpecial">)</span>
         <span class="synConstant">1</span>
         <span class="synSpecial">(</span><span class="synIdentifier">*</span> k <span class="synSpecial">(</span>ft ft<span class="synSpecial">(</span><span class="synIdentifier">-</span> k <span class="synConstant">1</span><span class="synSpecial">)))))))</span>
 <span class="synConstant">10</span><span class="synSpecial">)</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>n<span class="synSpecial">)</span>
        <span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>fact<span class="synSpecial">)</span>
           <span class="synSpecial">(</span>fact fact n<span class="synSpecial">))</span>
         <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>ft k<span class="synSpecial">)</span>
           <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> k <span class="synConstant">1</span><span class="synSpecial">)</span>
               <span class="synConstant">1</span>
               <span class="synSpecial">(</span><span class="synIdentifier">*</span> k <span class="synSpecial">(</span>ft ft <span class="synSpecial">(</span><span class="synIdentifier">-</span> k <span class="synConstant">1</span><span class="synSpecial">)))))))</span>
       <span class="synConstant">10</span><span class="synSpecial">)</span>
<span class="synConstant">3628800</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; フィボナッチ数</span>
<span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>n<span class="synSpecial">)</span>
   <span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>fact<span class="synSpecial">)</span>
      <span class="synSpecial">(</span>fact fact n<span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>ft k<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> k <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
            <span class="synSpecial">((</span><span class="synIdentifier">=</span> k <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
            <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>ft ft <span class="synSpecial">(</span><span class="synIdentifier">-</span> k <span class="synConstant">1</span><span class="synSpecial">))</span>
                     <span class="synSpecial">(</span>ft ft <span class="synSpecial">(</span><span class="synIdentifier">-</span> k <span class="synConstant">2</span><span class="synSpecial">))))))))</span>
 <span class="synConstant">10</span><span class="synSpecial">)</span>

<span class="synComment">;; 確認用の手続き</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>make-map-list n start proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synIdentifier">map</span> proc <span class="synSpecial">(</span>iota n start <span class="synConstant">1</span><span class="synSpecial">)))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>make-map-list <span class="synConstant">10</span> <span class="synConstant">1</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>n<span class="synSpecial">)</span>
                            <span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>fact<span class="synSpecial">)</span>
                               <span class="synSpecial">(</span>fact fact n<span class="synSpecial">))</span>
                             <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>ft k<span class="synSpecial">)</span>
                               <span class="synSpecial">(</span><span class="synStatement">cond</span> <span class="synSpecial">((</span><span class="synIdentifier">=</span> k <span class="synConstant">0</span><span class="synSpecial">)</span> <span class="synConstant">0</span><span class="synSpecial">)</span>
                                     <span class="synSpecial">((</span><span class="synIdentifier">=</span> k <span class="synConstant">1</span><span class="synSpecial">)</span> <span class="synConstant">1</span><span class="synSpecial">)</span>
                                     <span class="synSpecial">(</span><span class="synStatement">else</span> <span class="synSpecial">(</span><span class="synIdentifier">+</span> <span class="synSpecial">(</span>ft ft <span class="synSpecial">(</span><span class="synIdentifier">-</span> k <span class="synConstant">1</span><span class="synSpecial">))</span>
                                              <span class="synSpecial">(</span>ft ft <span class="synSpecial">(</span><span class="synIdentifier">-</span> k <span class="synConstant">2</span><span class="synSpecial">)))))))))</span>
<span class="synSpecial">(</span><span class="synConstant">1</span> <span class="synConstant">1</span> <span class="synConstant">2</span> <span class="synConstant">3</span> <span class="synConstant">5</span> <span class="synConstant">8</span> <span class="synConstant">13</span> <span class="synConstant">21</span> <span class="synConstant">34</span> <span class="synConstant">55</span><span class="synSpecial">)</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; b</span>
<span class="synError">以下の式をaと同じように内部定義もletrecも使わずに定義する．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>f x<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">even?</span> n<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">0</span><span class="synSpecial">)</span> true <span class="synSpecial">(</span><span class="synIdentifier">odd?</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))))</span>
  <span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synIdentifier">odd?</span> n<span class="synSpecial">)</span>
    <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">0</span><span class="synSpecial">)</span> false <span class="synSpecial">(</span><span class="synIdentifier">even?</span> <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))))</span>
  <span class="synSpecial">(</span><span class="synIdentifier">even?</span> x<span class="synSpecial">))</span>

<span class="synComment">;; 答え</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>f x<span class="synSpecial">)</span>
  <span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span><span class="synIdentifier">even?</span> <span class="synIdentifier">odd?</span><span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synIdentifier">even?</span> <span class="synIdentifier">even?</span> <span class="synIdentifier">odd?</span> x<span class="synSpecial">))</span>
   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>ev? od? n<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">0</span><span class="synSpecial">)</span> true <span class="synSpecial">(</span>od? od? ev? <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))))</span>
   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>od? ev? n<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">0</span><span class="synSpecial">)</span> false <span class="synSpecial">(</span>ev? ev? od? <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))))))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>f <span class="synConstant">4</span><span class="synSpecial">)</span>
<span class="synConstant">#t</span>
gosh&gt; <span class="synSpecial">(</span>f <span class="synConstant">5</span><span class="synSpecial">)</span>
<span class="synConstant">#f</span>
</pre>


<p>問題文と引数の順序が違っていたので書き直し．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>f x<span class="synSpecial">)</span>
  <span class="synSpecial">((</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span><span class="synIdentifier">even?</span> <span class="synIdentifier">odd?</span><span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synIdentifier">even?</span> <span class="synIdentifier">even?</span> <span class="synIdentifier">odd?</span> x<span class="synSpecial">))</span>
   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>ev? od? n<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">0</span><span class="synSpecial">)</span> true <span class="synSpecial">(</span>od? ev? od? <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))))</span>
   <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>ev? od? n<span class="synSpecial">)</span>
     <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">=</span> n <span class="synConstant">0</span><span class="synSpecial">)</span> false <span class="synSpecial">(</span>ev? ev? od? <span class="synSpecial">(</span><span class="synIdentifier">-</span> n <span class="synConstant">1</span><span class="synSpecial">))))))</span>
</pre>




<pre class="code lang-scheme" data-lang="scheme" data-unlink>gosh&gt; <span class="synSpecial">(</span>f <span class="synConstant">4</span><span class="synSpecial">)</span>
<span class="synConstant">#t</span>
gosh&gt; <span class="synSpecial">(</span>f <span class="synConstant">5</span><span class="synSpecial">)</span>
<span class="synConstant">#f</span>
</pre>


