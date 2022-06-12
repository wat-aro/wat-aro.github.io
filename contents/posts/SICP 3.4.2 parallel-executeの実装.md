---
title: "SICP 3.4.2 parallel-executeの実装"
published: 2015/12/03
tags:
  - Gauche
  - scheme
  - SICP
---

<p>これ以降やるための準備です．<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/gauche">gauche</a>.threadsの使い方がわからなかったのでリファレンス見ながらググって見つけたコードを理解しました．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span>use gauche.threads<span class="synSpecial">)</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span><span class="synStatement">delay</span> time proc<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
    <span class="synSpecial">(</span>thread-sleep! time<span class="synSpecial">)</span>
    <span class="synSpecial">(</span>proc<span class="synSpecial">)))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>delay-print time name<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">delay</span> time <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">()</span>
                <span class="synSpecial">(</span>print name<span class="synSpecial">)</span>
                name<span class="synSpecial">)))</span>
</pre>




<pre class="code" data-lang="" data-unlink>(let ((t1 (make-thread (delay-print 4 &#34;First thread&#34;)))
            (t2 (make-thread (delay-print 2  &#34;Secound thread&#34;))))
        (thread-start! t1)
        (thread-start! t2)
        (print &#34;Main thread&#34;)
        (thread-join! t1)
        (thread-join! t2))
Main thread
Secound thread
First thread
&#34;Secound thread&#34;</pre>


<p><code>procs</code>にある手続きに対して全て<code>make-thread</code>して<code>threads</code>に保存．<br/>
<code>threads</code>に保存したスレッドを全てスタートし，ジョインで値を取る．<br/>
スレッドをスタートしているので値を得る前に次のスレッドをスタートできるので並列に実行していることになる．</p>

<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>parallel-execute <span class="synSpecial">.</span> procs<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>i <span class="synConstant">0</span><span class="synSpecial">))</span>
    <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>threads <span class="synSpecial">(</span><span class="synIdentifier">map</span> <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>proc<span class="synSpecial">)</span>
                          <span class="synSpecial">(</span><span class="synStatement">set!</span> i <span class="synSpecial">(</span><span class="synIdentifier">+</span> i <span class="synConstant">1</span><span class="synSpecial">))</span>
                          <span class="synSpecial">(</span>make-thread proc i<span class="synSpecial">))</span> procs<span class="synSpecial">)))</span>
      <span class="synSpecial">(</span><span class="synIdentifier">map</span> thread-start! threads<span class="synSpecial">)</span>
      <span class="synSpecial">(</span><span class="synIdentifier">map</span> thread-join! threads<span class="synSpecial">))))</span>
</pre>




<pre class="code" data-lang="" data-unlink>gosh&gt; (parallel-execute
       (delay-print 4 &#34;A&#34;)
       (delay-print 2 &#34;B&#34;)
       (delay-print 1 &#34;C&#34;))
C
B
A
(&#34;A&#34; &#34;B&#34; &#34;C&#34;)</pre>


<p>　<br/>
　<br/>
　<br/>
参考</p>

<p><iframe src="//hatenablog-parts.com/embed?url=http%3A%2F%2Fsicp.g.hatena.ne.jp%2Ftkmr2000%2F20090212%2F1234456834" title=" 3.4.2 並列性の制御機構 - SICP読書メモ" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://sicp.g.hatena.ne.jp/tkmr2000/20090212/1234456834">sicp.g.hatena.ne.jp</a></cite></p>

