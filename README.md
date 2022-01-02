# portfolio_backend

## Prerequisites

Node version 14.5.0
MongoDb version 4.4.11

# Install node packages

    npm install

# Staring Node app

    NODE_ENV=local nodemon server.js

# Mongodb Install Link

    https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#uninstall-mongodb-community-edition

# Installing mongodb v4.4.1 in ubuntu 20

    wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
    sudo touch /etc/apt/sources.list.d/mongodb-org-4.4.list
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org=4.4.1 mongodb-org-server=4.4.1 mongodb-org-shell=4.4.1 mongodb-org-mongos=4.4.1 mongodb-org-tools=4.4.1

# Starting mongodb

    sudo systemctl start mongod
    sudo systemctl status mongod

# Stopping Mongodb

    sudo systemctl stop mongod
