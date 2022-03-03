#!/bin/sh

rm -rf webserver;
mkdir webserver;
cd ./webserver;
cp /tmp/webserver.zip .
unzip webserver.zip
node source/main.js
