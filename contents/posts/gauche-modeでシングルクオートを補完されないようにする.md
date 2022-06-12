---
title: "gauche-modeでシングルクオートを補完されないようにする"
published: 2015/12/17
tags:
  - emacs
  - elisp
  - Gauche
---

<p>smartparens-modeをアップデートしたら<a class="keyword" href="http://d.hatena.ne.jp/keyword/gauche">gauche</a>-modeでシングルクオート<code>'</code>が補完されて<code>''</code>になってしまいました．<br/>
以前はsmartparens.elの該当箇所，</p>

<pre class="code lang-lisp" data-lang="lisp" data-unlink><span class="synSpecial">(</span>defcustom sp-lisp-modes <span class="synSpecial">'(</span>cider-repl-mode
                           clojure-mode
                           clojurec-mode
                           clojurescript-mode
                           clojurex-mode
                           common-lisp-mode
                           emacs-lisp-mode
                           eshell-mode
                           geiser-repl-mode
                           inf-clojure-mode
                           inferior-emacs-lisp-mode
                           inferior-lisp-mode
                           inferior-scheme-mode
                           lisp-interaction-mode
                           lisp-mode
                           monroe-mode
                           scheme-interaction-mode
                           scheme-mode
                           slime-repl-mode
                           racket-mode
                           racket-repl-mode<span class="synSpecial">)</span>
  <span class="synConstant">&quot;List of Lisp modes.&quot;</span>
  <span class="synType">:type</span> <span class="synSpecial">'(</span>repeat <span class="synStatement">symbol</span><span class="synSpecial">)</span>
  :group <span class="synSpecial">'</span><span class="synIdentifier">smartparens</span><span class="synSpecial">)</span>
</pre>


<p>これに</p>

<pre class="code lang-lisp" data-lang="lisp" data-unlink><span class="synSpecial">(</span>defcustom sp-lisp-modes <span class="synSpecial">'(</span>cider-repl-mode
                           clojure-mode
                           clojurec-mode
                           clojurescript-mode
                           clojurex-mode
                           common-lisp-mode
                           emacs-lisp-mode
                           eshell-mode
                           geiser-repl-mode
                           inf-clojure-mode
                           inferior-emacs-lisp-mode
                           inferior-lisp-mode
                           inferior-scheme-mode
                           lisp-interaction-mode
                           lisp-mode
                           monroe-mode
                           scheme-interaction-mode
                           scheme-mode
                           slime-repl-mode
                           racket-mode
                           racket-repl-mode
                           gauche-mode<span class="synSpecial">)</span>
  <span class="synConstant">&quot;List of Lisp modes.&quot;</span>
  <span class="synType">:type</span> <span class="synSpecial">'(</span>repeat <span class="synStatement">symbol</span><span class="synSpecial">)</span>
  :group <span class="synSpecial">'</span><span class="synIdentifier">smartparens</span><span class="synSpecial">)</span>
</pre>


<p>と<a class="keyword" href="http://d.hatena.ne.jp/keyword/gauche">gauche</a>-modeを付け足していたのですが，今回のようにsmartprensを新しいものにした時に消えてしまうのでinit.elに書くことにしました．</p>

<pre class="code lang-lisp" data-lang="lisp" data-unlink><span class="synSpecial">(</span><span class="synStatement">require</span> <span class="synSpecial">'</span><span class="synIdentifier">smartparens</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span>add-to-list <span class="synSpecial">'</span><span class="synIdentifier">sp-lisp-modes</span> <span class="synSpecial">'</span><span class="synIdentifier">gauche-mode</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span><span class="synStatement">require</span> <span class="synSpecial">'</span><span class="synIdentifier">smartparens-config</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span>smartparens-global-mode <span class="synStatement">t</span><span class="synSpecial">)</span>
</pre>


<p>通常smartparensを使う時には</p>

<pre class="code lang-lisp" data-lang="lisp" data-unlink><span class="synSpecial">(</span><span class="synStatement">require</span> <span class="synSpecial">'</span><span class="synIdentifier">smartparens-config</span><span class="synSpecial">)</span>
<span class="synSpecial">(</span>smartparens-global-mode <span class="synStatement">t</span><span class="synSpecial">)</span>
</pre>


<p>でいいのですが，sp-<a class="keyword" href="http://d.hatena.ne.jp/keyword/lisp">lisp</a>-modesにアクセスするために始めにsmartparensをrequireしています．</p>

