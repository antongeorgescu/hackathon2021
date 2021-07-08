/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (20)
	  trx.AccountNumber
	  ,cus.[Name]
	  ,trx.Account_Type
	  ,trx.Retailer
	  ,cat.Category
	  ,trx.Transaction_Date
	  ,trx.Purchase_Amount
FROM Transactions trx
INNER JOIN Customer cus ON cus.AccountNumber = trx.AccountNumber
INNER JOIN Retailer ret ON ret.[Name] = trx.Retailer
INNER JOIN Category cat on cat.ID = ret.CategoryID