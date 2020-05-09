#使用此方案可以较好的兼容现有启动结构，建议使用。
#!/bin/sh 
cd /opt/uyun/show/nginx/sbin
#增加权限
chmod a+x nginx
#执行nginx，务必加上非daemon运行，否则程序会自动关闭。
./nginx -p .. -g 'daemon off;'
#这句不能省。
cd -