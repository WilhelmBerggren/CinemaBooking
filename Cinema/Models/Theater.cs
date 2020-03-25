using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cinema.Models
{
    public class Theater
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public ICollection<Salon> Salons { get; set; }
    }
}
