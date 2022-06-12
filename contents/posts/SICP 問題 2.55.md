---
title: "SICP 問題 2.55"
published: 2015/10/25
tags:
  - scheme
  - SICP
---

<p><code>''abracadabra</code>は<code>'abracadabra</code>を返す．<br/>
<code>(car ''abracadabra)</code>は<code>quote</code>を返す．<br/>
<code>(cdr ''abracadabra)</code>は<code>(abracadabra)</code>を返す．<br/>
つまり<code>'abracadabra</code>は<code>(quote abracadabra)</code>のことで，<br/>
<code>''abracadabra</code>は<code>'(quote abracadabra)</code>のことである．<br/>
そのため<code>(car ''abracadabra)</code>は<code>quote</code>を返す．</p>

