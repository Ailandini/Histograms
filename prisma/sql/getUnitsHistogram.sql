SELECT "units", count(*) as "count" from "Commodity"
GROUP BY "units"
ORDER BY "units"