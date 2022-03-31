#!/bin/sh

sudo systemctl stop application_boot.service
echo "start"
pwd 
ls
echo "removing old webserver"
rm -rf /tmp/webserver
echo "Creating  webserver folder in temp"
mkdir /tmp/webserver
echo "end"
