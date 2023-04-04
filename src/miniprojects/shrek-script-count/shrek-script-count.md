---
title: "Shrek's Movie Script"
date: "2023-04-04"
tags: ["Python", "Spark"]
cover: "./cover.png"
description: "Analyze Shrek's Movie Script"
---
![Cover](./cover.png)

[📄 Article](https://medium.com/byte-sized-data/project-once-upon-a-spark-analyzing-shreks-script-with-pyspark-77fb73744dfd)
[📂 Repo](https://github.com/b3tinsky/Shrek-Script-Word-Count-With-PySpark)

Analyzing the script for the movie Shrek with PySpark! Using the power of PySpark, I've delved into the script to uncover insights and trends that reveal hidden patterns in the storyline. With our custom-built pipeline, we were able to process and analyze the script in a fraction of the time it would take with traditional methods. This project showcases the capabilities of PySpark and how it can be used to gain new insights in the world of storytelling. Check out our blog post to learn more about my methodology and findings!

### Setup
```python
import sys
from pyspark.sql import SparkSession
from pyspark.sql.functions import split, count, col, explode, lower, regexp_extract

spark = (SparkSession
  .builder
  .appName("ShrekWordCounter")
  .getOrCreate())
```

### Reading
```python
shrek_script = (spark.read.format("text")
    .option("header", "false")
    .option("inferSchema", "true")
    .load("./shrek_script.txt")
    )
```

### Tokenizing
```python
lines = shrek_script.select(split(col("value"), " ").alias("line"))
lines.show(10)
words = lines.select(explode(col("line")).alias("word"))
words.show(15)
```

### Cleaning
```python
words_lower = words.select(lower(col("word")).alias("word_lower"))
words_lower.show(15)
words_clean = words_lower.select(
    regexp_extract(col("word_lower"), "[a-z]*", 0).alias("word")
)
words_clean.show(20)
words_without_null = words_clean.where(col("word") != "")
words_without_null.show()
```

### Counting
```python
groups = words_without_null.groupBy(col("word"))
results = groups.count()
results.orderBy("count", ascending=False).show(50)
```
### Answering
```console
+--------+-----+
|    word|count|
+--------+-----+
|       i|  406|
|     you|  406|
|     the|  230|
|       a|  225|
|      to|  168|
|      it|  160|
|    that|  135|
|      me|  134|
|     and|  120|
|      no|   90|
|      is|   87|
|      of|   87|
|      my|   86|
|     don|   77|
|    this|   77|
|    what|   76|
|      on|   75|
|      in|   73|
|    know|   70|
|      do|   63|
|     not|   62|
|    your|   61|
...
|      he|   31|
+--------+-----+
only showing top 50 rows
```
### Wrapping up
```python
results.coalesce(1).write.csv("./shrek_word_counts.csv")
```