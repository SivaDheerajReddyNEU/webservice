#!/bin/sh

mkdir webserver
cp -r ./source webserver/
cp mysql.config webserver/
cp package.json webserver/
cp package-lock.json webserver/
cp README.md webserver/
cp amazon-cloudwatch-agent.json webserver/
cp -r codedeploy webserver/
zip -r webserver.zip webserver/