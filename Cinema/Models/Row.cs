using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cinema.Models
{

    public class Row
    {
        public int ID { get; set; }
        public int RowNumber { get; set; }
        public ICollection<Seat> Seats { get; set; }
    }
}
