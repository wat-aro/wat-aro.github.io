---
title: "SICP 問題 4.72"
published: 2016/01/21
tags:
  - scheme
  - SICP
---

<p>stream-appendだと最初のストリームが無限ストリームだった場合に次のストリームが評価されなくなる．
なのでinterleaveにして交互に先頭の要素を評価することで，どちらかもしくは両方が無限ストリームの時に対応できるようにする．</p>

