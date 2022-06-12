---
title: "Nginxでsites-enabledが読み込まれない"
published: 2016/03/10
---

<p>nginx version: nginx/1.8.1</p>

<p><iframe src="//hatenablog-parts.com/embed?url=http%3A%2F%2Fwww26.atwiki.jp%2Fnginx%2Fpages%2F13.html" title="nginx @ ウィキ - nginx　バーチャルホスト" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://www26.atwiki.jp/nginx/pages/13.html">www26.atwiki.jp</a></cite></p>

<p>ここを見ながらnginxでVirtual Host を構築しようとしていました．<br/>
ただここのやり方では <code>/etc/nginx/conf.d/default.conf</code> が読み込まれてしまうのその対処方法を書きます．</p>

<p><code>/etc/nginx/nginx.conf</code>を開くとこうなっているはずです．</p>

<pre class="code" data-lang="" data-unlink>user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  &#39;$remote_addr - $remote_user [$time_local] &#34;$request&#34; &#39;
                      &#39;$status $body_bytes_sent &#34;$http_referer&#34; &#39;
                      &#39;&#34;$http_user_agent&#34; &#34;$http_x_forwarded_for&#34;&#39;;

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    tcp_nopush     on;

    keepalive_timeout  65;

    gzip  on;

    include /etc/nginx/conf.d/*.conf;
}</pre>


<p>http内のincludeの次の行に新しくincludeを追加します．</p>

<pre class="code" data-lang="" data-unlink>user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  &#39;$remote_addr - $remote_user [$time_local] &#34;$request&#34; &#39;
                      &#39;$status $body_bytes_sent &#34;$http_referer&#34; &#39;
                      &#39;&#34;$http_user_agent&#34; &#34;$http_x_forwarded_for&#34;&#39;;

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    tcp_nopush     on;

    keepalive_timeout  65;

    gzip  on;

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}</pre>


