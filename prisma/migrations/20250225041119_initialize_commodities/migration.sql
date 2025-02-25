-- CreateTable
CREATE TABLE "Commodity" (
    "id" SERIAL NOT NULL,
    "attribute" TEXT NOT NULL,
    "commodity" TEXT NOT NULL,
    "commodity_type" TEXT NOT NULL,
    "units" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "year_type" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Commodity_pkey" PRIMARY KEY ("id")
);
