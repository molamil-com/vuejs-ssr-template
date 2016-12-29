#!/bin/bash

path_to_dist=$1
cd "$(dirname "$0")/release"; mkdir app; cd app

echo "preparing slug assets..."
cp $path_to_dist/package.json .
cp -r $path_to_dist/dist .

echo "preparing slug runtime"
npm install --production
curl http://nodejs.org/dist/v6.7.0/node-v6.7.0-linux-x64.tar.gz | tar xzv > /dev/null 2>&1

echo "packaging slug..."
cd ..
tar czfv slug.tgz "$(PWD)/app" > /dev/null 2>&1

ls -la
ls -la ./app
