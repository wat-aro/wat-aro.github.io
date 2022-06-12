---
title: "X1 Carbon Gen 7th に Arch Linux をインストール"
published: 2020/02/11
tags:
  - Arch
---

<p>基本的にはインストールガイドのとおり
<a href="https://wiki.archlinux.jp/index.php/">https://wiki.archlinux.jp/index.php/</a>インストールガイド
WindowManager は <a class="keyword" href="http://d.hatena.ne.jp/keyword/XMonad">XMonad</a></p>

<h2><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D1%A1%BC%A5%C6%A5%A3%A5%B7%A5%E7%A5%F3">パーティション</a></h2>

<p>funtoo を参考
<a href="https://www.funtoo.org/Install/GPT_Partitioning">https://www.funtoo.org/Install/GPT_Partitioning</a></p>

<h2>フォーマット</h2>

<pre class="code shell" data-lang="shell" data-unlink># mkfs.fat -F32 /dev/nvme0n1p1 # ESP
# fatlabel /dev/nvme0n1p1 efi
# mkfs.btrfs -L root /dev/nvme0n1p3 # Root
# mkswap /dev/nvme0n1p2
# swapon /dev/nvme0n1p2</pre>


<h2>マウント</h2>

<pre class="code shell" data-lang="shell" data-unlink># mount /dev/nvme0n1p3 /mnt
# mkdir /mnt/boot
# mount /dev/nvme0n1p1 /mnt/boot</pre>


<h2>システムクロックの更新</h2>

<pre class="code shell" data-lang="shell" data-unlink># timedatectl set-ntp true</pre>


<h2>インストール</h2>

<p>Japanのミラーのみを使うように変更</p>

<pre class="code shell" data-lang="shell" data-unlink># vim /etc/pacman.d/mirrorlist</pre>




<pre class="code shell" data-lang="shell" data-unlink># pacstrap /mnt base linux linux-firmware</pre>


<h2>システムの設定</h2>

<pre class="code shell" data-lang="shell" data-unlink># genfstab -L /mnt &gt;&gt; /mnt/etc/fstab
# cat /mnt/etc/fstab</pre>


<h2><a class="keyword" href="http://d.hatena.ne.jp/keyword/chroot">chroot</a></h2>

<pre class="code shell" data-lang="shell" data-unlink># arch-chroot /mnt</pre>


<h2><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%BF%A5%A4%A5%E0%A5%BE%A1%BC%A5%F3">タイムゾーン</a></h2>

<pre class="code shell" data-lang="shell" data-unlink># ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
# hwclock --systohc --utc</pre>


<h2><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%ED%A5%B1%A1%BC%A5%EB">ロケール</a></h2>

<pre class="code shell" data-lang="shell" data-unlink># pacman -S neovim
# nvim /etc/locale.gen</pre>


<p><code>ja_JP.UTF-8 UTF-8</code> と <code>en_US.UTF-8 UTF-8</code> をアンコメント</p>

<pre class="code shell" data-lang="shell" data-unlink># locale-gen
# echo LANG=en_US.UTF-8 &gt; /etc/locale.conf</pre>


<h2>ネットワーク</h2>

<pre class="code shell" data-lang="shell" data-unlink># pacman -S networkmanager
# systemctl enable NetworkManager.service</pre>


<h2>Rootパスワード</h2>

<pre class="code shell" data-lang="shell" data-unlink># passwd</pre>


<h2>ブート</h2>

<pre class="code shell" data-lang="shell" data-unlink># pacman -S efibootmgr
# efibootmgr -d /dev/nvme0n1 -p 1 -c -L &#34;Arch Linux&#34; -l /vmlinuz-linux -u &#34;root=/dev/nvme0n1p3 rw initrd=/initramfs-linux.img&#34;
# exit
# reboot</pre>


<h2>ユーザ追加</h2>

<pre class="code shell" data-lang="shell" data-unlink># pass
# useradd -m -g users -G wheel -s /bin/bash wat-aro
# passwd wat-aro
# groupadd wat-aro
# gpasswd -a wat-aro wat-aro
id wat-aro</pre>


<h2>sudo</h2>

<pre class="code shell" data-lang="shell" data-unlink># pacman -S sudo
# EDITOR=nvim visudo</pre>


<p>以下を追記</p>

<pre class="code shell" data-lang="shell" data-unlink>%wheel ALL=(ALL) ALL</pre>


<h2>Yay</h2>

<pre class="code shell" data-lang="shell" data-unlink>$ sudo pacman -S git
$ sudo pacman -S base-devel
$ git clone https://aur.archlinux.org/yay.git
$ cd yay
$ makepkg -si</pre>


<h2>man</h2>

<pre class="code shell" data-lang="shell" data-unlink>$ yay -S man-db
$ mandb</pre>


<h2><a class="keyword" href="http://d.hatena.ne.jp/keyword/Xorg">Xorg</a></h2>

<pre class="code shell" data-lang="shell" data-unlink>$ yay -S xorg-server
$ lspci | grep -e VGA -e 3D
$ yay -S xf86-video-intel
$ yay -S xorg-xrdb rxvt-unicode xorg-xmodmap</pre>


<h2><a class="keyword" href="http://d.hatena.ne.jp/keyword/GUI">GUI</a> 準備</h2>

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/uim">uim</a> の設定が終わるまで <a class="keyword" href="http://d.hatena.ne.jp/keyword/xmonad">xmonad</a> がちゃんと動かない</p>

<pre class="code shell" data-lang="shell" data-unlink>$ git clone https://github.com/wat-aro/dotfiles
$ cd dotfiles
$ ./install.sh
$ yay -S xmonad xmonad-contrib dmenu xmobar
$ xmonad --recompile</pre>


<h2>日本語入力</h2>

<pre class="code shell" data-lang="shell" data-unlink>$ yay -S uim anthy gtk3
$ uim-pref-gtk3</pre>


<h2>ブラウザ</h2>

<pre class="code shell" data-lang="shell" data-unlink>$ yay -S noto-fonts noto-fonts-cjk noto-fonts-emoji
$ yay -S google-chrome</pre>


<h2>フォント</h2>

<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/Ricty">Ricty</a> を手動で入れる</p>

<h2>LightDM</h2>

<p><a href="https://wiki.archlinux.jp/index.php/LightDM">LightDM - ArchWiki</a></p>

<p><a href="https://qiita.com/Hayao0819/items/7784178c7fd568291905">&#x3010;ArchLinux&#x3011;&#x6700;&#x9AD8;&#x306E;&#x30ED;&#x30B0;&#x30A4;&#x30F3;&#x753B;&#x9762; - Qiita</a></p>

<p>を参考</p>

<h2>オーディオ</h2>

<p>オーディオを有効にするためには <code>sof-firmware</code> も必要</p>

<p><a href="https://www.reddit.com/r/archlinux/comments/e5rpxv/thinkpad_x1_carbon_gen_7_audio_broken_on_541arch11/">Thinkpad X1 Carbon Gen 7 audio broken on 5.4.1-arch1-1 : archlinux</a></p>

<pre class="code shell" data-lang="shell" data-unlink>$ yay -S alsa-utils sof-firmware pulseaudio pavucontrol</pre>


