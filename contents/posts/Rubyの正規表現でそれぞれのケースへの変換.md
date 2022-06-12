---
title: "Rubyの正規表現でそれぞれのケースへの変換"
published: 2016/03/05
tags:
  - ruby
  - 正規表現
---

<p>今日は<a class="keyword" href="http://d.hatena.ne.jp/keyword/%C0%B5%B5%AC%C9%BD%B8%BD">正規表現</a>に苦しんだので練習しました。<br/>
snake_case、camel_Case、<a class="keyword" href="http://d.hatena.ne.jp/keyword/Pascal">Pascal</a>_Caseのそれぞれへの変換です。<br/>
capitalizeなくても書けるけど一応。<br/>
<code>m[0].upcase + m[1..-1]</code>はちょっと汚いですしね。  <br/>
<a href="http://rubular.com/">Rubular</a>使えばテストケースが期待通りのマッチになるまで簡単に
トライ＆エラーが出来ていいです。</p>

<pre class="code lang-ruby" data-lang="ruby" data-unlink><span class="synPreProc">class</span> <span class="synType">String</span>
  <span class="synPreProc">def</span> <span class="synIdentifier">snake_to_camel</span>
    <span class="synConstant">self</span>.gsub(<span class="synSpecial">/\b[</span><span class="synConstant">a-z</span><span class="synSpecial">][</span><span class="synConstant">a-z</span><span class="synSpecial">\d]*[</span><span class="synConstant">a-z_</span><span class="synSpecial">\d]*\b/</span>) <span class="synStatement">do</span> |<span class="synIdentifier">match</span>|
      match.gsub(<span class="synSpecial">/</span><span class="synConstant">_</span><span class="synSpecial">[</span><span class="synConstant">a-z</span><span class="synSpecial">\d]/</span>) { |<span class="synIdentifier">m</span>| m[<span class="synConstant">1</span>..<span class="synConstant">-1</span>].capitalize}
    <span class="synStatement">end</span>
  <span class="synPreProc">end</span>

  <span class="synPreProc">def</span> <span class="synIdentifier">snake_to_pascal</span>
    <span class="synConstant">self</span>.gsub(<span class="synSpecial">/\b[</span><span class="synConstant">a-z</span><span class="synSpecial">][</span><span class="synConstant">a-z</span><span class="synSpecial">\d]*[</span><span class="synConstant">a-z_</span><span class="synSpecial">\d]*\b/</span>) <span class="synStatement">do</span> |<span class="synIdentifier">match</span>|
      match.gsub(<span class="synSpecial">/[</span><span class="synConstant">a-z</span><span class="synSpecial">][</span><span class="synConstant">a-z</span><span class="synSpecial">\d]*/</span>) { |<span class="synIdentifier">m</span>| m.capitalize }
    <span class="synStatement">end</span>
  <span class="synPreProc">end</span>

  <span class="synPreProc">def</span> <span class="synIdentifier">camel_to_snake</span>
    <span class="synConstant">self</span>.gsub(<span class="synSpecial">/\b[</span><span class="synConstant">a-z</span><span class="synSpecial">]+[</span><span class="synConstant">A-Z</span><span class="synSpecial">][</span><span class="synConstant">a-z</span><span class="synSpecial">\d]+\b/</span>) <span class="synStatement">do</span> |<span class="synIdentifier">match</span>|
      match.gsub(<span class="synSpecial">/[</span><span class="synConstant">A-Z</span><span class="synSpecial">][</span><span class="synConstant">a-z</span><span class="synSpecial">\d]+/</span>) { |<span class="synIdentifier">m</span>| <span class="synSpecial">&quot;</span><span class="synConstant">_</span><span class="synSpecial">&quot;</span> + m.downcase }
    <span class="synStatement">end</span>
  <span class="synPreProc">end</span>

  <span class="synPreProc">def</span> <span class="synIdentifier">camel_to_pascal</span>
    <span class="synConstant">self</span>.gsub(<span class="synSpecial">/\b[</span><span class="synConstant">a-z</span><span class="synSpecial">]+[</span><span class="synConstant">A-Z</span><span class="synSpecial">][</span><span class="synConstant">a-z</span><span class="synSpecial">\d]+\b/</span>) <span class="synStatement">do</span> |<span class="synIdentifier">match</span>|
      match.capitalize
    <span class="synStatement">end</span>
  <span class="synPreProc">end</span>

  <span class="synPreProc">def</span> <span class="synIdentifier">pascal_to_snake</span>
    <span class="synConstant">self</span>.gsub(<span class="synSpecial">/\b[</span><span class="synConstant">A-Z</span><span class="synSpecial">][</span><span class="synConstant">a-z</span><span class="synSpecial">\d]*([</span><span class="synConstant">A-Z</span><span class="synSpecial">][</span><span class="synConstant">a-z</span><span class="synSpecial">\d]+)*\b/</span>) <span class="synStatement">do</span> |<span class="synIdentifier">match</span>|
      match.gsub(<span class="synSpecial">/[</span><span class="synConstant">A-Z</span><span class="synSpecial">][</span><span class="synConstant">a-z</span><span class="synSpecial">\d]*/</span>) { |<span class="synIdentifier">m</span>| <span class="synSpecial">&quot;</span><span class="synConstant">_</span><span class="synSpecial">&quot;</span> + m }.downcase[<span class="synConstant">1</span>..<span class="synConstant">-1</span>]
    <span class="synStatement">end</span>
  <span class="synPreProc">end</span>

  <span class="synPreProc">def</span> <span class="synIdentifier">pascal_to_camel</span>
    <span class="synConstant">self</span>.gsub(<span class="synSpecial">/\b[</span><span class="synConstant">A-Z</span><span class="synSpecial">][</span><span class="synConstant">a-z</span><span class="synSpecial">\d]+([</span><span class="synConstant">A-Z</span><span class="synSpecial">][</span><span class="synConstant">a-z</span><span class="synSpecial">\d]+)*\b/</span>) <span class="synStatement">do</span> |<span class="synIdentifier">match</span>|
      match.gsub(<span class="synSpecial">/\b[</span><span class="synConstant">A-Z</span><span class="synSpecial">][</span><span class="synConstant">a-z</span><span class="synSpecial">\d]*/</span>) { |<span class="synIdentifier">m</span>| m.downcase }
    <span class="synStatement">end</span>
  <span class="synPreProc">end</span>
<span class="synPreProc">end</span>
</pre>


