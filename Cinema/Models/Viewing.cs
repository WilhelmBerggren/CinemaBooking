using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cinema.Models
{
    public class Viewing
    {
        public int ID { get; set; }
        public Film Film { get; set; }
        public Salon Salon { get; set; }
        public int Time { get; set; }

        [InverseProperty("Viewing")]
        public ICollection<Ticket> Tickets { get; set; }
    }
}
