#!/bin/sh

sudo systemctl stop application_boot.service
echo "start"
pwd 
ls
echo "removing old webserver"
rm -rf /tmp/webserver.zip
cd
echo "home directory"
rm -rf "webserver"
echo "end"
