#!/bin/sh

sudo systemctl stop application_boot.service


mv  ./* /tmp/webserver/
cd
mkdir webserver
mv  /tmp/webserver ./webserver
