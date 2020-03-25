using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cinema.Models
{
    public class Ticket
    {
        public int ID { get; set; }
        public Viewing Viewing { get; set; }
        public Row Row { get; set; }
        public Seat Seat { get; set; }
    }
}
