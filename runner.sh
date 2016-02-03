#! /bin/sh

pkill grunt
pkill node

json-proxy -p 8080 -f "/api=http://localhost:8081" -f "/liber=http://localhost:8082" &
cd /vagrant/services
grunt &
cd /vagrant/web
grunt &
