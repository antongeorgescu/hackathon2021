var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send("Server up an running")
})

app.get('/customers', function (req, res) {
  const fs = require('fs');
  const jsonQuery = require('json-query');

  // get list of customers 
  let rawdata = fs.readFileSync('./data/FinTrxData_Customer.json');
  let customers = JSON.parse(rawdata);
  var data = {
    customerdata : customers
  }
  let selected = jsonQuery('customerdata.Name', {
    data: data
  })
  console.log(selected.value);
  res.send(selected.value);
})

app.get('/customers/:name', function (req, res) {
  const fs = require('fs');
  const jsonQuery = require('json-query');

  var lookupname = req.params.name;

  // get accountNumber
  let rawdata = fs.readFileSync('./data/FinTrxData_Customer.json');
  let customers = JSON.parse(rawdata);
  var data = {
    customerdata : customers
  }
  let selected = jsonQuery(`customerdata[Name=${lookupname}].AccountNumber`, {
    data: data
  })
  console.log(selected.value);
  var accountNo = selected.value;

  // get list of transactions for this account
  rawdata = fs.readFileSync('./data/FinTrxData_Transactions.json');
  let trxs = JSON.parse(rawdata);
  data = {
    trxdata : trxs
  }
  selected = jsonQuery(`trxdata[**][*AccountNumber=${accountNo}]`, {
    data: data
  })
  console.log(selected.value);
  var customertrxs = selected.value;

  // get the sum of green points for all transactions
  let sumPoints = 0.0;
  customertrxs.forEach(trx => {
    sumPoints += 0.1 * trx.Purchase_Amount * trx.GreenPoints;
  });

  console.log(sumPoints);
  res.send({Customer : lookupname, AccountNumber: accountNo, GreenPoints : (Math.round(sumPoints)).toString()});
})

var server = app.listen(process.env.PORT || 3001, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})
