#!/bin/sh

# Function to print information related to current command
print_command_info () {
    echo $1
}

# Updating packages
print_command_info UPDATES-BEING-INSTALLED
sudo yum update -y

# Setting up the cli
print_command_info PATH-SET-LINUX
PATH=/usr/bin:/usr/local/sbin:/sbin:/bin:/usr/sbin:/usr/local/bin:/opt/aws/bin:/root/bin


#installing node server
curl -sL https://rpm.nodesource.com/setup_6.x | sudo -E bash -
sudo yum install nodejs --enablerepo=nodesource -y

# Commands to install Mysql and Make it a service
print_command_info INSTALLING-MARIADB-SERVER
sudo yum install -y mariadb-server
print_command_info STARTING-MARIADB-SERVER
sudo systemctl start mariadb
print_command_info ENABLING-DEFAULT-BOOT-STARTUP-MARIADB
sudo systemctl enable mariadb

# Creating database for application to connect.
print_command_info CREATING-DATABSE-webserver
mysql --user=root <<_EOF_
CREATE DATABASE webserver;
_EOF_

# Listing files in tmp folder
print_command_info LISTING-TMP-FOLDER-FILES
sudo ls -l /tmp

#settingup node
print_command_info SETTING-NODE-FILES
mkdir webserver
unzip /tmp/webserver webserver/

# Changing permissions for running startup script
print_command_info CHANGING-PERMISSIONS-FOR-STARTUP-SCRIPT
sudo chmod 777 /tmp/node_startup.sh

# Command to run application make it a Service to run on boot.
print_command_info MOVING-APPLICATION-BOOT-SERVICE
sudo mv /tmp/application_boot.service /etc/systemd/system/application_boot.service
print_command_info CHANGING-PERMISSIONS-OF-APPLICATION-BOOT-FILE
sudo chmod 644 /etc/systemd/system/application_boot.service
print_command_info ENABLING-BOOT-UP-FOR-APP
sudo systemctl enable application_boot.service


