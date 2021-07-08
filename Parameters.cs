using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dapper_ORM.Models
{
    public class Parameters
    {
        public int ID { get; set; }
        public float Purchase_Amount { get; set; }
        public string Account_Type { get; set; }
        public string Retailer { get; set; }
        public string Transaction_Date { get; set; }
        public string AccountNumber { get; set; }
    }
}