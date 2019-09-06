# Spaced-Repetition API

This back-end web server utilizes spaced repetition to help people memorize words in French. It hosts words in French and asks you to recall the translation of the corresponding word in English.

As a prospective user, you can register an account so that you can login and use the application to save your progress. As a registered user, you can login to the application to begin learning.

The home dashboard shows your language, words to learn, and score for each word. The learning page asks you to input the translation of a word, which will subsequently give you feedback on whether you were correct. The words that you miss more frequently are shown more frequently. Upon mastery of each word, each word will get asked progressively less often.

### Live Demo (front and backend): https://spacedrepetitionlearn.now.sh
### backend domain (for HTTP request purposes): https://spaced-rep-server1.herokuapp.com

![Register page](https://github.com/RobertWiggins/spaced-repetition-client/blob/orphan-assets/screenshots/register.jpg "Register page")  
  
![Learning dashboard](https://github.com/RobertWiggins/spaced-repetition-client/blob/orphan-assets/screenshots/dashboard.jpg "learning dashboard")  
  
![Word translation question page](https://github.com/RobertWiggins/spaced-repetition-client/blob/orphan-assets/screenshots/apprende_word.jpg "Word translation question page")  
  
![Answer result feedback page](https://github.com/RobertWiggins/spaced-repetition-client/blob/orphan-assets/screenshots/answer_result.jpg "Answer result feedback page")  


## Getting Started
These instructions will get you a copy of the front-end project up and running on your local machine for development and testing purposes. This client runs locally in conjunction with the Spaced-Repetition client, which can be found at https://github.com/thinkful-ei-dragonfly/spaced-repetition-api-rob-michaelR).

## Local dev setup

If using user `dunder-mifflin`:

```bash
mv example.env .env
createdb -U dunder-mifflin spaced-repetition
createdb -U dunder-mifflin spaced-repetition-test
```

If your `dunder-mifflin` user has a password be sure to set it in `.env` for all appropriate fields. Or if using a different user, update appropriately.

```bash
npm install
npm run migrate
env MIGRATION_DB_NAME=spaced-repetition-test npm run migrate
```

And `npm test` should work at this point

## Configuring Postgres

For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   1. E.g. for an OS X, Homebrew install: `/usr/local/var/postgres/postgresql.conf`
   2. E.g. on Windows, _maybe_: `C:\Program Files\PostgreSQL\11.2\data\postgresql.conf`
   3. E.g  on Ubuntu 18.04 probably: '/etc/postgresql/10/main/postgresql.conf'
2. Find the `timezone` line and set it to `UTC`:

```conf
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests mode `npm test`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate -- 0`


## Prerequisites
- Node.js
- NPM (Node Package Manager)
- PostgreSQL


## Built With
- Node package manager - Dependency Management
- Node.js
- Express
- Chai, Mocha


## Endpoints

### User Registration endpoint
`POST https://spaced-rep-server1.herokuapp.com/api/user`
- request body = { password: 'pw', username: 'user', name: 'name of user' }

### Authentication endpoint
`POST https://spaced-rep-server1.herokuapp.com/api/auth/token`
- returns a json web token
- request body: { username: 'username', password: 'password'

`PUT https://spaced-rep-server1.herokuapp.com/api/auth/token`
- returns a json web token
- request body: { id, name }

### Language endpoint
`GET https://spaced-rep-server1.herokuapp.com/api/language`
- returns the foreign language words in database

`GET https://spaced-rep-server1.herokuapp.com/api/language/head`
- returns word at beginning of list

`POST https://spaced-rep-server1.herokuapp.com/api/language/guess`
- submits a new guess for the next word in the list
- request body = { guess: 'guess' }


### Authors
- Robert Wiggins 
- Michael Romero
- tomatou (github) - authentication starter code
- Jonathan Lassen - authentication starter code 
