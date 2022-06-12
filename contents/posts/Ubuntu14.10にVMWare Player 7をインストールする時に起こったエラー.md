---
title: "Ubuntu14.10にVMWare Player 7をインストールする時に起こったエラー"
published: 2015/02/02
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/Ubuntu">Ubuntu</a> 14.10に<a class="keyword" href="http://d.hatena.ne.jp/keyword/VMware">VMware</a> Player 7をインストールしようとしていたら</p>
<pre class="code" data-lang="" data-unlink>~/Downloads/VMware-Player-7.0.0-2305329.x86_64.bundle </pre><p>を実行した際に</p>

    <blockquote>
        <p>(<a class="keyword" href="http://d.hatena.ne.jp/keyword/vmware">vmware</a>-installer.py:12935): <a class="keyword" href="http://d.hatena.ne.jp/keyword/Gtk">Gtk</a>-WARNING **: module_path にはテーマ・エンジンがありません: "murrine"<br />
<a class="keyword" href="http://d.hatena.ne.jp/keyword/Gtk">Gtk</a>-Message: Failed to load module "canberra-<a class="keyword" href="http://d.hatena.ne.jp/keyword/gtk">gtk</a>-module": libcanberra-<a class="keyword" href="http://d.hatena.ne.jp/keyword/gtk">gtk</a>-module.so: 共有オブジェクトファイルを開けません: そのようなファイルやディレクトリはありません</p>

    </blockquote>
<p>とエラーが出ました。<br />
ググッて検索したところ１つ目のエラーはgtk2-engines-muriineをインストールすれば良いとのことだったのですが</p>
<pre class="code" data-lang="" data-unlink>sudo apt-get install gtk2-engines-murrine</pre><p>としても既に最新版だと言われてしまいます。</p><p><a href="http://ubuntuforums.org/archive/index.php/t-2061142.html">[ubuntu] Gtk-WARNING: Unable to locate theme engine in module_path &quot;murrine&quot; [Archive] - Ubuntu Forums</a><br />
ここを見る限り、32bit版のgtk2-engines-murrineを求められているようです。</p>
<pre class="code" data-lang="" data-unlink>sudo apt-get install --reinstall gtk2-engines-murrine:i386</pre><p>で再インストールしたところ通りました。</p><p>２つ目は解決できませんでした。<br />
どうすればいいんでしょうね。</p>

