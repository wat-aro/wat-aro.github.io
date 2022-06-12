---
title: "SICP 問題 2.74"
published: 2015/10/30
tags:
  - scheme
  - SICP
---


<pre class="code lang-scheme" data-lang="scheme" data-unlink><span class="synComment">;; a</span>
<span class="synComment">;; 各事業所ごとに従業員ファイルを作っていると考え，person-fileのcar部に</span>
<span class="synComment">;; 従業所を識別するコードを入れるようにする．</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>get-record name  person-file<span class="synSpecial">)</span>
  <span class="synSpecial">((</span>get <span class="synSpecial">'</span>get-record <span class="synSpecial">(</span>division person-file<span class="synSpecial">))</span> name file<span class="synSpecial">))</span>

<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>division file<span class="synSpecial">)</span> <span class="synSpecial">(</span><span class="synIdentifier">car</span> file<span class="synSpecial">))</span>

<span class="synComment">;; b</span>
<span class="synComment">;; ここではrecordが(name salary age)となってると考える．</span>
<span class="synComment">;; この事業所のrecordからsalaryを取り出すにはcadrを取れば良い</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>get-salary name record<span class="synSpecial">)</span>
  <span class="synSpecial">((</span>get <span class="synSpecial">'</span>get-salary <span class="synSpecial">(</span>identifying person-file<span class="synSpecial">))</span> record<span class="synSpecial">))</span>

<span class="synComment">;; c</span>
<span class="synSpecial">(</span><span class="synStatement">define</span> <span class="synSpecial">(</span>find-employee-record name division-list<span class="synSpecial">)</span>
  <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span><span class="synIdentifier">null?</span> division-list<span class="synSpecial">)</span>
      false
      <span class="synSpecial">(</span><span class="synStatement">let</span> <span class="synSpecial">((</span>serch <span class="synSpecial">(</span><span class="synStatement">lambda</span> <span class="synSpecial">(</span>x<span class="synSpecial">)</span> <span class="synSpecial">((</span>get <span class="synSpecial">'</span>get-record <span class="synSpecial">(</span>division x<span class="synSpecial">))</span> name x<span class="synSpecial">))))</span>
        <span class="synSpecial">(</span><span class="synStatement">if</span> <span class="synSpecial">(</span>serch <span class="synSpecial">(</span><span class="synIdentifier">car</span> division-list<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>serch <span class="synSpecial">(</span><span class="synIdentifier">car</span> division-list<span class="synSpecial">))</span>
            <span class="synSpecial">(</span>find-employee-record name <span class="synSpecial">(</span><span class="synIdentifier">cdr</span> division-list<span class="synSpecial">))))))</span>

<span class="synComment">;; d</span>
<span class="synComment">;; その新しく合併した会社の従業員レコードから情報を得るget-recordとget-salaryなどの</span>
<span class="synComment">;; 必要な手続きを作りパッケージを作成し，本社の表にputすればよい．</span>
</pre>


