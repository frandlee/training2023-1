-- 需要以下行的yourProjectID替换成你自己的ProjectID
insert into `yourProjectID.mydataset1.employees` 
values
(1, "Lee", "080-1234-5678", "第一事业部"),
(2, "Wang", "080-1234-0001", "第二事业部"),
(3, "Zhang", "080-1234-0002", "第三事业部"),
(4, "Zhao", "080-1234-0003", "第三事业部");

CREATE TABLE `boxwood-tree-383908.mydataset1.employees`
(
  `id` INT64 NOT NULL OPTIONS(description="员工编号"),
  name STRING NOT NULL OPTIONS(description="员工姓名"),
  phoneNo STRING OPTIONS(description="员工电话号码"),
  department STRING OPTIONS(description="员工所属部门")
);
