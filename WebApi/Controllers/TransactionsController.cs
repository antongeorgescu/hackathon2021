using Dapper;
using Dapper_ORM.Models;
using Dapper_ORM.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace TransactionsApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly IDapper _dapper;
        public TransactionsController(IDapper dapper)
        {
            _dapper = dapper;
        }

        [HttpGet]
        public string Get()
        {
           return "Hello world!";
        }

        [HttpPost(nameof(Create))]
        public async Task<int> Create(Parameters data)
        {
            var dbparams = new DynamicParameters();
            var result = await Task.FromResult(_dapper.Insert<int>("[dbo].[SP_Add_Transaction]"
                , dbparams,
                commandType: CommandType.StoredProcedure));
            return result;
        }
        
        [HttpGet(nameof(GetByAccount))]
        public async Task<IEnumerable<Parameters>> GetByAccount(string accountNumber)
        {
            //var result0 = _dapper.GetAll<Parameters>($"Select * from [Transactions] where AccountNumber = '{accountNumber}'";
            var result = await Task.FromResult(_dapper.GetAll<Parameters>($"Select * from [Transactions] where AccountNumber = '{accountNumber}'", null, commandType: CommandType.Text));
            return result;
        }
        
        [HttpDelete(nameof(Delete))]
        public async Task<int> Delete(string accountNumber)
        {
            var result = await Task.FromResult(_dapper.Execute($"Delete [Transactions] Where AccountNumber = {accountNumber}", null, commandType: CommandType.Text));
            return result;
        }
        [HttpGet(nameof(Count))]
        public Task<int> Count(string accountNumber)
        {
            var totalcount = Task.FromResult(_dapper.Get<int>($"select COUNT(*) from [Transactions] WHERE AccountNumber = {accountNumber}", null,
                    commandType: CommandType.Text));
            return totalcount;
        }
        
        [HttpPatch(nameof(Update))]
        public Task<int> Update(Parameters data)
        {
            var dbPara = new DynamicParameters();
            
            var updateTransaction = Task.FromResult(_dapper.Update<int>("[dbo].[SP_Update_Transaction]",
                            dbPara,
                            commandType: CommandType.StoredProcedure));
            return updateTransaction;
        }
    }
}
