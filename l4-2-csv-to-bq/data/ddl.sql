-- get DDL of table
SELECT DDL FROM mydataset1.INFORMATION_SCHEMA.TABLES;

-- create employee table
CREATE TABLE `boxwood-tree-383908.mydataset1.employees`
(
  id INT64 NOT NULL OPTIONS(description="员工编号"),
  name STRING NOT NULL OPTIONS(description="员工姓名"),
  phoneNo STRING OPTIONS(description="员工电话号码"),
  department STRING OPTIONS(description="员工所属部门")
);

-- create departtment table
CREATE TABLE `boxwood-tree-383908.mydataset1.departments`
(
  id INT64 NOT NULL OPTIONS(description="部门编号"),
  name STRING NOT NULL OPTIONS(description="部门名称"),
  manager STRING OPTIONS(description="部门主管")
);

