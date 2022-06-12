---
title: "SICP 問題 4.73"
published: 2016/01/21
tags:
  - scheme
  - SICP
---

<p>flatten-streamが明示的にdelayを使うのはなぜか．<br/>
　<br/>
flatten-streamはストリームのストリームを引数にとる．<br/>
4.71と同じく引数のストリームの中に無限ストリームがあると評価が終わらずになにも印字されないため．</p>

