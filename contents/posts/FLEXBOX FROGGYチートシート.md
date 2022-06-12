---
title: "FLEXBOX FROGGYチートシート"
published: 2016/02/28
tags:
  - css
  - Flexbox
---

<p><a href="http://flexboxfroggy.com/">FLEXBOX FROGGY</a>をクリアしたのでやりながらまとめたものを貼ります．<br/>
Flexboxはここでやった部分しかしりませんが，これだけでも便利ですね．</p>

<h1>コンテナ全体</h1>

<ul>
<li>justify-content 水平方向への寄せなど

<ul>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/flex">flex</a>-start: 左寄せ</li>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/flex">flex</a>-end: 右寄せ</li>
<li>center: 中央寄せ</li>
<li>space-between: 要素間にスペースを入れる</li>
<li>space-around: 要素の前後にスペースを入れる</li>
</ul>
</li>
<li>align-content 垂直方向への寄せなど

<ul>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/flex">flex</a>-start 上寄せ</li>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/flex">flex</a>-end 下寄せ</li>
<li>center 中央寄せ</li>
<li>space-between: 要素間にスペースを入れる</li>
<li>space-around: 要素の前後にスペースを入れる</li>
</ul>
</li>
<li>align-items

<ul>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/flex">flex</a>-start: 上部に表示</li>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/flex">flex</a>-end: 下部に表示</li>
<li>center: 上下の中央に表示</li>
<li>baseline: コンテナのベースラインに表示</li>
<li>stretch: よくわからない</li>
</ul>
</li>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/flex">flex</a>-direction (先頭の方向を変えるのでjustify-content, align-itemsの挙動が変わる)

<ul>
<li>row: 左から右に並べる</li>
<li>row-reverse: 右から左に並べる</li>
<li>column: 上から下に並べる</li>
<li>column-reverse: 下から上に並べる</li>
</ul>
</li>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/flex">flex</a>-wrap

<ul>
<li>nowrap: 一行で表示</li>
<li>wrap: 行端までいくと新たに行を追加して表示する</li>
<li>wrap-reverse: 反対から表示し，行端までいけば新たに行を追加して表示する</li>
</ul>
</li>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/flex">flex</a>-flow

<ul>
<li><a class="keyword" href="http://d.hatena.ne.jp/keyword/flex">flex</a>-directionと<a class="keyword" href="http://d.hatena.ne.jp/keyword/flex">flex</a>-wrapを同時に使える．値はスペスで区切って書く．</li>
</ul>
</li>
</ul>


<h1>個別の要素に対して</h1>

<ul>
<li>order

<ul>
<li>現在位置を 0 として順番をずらす．一つ後ろにずらすなら1,一つ前なら-1.</li>
</ul>
</li>
<li>align-self

<ul>
<li>垂直方向の位置を変える．コマンドはalign-itemsと同じ.</li>
</ul>
</li>
</ul>


