###
改写当前函数。当Cloud Storage上传CSV文件时，输出文件行数，并验证每一件的列数和环境变量中设置的一样。

### create a trigger on OBJECT_FINALIZE event
``` shell
gcloud storage buckets notifications create --event-types=OBJECT_FINALIZE gs://demo-eb --topic=L-3-T1
```

### 环境变量
EXPECTED_COLUMNS：4

### 验证用的CSV文件
1. 格式正确的文件
- Files/employees.csv
  
2. 格式不正确的文件
- Files/employees-invalid.csv