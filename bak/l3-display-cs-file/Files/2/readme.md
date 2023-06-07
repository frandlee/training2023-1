### 函数功能
读取Cloud Storage中上传的内容并输出到日志

### create a trigger on OBJECT_FINALIZE event
``` shell
gcloud storage buckets notifications create --event-types=OBJECT_FINALIZE gs://demo-eb --topic=cloudstorage-to-cloudfunction
```