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
pwd 
ls
cp -r  /tmp/webserver ./webserver
pwd 
ls