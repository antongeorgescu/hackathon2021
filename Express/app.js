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

app.get('/greenpoints/aggregates', function (req, res) {
  const fs = require('fs');
  const jsonQuery = require('json-query');

  const dollarPerPoint = 1.23;
  const carbonTonePerPoint = 0.00763;
  const charitySpentPerc = 0.08;

  // get all customer data
  let rawdata = fs.readFileSync('./data/FinTrxData_Customer.json');
  let users = JSON.parse(rawdata);  

  let rawdata2 = fs.readFileSync('./data/FinTrxData_Transactions.json');
  let trxs = JSON.parse(rawdata2);

  points = [];  
  users.forEach (user => {
    var dataAccounts = {
      userdata : users
    }
    let selected = jsonQuery(`userdata[Name=${user.Name}].AccountNumber`, {
      data: dataAccounts
    });
    console.log(selected.value);
    var accountNo = selected.value;
    
    // get list of transactions for this account
    var dataTrxs = {
      trxdata : trxs
    }
    selected = jsonQuery(`trxdata[**][*AccountNumber=${accountNo}]`, {
      data: dataTrxs
    })
    console.log(selected.value);
    var customertrxs = selected.value;

    // get the sum of green points for all transactions
    let userPoints = 0.0;
    customertrxs.forEach(trx => {
      userPoints += 0.1 * trx.Purchase_Amount * trx.GreenPoints;
    });
    points.push(userPoints);
  })
  maxPoints = Math.max.apply(Math, points);
  minPoints = Math.min.apply(Math, points);
  console.log(minPoints);
  console.log(maxPoints);
  
  const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
  const sum = arr => arr.reduce( ( p, c ) => p + c, 0 );
  
  avgPoints = average(points);
  sumPoints = sum(points);
  sumDollars = sumPoints * dollarPerPoint;
  charitySpent = sumDollars * charitySpentPerc;
  carbonTonnes = sumPoints * carbonTonePerPoint;
  console.log(avgPoints);
  console.log(sumPoints);
  res.send({
    SumPoints : sumPoints.toString(), 
    SumDollars: sumDollars.toString(), 
    CarbonTonnes: carbonTonnes.toString(),
    CharitySpent: charitySpent.toString(),
    AveragePoints: avgPoints.toString(), 
    MinPoints: minPoints.toString(), 
    MaxPoints: maxPoints.toString()
  });
})

app.get('/greenpoints/upsell', function (req, res) {
  const loanCustomers = 223;
  const loanSum = loanCustomers * 8700;

  res.send({
    LoanCustomers : loanCustomers.toString(), 
    LoanSum: loanSum.toString()
  });
})

var server = app.listen(process.env.PORT || 3001, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})
