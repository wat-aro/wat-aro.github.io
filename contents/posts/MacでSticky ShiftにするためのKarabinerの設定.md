---
title: "MacでSticky ShiftにするためのKarabinerの設定"
published: 2016/07/29
tags:
  - mac
  - キーボード
  - emacs
  - skk
  - karabiner
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/SKK">SKK</a>を使いはじめました．<br/>
そうするとシフトキーを多用するのでもっと楽に入力したくなります．<br/>
そこでSticky Shiftです．<br/>
「シフトキーを押したまま他のキーを入力する」のではなく，「一度シフトキーを押して離した直後に押したキーが大文字になってくれます．<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/SKK">SKK</a>を使っていなくてもCamelCaseなどの入力がとても楽になります．<br/>
左手小指はControlキーのためにありますからね．<br/>
全国一千万人の<a class="keyword" href="http://d.hatena.ne.jp/keyword/Emacs">Emacs</a>愛好家にとっては譲れませんよね．</p>

<p>Karabinerに標準でSticky Shiftの設定項目はありませんが，private.<a class="keyword" href="http://d.hatena.ne.jp/keyword/xml">xml</a>を編集することで設定できるようになります．  <br/>
ただ <code>private.xml</code> の記述方法がわかりづらかったので書いておきます．  <br/>
僕はセミコロンをSticky Shiftにして右シフトをセミコロンにしています．  <br/>
そのかわりに右シフトをセミコロンに当てています．</p>

<p>~/Library/Application\ Support/Karabiner/private.<a class="keyword" href="http://d.hatena.ne.jp/keyword/xml">xml</a>を編集します．</p>

<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;root&gt;</span>
  <span class="synIdentifier">&lt;item&gt;</span>
    <span class="synIdentifier">&lt;name&gt;</span>Common<span class="synIdentifier">&lt;/name&gt;</span>
    <span class="synIdentifier">&lt;item&gt;</span>
      <span class="synIdentifier">&lt;name&gt;</span>Sticky Shift<span class="synIdentifier">&lt;/name&gt;</span>
      <span class="synIdentifier">&lt;appendix&gt;</span>Use semicolon to Sticky Shift_L<span class="synIdentifier">&lt;/appendix&gt;</span>
      <span class="synIdentifier">&lt;identifier&gt;</span>private.semicolon_to_sticky_shift_l<span class="synIdentifier">&lt;/identifier&gt;</span>
      <span class="synIdentifier">&lt;autogen&gt;</span>
        --KeyToKey-- KeyCode::SEMICOLON, ModifierFlag::NONE,
        KeyCode::VK_STICKY_SHIFT_L
      <span class="synIdentifier">&lt;/autogen&gt;</span>
    <span class="synIdentifier">&lt;/item&gt;</span>
    <span class="synIdentifier">&lt;item&gt;</span>
      <span class="synIdentifier">&lt;name&gt;</span>Change Shift_R2Semicoron<span class="synIdentifier">&lt;/name&gt;</span>
      <span class="synIdentifier">&lt;appendix&gt;</span>Use Shift_R to Semicolon<span class="synIdentifier">&lt;/appendix&gt;</span>
      <span class="synIdentifier">&lt;identifier&gt;</span>private.dhift_r_to_semicolon<span class="synIdentifier">&lt;/identifier&gt;</span>
      <span class="synIdentifier">&lt;autogen&gt;</span>--KeyToKey-- KeyCode::SHIFT_R, KeyCode::SEMICOLON<span class="synIdentifier">&lt;/autogen&gt;</span>
    <span class="synIdentifier">&lt;/item&gt;</span>
  <span class="synIdentifier">&lt;/item&gt;</span>
<span class="synIdentifier">&lt;/root&gt;</span>
</pre>


<p>これでKarabinerでSticky Shiftをチェックできるようになります．<br/>
<a class="keyword" href="http://d.hatena.ne.jp/keyword/SKK">SKK</a>を使っていなくてもSticky Shiftは便利なので是非設定しましょう．</p>

