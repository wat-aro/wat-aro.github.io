---
title: "emacs で fcitx-mozc を使う"
published: 2020/02/23
tags:
  - Arch
  - mozc
  - emacs
  - fcitx
---

<p>今はこの記事のやり方のほうがよい</p>

<p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fain0204.hatenablog.com%2Fentry%2F2016%2F08%2F12%2F235206" title="Arch Linuxにemacs-mozcをインストールした話 - twitterよりちょっと長いの" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://ain0204.hatenablog.com/entry/2016/08/12/235206">ain0204.hatenablog.com</a></cite></p>

<hr />

<p>以下は今だとうまく動かない</p>

<pre class="code shell" data-lang="shell" data-unlink>$ yay -G fcitx-mozc</pre>


<p><code>PKGBUILD</code> を編集する。</p>

<pre class="code lang-diff" data-lang="diff" data-unlink><span class="synSpecial">-  _targets=&quot;server/server.gyp:mozc_server gui/gui.gyp:mozc_tool unix/fcitx/fcitx.gyp:fcitx-mozc&quot;</span>
<span class="synIdentifier">+  _targets=&quot;server/server.gyp:mozc_server gui/gui.gyp:mozc_tool unix/fcitx/fcitx.gyp:fcitx-mozc unix/emacs/emacs.gyp:mozc_emacs_helper&quot;</span>

   install -D -m 755 out_linux/${_bldtype}/mozc_server &quot;${pkgdir}/usr/lib/mozc/mozc_server&quot;
   install    -m 755 out_linux/${_bldtype}/mozc_tool   &quot;${pkgdir}/usr/lib/mozc/mozc_tool&quot;

<span class="synIdentifier">+  install -D -m 755 out_linux/${_bldtype}/mozc_emacs_helper &quot;${pkgdir}/usr/bin/mozc_emacs_helper&quot;</span>
<span class="synIdentifier">+</span>
   install -d &quot;${pkgdir}/usr/share/licenses/$pkgname/&quot;
   install -m 644 LICENSE data/installer/*.html &quot;${pkgdir}/usr/share/licenses/${pkgname}/&quot;
</pre>


<p>手動でインストール</p>

<pre class="code shell" data-lang="shell" data-unlink>$ cd fcitx-mozc
$ makepkg -si

# 不明な公開鍵についてのエラーがでる
$ sudo pacman-key --recv-keys &lt;keyid&gt;
$ gpg --recv-keys &lt;keyid&gt;

$ makepkg -si</pre>


<p>これで <code>/usr/bin/mozc_emacs_helper</code> が入る。
あとは<a class="keyword" href="http://d.hatena.ne.jp/keyword/emacs">emacs</a>の設定をする。</p>

<pre class="code elisp" data-lang="elisp" data-unlink>(use-package mozc
  :init
  (setq default-input-method &#34;japanese-mozc&#34;)
  :custom
  (mozc-candidate-style &#39;overlay))</pre>


