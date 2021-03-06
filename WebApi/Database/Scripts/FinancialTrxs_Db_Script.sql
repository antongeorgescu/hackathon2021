USE [master]
GO
/****** Object:  Database [FinancialTransactions]    Script Date: 7/8/2021 7:26:07 AM ******/
CREATE DATABASE [FinancialTransactions]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FinancialTransactions', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\FinancialTransactions.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'FinancialTransactions_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\FinancialTransactions_log.ldf' , SIZE = 139264KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [FinancialTransactions] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FinancialTransactions].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FinancialTransactions] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FinancialTransactions] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FinancialTransactions] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FinancialTransactions] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FinancialTransactions] SET ARITHABORT OFF 
GO
ALTER DATABASE [FinancialTransactions] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [FinancialTransactions] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FinancialTransactions] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FinancialTransactions] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FinancialTransactions] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FinancialTransactions] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FinancialTransactions] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FinancialTransactions] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FinancialTransactions] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FinancialTransactions] SET  DISABLE_BROKER 
GO
ALTER DATABASE [FinancialTransactions] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FinancialTransactions] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FinancialTransactions] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FinancialTransactions] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FinancialTransactions] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FinancialTransactions] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [FinancialTransactions] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FinancialTransactions] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [FinancialTransactions] SET  MULTI_USER 
GO
ALTER DATABASE [FinancialTransactions] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FinancialTransactions] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FinancialTransactions] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FinancialTransactions] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [FinancialTransactions] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [FinancialTransactions] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [FinancialTransactions] SET QUERY_STORE = OFF
GO
USE [FinancialTransactions]
GO
/****** Object:  UserDefinedFunction [dbo].[GetCategoryID]    Script Date: 7/8/2021 7:26:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[GetCategoryID]
(
	@retailerName varchar(50)
)
RETURNS smallint
AS
BEGIN
	-- Declare the return variable here
	DECLARE @ResultVar smallint

	SELECT top 1 @ResultVar = cat.ID from Category cat
		inner join RawData rd on rd.SIC_Description = cat.Category
		where rd.Normalized_Retailer = @retailerName

	-- Return the result of the function
	RETURN @ResultVar

END
GO
/****** Object:  UserDefinedFunction [dbo].[RANDBETWEEN]    Script Date: 7/8/2021 7:26:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[RANDBETWEEN](@LowerBound INT, @UpperBound INT)
RETURNS INT
AS
BEGIN
    DECLARE @TMP FLOAT;
    SELECT @TMP = (SELECT MyRAND FROM Get_RAND);
    RETURN CAST(@TMP* (@UpperBound - @LowerBound) + @LowerBound AS INT);
END
GO
/****** Object:  UserDefinedFunction [dbo].[RANDWORD]    Script Date: 7/8/2021 7:26:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
/****** Object:  View [dbo].[Get_RAND]    Script Date: 7/8/2021 7:26:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Get_RAND]
AS
SELECT RAND() AS MyRAND
GO
/****** Object:  Table [dbo].[Category]    Script Date: 7/8/2021 7:26:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[ID] [smallint] IDENTITY(1,1) NOT NULL,
	[Category] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](150) NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 7/8/2021 7:26:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[ID] [smallint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[AccountNumber] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RawData]    Script Date: 7/8/2021 7:26:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RawData](
	[ID] [nvarchar](50) NOT NULL,
	[Purchase_Amount] [float] NOT NULL,
	[Account_Type] [nvarchar](50) NOT NULL,
	[Consumer_Gender] [nvarchar](50) NOT NULL,
	[SIC_Description] [nvarchar](50) NOT NULL,
	[Age] [int] NOT NULL,
	[Normalized_Retailer] [nvarchar](50) NOT NULL,
	[Transaction_Date] [datetime2](7) NOT NULL,
	[Purchase_Amount_Corrected] [float] NOT NULL,
	[AccountNumber] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_RawData] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Retailer]    Script Date: 7/8/2021 7:26:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Retailer](
	[ID] [smallint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[CategoryID] [smallint] NULL,
 CONSTRAINT [PK_Retailer] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transactions]    Script Date: 7/8/2021 7:26:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transactions](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Purchase_Amount] [float] NOT NULL,
	[Account_Type] [nvarchar](50) NOT NULL,
	[Retailer] [nvarchar](50) NOT NULL,
	[Transaction_Date] [datetime2](7) NOT NULL,
	[AccountNumber] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Transactions_1] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[wordsEn]    Script Date: 7/8/2021 7:26:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[wordsEn](
	[TheWord] [varchar](50) NOT NULL,
	[WordID] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_wordsEn] PRIMARY KEY CLUSTERED 
(
	[TheWord] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_WORDS_WORDID]    Script Date: 7/8/2021 7:26:07 AM ******/
CREATE NONCLUSTERED INDEX [IX_WORDS_WORDID] ON [dbo].[wordsEn]
(
	[WordID] ASC
)
INCLUDE([TheWord]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [FinancialTransactions] SET  READ_WRITE 
GO
