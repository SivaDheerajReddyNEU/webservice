#!/bin/sh

sudo systemctl stop application_boot.service

pwd 
ls
cp -r  ./source mysql.config /tmp/webserver/
pwd 
ls
cd
pwd 
ls
mkdir webserver
unzip webserver.zip -o webserver/
pwd 
ls
cp -r  /tmp/webserver ./webserver
pwd 
ls