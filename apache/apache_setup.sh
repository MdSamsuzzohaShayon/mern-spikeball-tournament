#!/bin/bash

# Function to log messages
log() {
    echo "$(date +"%Y-%m-%d %T") $1" >> /var/log/apache_setup.log
}

# Check for dependencies
if ! command -v ufw &> /dev/null; then
    log "WARNING: UFW (Uncomplicated Firewall) is not installed."
fi

if ! command -v certbot &> /dev/null; then
    log "WARNING: Certbot is not installed."
fi

# ===== APACHE CONFIGURATION =====
echo "Do you want to completely remove Apache? (y/n)"
read REMOVE
if [ "$REMOVE" = "y" ]; then
    sudo apt purge apache2 -y
    sudo rm -rf /etc/apache2
    log "Apache has been removed."
fi

echo "Do you want to install Apache again? (y/n)"
read REINSTALL
if [ "$REINSTALL" = "y" ]; then
    sudo apt update
    sudo apt install apache2 -y
    if systemctl status apache2 &> /dev/null; then
        log "Apache has been installed successfully."
        sudo systemctl status apache2
        if command -v ufw &> /dev/null; then
            log "Firewall status:"
            sudo ufw status
            sudo ufw allow 'Apache'
            sudo ufw allow 'Apache Full'
            sudo ufw status
        fi
    else
        log "Failed to install Apache."
    fi
fi

# ===== FRONTEND CONFIGURE =====
if [ ! -f /etc/apache2/sites-available/youthspikersleague.conf ]; then
    sudo nano /etc/apache2/sites-available/youthspikersleague.conf
    sudo a2ensite youthspikersleague.conf
fi

if [ ! -d /var/www/youthspikersleague.com ]; then
    sudo mkdir /var/www/youthspikersleague.com
fi

if [ ! -f /var/www/youthspikersleague.com/index.html ]; then
    sudo nano /var/www/youthspikersleague.com/index.html
fi

sudo systemctl reload apache2
sudo systemctl restart apache2

# ===== BACKEND CONFIGURATION =====
if [ ! -f /etc/apache2/sites-available/api.youthspikersleague.conf ]; then
    sudo nano /etc/apache2/sites-available/api.youthspikersleague.conf
    sudo a2enmod proxy
    sudo a2enmod proxy_http
    sudo a2ensite api.youthspikersleague.conf
fi

sudo systemctl restart apache2
sudo systemctl reload apache2
sudo apachectl configtest

# ===== SSL CONFIGURE =====
sudo apt update
sudo apt install certbot python3-certbot-apache -y

sudo certbot --apache -d youthspikersleague.com -d api.youthspikersleague.com

sudo crontab -l > /tmp/crontab.backup
echo "0 0 * * * /usr/bin/certbot renew >> /var/log/letsencrypt/renew.log" >> /tmp/crontab.backup
sudo crontab /tmp/crontab.backup
rm /tmp/crontab.backup

log "Setup completed successfully."