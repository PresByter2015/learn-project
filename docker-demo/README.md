# docker 入门及学习
- [官方文档](https://docs.docker.com/engine/reference/commandline/container_logs/)
## 安装
在centos下安装

首先，为了方便添加软件源，以及支持 devicemapper存储类型，安装如下软件包:
$ sudo yum update
$ sudo yum install -y yum-utils device-mapper-persistent-data \ lvm2
添加 Docker稳定版本的 yum 软件源:
$ sudo yum-config-manager  --add-repo https://download.docker.com/linux/centos/docker-ce.repo
之后更新 yum 软件源缓存，并安装 Docker:
$ sudo yum update
$ sudo yum install -y docker-ce
最后，确认 Docker 服务启动正常 :
$ sudo systernctl start docker 
报错 systernctl 不是 command的话，启动不了的话，换service docker start
## 简单命令
service docker start   启动
service docker restart 重启
docker image ls 或 docker images  查看所有镜像

获取镜像
docker pull ubuntu:18.04 （获取乌班图 18.04 版本；不写的话，默认lastest版本，会自动更新，不建议使用）

添加镜像 标签
docker tag ubuntu:18.04 myubuntu:18.04

查看镜像信息
docker image inspect ubuntu:18.04

查看镜像历史
docker history ubuntu:18.04

搜寻镜像
docker search --filter=is-official=true nginx

删除和清理镜像
docker rmi ubuntu:latest

使用ID来删除镜像
docker rmi c3c304cb4f22

可以看到本机上存在的所有容器
docker ps -a

强行 删除和清理镜像
docker rmi -f ubuntu:18.04

清理镜像
docker image prune

> 注意⚠️：当有该镜像创建的容器存在时， 镜像文件默认是无法被删除的
>  进入镜像
> docker run ubuntu:18.04 echo 'hello! I am here!'
> 查看所有容器
> docker ps -a
> 删除所有容器id
> docker rm 10f9a8717f89
> 删除镜像id
> docker rmi c3c304cb4f22
> 清理镜像
> docker image prune

- 创建容器
 docker create -it ubuntu:18.04
 docker create --name newnginx nginx:latest  //使用nginx的镜像来创建一个名叫newnginx的容器
- 查看所有容器
 docker ps -a
- 启动容器
 docker start b5ed9611a72c
- 查看运行的容器
 docker ps
 docker container ls
- 查看 容器 日志
docker logs -f -t --since="2018-02-08" --tail=100 3461f97e546c
- 启动容器 docker start [NAMES | CONTAINER ID];还可以在 docker ps 中查看；在STATUS可以看到状态。
docker start test
docker start 2093599dde2c
- 暂停容器 docker pause [NAMES | CONTAINER ID];还可以在 docker ps 中查看；在STATUS可以看到状态。
docker pause test
docker pause 2093599dde2c
- 开启容器 docker unpause [NAMES | CONTAINER ID];还可以在 docker ps 中查看；在STATUS可以看到状态。
docker unpause test
docker unpause 2093599dde2c
- 中止容器 docker stop [NAMES | CONTAINER ID];还可以在 docker ps 中查看；是否存在。
docker stop test
docker stop 2093599dde2c
- 所有容器的id
 docker ps -qa
- 进人容器 docker attach [NAMES | CONTAINER ID];还可以在 docker ps 中查看；是否存在。
docker attach test
docker attach 2093599dde2c
通过 指定 -it 参数来保持标准输入打开，并且分配一个伪终端。通过exec命令对容器执行操作是最为推荐的方式。 
docker exec -it b5ed9611a72c /bin/bash
- 删除容器 docker rm [NAMES | CONTAINER ID];必须在容器 stop 之后才可以。
docker rm test
docker rm 2093599dde2c

- 导出容器 docker export [NAMES | CONTAINER ID] > [filename];
docker export laughing_wozniak > latest.tar
docker export 3461f97e546c > latest3.tar
docker export --output="latest.tar" 3461f97e546c
docker export -o="latest4.tar" 3461f97e546c
使用ls 会看到 latest2.tar  latest3.tar  latest4.tar latest.tar 这4个文件

- 查看容器信息 docker container inspect [NAMES | CONTAINER ID]。
docker container inspect laughing_wozniak
docker container inspect 3461f97e546c
- 查看容器-进程 docker top [NAMES | CONTAINER ID]。
docker top newnginx
- 68
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
