---
title: "Githubにpushした時に他の人がpushしたと通知される"
published: 2016/09/26
tags:
  - github
---

<p>転職して配属されたプロジェクトの<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EA%A5%DD%A5%B8%A5%C8%A5%EA">リポジトリ</a>ーで，僕がpushしてるのに他の人がpushしてると通知される不具合がありました．
<a class="keyword" href="http://d.hatena.ne.jp/keyword/Github">Github</a>の設定や.gitconfigを見てもおかしいところはなく，どうしようかと思っていたらStackOverFlowにちょうど同じ症状の質問がありました．</p>

<p><iframe src="//hatenablog-parts.com/embed?url=http%3A%2F%2Fstackoverflow.com%2Fquestions%2F21615431%2Fgit-pushes-with-wrong-user-from-terminal" title="git pushes with wrong user from terminal" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://stackoverflow.com/questions/21615431/git-pushes-with-wrong-user-from-terminal">stackoverflow.com</a></cite></p>

<ol>
<li><code>Command + Space</code> で spotlight を開く</li>
<li><code>keychain</code> と入力しEnterを押して Keychain <a class="keyword" href="http://d.hatena.ne.jp/keyword/Access">Access</a>.appを起動</li>
<li>左のカラムから<code>ログイン</code>と<code>パスワード</code>の2つの項目を選択</li>
<li><code>github.com</code>を削除する</li>
<li>remoteが<a class="keyword" href="http://d.hatena.ne.jp/keyword/ssh">ssh</a>から<a class="keyword" href="http://d.hatena.ne.jp/keyword/https">https</a>に変更されているので <code>git remote set-url ...</code> で登録しなおす．</li>
</ol>


<p>これで解決できました．</p>

