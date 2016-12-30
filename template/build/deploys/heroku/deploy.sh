#!/bin/bash
export PYTHONIOENCODING=utf8

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
tar czfv slug.tgz "./app" > /dev/null 2>&1

echo "deploying slug..."
resp=$(curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/vnd.heroku+json; version=3' -H "Authorization: Bearer 9ae7a056-1aa4-429b-b42b-302db081fe2d" -d '{"process_types":{"web":"node-v6.7.0-linux-x64/bin/node dist/server.js"}}' 'https://api.heroku.com/apps/r24syv-frontend-staging-v2/slugs')

url=$(echo ${resp} | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["blob"]["url"];')
slug=$(echo ${resp} | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["id"];')

curl -X PUT -H "Content-Type:" --data-binary @slug.tgz $url
curl -X POST -H "Accept: application/vnd.heroku+json; version=3" -H "Content-Type: application/json" -H "Authorization: Bearer ${DEPLOY_KEY}" -d '{"slug":'\"${slug}\"'}' https://api.heroku.com/apps/r24syv-frontend-staging-v2/releases
