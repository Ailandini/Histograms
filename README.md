# Histograms
Kata for Typescript API Historgram generation


## Setup

In the terminal of your choosing:
1. run `npm i`
2. run `./run_api.sh`

The run script will create the docker container, database, run the migrations, upload the test data, and start the server.

You can close the server by pressing `CTRL + C` and restart the server without destroying the database and starting from scratch by running `npx ts-node src/app.ts`

## API
The api urls are configured as per the spec: `localhost:8000/<ColumnName>/histogram` 
The api returns a simple html <div> wrapped element for holding the data
A courtesy endpoint at `/` is provided for quick navigation.