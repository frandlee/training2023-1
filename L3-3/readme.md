## 日志过滤条件
### Cloud Storage文件下载操作日志过滤条件
``` shell
resource.type="gcs_bucket" AND
protoPayload.methodName="storage.objects.get"
```

### BigQuery表插入记录操作日志过滤条件
``` shell
resource.type="bigquery_resource" 
protoPayload.serviceData.jobCompletedEvent.eventName="query_job_completed" 
protoPayload.serviceData.jobCompletedEvent.job.jobConfiguration.query.statementType="INSERT" 
protoPayload.serviceData.jobCompletedEvent.job.jobStatus.state="DONE”
```
