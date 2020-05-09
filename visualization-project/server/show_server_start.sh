#使用此方案可以较好的兼容现有启动结构，建议使用。
#!/bin/sh 
cd /opt/uyun/show/bin
#增加权限
chmod a+x show-server
#务必用点（source）的方式，否则变量可能丢失，start.sh为bat原有启动脚本。
./show-server
#这句不能省。
cd -