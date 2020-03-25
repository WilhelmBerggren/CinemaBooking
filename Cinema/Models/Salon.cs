using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cinema.Models
{
    public class Salon
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public ICollection<Row> Rows { get; set; }
    }
}
