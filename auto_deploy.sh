#!/bin/bash

# Deploy Backend
pm2 stop BackendAPI
pm2 delete BackendAPI
pm2 flush
pm2 save

rm -rf mern-spikeball-tournament
git clone git@github.com:MdSamsuzzohaShayon/mern-spikeball-tournament.git
cd /home/alex/mern-spikeball-tournament/server
npm install
nano config/.env
pm2 start pm2.ecosystem.json

# Deploy frontend
cd /home/alex/mern-spikeball-tournament/client
npm install
npm run build
nano src/utils/global.ts
ls
