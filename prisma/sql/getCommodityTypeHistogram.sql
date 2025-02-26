SELECT "commodity_type", count(*) as "count" from "Commodity"
GROUP BY "commodity_type"
ORDER BY "commodity_type"