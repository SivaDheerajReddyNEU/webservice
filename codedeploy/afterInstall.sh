#!/bin/sh

sudo systemctl stop application_boot.service


mv -r ./* /tmp/webserver/
cd
mkdir webserver
mv -r /tmp/webserver ./webserver
