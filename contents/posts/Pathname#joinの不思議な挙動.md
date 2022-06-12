---
title: "Pathname#joinの不思議な挙動"
published: 2017/01/12
tags:
  - ruby
---

<p>空のPathname同士をjoinした時に期待と違う挙動があった。</p>

<pre class="code" data-lang="" data-unlink> $ ruby -v
ruby 2.3.3p222 (2016-11-21 revision 56859) [x86_64-darwin16]</pre>


<p>期待していたのは次の動作。</p>

<pre class="code lang-ruby" data-lang="ruby" data-unlink>path = <span class="synType">Pathname</span>.new(<span class="synSpecial">''</span>)         <span class="synComment"># =&gt; #&lt;Pathname:&gt;</span>
path.join(path)                 <span class="synComment"># =&gt; #&lt;Pathname:&gt;</span>
</pre>


<p>でも実際はこうなっていた。</p>

<pre class="code lang-ruby" data-lang="ruby" data-unlink>path = <span class="synType">Pathname</span>.new(<span class="synSpecial">''</span>)         <span class="synComment"># =&gt; #&lt;Pathname:&gt;</span>
path.join(path)                 <span class="synComment"># =&gt; #&lt;Pathname:.&gt;</span>
</pre>


<p>空のPathnameと空のPathnameをjoinしてるんだから空のPathnameが欲しかったのに、 <code>.</code> がどこからか出てきてる。<br/>
なぜこうなっているんだろう。</p>

