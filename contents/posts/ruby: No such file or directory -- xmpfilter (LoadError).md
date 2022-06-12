---
title: "ruby: No such file or directory -- xmpfilter (LoadError)"
published: 2015/06/27
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/Emacs">Emacs</a>で<a class="keyword" href="http://d.hatena.ne.jp/keyword/xmpfilter">xmpfilter</a>を使おうとするとこのエラーが出て困っていました。</p>

<p>原因はshellと<a class="keyword" href="http://d.hatena.ne.jp/keyword/emacs">emacs</a>でパスが違うことだったようです。</p>

<p>まず.bashrcの末尾に以下を追加します。</p>

<pre class="code lang-perl" data-lang="perl" data-unlink><span class="synComment">## create emacs env file</span>
perl -wle \
    <span class="synConstant">'do { print qq/(setenv &quot;$_&quot; &quot;$ENV{$_}&quot;)/ if exists $ENV{$_} } for @ARGV'</span> \
    PATH &gt; ~<span class="synStatement">/</span><span class="synSpecial">.</span><span class="synConstant">emacs</span><span class="synSpecial">.</span><span class="synConstant">d</span><span class="synStatement">/s</span>hellenv.el
</pre>


<p>そしてinit.elに以下を記述すれば完成です。</p>

<pre class="code lang-lisp" data-lang="lisp" data-unlink><span class="synComment">;; load environment value</span>
<span class="synSpecial">(</span>load-file <span class="synSpecial">(</span>expand-file-name <span class="synConstant">&quot;~/.emacs.d/shellenv.el&quot;</span><span class="synSpecial">))</span>
<span class="synSpecial">(</span><span class="synStatement">dolist</span> <span class="synSpecial">(</span>path <span class="synSpecial">(</span><span class="synStatement">reverse</span> <span class="synSpecial">(</span>split-string <span class="synSpecial">(</span>getenv <span class="synConstant">&quot;PATH&quot;</span><span class="synSpecial">)</span> <span class="synConstant">&quot;:&quot;</span><span class="synSpecial">)))</span>
  <span class="synSpecial">(</span>add-to-list <span class="synSpecial">'</span><span class="synIdentifier">exec-path</span> path<span class="synSpecial">))</span>
</pre>


<p>うまく動いてくれてるようです。</p>

<pre class="code lang-ruby" data-lang="ruby" data-unlink>a = <span class="synConstant">1</span> + <span class="synConstant">1</span>                       <span class="synComment"># =&gt; 2</span>
p a + <span class="synConstant">1</span>
<span class="synComment"># &gt;&gt; 3</span>
</pre>


<p>[追記]
ついでにauto-complete.elをenf-<a class="keyword" href="http://d.hatena.ne.jp/keyword/ruby">ruby</a>-modeで使う時の設定も</p>

<pre class="code lang-lisp" data-lang="lisp" data-unlink><span class="synComment">;; auto-complete</span>
<span class="synSpecial">(</span><span class="synStatement">require</span> <span class="synSpecial">'</span><span class="synIdentifier">auto-complete</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">require</span> <span class="synSpecial">'</span><span class="synIdentifier">auto-complete-config</span><span class="synSpecial">)</span>    <span class="synComment">; 必須ではないですが一応</span>
<span class="synSpecial">(</span>global-auto-complete-mode <span class="synStatement">t</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span>define-key ac-completing-map <span class="synSpecial">(</span>kbd <span class="synConstant">&quot;C-n&quot;</span><span class="synSpecial">)</span> <span class="synSpecial">'</span><span class="synIdentifier">ac-next</span><span class="synSpecial">)</span>      <span class="synComment">; M-nで次候補選択</span>
<span class="synSpecial">(</span>define-key ac-completing-map <span class="synSpecial">(</span>kbd <span class="synConstant">&quot;C-p&quot;</span><span class="synSpecial">)</span> <span class="synSpecial">'</span><span class="synIdentifier">ac-previous</span><span class="synSpecial">)</span>  <span class="synComment">; C-p で前候補選択</span>
<span class="synSpecial">(</span>ac-config-default<span class="synSpecial">)</span>
<span class="synSpecial">(</span>add-to-list <span class="synSpecial">'</span><span class="synIdentifier">ac-modes</span> <span class="synSpecial">'</span><span class="synIdentifier">enh-ruby-mode</span><span class="synSpecial">)</span>
</pre>




