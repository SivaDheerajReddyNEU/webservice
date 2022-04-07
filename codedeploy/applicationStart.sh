#!/bin/sh
pwd 
ls -al
sudo systemctl start application_boot.service
sudo systemctl start amazon-cloudwatch-agent.service
pwd 
ls -al