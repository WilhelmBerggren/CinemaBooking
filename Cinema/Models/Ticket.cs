using System;
using System.ComponentModel.DataAnnotations.Schema;

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
