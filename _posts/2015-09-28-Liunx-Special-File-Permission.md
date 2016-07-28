---
layout: post
title: Linux 文件的特殊权限
category: Linux
tags: [Linux, 文件系统]
latest: 2015-09-28 15:30:29
---


Linux 中的特殊权限：s、t、i、a 说明：

`s`：文件属主和组设置 SUID 和 GUID，文件在被设置了s权限后将以root身份执行。在设置s权限时文件属主、属组必须先设置相应的x权限，否则s权限并不能正真生效（chmod 命令不进行必要的完整性检查，即使不设置x权限就设置s权限，chmod 也不会报错，当我们 ls -l时看到rwS，大写S说明 s 权限未生效）。

Linux 修改密码的passwd便是个设置了 SUID 的程序，普通用户无读写 /etc/shadow 文件的权限确可以修改自己的密码。

```
ls -al /usr/bin/passwd
-rwsr-xr-x 1 root root 32988 2008-12-08 17:17 /usr/bin/passwd
```

我们可以通过字符模式设置s权限：chmod a+s filename，也可以使用绝对模式进行设置：
设置s u i d：将相应的权限位之前的那一位设置为4；
设置g u i d：将相应的权限位之前的那一位设置为2；

两者都置位：将相应的权限位之前的那一位设置为4+2=6。
如：

```
chmod 4764 filename   # 设置SUID
```

t ：设置粘着位，一个文件可读写的用户并一定相让他有删除此文件的权限，如果文件设置了t权限则只用属主和root有删除文件的权限，通过chmod +t filename 来设置t权限。

i：不可修改权限  例：chattr u+i filename 则filename文件就不可修改，无论任何人，如果需要修改需要先删除i权限，用chattr -i filename就可以了。查看文件是否设置了i权限用lsattr filename。

a：只追加权限， 对于日志系统很好用，这个权限让目标文件只能追加，不能删除，而且不能通过编辑器追加。可以使用chattr +a设置追加权限。
