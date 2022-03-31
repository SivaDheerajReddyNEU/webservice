#!/bin/sh

sudo systemctl stop application_boot.service

mkdir /tmp/webserver
mv  ./* /tmp/webserver/
cd
mkdir webserver
mv  /tmp/webserver ./webserver
