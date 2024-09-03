# deploy

```sh
sudo ufw allow from 192.168.x.x to any port 22
sudo ufw status
sudo ufw enable
sudo ufw status numbered
sudo ufw allow https
```

## install npm

```sh
sudo apt install npm
sudo npm install -g pnpm
```

```sh
mkdir -p www/event
cd www/event
git clone https://github.com/vatoer/event.git .

pnpm install
```

## install database postgresql

```sh
sudo apt install postgresql postgresql-contrib -y
```

## Step-by-Step Guide to Use scram-sha-256 Authentication: change from peer

```sh
sudo nano /etc/postgresql/12/main/pg_hba.conf
```

- Modify the Authentication Method: Find the line that looks like this: change peer to scram-sha-256

```conf
local   all             postgres                                peer
```

switch tp postgres user;

```sh
sudo -i -u postgres
psql
```

```sql
ALTER USER postgres PASSWORD 'your_password';
```

exit PostgreSQL prompt and then exit `postgres` user shell

```sh
\q
```

restart postgresql

```sh
sudo systemctl restart postgresql
```

## Create user for event

```sh
sudo -i -u postgres
psql
```

generate text to be a password

```sh
openssl rand -base64 16
```

```sql
CREATE USER eventusr WITH PASSWORD 'YOUR-PASSWORD';
CREATE DATABASE eventdb OWNER eventusr;
GRANT ALL PRIVILEGES ON DATABASE eventdb TO eventusr;
\q
```

- test newly created user
  
```sh
psql -U eventusr -d eventdb -h localhost -W
```

copy .env.dist to .env

```sh
cp .env.dist .env
```

set your password


## push database

```sh
pnpm prisma db push --schema=./src/prisma/db-event/schema.prisma
```

## seed database

```sh
pnpm prisma db seed
```

### for convenience add access database to your comp

```sh
sudo ufw allow from 192.168.x.x to any port 5432
sudo ufw status
```

## install nginx and pm2

```sh
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl status nginx
sudo npm install -g pm2
```

### Configure Nginx: Create a new Nginx configuration file for your Next.js application.

<https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04>

```sh
sudo touch /etc/nginx/sites-available/event-app
```

fill the conf from `docs/event.conf`

```sh
sudo ln -s /etc/nginx/sites-available/event-app /etc/nginx/sites-enabled/
```

check config

```sh
sudo nginx -t
```

### install certbot

make sure port 80 is open during cert request

```sh
sudo apt update
sudo apt install certbot python3-certbot-nginx

sudo certbot --nginx -d event.ambassade-indonesie.fr
```

```sh
sudo certbot renew --dry-run
```

```sh
pnpm build
pm2 start pnpm --name "event-app" -- start --port 3000
pm2 start pnpm --name "event-app" -- start --port 3001
```