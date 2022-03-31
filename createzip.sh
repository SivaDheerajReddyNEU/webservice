#!/bin/sh

mkdir webserver
cp -r ./source webserver/
cp mysql.config webserver/
cp -r codedeploy webserver/
zip -r webserver.zip webserver/