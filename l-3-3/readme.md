## 日志过滤条件
``` shell
resource.type="bigquery_resource" 
protoPayload.serviceData.jobCompletedEvent.eventName="query_job_completed" 
protoPayload.serviceData.jobCompletedEvent.job.jobConfiguration.query.statementType="INSERT" 
protoPayload.serviceData.jobCompletedEvent.job.jobStatus.state="DONE”
```
