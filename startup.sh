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

#cleaning up old caching agent info 
CODEDEPLOY_BIN="/opt/codedeploy-agent/bin/codedeploy-agent"
$CODEDEPLOY_BIN stop
yum erase codedeploy-agent -y

#installing code deploy
sudo yum install ruby -y
cd /home/ec2-user
wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent status

#installing node server
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash - 
sudo yum install nodejs --enablerepo=nodesource -y

# Listing files in tmp folder
print_command_info LISTING-TMP-FOLDER-FILES
sudo ls -l /tmp

#installing cloud watch
print_command_info INSTALLING-CLOUD-WATCH-AGENT
sudo yum install amazon-cloudwatch-agent -y
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/tmp/amazon-cloudwatch-agent.json -s

# Changing permissions for running startup script
print_command_info CHANGING-PERMISSIONS-FOR-STARTUP-SCRIPT
sudo chmod 777 /tmp/node_startup.sh

# Command to run application make it a Service to run on boot.
print_command_info MOVING-APPLICATION-BOOT-SERVICE
sudo mv /tmp/application_boot.service /etc/systemd/system/application_boot.service
print_command_info CHANGING-PERMISSIONS-OF-APPLICATION-BOOT-FILE
sudo chmod 777 /etc/systemd/system/application_boot.service
print_command_info ENABLING-BOOT-UP-FOR-APP
sudo systemctl enable application_boot.service


