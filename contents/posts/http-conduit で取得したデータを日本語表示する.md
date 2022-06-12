---
title: "http-conduit で取得したデータを日本語表示する"
published: 2018/02/27
tags:
  - Haskell
---

<p>簡単な<a class="keyword" href="http://d.hatena.ne.jp/keyword/cli">cli</a>ツールを書こうとしたら http-conduit で取得したデータの日本語表示でハマってしまいました。</p>

<p><code>http-conduit</code> の <code>httpLbs</code> で取得したデータをそのままターミナルに出力します。<br/>
必要なパッケージは <code>http-conduit</code> <code>bytestring</code> <code>utf8-string</code> の３つ。</p>

<pre class="code lang-haskell" data-lang="haskell" data-unlink><span class="synSpecial">{-# LANGUAGE OverloadedStrings #-}</span>

<span class="synPreProc">import</span> <span class="synPreProc">qualified</span> Codec.Binary.UTF8.String <span class="synPreProc">as</span> Codec
<span class="synPreProc">import</span>           Data.ByteString.Char8    (unpack)
<span class="synPreProc">import</span>           Data.ByteString.Lazy     (toStrict)
<span class="synPreProc">import</span> <span class="synPreProc">qualified</span> Network.HTTP.Simple      <span class="synPreProc">as</span> Simple

main <span class="synStatement">::</span> IO ()
main <span class="synStatement">=</span> <span class="synStatement">do</span>
    res <span class="synStatement">&lt;-</span> Simple.httpLbs <span class="synConstant">&quot;https://twitter.com/&quot;</span>

    putStrLn <span class="synStatement">$</span> Codec.decodeString <span class="synStatement">$</span> unpack <span class="synStatement">$</span> toStrict <span class="synStatement">$</span> Simple.getResponseBody res
</pre>


<p><code>httpLbs</code> を使い取得したデータは <code>Reponse</code> 型で包まれているので <code>getResponseBody</code> で <code>ByteString</code> を取得し、 <code>String</code> に変換して出力します。<br/>
なぜか <code>ByteString</code> でなく <code>ByteString.Lazy</code> になっていたので <code>toStrict</code> で変換。<br/>
そして <code>unpack</code> しても日本語が表示されないため、 <code>Codec.Binary.UTF8.String</code> の <code>decodeString</code> で変換してから表示。</p>

<p>文字列難しい</p>

<p>[参考]</p>

<p><a href="https://qiita.com/lotz/items/f8440fa08a62d1c44e1a">Haskell&#x304B;&#x3089;&#x7C21;&#x5358;&#x306B;Web API&#x3092;&#x53E9;&#x304F;&#x65B9;&#x6CD5; - Qiita</a></p>

<p><a href="https://qiita.com/satosystems/items/e07e9907e4da9ab853fc">Haskell &#x6587;&#x5B57;&#x5217;&#x5909;&#x63DB;&#x5165;&#x9580; - Qiita</a></p>

