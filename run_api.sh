echo "*** Tearing Down Old Db ***"
docker-compose down -v

echo "*** Starting Up New Db ***"
docker-compose up -d
sleep 5

echo "*** Running Migrations ***"
npx prisma generate
sleep 5

echo "*** Upload Test Data ***"
npx ts-node test-data/csvUploader.ts

echo "*** Starting Server ***"
npx ts-node src/app.ts

sleep 2
echo "*** Server Started ***"