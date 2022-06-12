---
title: "Rollbarでbotが出すエラーを無視する"
published: 2016/10/19
tags:
  - Rollbar
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/bot">bot</a>から既に削除されたURLへのアクセスがあり，Rollbarのエラーログのノイズがひどかったので，<a class="keyword" href="http://d.hatena.ne.jp/keyword/bot">bot</a>からのアクセスで起こった<a class="keyword" href="http://d.hatena.ne.jp/keyword/ActiveRecord">ActiveRecord</a>::RecordNotFoundを無視する設定を書きました．</p>

<p>上部のバーからSettingsをクリックします．
<a href="https://gyazo.com/0de19f13528995a168e36aeb10adc72b"><img src="https://i.gyazo.com/0de19f13528995a168e36aeb10adc72b.png" alt="https://gyazo.com/0de19f13528995a168e36aeb10adc72b" /></a></p>

<p>次に画面左からGroupingをクリック．
<a href="https://gyazo.com/991020fcbc82e6e917285dcafbbf5a14"><img src="https://i.gyazo.com/991020fcbc82e6e917285dcafbbf5a14.png" alt="https://gyazo.com/991020fcbc82e6e917285dcafbbf5a14" /></a></p>

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/json">json</a>でCustom Groupを定義します．
<a href="https://gyazo.com/3f613693a8210aed7ea79e12f3674b08"><img src="https://i.gyazo.com/3f613693a8210aed7ea79e12f3674b08.png" alt="https://gyazo.com/3f613693a8210aed7ea79e12f3674b08" /></a></p>

<p>ボットからのアクセスで起こった<a class="keyword" href="http://d.hatena.ne.jp/keyword/ActiveRecord">ActiveRecord</a>::RecordNotFoundをグルーピングするには次のような<a class="keyword" href="http://d.hatena.ne.jp/keyword/json">json</a>で定義できます．</p>

<pre class="code lang-json" data-lang="json" data-unlink><span class="synSpecial">[</span>
  <span class="synSpecial">{</span>
    &quot;<span class="synStatement">title</span>&quot;: &quot;<span class="synConstant">Bot error</span>&quot;,
    &quot;<span class="synStatement">fingerprint</span>&quot;: &quot;<span class="synConstant">bot-error</span>&quot;,
    &quot;<span class="synStatement">condition</span>&quot;: <span class="synSpecial">{</span>
      &quot;<span class="synStatement">all</span>&quot;: <span class="synSpecial">[</span>
        <span class="synSpecial">{</span> &quot;<span class="synStatement">path</span>&quot;: &quot;<span class="synConstant">request.headers.User-Agent</span>&quot;,
          &quot;<span class="synStatement">in</span>&quot;: <span class="synSpecial">[</span>
            &quot;<span class="synConstant">Mozilla/5.0 (compatible; AhrefsBot/5.1; +http://ahrefs.com/robot/)</span>&quot;,
            &quot;<span class="synConstant">Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)</span>&quot;,
            &quot;<span class="synConstant">Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)</span>&quot;,
            &quot;<span class="synConstant">Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)</span>&quot;,
            &quot;<span class="synConstant">Mozilla/5.0 (compatible; Exabot/3.0; +http://www.exabot.com/go/robot)</span>&quot;
          <span class="synSpecial">]</span>
        <span class="synSpecial">}</span>,
        <span class="synSpecial">{</span> &quot;<span class="synStatement">path</span>&quot;: &quot;<span class="synConstant">body.trace.exception.class</span>&quot;,
          &quot;<span class="synStatement">eq</span>&quot;: &quot;<span class="synConstant">ActiveRecord::RecordNotFound</span>&quot; <span class="synSpecial">}</span>
      <span class="synSpecial">]</span>
    <span class="synSpecial">}</span>
  <span class="synSpecial">}</span>
<span class="synSpecial">]</span>
</pre>


<p>このpathはOccurrenceのRawJSONで出力されているログのパス。
リファレンスはこちら。
in以外にもeqやcontainなどがあります．</p>

<p><a href="https://rollbar.com/docs/custom-grouping/">https://rollbar.com/docs/custom-grouping/</a></p>

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/JSON">JSON</a>が書けたら入力欄左下にあるボックスにoccurrence IDを入力してマッチさせたいエラーにマッチするか確認できます．
<a href="https://gyazo.com/fa47f8f31caf1ed6cd28c083010b112f"><img src="https://i.gyazo.com/fa47f8f31caf1ed6cd28c083010b112f.png" alt="https://gyazo.com/fa47f8f31caf1ed6cd28c083010b112f" /></a></p>

<p> 次にエラーが起こると<a class="keyword" href="http://d.hatena.ne.jp/keyword/Bot">Bot</a> errorとしてグルーピングされるのでそれをmuteすると<a class="keyword" href="http://d.hatena.ne.jp/keyword/Dashboard">Dashboard</a>に表示されなくなります．
逆に特定のエラーグループのlevelをwarningからcriticalに上げることもできたりもします．</p>

