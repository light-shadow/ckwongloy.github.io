---
layout: post
title: httpd.conf：Apache 配置文件详细说明
category: PHP
tags: [Apache, 服务器]
latest: 2015年06月22日 20:43:24
---

Apache 的 httpd.conf 详细说明，配置 Apache 会经常参考。

ServerRoot “/usr/local“

　　 　　　　ServerRoot用于指定守护进程httpd的运行目录，httpd在启动之后将自动将进程的当前目录改变为这个目录，因此如果设置文件中指定的文件或目录是相对路径，那么真实路径就位于这个ServerR oot定义的路径之下。

　　 　　ScoreBoardFile /var/run/httpd.scoreboard

　　 　　　　httpd使用ScoreBoardFile来维护进程的内部数据，因此通常不需要改变这个参数，除非管理员想在一台计算机上运行几个Apache服务器，这时每个Apache服务器都需要独立的设置文件htt pd.conf，并使用不同的ScoreBoardFile。

　　 　　#ResourceConfig conf/srm.conf

　　#AccessConfig conf/access.conf

　　 　　　　这两个参数ResourceConfig和AccessConfig，就用于和使用srm.conf和access.conf设置文件的老版本Apache兼容。如果没有兼容的需要，可以将对应的设置文件指定为/dev/null，这将表示不存在其他设置文件，而仅使用httpd.conf一个文件来保存所有的设置选项。

　　 　　PidFile /var/run/httpd.pid

　　 　　　　PidFile指定的文件将记录httpd守护进程的进程号，由于httpd能自动复制其自身，因此系统中有多个httpd进程，但只有一个进程为最初启动的进程，它为其他进程的父进程，对这个进程发送信号将影响所有的httpd进程。PidFILE定义的文件中就记录httpd父进程的进程号。

　　 　　Timeout 300

　　 　　　　Timeout定义客户程序和服务器连接的超时间隔，超过这个时间间隔（秒）后服务器将断开与客户机的连接。

　　 　　KeepAlive On

　　 　　　　在HTTP 1.0中，一次连接只能作传输一次HTTP请求，而KeepAlive参数用于支持HTTP 1.1版本的一次连接、多次传输功能，这样就可以在一次连接中传递多个HTTP请求。虽然只有较新的浏览器才支持这个功能，但还是打开使用这个选项。

　　 　　MaxKeepAliveRequests 100

　　 　　　　MaxKeepAliveRequests为一次连接可以进行的HTTP请求的最大请求次数。将其值设为0将支持在一次连接内进行无限次的传输请求。事实上没有客户程序在一次连接中请求太多的页面，通常达不到这个上限就完成连接了。

　　 　　KeepAliveTimeout 15

　　 　　　　KeepAliveTimeout测试一次连接中的多次请求传输之间的时间，如果服务器已经完成了一次请求，但一直没有接收到客户程序的下一次请求，在间隔超过了这个参数设置的值之后，服务器就断开连接。

　　 　　ThreadsPerChild 50

　　设置服务器使用进程的数目。
　　# 这是以服务器的响应速度为准的, 数目太大则会变慢

　　 　　MaxRequestsPerChild 30

　　 　　　　使用子进程的方式提供服务的Web服务，常用的方式是一个子进程为一次连接服务，这样造成的问题就是每次连接都需要生成、退出子进程的系统操作，使得这些额外的处理过程占据了计算机的大量处理能力。因此最好的方式是一个子进程可以为多次连接请求服务，这样就不需要这些生成、退出进程的系统消耗，Apache就采用了这样的方式，一次连接结束后，子进程并不退出，而是停留在系统中等待下一次服务请求，这样就极大的提高了性能。

　　 　　　　但由于在处理过程中子进程要不断的申请和释放内存，次数多了就会造成一些内存垃圾，就会影响系统的稳定性，并且影响系统资源的有效利用。因此在一个副本处理过一定次数的请求之后，就可以让这个子进程副本退出，再从原始的htt pd进程中重新复制一个干净的副本，这样就能提高系统的稳定性。这样，每个子进程处理服务请求次数由MaxRe questPerChild定义。 缺省的设置值为30，这个值对于具备高稳定性特点的FreeBSD系统来讲是过于保守的设置，可以设置为1000甚至更高，设置为0支持每个副本进行无限次的服务处理。

　　为了安全,设置为零

　　 　　#Listen 3000

　　#Listen 12.34.56.78:80
　　#BindAddress *

　　 　　　　Listen参数可以指定服务器除了监视标准的80端口之外，还监视其他端口的HTTP请求。由于FreeBSD系统可以同时拥有多个IP地址，因此也可以指定服务器只听取对某个BindAddress< /B>的IP地址的HTTP请求。如果没有配置这一项，则服务器会回应对所有IP的请求。

　　 　　　　即使使用了BindAddress参数，使得服务器只回应对一个IP地址的请求，但是通过使用扩展的Listen参数，仍然可以让HTTP守护进程回应对其他IP地址的请求。此时Listen参数的用法与上面的第二个例子相同。这种比较复杂的用法主要用于设置虚拟主机。此后可以用VirtualHost参数定义对不同IP的虚拟主机，然而这种用法是较早的HTTP 1.0标准中设置虚拟主机的方法，每针对一个虚拟主机就需要一个IP地址，实际上用处并不大。在HTTP 1.1中，增加了对单IP地址多域名的虚拟主机的支持，使得虚拟主机的设置具备更大的意义。

　　 　　#ExtendedStatus On

　　 　　　　Apache服务器可以通过特殊的HTTP请求，来报告自身的运行状态，打开这个ExtendedStatus 参数可以让服务器报告更全面的运行状态信息

　　 　　 　　 　　---------------------------------------------------------------------------------

　　 　　ServerAdmin you@your.address

　　 　　　　配置文件中应该改变的也许只有ServerAdmin， 这一项用于配置WWW服务器的管理员的email地址，这将在HTTP服务出现错误的条件下返回给浏览器，以便让Web使用者和管理员联系，报告错误。习惯上使用服务器上的webmaster作为WWW服务器的管理员，通过邮件服务器的别名机制，将发送到webmaster 的电子邮件发送给真正的Web管理员。

　　 　　ServerName localhost

　　 　　　　缺省情况下，并不需要指定这个ServerName参数，服务器将自动通过名字解析过程来获得自己的名字，但如果服务器的名字解析有问题（通常为反向解析不正确），或者没有正式的DNS名字，也可以在这里指定I P地址。当ServerName设置不正确的时候，服务器不能正常启动。

　　 　　　　通常一个Web服务器可以具有多个名字，客户浏览器可以使用所有这些名字或IP地址来访问这台服务器，但在没有定义虚拟主机的情况下，服务器总是以自己的正式名字回应浏览器。ServerName就定义了Web服务器自己承认的正式名字，例如一台服务器名字（在DNS中定义了A类型）为freebsd.exmaple.org.cn，同时为了方便记忆还定义了一个别名（CNAME记录）为www.exmaple.org.cn，那么Apache自动解析得到的名字就为freebsd.example.org.cn，这样不管客户浏览器使用哪个名字发送请求，服务器总是告诉客户程序自己为freebsd.example.org.cn。虽然这一般并不会造成什么问题，但是考虑到某一天服务器可能迁移到其他计算机上，而只想通过更改DNS中的www别名配置就完成迁移任务，所以不想让客户在其书签中使用 freebsd记录下这个服务器的地址，就必须使用ServerName来重新指定服务器的正式名字。

　　 　　DocumentRoot “/usr/local/www/data“

　　 　　　　DocumentRoot定义这个服务器对外发布的超文本文档存放的路径，客户程序请求的UR L就被映射为这个目录下的网页文件。这个目录下的子目录，以及使用符号连接指出的文件和目录都能被浏览器访问，只是要在URL上使用同样的相对目录名。

　　 　　　　注意，符号连接虽然逻辑上位于根文档目录之下，但实际上可以位于计算机上的任意目录中，因此可以使客户程序能访问那些根文档目录之外的目录，这在增加了灵活性的同时但减少了安全性。Apache在目录的访问控制中提供了FollowSymLinks选项来打开或关闭支持符号连接的特性。

　　 　　<Directory />

　　 Options FollowSymLinks
　　 AllowOverride None
　　</Directory>

　　 　　　　Apache服务器可以针对目录进行文档的访问控制，然而访问控制可以通过两种方式来实现，一个是在设置文件 httpd.conf（或access.conf）中针对每个目录进行设置，另一个方法是在每个目录下设置访问控制文件，通常访问控制文件名字为.htaccess。虽然使用这两个方式都能用于控制浏览器的访问，然而使用配置文件的方法要求每次改动后重新启动httpd守护进程，比较不灵活，因此主要用于配置服务器系统的整体安全控制策略，而使用每个目录下的.htaccess文件设置具体目录的访问控制更为灵活方便。

　　 　　 　　<Directory “H:/web001“>

　　Directory语句就是用来定义目录的访问限制的，这里可以看出它的标准语法，为一个目录定义访问限制。上例的这个设置是针对系统的根目录进行的，设置了允许符号连接的选项FollowSymLinks ，以及使用AllowOverride None表示不允许这个目录下的访问控制文件来改变这里进行的配置，这也意味着不用查看这个目录下的相应访问控制文件。

　　 　　　　由于Apache对一个目录的访问控制设置是能够被下一级目录继承的，因此对根目录的设置将影响到它的下级目录。注意由于AllowOverride None的设置，使得Apache服务器不需要查看根目录下的访问控制文件，也不需要查看以下各级目录下的访问控制文件，直至httpd.conf（或access.conf ）中为某个目录指定了允许Alloworride，即允许查看访问控制文件。由于Apache对目录访问控制是采用的继承方式，如果从根目录就允许查看访问控制文件，那么Apache就必须一级一级的查看访问控制文件，对系统性能会造成影响。而缺省关闭了根目录的这个特性，就使得Apache从httpd.conf中具体指定的目录向下搜寻，减少了搜寻的级数，增加了系统性能。因此对于系统根目录设置AllowOverride None不但对于系统安全有帮助，也有益于系统性能。

　　 　　Options Indexes FollowSymLinks

　　 AllowOverride None
　　 Order allow,deny
　　 Allow from all
　　</Directory>

　　 　　 　　这里定义的是系统对外发布文档的目录的访问设置，设置不同的AllowOverride选项，以定义配置文件中的目录设置和用户目录下的安全控制文件的关系，而Options选项用于定义该目录的特性。

　　 　　　　配置文件和每个目录下的访问控制文件都可以设置访问限制，设置文件是由管理员设置的，而每个目录下的访问控制文件是由目录的属主设置的，因此管理员可以规定目录的属主是否能覆盖系统在设置文件中的设置，这就需要使用 AllowOverride参数进行设置，通常可以设置的值为：

　　 　　AllowOverride的设置 对每个目录访问控制文件作用的影响

　　All 缺省值，使访问控制文件可以覆盖系统配置
　　None 服务器忽略访问控制文件的设置
　　Options 允许访问控制文件中可以使用Options参数定义目录的选项
　　FileInfo 允许访问控制文件中可以使用AddType等参数设置
　　AuthConfig 允许访问控制文件使用AuthName，AuthType等针对每个用户的认证机制，这使目录属主能用口令和用户名来保护目录
　　Limit 允许对访问目录的客户机的IP地址和名字进行限制

　　 　　 　　每个目录具备一定属性，可以使用Options来控制这个目录下的一些访问特性设置，以下为常用的特性选项：

　　 　　Options设置 服务器特性设置

　　All 所有的目录特性都有效，这是缺省状态
　　None 所有的目录特性都无效
　　FollowSymLinks 允许使用符号连接，这将使浏览器有可能访问文档根目录（DocumentRoot）之外的文档
　　SymLinksIfOwnerMatch 只有符号连接的目的与符号连接本身为同一用户所拥有时，才允许访问，这个设置将增加一些安全性
　　ExecCGI 允许这个目录下可以执行CGI程序
　　Indexes 允许浏览器可以生成这个目录下所有文件的索引，使得在这个目录下没有index.html（或其他索引文件）时，能向浏览器发送这个目录下的文件列表

　　 　　　　此外，上例中还使用了Order、Allow、Deny等参数，这是Limit语句中用来根据浏览器的域名和 IP地址来控制访问的一种方式。其中Order定义处理Allow和Deny的顺序，而Allow、Deny则针对名字或IP进行访问控制设置，上例使用allow from all，表示允许所有的客户机访问这个目录，而不进行任何限制。

　　 　　 　　UserDir public_html (Win32=“My Documents/My Website“)

　　 　　　　当在一台FreeBSD上运行Apache服务器时，这台计算机上的所有用户都可以有自己的网页路径，形如 http://freebsd.example.org.cn/~user，使用波浪符号加上用户名就可以映射到用户自己的网页目录上。映射目录为用户个人主目录下的一个子目录，其名字就用UseDir这个参数进行定义，缺省为public_html。如果不想为正式的用户提供网页服务，使用DISABLED作UserDir的参数即可。

　　 　　#

　　# AllowOverride FileInfo AuthConfig Limit
　　# Options MultiViews Indexes SymLinksIfOwnerMatch IncludesNoExec
　　#
　　# Order allow,deny
　　# Allow from all
　　#
　　#
　　# Order deny,allow
　　# Deny from all
　　#
　　#

　　 　　　　这里可以看到Directory的另一个用法，即可以通过简单的模式匹配方法，针对分布在不同目录下的子目录定义访问控制权限。这样设置就需要Apache服务器对每个路径进行额外的处理，因此就会降低服务器的性能，所以缺省情况并没有打开这种访问限制。

　　 　　　　这里可以看到另外一个语句Limit，Limit语句就是用来针对具体的请求方法来设定访问控制的，其中可以使用GET、POST等各种服务器支持的请求方法做Limit的参数，来设定对不同请求方法的访问限制。一般可以打开对GET、POST、HEAD三种请求方法，而屏蔽其他的请求方法，以增加安全性。Limit语句中，可以使用Order 、Allow、Deny，Allow和Deny中可以使用匹配的方法针对域名和IP进行限制，只是对于域名是从后向前匹配，对于IP地址则从前向后匹配。

　　 　　DirectoryIndex index.html

　　 　　　　很多情况下，URL中并没有指定文档的名字，而只是给出了一个目录名。那么Apache服务器就自动返回这个目录下由DirectoryIndex定义的文件，当然可以指定多个文件名字，系统会这个目录下顺序搜索。当所有由DirectoryIndex指定的文件都不存在时，Apache服务器可以根据系统设置，生成这个目录下的所有文件列表，提供用户选择。此时该目录的访问控制选项中的Indexes选项（Options Indexes ）必须打开，以使得服务器能够生成目录列表，否则Apache将拒绝访问。

　　 　　AccessFileName .htaccess

　　 　　　　AccessFileName定义每个目录下的访问控制文件的文件名，缺省为.htaccess ，可以通过更改这个文件，来改变不同目录的访问控制限制。

　　 　　 Order allow,deny

　　 Deny from all

　　 　　　　除了可以针对目录进行访问控制之外，还可以根据文件来设置访问控制，这就是File语句的任务。使用File 语句，不管文件处于哪个目录，只要名字匹配，就必须接受相应的访问控制。这个语句对于系统安全比较重要，例如上例将屏蔽所有的使用者不能访问.htaccess文件，这样就避免.htaccess中的关键安全信息不至于被客户获取。

　　 　　TypesConfig /usr/local/etc/apache/mime.types

　　 　　　　TypeConfig用于设置保存有不同的MIME类型数据的文件名，在FreeBSD下缺省设置为/usr/local/etc/apache/mime.types。

　　 　　DefaultType text/plain

　　 　　　　如果Web服务器不能决定一个文档的缺省类型，这通常表示文档使用了非标准的后缀，那么服务器就使用 DefaultType定义的MIME类型将文档发送给客户浏览器。这里的设置为text/plain，这样设置的问题是，如果服务器不能判断出文档的MIME，那么大部分情况下这个文档为一个二进制文档，但使用 text/plain格式发送回去，浏览器将在内部打开它而不会提示保存。因此建议将这个设置更改为 application/octet-stream，这样浏览器将提示用户进行保存。

　　 　　MIMEMagicFile /usr/local/etc/apache/magic

　　 　　　　除了从文件的后缀出发来判断文件的MIME类型之外，Apache还可以进一步分析文件的一些特征，来判断文件的真实MIME类型。这个功能是由mod_mime_magic模块实现的，它需要一个记录各种MIME类型特征的文件，以进行分析判断。上面的设置是一个条件语句，如果载入了这个模块，就必须指定相应的标志文件magic的位置。

　　 　　HostnameLookups Off

　　 　　　　通常连接时，服务器仅仅可以得到客户机的IP地址，如果要想获得客户机的主机名，以进行日志记录和提供给 CGI程序使用，就需要使用这个HostnameLookups选项，将其设置为On打开DNS反查功能。但是这将使服务器对每次客户请求都进行DNS查询，增加了系统开销，使得反应变慢，因此缺省设置为使用Off关闭此选项。关闭选项之后，服务器就不会获得客户机的主机名，而只能使用IP地址来记录客户。

　　 　　 　　 　　ErrorLog /var/log/httpd-error.log

　　LogLevel warn
　　LogFormat “%h %l %u %t \“%r\“ %>s %b \“%{Referer}i\“ \“%{User-Agent}i\““ combined
　　LogFormat “%h %l %u %t \“%r\“ %>s %b“ common
　　LogFormat “%{Referer}i -> %U“ referer
　　LogFormat “%{User-agent}i“ agent
　　#CustomLog /var/log/httpd-access.log common
　　#CustomLog /var/log/httpd-referer.log referer
　　#CustomLog /var/log/httpd-agent.log agent
　　CustomLog /var/log/httpd-access.log combined

　　 　　　　这里定义了系统日志的形式，对于服务器错误记录， 由ErrorLog、LogLevel 来定义不同的错误日志文件及其记录内容。

　　 　　　　对于系统的访问日志，缺省使用CustomLog参数定义日志的位置，缺省使用combined 参数指定将所有的访问日志放在一个文件中，然而也可以将不同种类的访问日志放在不同的日志记录文件中，这是通过在 CustomLog中指定不同的记录类型来完成的。common表示普通的对单页面请求访问记录，referer表示每个页面的引用记录，可以看出一个页面中包含的请求数，agent表示对客户机的类型记录，显然可以将现有的combined 定义的设置行注释掉，并使用common、referer和agent作为CustomLog的参数，来为不同种类的日志分别指定日志记录文件。

　　 　　显然，LogFormat是用于定义不同类型的日志进行记录时使用的格式， 这里使用了以%开头的宏定义，以记录不同的内容。

　　 　　　　如果这些参数指定的文件使用的是相对路径，那么就是相对于ServerRoot的路径。

　　 　　ServerSignature On

　　 　　　　一些情况下，例如当客户请求的网页并不存在时，服务器将产生错误文档，缺省情况下由于打开了 ServerSignature选项，错误文档的最后一行将包含服务器的名字、Apache的版本等信息。有的管理员更倾向于不对外显示这些信息，就可以将这个参数设置为Off，或者设置为Email，最后一行将替换为对ServerAdmin 的Email提示。

　　 　　 　　Alias /icons/ “/usr/local/www/icons/“

　　 　　 Options Indexes MultiViews

　　 AllowOverride None
　　 Order allow,deny
　　 Allow from all

　　 　　　　Alias参数用于将URL与服务器文件系统中的真实位置进行直接映射，一般的文档将在DocumentRoot 中进行查询，然而使用Alias定义的路径将直接映射到相应目录下，而不再到DocumentRoot 下面进行查询。因此Alias可以用来映射一些公用文件的路径，例如保存了各种常用图标的icons路径。这样使得除了使用符号连接之外，文档根目录（DocumentRoot）外的目录也可以通过使用了Alias映射，提供给浏览器访问。

　　 　　定义好映射的路径之后，应该需要使用Directory语句设置访问限制。

　　 　　ScriptAlias /cgi-bin/ “/usr/local/www/cgi-bin/“

　　 　　 AllowOverride None

　　 Options None
　　 Order allow,deny
　　 Allow from all

　　 　　　　ScriptAlias也是用于URL路径的映射，但与Alias的不同在于，ScriptAlias是用于映射CGI程序的路径，这个路径下的文件都被定义为CGI程序，通过执行它们来获得结果，而非由服务器直接返回其内容。缺省情况下CGI程序使用cgi-bin目录作为虚拟路径。

　　 　　# Redirect old-URI new-URL

　　 　　　　Redirect参数是用来重写URL的，当浏览器访问服务器上的一个已经不存在的资源的时候，服务器返回给浏览器新的URL，告诉浏览器从该URL中获取资源。这主要用于原来存在于服务器上的文档，改变了位置之后，而又希望能使用老URL能访问到，以保持与以前的URL兼容。

　　 　　IndexOptions FancyIndexing

　　AddIconByEncoding (CMP,/icons/compressed.gif) x-compress x-gzip
　　AddIconByType (TXT,/icons/text.gif) text/*
　　AddIconByType (IMG,/icons/image2.gif) image/*
　　AddIconByType (SND,/icons/sound2.gif) audio/*
　　AddIconByType (VID,/icons/movie.gif) video/*
　　AddIcon /icons/binary.gif .bin .exe
　　AddIcon /icons/binhex.gif .hqx
　　AddIcon /icons/tar.gif .tar
　　AddIcon /icons/world2.gif .wrl .wrl.gz .vrml .vrm .iv
　　AddIcon /icons/compressed.gif .Z .z .tgz .gz .zip
　　AddIcon /icons/a.gif .ps .ai .eps
　　AddIcon /icons/layout.gif .html .shtml .htm .pdf
　　AddIcon /icons/text.gif .txt
　　AddIcon /icons/c.gif .c
　　AddIcon /icons/p.gif .pl .py
　　AddIcon /icons/f.gif .for
　　AddIcon /icons/dvi.gif .dvi
　　AddIcon /icons/uuencoded.gif .uu
　　AddIcon /icons/script.gif .conf .sh .shar .csh .ksh .tcl
　　AddIcon /icons/tex.gif .tex
　　AddIcon /icons/bomb.gif core
　　AddIcon /icons/back.gif ..
　　AddIcon /icons/hand.right.gif README
　　AddIcon /icons/folder.gif ^^DIRECTORY^^
　　AddIcon /icons/blank.gif ^^BLANKICON^^
　　DefaultIcon /icons/unknown.gif
　　#AddDescription “GZIP compressed document“ .gz
　　#AddDescription “tar archive“ .tar
　　#AddDescription “GZIP compressed tar archive“ .tgz
　　ReadmeName README
　　HeaderName HEADER
　　IndexIgnore .??* *~ *# HEADER* README* RCS CVS *,v *,t

　　 　　　　当一个HTTP请求的URL为一个目录的时候，服务器返回这个目录中的索引文件。但如果一个目录中不存在缺省的索引文件，并且该服务器又许可显示目录文件列表的时候，就会显示出这个目录中的文件列表，为了使得这个文件列表能具有可理解性，而不仅仅是一个简单的列表，就需要前面的这些设置参数。

　　 　　如果使用了IndexOptions FancyIndexing选项，可以让服务器产生的目录列表中针对各种不同类型的文档引用各种图标。而哪种文件使用哪种图标，则使用下面的 AddIconByEncoding、AddIconByType以及AddIcon来定义，分别依据MIME的编码、类型以及文件的后缀来判断使用何种图标。如果不能确定文档使用的图标，就使用 DefaultIcon定义的缺省图标。

　　 　　　　同样，使用AddDescription可以为不同类型的文档加入不同的描述。并且，服务器还在目录下，查询使用ReadmeName和HeaderName定义的文件（自动加上. html后缀，如果没有发现，再使用.txt后缀进行搜索），如果发现了这些文件，就在文件列表之前首先显示这些文件的内容，以使得普通目录列表具备更大的可理解性。

　　 　　 　　 　　IndexIgnore让服务器在列出文件列表时忽略相应的文件， 这里使用模式配置的方式定义文件名。

　　 　　 　　 　　AddEncoding x-compress Z

　　AddEncoding x-gzip gz

　　 　　AddEncoding用于告诉一些使用压缩的MIME类型，这样可以让浏览器进行解压缩操作。

　　 　　AddLanguage en .en

　　AddLanguage fr .fr
　　AddLanguage de .de
　　AddLanguage da .da
　　AddLanguage el .el
　　AddLanguage it .it
　　LanguagePriority en fr de

　　 　　 　　一个HTML文档可以同时具备多个语言的版本，如对于file1.html文档可以具备file1.html.en、file1.html.fr 等不同的版本，每个语言后缀必须使用AddLanguage进行定义。这样服务器可以针对不同国家的客户，通过与浏览器进行协商，发送不同的语言版本。而LanguagePriority 定义不同语言的优先级，以便在浏览器没有特殊要求时，按照顺序使用不同的语言版本回应对file1.html 的请求。这个国际化的能力实际的应用并不多。

　　 　　 　　AddDefaultCharset ISO-8859-1

　　 　　浏览器选择的标准编码

　　 　　简体中文网站改为：GB2312

　　 　　 　　#AddType application/x-httpd-php3 .phtml

　　#AddType application/x-httpd-php3-source .phps

　　 　　 　　 　　　　AddType参数可以为特定后缀的文件指定MIME类型，这里的设置将覆盖mime.types中的设置。

　　 　　#AddHandler cgi-script .cgi

　　 　　　　AddHandler是用于指定非静态的处理类型，用于定义文档为一个非静态的文档类型，需要进行处理，再向浏览器返回处理结果。例如上面注释中的设置是将以.cgi结尾的文件设置为cgi-script类型，那么服务器将启动这个CGI程序以进行处理。如果需要在前面AliasScript定义的路径之外执行CGI程序，就需要使用这个参数进行设置，此后以.cgi结尾的文件将被当作CGI程序执行。

　　 　　　　在配置文件、这个目录中的.htaccess以及其上级目录的.htaccess中必须允许执行CGI程序，这需要通过Options ExecCGI参数设定。

　　 　　#AddType text/html .shtml

　　#AddHandler server-parsed .shtml

　　 　　　　另外一种动态进行处理的类型为server-parsed，由服务器自身预先分析网页内的标记，将标记更改为正确的HTML标识。由于server-parsed需要对text/html类型的文档进行处理，因此首先定义了对应的.shtml为text/html类型。

　　 　　　　然而要支持SSI，还要首先要在配置文件（或.htaccess）中使用Options Includes允许该目录下的文档可以为SSI类型，或使用Options IncludesNOExec让执行普通的SSI标志，但不执行其中引用的外部程序。

　　 　　　　另一种指定server-parsed类型的方式为使用XBitBack设置选项，如果将XBitHack设置为On，服务器将检查所有text/html类型的文档（包括.html后缀的文档），如果发现文件属性具备执行位 “x“，则服务器就认为它是服务器分析文档，需要服务器进行处理。推荐使用AddHandler进行设置，而将XBitBack 设置为Off，因为使用XBitBack将对所有的HTML文档都执行额外的检查，降低了效率。

　　 　　#AddHandler send-as-is asis

　　#AddHandler imap-file map
　　#AddHandler type-map var

　　 　　 　　上面被注释的AddHandler用于支持Apache服务器的asis、map和var处理能力。

　　 　　# Action media/type /cgi-script/location

　　# Action handler-name /cgi-script/location

　　 　　　　因为Apache内部提供的处理功能有限，因此可以使用Action为服务器定义外部程序作为可处理的动态文档类型，这些外部程序与标准CGI程序相同，都是对输入的数据处理之后，再输出不同MIME类型的结果。例如要定义一个对特殊后缀wri都先执行wri2txt进行处理操作，再返回结果的操作，可以使用：

　　 　　 Action windows-writer /bin/wri2txt

　　 AddHandler windows-writer wri

　　 　　　　更进一步，可以直接使用Action定义对某个MIME类型预先进行处理操作，这需要例子中第一种格式的Action 参数设置方式。这样设置方式就不再需要额外的AddHandler用来将处理操作与文件后缀联系起来，而是使用Action直接处理MIME类型的文件。但如果文档后缀没有正式的MIME类型，还需要先定义一个MIME类型。

　　 　　#ErrorDocument 500 “The server made a boo boo.

　　#ErrorDocument 404 /missing.html
　　#ErrorDocument 404 /cgi-bin/missing_handler.pl
　　#ErrorDocument 402 http://some.other_server.com/subscription_info.html

　　 　　　　如果客户请求的网页不存在，或者没有访问权限等情况发生时，服务器将产生一个错误代码，同时也将回应客户浏览器一个标识错误的网页。ErrorDocument就用于设置当出现哪个错误时应该回应客户浏览器那些内容，ErrorDocument的第一个参数为错误的序号，第二个参数为回应的数据，可以为简单的文本，本地网页，本地CGI程序，以及远程主机上的网页。

　　 　　BrowserMatch “Mozilla/2“ nokeepalive

　　BrowserMatch “MSIE 4\.0b2;“ nokeepalive downgrade-1.0 force-response-1.0
　　BrowserMatch “RealPlayer 4\.0“ force-response-1.0
　　BrowserMatch “Java/1\.0“ force-response-1.0
　　BrowserMatch “JDK/1\.0“ force-response-1.0

　　 　　BrowserMatch命令为特定的客户程序，设置特殊的参数，以保证对老版本浏览器的兼容性，并支持新浏览器的新特性。

　　 　　 　　#

　　#ProxyRequests On
　　#
　　#
　　# Order deny,allow
　　# Deny from all
　　# Allow from .your_domain.com
　　#
　　#ProxyVia On
　　#CacheRoot “/usr/local/www/proxy“
　　#CacheSize 5
　　#CacheGcInterval 4
　　#CacheMaxExpire 24
　　#CacheLastModifiedFactor 0.1
　　#CacheDefaultExpire 1
　　#NoCache a_domain.com another_domain.edu joes.garage_sale.com

　　 　　#

　　 　　　　Apache服务器本身就具备代理的功能，然而这要求加载入mod_proxy模块。这能使用IfModule语句进行判断，如果存在mod_proxy模块，就使用ProxyRequests打开代理支持。此后的Directory用于设置对Proxy功能的访问权限设置，以及用于设置缓冲的各个参数设置。

　　 　　 　　 　　 　　-------------------------------------------------------------------------------------

　　 　　#NameVirtualHost 12.34.56.78:80

　　#NameVirtualHost 12.34.56.78
　　#
　　# ServerAdmin webmaster@host.some_domain.com
　　# DocumentRoot /www/docs/host.some_domain.com
　　# ServerName host.some_domain.com
　　# ErrorLog logs/host.some_domain.com-error_log
　　# CustomLog logs/host.some_domain.com-access_log common
　　#

　　 　　#

　　#

　　 　　 　　 　　　　缺省设置文件中的这些内容是用于设置命名基础的虚拟主机服务器时使用。其中NameVirtualHost 来指定虚拟主机使用的IP地址，这个IP地址将对应多个DNS名字，如果Apache使用了Listen 参数控制了多个端口，那么就可以在这里加上端口号以进一步进行区分对不同端口的不同连接请求。此后，使用 VirtualHost语句，使用NameVirtualHost指定的IP地址作参数，对每个名字都定义对应的虚拟主机设置。

　　 　　　　虚拟主机是在一台Web服务器上，可以为多个单独域名提供Web服务，并且每个域名都完全独立，包括具有完全独立的文档目录结构及设置，这样域名之间完全独立，不但使用每个域名访问到的内容完全独立，并且使用另一个域名无法访问其他域名提供的网页内容。

　　 　　　　虚拟主机的概念对于ISP来讲非常有用，因为虽然一个组织可以将自己的网页挂在具备其他域名的服务器上的下级往址上，但使用独立的域名和根网址更为正式，易为众人接受。传统上，必须自己设立一台服务器才能达到单独域名的目的，然而这需要维护一个单独的服务器，很多小单位缺乏足够的维护能力，更为合适的方式是租用别人维护的服务器。ISP也没有必要为一个机构提供一个单独的服务器，完全可以使用虚拟主机能力，使服务器为多个域名提供Web服务，而且不同的服务互不干扰，对外就表现为多个不同的服务器。

　　 　　　　有两种设定虚拟主机的方式，一种是基于HTTP 1.0标准，需要一个具备多IP地址的服务器，再配置DNS 服务器，给每个IP地址以不同的域名，最后才能配置Apache的配置文件，使服务器对不同域名返回不同的Web文档。由于这需要使用额外的IP地址，对每个要提供服务的域名都要使用单独的IP地址，因此这种方式实现起来问题较多。

　　 　　　　可以在一个网络界面上绑定多个IP地址，FreeBSD下需要使用ifconfig的alias参数来进行这个配置，但此时会影响网络性能。

　　 　　　　HTTP 1.1标准在协议中规定了对浏览器和服务器通信时，服务器能够跟踪浏览器请求的是哪个主机名字。因此可以利用这个新特性，使用更轻松的方式设定虚拟主机。这种方式不需要额外的IP地址，但需要新版本的浏览器支持。这种方式已经成为建立虚拟主机的标准方式。

　　 　　　　要建立非IP基础的虚拟主机，多个域名是不可少的配置，因为每个域名就对应一个要服务的虚拟主机。因此需要更改DNS服务器的配置，为服务器增加多个CNAME选项，如：

　　 　　freebsd IN A 192.168.1.64

　　vhost1 IN CNAME freebsd
　　vhost2 IN CNAME freebsd

　　 　　 　　 　　　　基本的设置选项都是为了freebsd主机设定的，如果要为vhost1和vhost2设定虚拟主机，就要使用VirtualHost语句定义不同的选项，在语句中可以使用配置文件前面中的大部分选项，而可以重新定义几乎所有的针对服务器的设置。

　　 　　NameVirtualHost 192.168.1.64

　　 　　DocumentRoot /usr/local/www/data

　　ServerName freebsd.example.org.cn

　　 　　 　　DocumentRoot /vhost1

　　ServerName vhost1.example.org.cn

　　 　　 　　DocumentRoot /vhost2

　　ServerName vhost2.example.org.cn

　　 　　 　　 　　　　这里需要注意的是，VirtualHost的参数地址一定要和NameVirtualHost定义的地址相一致，必须保证所有的值严格一致，Apache服务器才承认这些定义是为这个IP地址定义的虚拟主机。

　　 　　　　此外，定义过NameVirtualHost之后，那么对这个IP地址的访问都被区分不同的虚拟主机进行处理，而对其他IP地址的访问，例如127.0.0.1，才应用前面定义的缺省选项。

　　 　　 　　----------------------------------------------------------------------------------------

　　 　　 　　NameVirtualHost www.xxx.org

　　（对于动态IP的另类方法：指定虚拟主机的IP，由于要将域名映射为IP，不能使用localhost,127.0.0.1,计算机名，等这样的地址，所以，可以再一次通过域名转换，将域名转换为IP，这样就不必每次更改IP了。）

　　 　　#

　　# VirtualHost example:
　　# Almost any Apache directive may go into a VirtualHost container.
　　# The first VirtualHost section is used for requests without a known
　　# server name.
　　#
　　<VirtualHost 192.168.0.1>（虚拟主机IP）
　　 ServerAdmin 111@xxx.com（第一个虚拟主机Email）
　　 DocumentRoot H:/web001（第一个虚拟主机目录）
　　 ServerName www.xxx.org（第一个虚拟主机域名）
　　 ErrorLog logs/www.xxx.org-error.log（第一个虚拟主机错误日志）
　　 CustomLog logs/www.xxx.org-access.log common（第一个虚拟主机数据）
　　</VirtualHost>

　　 　　<VirtualHost 192.168.0.2>（虚拟主机IP）

　　 ServerAdmin 111@xxx.com（第二个虚拟主机Email）
　　 DocumentRoot H:/web002（第二个虚拟主机目录）
　　 ServerName www.xxx2.org（第二个虚拟主机域名）
　　 ErrorLog logs/www.xxx2.org-error.log（第二个虚拟主机错误日志）
　　 CustomLog logs/www.xxx2.org-access.log common（第二个虚拟主机数据）
　　</VirtualHost>

　　 　　以此类推，可以增加更多虚拟主机。

参考
-

- <php100.com>