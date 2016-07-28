---
layout: post
title: Linux 文件解压缩命令
category: Linux
tags: [Linux, 文件系统]
latest: 2015年10月15日 21:52:37
---


#### TAR

范例一：将整个 /etc 目录下的文件全部打包成为 /tmp/etc.tar

``` shell
tar -cvf /tmp/etc.tar /etc             # 仅打包，不压缩
tar -zcvf /tmp/etc.tar.gz /etc     # 打包后，以 gzip 压缩
tar -jcvf /tmp/etc.tar.bz2 /etc   # 打包后，以 bzip2 压缩

# 特别注意，在参数 f 之后的文件档名是自己取的，我们习惯上都用 .tar 来作为辨识。
# 如果加 z 参数，则以 .tar.gz 或 .tgz 来代表 gzip 压缩过的 tar file ～
# 如果加 j 参数，则以 .tar.bz2 来作为附档名啊～
# 上述指令在执行的时候，会显示一个警告讯息：
# 『tar: Removing leading `/” from member names』那是关於绝对路径的特殊设定。
```

范例二：查阅上述 /tmp/etc.tar.gz 文件内有哪些文件？

```
[root@linux ~]# tar -ztvf /tmp/etc.tar.gz
# 由於我们使用 gzip 压缩，所以要查阅该 tar file 内的文件时，
# 就得要加上 z 这个参数了！这很重要的！
```

范例三：将 /tmp/etc.tar.gz 文件解压缩在 /usr/local/src 底下

```
[root@linux ~]# cd /usr/local/src
[root@linux src]# tar -zxvf /tmp/etc.tar.gz
# 在预设的情况下，我们可以将压缩档在任何地方解开的！以这个范例来说，
# 我先将工作目录变换到 /usr/local/src 底下，并且解开 /tmp/etc.tar.gz ，
# 则解开的目录会在 /usr/local/src/etc 呢！另外，如果您进入 /usr/local/src/etc
# 则会发现，该目录下的文件属性与 /etc/ 可能会有所不同喔！
范例四：在 /tmp 底下，我只想要将 /tmp/etc.tar.gz 内的 etc/passwd 解开而已
[root@linux ~]# cd /tmp
[root@linux tmp]# tar -zxvf /tmp/etc.tar.gz etc/passwd
# 我可以透过 tar -ztvf 来查阅 tarfile 内的文件名称，如果单只要一个文件，
# 就可以透过这个方式来下达！注意到！ etc.tar.gz 内的根目录 / 是被拿掉了！
```

范例五：将 /etc/ 内的所有文件备份下来，并且保存其权限！

```
[root@linux ~]# tar -zxvpf /tmp/etc.tar.gz /etc
# 这个 -p 的属性是很重要的，尤其是当您要保留原本文件的属性时！
```


范例六：在 /home 当中，比 2005/06/01 新的文件才备份

```
 [root@linux ~]# tar -N ‘2005/06/01′ -zcvf 
 home.tar.gz /home
```

范例七：我要备份 /home, /etc ，但不要 /home/dmtsai

```
[root@linux ~]# tar –exclude /home/dmtsai -zcvf myfile.tar.gz /home/* /etc
```

范例八：将 /etc/ 打包后直接解开在 /tmp 底下，而不产生文件！

```
[root@linux ~]# cd /tmp
[root@linux tmp]# tar -cvf – /etc | tar -xvf –
# 这个动作有点像是 cp -r /etc /tmp 啦～依旧是有其有用途的！
# 要注意的地方在於输出档变成 – 而输入档也变成 – ，又有一个 | 存在～
# 这分别代表 standard output, standard input 与管线命令啦！
# 这部分我们会在 Bash shell 时，再次提到这个指令跟大家再解释啰！
```

- tar
解包：tar xvf FileName.tar
打包：tar cvf FileName.tar DirName
（注：tar是打包，不是压缩！）

- gz
解压1：gunzip FileName.gz
解压2：gzip -d FileName.gz
压缩：gzip FileName

- tar.gz 和 .tgz
解压：tar zxvf FileName.tar.gz
压缩：tar zcvf FileName.tar.gz DirName

- bz2
解压1：bzip2 -d FileName.bz2
解压2：bunzip2 FileName.bz2
压缩： bzip2 -z FileName

- tar.bz2
解压：tar jxvf FileName.tar.bz2 或tar –bzip xvf FileName.tar.bz2
压缩：tar jcvf FileName.tar.bz2 DirName

- bz
解压1：bzip2 -d FileName.bz
解压2：bunzip2 FileName.bz
压缩：未知

- tar.bz
解压：tar jxvf FileName.tar.bz
压缩：未知

- Z
解压：uncompress FileName.Z
压缩：compress FileName

- tar.Z
解压：tar Zxvf FileName.tar.Z
压缩：tar Zcvf FileName.tar.Z DirName

- zip
解压：unzip FileName.zip
压缩：zip FileName.zip DirName
压缩一个目录使用 -r 参数，-r 递归。例： `$ zip -r FileName.zip DirName`

- rar
解压：rar x FileName.rar
压缩：rar a FileName.rar DirName
rar请到：http://www.rarsoft.com/download.htm 下载！

解压后请将rar_static拷贝到/usr/bin目录（其他由$PATH环境变量指定的目录也可以）

#### ZIP

zip命令可以用来将文件压缩成为常用的zip格式。unzip命令则用来解压缩zip文件。

1. 我想把一个文件abc.txt和一个目录dir1压缩成为yasuo.zip：

```
zip -r yasuo.zip abc.txt dir1
```

2.我下载了一个yasuo.zip文件，想解压缩：

```
# unzip yasuo.zip
```

3.我当前目录下有abc1.zip，abc2.zip和abc3.zip，我想一起解压缩它们：

```
unzip abc\?.zip
```

注释：?表示一个字符，如果用*表示任意多个字符。

4.我有一个很大的压缩文件large.zip，我不想解压缩，只想看看它里面有什么：

```
unzip -v large.zip
```

5.我下载了一个压缩文件large.zip，想验证一下这个压缩文件是否下载完全了

```
unzip -t large.zip
```

6.我用-v选项发现music.zip压缩文件里面有很多目录和子目录，并且子目录中其实都是歌曲mp3文件，我想把这些文件都下载到第一级目录，而不是一层一层建目录：

```
# unzip -j music.zip
```


#### RAR

``` shell
http://www.rarlab.com/download.htm
wget http://www.rarlab.com/rar/rarlinux-5.3.0.tar.gz
tar xzvf …
cd
make
```

`rar e aa.rar` 将aa.rar压缩文件解压到当前目录，aa文件中原包含的目录全没有。

`rar x aa.rar` 将aa.rar压缩文件解压到aa目录下，并保持原来压缩之前aa文件的目录组织结构。
