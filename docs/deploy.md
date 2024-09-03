# deploy

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

```sh
pnpm prisma db push --schema=./src/prisma/db-event/schema.prisma
```