#!/bin/sh

sudo systemctl stop application_boot.service

pwd 
ls
cd
pwd 
ls
unzip /tmp/webserver.zip -d ./
cd webserver
cp amazon-cloudwatch-agent.json /tmp/amazon-cloudwatch-agent.json
npm ci
cp /tmp/mysql.config .
pwd 
ls
touch log.txt
sudo chmod 777 log.txt