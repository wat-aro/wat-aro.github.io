---
title: "MySQL5.7.11でユーザを追加できない．"
published: 2016/03/08
tags:
  - MySQL
---

<p>環境はdebian8, mysql5.7.11.</p>

<pre class="code lang-mysql" data-lang="mysql" data-unlink>mysql&gt; <span class="synStatement">grant</span> <span class="synStatement">all</span> <span class="synStatement">on</span> blog_app.* <span class="synStatement">to</span> <span class="synConstant">'foo'</span><span class="synIdentifier">@localhost</span> <span class="synStatement">identified</span> <span class="synStatement">by</span> <span class="synConstant">'hogehoge'</span>;
ERROR <span class="synConstant">1054</span> (42S22): Unknown <span class="synStatement">column</span> <span class="synConstant">'password_last_changed'</span> <span class="synStatement">in</span> <span class="synConstant">'mysql.user'</span>
</pre>


<p>以上のようなエラーが出ました．<br/>
対処方法は以下になります．</p>

<pre class="code" data-lang="" data-unlink>$ sudo mysql_upgrade -u root -p

$ sudo systemctl restart mysql</pre>


<p><a href="http://stackoverflow.com/questions/29455181/mysql-unknown-column-password-last-changed">MySQL unknown column &#39;password_last_changed&#39; - Stack Overflow</a></p>

