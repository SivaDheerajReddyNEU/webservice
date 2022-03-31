#!/bin/sh

sudo systemctl stop application_boot.service

pwd 
ls -al
cp -r  ./source mysql.config /tmp/webserver/
pwd 
ls -al
cd
pwd 
ls -al
mkdir webserver
pwd 
ls -al
cp -r  /tmp/webserver ./webserver
pwd 
ls -al