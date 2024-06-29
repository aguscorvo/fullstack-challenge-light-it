# Fullstack Challenge

## Before running the project

I've sent a Dashlane link with `.env` variables as well as the credentials needed to log in to my Mailtrap account. If there is an issue accessing them, please contact me.

After logging into Mailtrap, go to: [Mailtrap Inboxes](https://mailtrap.io/inboxes), select "My Inbox," and wait until you create a new Patient record.

## How to run

1. Copy `.env.example` to `.env` and fill in the variables.

2. Check the MySQL port specified in `docker-compose.yml` to ensure it's not in use. If it is, modify the port number.

3. Clone the repo and navigate to the root folder. To start the project:

```sh
  docker-compose build --no-cache && docker-compose up
```

4. Once the containers are running you can access:

- Swagger: http://localhost:8000/docs
- Frontend: http://localhost:5137/

Stop the containers and remove them and images and volumes created by the previous command:

```sh
docker-compose down
```
