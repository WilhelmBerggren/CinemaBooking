using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cinema.Models
{
    public class Ticket
    {
        public int ID { get; set; }
        public int Seat { get; set; }

        [InverseProperty("Tickets")]
        public Viewing Viewing { get; set; }
    }
}
