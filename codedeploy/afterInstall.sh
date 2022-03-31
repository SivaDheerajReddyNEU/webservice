#!/bin/sh

sudo systemctl stop application_boot.service

pwd 
ls
cd
pwd 
ls
unzip /tmp/webserver.zip -d ./
cd webserver
npm ci
cp /tmp/mysql.config webserver/
pwd 
ls