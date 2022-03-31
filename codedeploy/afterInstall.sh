#!/bin/sh

sudo systemctl stop application_boot.service

mkdir /tmp/webserver
cp -r  ./source mysql.config /tmp/webserver/
cd
mkdir webserver
cp -r  /tmp/webserver ./webserver
