DECLARE @CursorID VARCHAR(50);

DECLARE CUR_CUSTOMER CURSOR FOR
    SELECT DISTINCT AccountNumber
    FROM   RawData;
 
OPEN CUR_CUSTOMER
FETCH NEXT FROM CUR_CUSTOMER INTO @CursorID
 
WHILE @@FETCH_STATUS = 0
BEGIN
   select @CursorID;
   UPDATE Customer
      SET    [Name] = CONCAT(dbo.RANDWORD(),' ',dbo.RANDWORD())
	  WHERE AccountNumber = @CursorID;
      --WHERE  CURRENT OF CUR_CUSTOMER;

   --INSERT INTO Transactions (Purchase_Amount,Account_Type,Retailer,Transaction_Date,AccountNumber) 
   --	VALUES (75.00,'bank_account','Enbridge Gas','2020-12-15',@CursorID);
   --INSERT INTO Transactions (Purchase_Amount,Account_Type,Retailer,Transaction_Date,AccountNumber) 
   --	VALUES (75.00,'bank_account','Ontario Hydro','2020-12-23',@CursorID);
   
   FETCH NEXT FROM CUR_CUSTOMER INTO @CursorID
END
CLOSE CUR_CUSTOMER
DEALLOCATE CUR_CUSTOMER
GO

