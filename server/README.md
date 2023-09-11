# Server side implementeation

code to run to start the backend end

### clone the repo

```
git clone <http:///.........>

```

### install all dependencies server folder

in the terminal of the server folder cd./ server run the following comand

```
npm i
```

### Initialize prisma instance

this might throw an erorr if the current project already has it just skip this step if it does

```
npx prisma init
```

### generate a new prisma model using the current model set

Now that we have our model created in the schema file, we can now generate the prisma client by running the following command in the terminal. The prisma client is used to run queries on your db.

```
npx prisma generate
```

### migrate the modals to the database

Now we will migrate our db which will create a sql file of our current schemas and sync our postgres db with any prisma schemas we have.

Run the following command in your terminal and enter any name you’d like when it prompts you for a migration name.

```
npx prisma migrate dev
```

### add data to the tables

If you have existing data that you want to add to your db, you can do so by seeding it, you can learn how to do this here. I am not going to be doing this today, I am just going to be adding a couple users through prisma studio.

In your terminal, type in the following command

```
npx prisma studio
```

## Start your server

```
npm start

```

also make sure your database url is in the .env file

DATABASE_URL= "postgress://yoururl here"
