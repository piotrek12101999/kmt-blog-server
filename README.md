<h1 align="center"> <strong> KMT BLOG PROJECT </strong> </h1>

<br />
<br />
<div align="center"><img src="https://imgur.com/1MfnLVl.png" /></div>

## BACK-END

This project was generated by [Piotr Świątek](https://github.com/piotrek12101999) and
it's being developed as open-source project in order to help young IT students at KMT (and not only)
improve their coding skills

### Quick message

I'm aware that steps that I'm about to list down below can be quite boring or suprising for more advanced and experienced developers but this project is meant to be good start point for students and newbies. :information_desk_person:	
<br />
<br />
P.S I'm human, <strike> I make mistakes </strike> so this project might have some things that are overengineered or just stupid and can be done better, feel free to contribute then!
<br />
<br />
P.S 2 Yeah I'm aware and ashamed of `@ts-ignore`

### Usage

#### Step 1:
Download repository

#### Step 2:
Install node.js on your local machine from [here](https://nodejs.org/en/download/)

#### Step 3:
Open your preffered code editor at downloaded repository (I suggest [this one](https://code.visualstudio.com/) becouse it has great typescript support)

#### Step 4:
Open terminal / cmd and run `npm start`, this command will download all necessery packages from [node pacakge manager](https://www.npmjs.com/), place where you'll find all things that you need.

#### Step 5:
Install and setup docker (since we are using prisma that is containerized we need to use docker, right?) Install it from [here](https://www.docker.com/products/docker-desktop)

#### Step 6:
Install prisma by running `npm i -g prisma`

#### Step 7:
Setup your database locally or host it (in this project I use [PostgreSQL](https://www.postgresql.org/) becouse in this app there are a lot of relations beetwen different fields in db and it won't take advantage of NoSQL benefits like better read performance or lack of schema. But you are free to use db of your choice that is supported currently by prisma).

#### Step 8:
Run `prisma init` and enter all of your credentials. When you'll be asked to choose client pick *TypeScript Client*. This command will create 3 files:
* prisma.yml
* datamodel.prisma
* docker-compose.yml

#### Step 9:
Delete datamodel.prisma file and change `datamodel:datamodel.prisma` inside of prisma.yml file to `datamodel:datamodel.graphql`

#### Step 10:
Run `docker-compose up -d` command. After successful ran of command prisma service should be running on **4466** port on localhost. (If you are using windows and localhost:4466 doesn't respond try to navigate to http://127.0.0.1:4466)

#### Step 11:
Generate .env file that should consists of 3 variables:
* JWT_PASSWORD
* PASSWORD_SALT
* PRISMA_SECRET
<br />
in PRISMA_SECRET variable you should keep your prisma passsword. Also **IMPORTANT** add `secret:${PRISMA_SECRET}` field to prisma.yml file inside of prisma directory

#### Step 12:
Run `prisma deploy` command while being inside of prisma directory

#### Step 13:
Fetch newly generated schema by running `npm run get-schema` command while being inside of root project directory

####
Finally run `npm start` and navigate to localhost:4000


### Additional informations

This project also contains [front-end version](https://github.com/piotrek12101999/kmt-blog-client)

In order to get required passwords for learning or development purposes contact mr Marek Sentfleben, mr Michal Sikorski or [Piotr Świątek](https://github.com/piotrek12101999)

## Learn more

You can learn more about TS here: [https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

To learn graphql click here: [https://graphql.org/learn/](https://graphql.org/learn/)
