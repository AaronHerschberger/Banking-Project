const express = require('express');

const router = express.Router();

const {accounts, writeJSON} = require('../data');

router.get('/transfer', (req, res) => res.render('transfer'));
router.post('/transfer', (req, res) => {
  accounts[req.body.from].balance = accounts[req.body.from].balance
   - req.body.amount;
  accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance)
   + parseInt(req.body.amount, 10);
  writeJSON();
  res.render('transfer', {message: 'Transfer Completed'});
});

router.get('/payment', (req, res) => res.render('payment', {account: accounts.credit}));
router.post('/payment', (req, res) => {
  accounts.credit.balance -= req.body.amount;
  accounts.credit.available -= req.body.amount;
  writeJSON();
  res.render('payment', {message: '======Payment Successful!======', account: accounts.credit});
});

router.get('/shopping', (req, res) => res.render('shopping'));
router.post('/shopping', (req, res) => {
  if (req.body.from == 'credit') {
    accounts.credit.balance = accounts.credit.balance + parseInt(req.body.amount, 10);
  } else {
  accounts[req.body.from].balance -= req.body.amount;
  }
  writeJSON();
  res.render('shopping', {message: '======Purchase Successful!======'});
});

router.get('/facts', (req,res) => res.render('facts'));
//router.post('/facts', (req,res) => {});

module.exports = router;
