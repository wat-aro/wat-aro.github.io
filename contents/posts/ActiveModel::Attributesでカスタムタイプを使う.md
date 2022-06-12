---
title: "ActiveModel::Attributesでカスタムタイプを使う"
published: 2018/08/07
---

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/Rails">Rails</a> 5.2.0 で入ったActiveModel::Attributes <a class="keyword" href="http://d.hatena.ne.jp/keyword/API">API</a> 最高ですよね。</p>

<p>でもカスタムタイプのドキュメントが見つからないんですよね。 <a href="https://api.rubyonrails.org/classes/ActiveRecord/Attributes/ClassMethods.html#method-i-attribute">ActiveRecord::Attributes API のカスタムタイプ</a> ならあるのですが。</p>

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%BD%A1%BC%A5%B9%A5%B3%A1%BC%A5%C9">ソースコード</a>見たところ簡単に作れるのがわかったので紹介します。</p>

<p>まず型の登録部分ですが、<a href="https://github.com/rails/rails/blob/5-2-0/activemodel/lib/active_model/type.rb#L20-L53">lib/active_model/type.rb</a> で定義されています。</p>

<p>また、<a href="https://github.com/rails/rails/blob/5-2-0/activemodel/lib/active_model/type/boolean.rb">ActiveModelで使われているデフォルトタイプの実装</a>を見ると <code>cast_value</code> メソッドがあればよさそうです。</p>

<p><a href="https://api.rubyonrails.org/classes/ActiveRecord/Attributes/ClassMethods.html#method-i-attribute">ActiveRecord::Attributes API</a> と同様に実装します。</p>

<pre class="code lang-ruby" data-lang="ruby" data-unlink><span class="synPreProc">class</span> <span class="synType">MoneyType</span> &lt; <span class="synType">ActiveModel</span>::<span class="synType">Type</span>::<span class="synType">Integer</span>
  <span class="synPreProc">def</span> <span class="synIdentifier">cast_value</span>(value)
    <span class="synStatement">if</span> !value.kind_of?(<span class="synType">Numeric</span>) &amp;&amp; value.include?(<span class="synSpecial">'</span><span class="synConstant">$</span><span class="synSpecial">'</span>)
      price_in_dollars = value.gsub(<span class="synSpecial">/\$/</span>, <span class="synSpecial">''</span>).to_f
      <span class="synStatement">super</span>(price_in_dollars * <span class="synConstant">100</span>)
    <span class="synStatement">else</span>
      <span class="synStatement">super</span>
    <span class="synStatement">end</span>
  <span class="synPreProc">end</span>
<span class="synPreProc">end</span>

<span class="synComment"># config/initializers/types.rb</span>
<span class="synType">ActiveModel</span>::<span class="synType">Type</span>.register(<span class="synConstant">:money</span>, <span class="synType">MoneyType</span>)

<span class="synComment"># app/models/store_listing.rb</span>
<span class="synPreProc">class</span> <span class="synType">StoreListing</span>
  <span class="synPreProc">include</span> <span class="synType">ActiveModel</span>::<span class="synType">Model</span>
  <span class="synPreProc">include</span> <span class="synType">ActiveModel</span>::<span class="synType">Attributes</span>

  attribute <span class="synConstant">:price_in_cents</span>, <span class="synConstant">:money</span>
<span class="synPreProc">end</span>

store_listing = <span class="synType">StoreListing</span>.new(<span class="synConstant">price_in_cents</span>: <span class="synSpecial">'</span><span class="synConstant">$10.00</span><span class="synSpecial">'</span>)
store_listing.price_in_cents <span class="synComment"># =&gt; 1000</span>
</pre>


<p>このように ActiveModel::Attributes でカスタムタイプを使うことができます。</p>

