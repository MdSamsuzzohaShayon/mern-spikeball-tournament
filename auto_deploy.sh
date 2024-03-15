#!/bin/bash

# Deploy Backend
echo "Deploy Node js Server"
pm2 stop BackendAPI
pm2 delete BackendAPI
pm2 flush
pm2 save

rm -rf mern-spikeball-tournament
git clone git@github.com:MdSamsuzzohaShayon/mern-spikeball-tournament.git
cd /home/alex/mern-spikeball-tournament
git switch development
cd server
npm install
nano config/.env
pm2 start pm2.ecosystem.json

# Deploy frontend
echo "Deploy React Client"
cd /home/alex/mern-spikeball-tournament/client
npm install
nano src/utils/global.ts
npm run build
ls
sudo rm -rf /var/www/youthspikersleague.com
sudo cp -R dist /var/www/youthspikersleague.com
