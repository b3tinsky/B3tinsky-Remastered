---
title: "Wonka's Candy Sales"
date: "2023-04-02"
tags: ["Python", "Spark"]
cover: "./wonkas_candy_sales.png"
description: "Analyze Candy Sales with PySpark"
---
![Cover](./wonkas_candy_sales.png)

[📄 Article](https://medium.com/byte-sized-data/project-golden-ticket-to-big-data-exploring-wonkas-candy-sales-with-spark-769c1575960b)
[📂 Repo](https://github.com/b3tinsky/Wonka-Candy-Sales)

In this project, we use Apache Spark to analyze candy sales data from around the world. The dataset contains information about candy sales in different regions, including the type of candy, quantity sold, and revenue generated. We explore the dataset using Spark's powerful data processing capabilities, including filtering, aggregating, and visualizing the data. Through this project, we demonstrate how Spark can be used to gain valuable insights from large, complex datasets.

### Data Simulation
```python
import pandas as pd
import numpy as np

data = []
countries   = ["USA", "MEX", "CAN", "DEU", "ITA", "FRA", "CHN", "RUS", "SAU", "ARE", "GBR", "TUR", "IND", "BRA"]
candy_types = ["chocolate bar", "white chocolate bar", "dark chocolate bar", "blueberry bubblegum", "caramel popcorn", "peanut butter pops", "chocolate cookies", "butter cookies", "gummy bears", "lollipops"]

for i in range(100000):
  country = np.random.choice(countries)
  candy   = np.random.choice(candy_types)
  sales   = np.random.randint(100000, 10000000)

  data.append({'country': country, 'candy': candy, 'sales': sales})

df = pd.DataFrame(data)
df.to_csv('candy_sales.csv', index=False) # We don't need to store the index
```

### Data Analysis
```python
import sys
from pyspark.sql import SparkSession
from pyspark.sql.functions import count

spark = (SparkSession
  .builder
  .appName("CandySalesCount")
  .getOrCreate())

candy_sales_file = "./candy_sales.csv"

candy_sales_df = (spark.read.format("csv")
  .option("header", "true")
  .option("inferSchema", "true")
  .load(candy_sales_file))

count_candy_sales_df = (candy_sales_df
  .select("country", "candy", "sales")
  .groupBy("country", "candy")
  .agg(count("sales").alias("Total"))
  .orderBy("Total", ascending=False))
```
```python
count_candy_sales_df.show(n=60, truncate=False)
print(f"Total Rows = {count_candy_sales_df.count()}")
```
```console
+-------+-------------------+-----+
|country|candy              |Total|
+-------+-------------------+-----+
|ITA    |butter cookies     |779  |
|CAN    |white chocolate bar|769  |
|ARE    |blueberry bubblegum|767  |
|CAN    |lollipops          |762  |
|MEX    |caramel popcorn    |760  |
|IND    |butter cookies     |760  |
|RUS    |butter cookies     |757  |
|FRA    |white chocolate bar|756  |
|ARE    |gummy bears        |755  |
|TUR    |butter cookies     |753  |
|BRA    |gummy bears        |752  |
|ARE    |lollipops          |751  |
|ITA    |white chocolate bar|750  |
|TUR    |gummy bears        |750  |
|CHN    |butter cookies     |749  |
|RUS    |lollipops          |749  |
|TUR    |peanut butter pops |748  |
|CHN    |caramel popcorn    |748  |
|ITA    |lollipops          |745  |
|FRA    |gummy bears        |744  |
|CHN    |dark chocolate bar |742  |
|IND    |peanut butter pops |742  |
...
+-------+-------------------+-----+
```
```python
ita_count_candy_sales_df = (candy_sales_df
  .select("country", "candy", "sales")
  .where(candy_sales_df.country == "ITA")
  .groupBy("country", "candy")
  .agg(count("sales").alias("Total"))
  .orderBy("Total", ascending=False))

ita_count_candy_sales_df.show(n=10, truncate=False)
```
```console
+-------+-------------------+-----+
|country|candy              |Total|
+-------+-------------------+-----+
|ITA    |butter cookies     |779  |
|ITA    |white chocolate bar|750  |
|ITA    |lollipops          |745  |
|ITA    |blueberry bubblegum|741  |
|ITA    |gummy bears        |723  |
|ITA    |chocolate cookies  |717  |
|ITA    |caramel popcorn    |702  |
|ITA    |dark chocolate bar |701  |
|ITA    |peanut butter pops |696  |
|ITA    |chocolate bar      |696  |
+-------+-------------------+-----+
```
```python
spark.stop()
```

### What's next?
- Get the total sales for each candy
- Get the total sales for each candy by country
- Get the total sales for each country