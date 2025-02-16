#!/bin/bash


# Update 
sudo apt update -y 
sudo apt upgrade -y

# Delete previous server
echo "Delete all previous server"
pm2 stop all
pm2 delete all
pm2 flush
rm -rf /home/shayon/youthspikersleague.com
sudo rm -rf  /var/www/youthspikersleague.com
cd 
rm -rf youthspikersleague.com
ls 
ls -la 
ls -la /var/www/
echo "Deleted all previous files for the website"

# Clone and setup repository
git clone git@github.com:MdSamsuzzohaShayon/mern-spikeball-tournament.git
mv mern-spikeball-tournament youthspikersleague.com


# Setup frontend
cd /home/shayon/youthspikersleague.com/client
# /var/www/youthspikersleague.com/html
# cat /etc/nginx/sites-available/youthspikersleague.com
npm install
nano src/utils/global.ts
npm run build
sudo mkdir /var/www/youthspikersleague.com
sudo cp -r dist/* /var/www/youthspikersleague.com
rm -rf node_modules
sudo systemctl restart apache2

# Setup backend
cd /home/shayon/youthspikersleague.com/server
npm install
cat config/.env.example
nano config/.env
pm2 start pm2.ecosystem.json
pm2 save
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u shayon --hp /home/shayon
pm2 show Scramble_BackendAPI_9001
pm2 show Scramble_BackendAPI_9002
pm2 show Scramble_BackendAPI_9003



# Test
curl --location 'https://youthspikersleague.com/api/home'
curl --location 'https://youthspikersleague.com/api/home'
curl --location 'https://youthspikersleague.com/api/home'
curl --location 'https://youthspikersleague.com/api/home'