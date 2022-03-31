#!/bin/sh

sudo systemctl stop application_boot.service

mkdir 
mv -r ./* /tmp/webserver/
cd
mv -r /tmp/webserver webserver
