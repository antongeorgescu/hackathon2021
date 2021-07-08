CREATE Function [dbo].[RANDWORD]()
returns VARCHAR(255)
as
BEGIN
	return 
	(
	    select 
		top 1 
		    UPPER(LEFT(TheWord,1)) +
			LOWER(SUBSTRING(TheWord,2,LEN(TheWord))) as TheWord 
		from [wordsEn] 
		where WordId = dbo.RANDBETWEEN(1,(select max(wordid) from WordsEn))
	)
END;
GO


