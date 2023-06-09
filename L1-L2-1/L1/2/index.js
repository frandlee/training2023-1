const functions = require('@google-cloud/functions-framework');

functions.http('helloEB', (req, res) => {
  res.send(`Hello ${req.query.employeeName} from $${req.query.companyName} !`);
});
