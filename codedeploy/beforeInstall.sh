#!/bin/sh

sudo systemctl stop application_boot.service
rm -r ./source/ package-lock.json package.json startup.sh README.md node_startup.sh manifest.json aws-linux-ami.pkr.hcl appspec.yml application_boot.service test/ node_modules