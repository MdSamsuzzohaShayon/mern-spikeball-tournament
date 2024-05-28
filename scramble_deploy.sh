#!/bin/bash


# Delete previous server
pm2 stop Scramble_BackendAPI
pm2 delete Scramble_BackendAPI

# Clone and setup repository
git clone git@github.com:MdSamsuzzohaShayon/mern-spikeball-tournament.git
mv mern-spikeball-tournament youthspikersleague.com

# Setup backend
cd /home/shayon/youthspikersleague.com/server
npm install
cat config/.env.example
nano config/.env
pm2 start app.js --name Scramble_BackendAPI
pm2 save
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u shayon --hp /home/shayon
curl http://localhost:9000/api/home

# Setup frontend
cd /home/shayon/youthspikersleague.com/client
# /var/www/youthspikersleague.com/html
# cat /etc/nginx/sites-available/youthspikersleague.com
npm install
nano src/utils/global.ts
npm run build
sudo rm -rf  /var/www/youthspikersleague.com
sudo mkdir /var/www/youthspikersleague.com
sudo cp -r dist/* /var/www/youthspikersleague.com