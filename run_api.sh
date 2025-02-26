#!/bin/bash

echo "*** Tearing Down Old Db ***"
docker-compose down -v

echo "*** Starting Up New Db ***"
docker-compose up -d

echo "*** Waiting for Database to be Ready ***"
until docker exec histograms-kata pg_isready -U postgres -d commodities; do
  echo "Waiting for database..."
  sleep 2
done

echo "*** Database is Ready ***"

npx prisma migrate dev --name initialize_commodities  
sleep 2

echo "*** Running Migrations ***"
npx prisma generate --sql

echo "*** Upload Test Data ***"
npx ts-node test-data/csvUploader.ts

echo "*** Starting Server ***"
npx ts-node src/app.ts

sleep 2
echo "*** Server Started ***"