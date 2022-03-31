#!/bin/sh

sudo systemctl stop application_boot.service
echo "start"
pwd 
ls
echo "removing old webserver"
rm -rf /tmp/webserver.zip
echo "end"
