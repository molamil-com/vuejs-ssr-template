#!/bin/bash
export PYTHONIOENCODING=utf8
PATH_TO_DIST=$1; HEROKU_APP=$2

slugs_endpoint=https://api.heroku.com/apps/$HEROKU_APP/slugs
releases_endpoint=https://api.heroku.com/apps/$HEROKU_APP/releases

cd "$(dirname "$0")/release"; mkdir app; cd app

echo "preparing slug assets..."
cp $PATH_TO_DIST/package.json .
cp -r $PATH_TO_DIST/dist .

echo "preparing slug runtime"
npm install --production
curl http://nodejs.org/dist/v6.9.3/node-v6.9.3-linux-x64.tar.gz | tar xzv > /dev/null 2>&1

echo "packaging slug..."
cd ..
tar czfv slug.tgz "./app" > /dev/null 2>&1

echo "deploying slug..."
resp=$(curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/vnd.heroku+json; version=3' -H "Authorization: Bearer ${DEPLOY_KEY}" -d '{"process_types":{"web":"node-v6.9.3-linux-x64/bin/node dist/server.js"}}' $slugs_endpoint)

blob_url=$(echo ${resp} | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["blob"]["url"];')
slug_id=$(echo ${resp} | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["id"];')

curl -X PUT -H "Content-Type:" --data-binary @slug.tgz $blob_url
curl -X POST -H "Accept: application/vnd.heroku+json; version=3" -H "Content-Type: application/json" -H "Authorization: Bearer ${DEPLOY_KEY}" -d '{"slug":'\"${slug_id}\"'}' $releases_endpoint
