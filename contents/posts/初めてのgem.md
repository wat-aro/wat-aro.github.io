---
title: "初めてのgem"
published: 2016/03/11
tags:
  - ruby
---

<p><iframe src="//hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fwat-aro%2Fcase_converter" title="wat-aro/case_converter" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://github.com/wat-aro/case_converter">github.com</a></cite></p>

<p>キャメルケース，スネークケース，<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D1%A5%B9%A5%AB%A5%EB">パスカル</a>ケースを相互に変換するgemを書きました．<br/>
書き方わからずに色々やってたら最初にリリースした分は盛大にバグってました．<br/>
とりあえずバグが取れたのでまたgemに．<br/>
一応 <code>gem install case_converter</code> で入れられます．</p>

<p>使い方はこんな感じ</p>

<pre class="code lang-ruby" data-lang="ruby" data-unlink><span class="synSpecial">&quot;</span><span class="synConstant">camel_case</span><span class="synSpecial">&quot;</span>.snake_to_camel                 <span class="synComment"># =&gt; &quot;camelCase&quot;</span>

<span class="synSpecial">&quot;</span><span class="synConstant">string ca_mel_case string</span><span class="synSpecial">&quot;</span>.snake_to_camel  <span class="synComment"># =&gt; &quot;string caMelCase string&quot;</span>

<span class="synSpecial">&quot;</span><span class="synConstant">pascal_case</span><span class="synSpecial">&quot;</span>.snake_to_camel                <span class="synComment"># =&gt; &quot;pascalCase&quot;</span>

<span class="synSpecial">&quot;</span><span class="synConstant">string pas_cal_case string</span><span class="synSpecial">&quot;</span>.snake_to_camel <span class="synComment"># =&gt; &quot;string pasCalCase string&quot;</span>

<span class="synSpecial">&quot;</span><span class="synConstant">snakeCase</span><span class="synSpecial">&quot;</span>.camel_to_snake                  <span class="synComment"># =&gt; &quot;snake_case&quot;</span>

<span class="synSpecial">&quot;</span><span class="synConstant">foo snakeCase bar</span><span class="synSpecial">&quot;</span>.camel_to_snake          <span class="synComment"># =&gt; &quot;foo snake_case bar&quot;</span>

<span class="synSpecial">&quot;</span><span class="synConstant">pascalCase</span><span class="synSpecial">&quot;</span>.camel_to_pascal                <span class="synComment"># =&gt; &quot;PascalCase&quot;</span>

<span class="synSpecial">&quot;</span><span class="synConstant">foo pasCalCase bar</span><span class="synSpecial">&quot;</span>.camel_to_snake         <span class="synComment"># =&gt; &quot;foo pas_cal_case bar&quot;</span>

<span class="synSpecial">&quot;</span><span class="synConstant">SnakeCase</span><span class="synSpecial">&quot;</span>.pascal_to_snake                 <span class="synComment"># =&gt; &quot;snake_case&quot;</span>

<span class="synSpecial">&quot;</span><span class="synConstant">foo SnaKeCase bar</span><span class="synSpecial">&quot;</span>.pascal_to_snake         <span class="synComment"># =&gt; &quot;foo sna_ke_case bar&quot;</span>

<span class="synSpecial">&quot;</span><span class="synConstant">CamelCase</span><span class="synSpecial">&quot;</span>.pascal_to_camel                 <span class="synComment"># =&gt; &quot;camelCase&quot;</span>

<span class="synSpecial">&quot;</span><span class="synConstant">foo CaMelCase bar</span><span class="synSpecial">&quot;</span>.pascal_to_camel         <span class="synComment"># =&gt; &quot;foo caMelCase bar&quot;</span>
</pre>


<p>初心者でもこれなら簡単に書ける！</p>

