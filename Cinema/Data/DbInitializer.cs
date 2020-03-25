using Cinema.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cinema.Data
{
    public class DbInitializer
    {
        public static void Initialize(CinemaContext context)
        {
            context.Database.EnsureCreated();

            if (context.Salons.Any())
            {
                return;
            }

            var salons = new Salon[] {
                new Salon { Name = "Salon 1", Seats = 50 },
                new Salon { Name = "Salon 2", Seats = 100 }
            };
            foreach (var salon in salons)
            {
                context.Salons.Add(salon);
            }
            context.SaveChanges();

            var films = new Film[] {
                new Film { Name = "Slagsmålsklubben", Duration = 90 },
                new Film { Name = "Läderlappen", Duration = 120 },
                new Film { Name = "Sällskapsresan", Duration = 144 }
            };

            foreach (var film in films)
            {
                context.Films.Add(film);
            }

            context.SaveChanges();

            var timeSlots = new int[] { 0900, 1300, 1900 };
            var viewings = new Viewing[]
            {
                new Viewing { Film = films[0], Salon = salons[0], Time = timeSlots[0] },
                new Viewing { Film = films[0], Salon = salons[0], Time = timeSlots[2] },
                new Viewing { Film = films[1], Salon = salons[1], Time = timeSlots[1] },
                new Viewing { Film = films[1], Salon = salons[1], Time = timeSlots[2] },
                new Viewing { Film = films[2], Salon = salons[0], Time = timeSlots[0] }
            };

            foreach(var viewing in viewings)
            {
                context.Viewings.Add(viewing);
            }

            context.SaveChanges();

            context.Tickets.Add(new Ticket { Salon = salons[0], Seat = 1, Viewing = viewings[0]});
            context.Tickets.Add(new Ticket { Salon = salons[0], Seat = 10, Viewing = viewings[0]});

            context.SaveChanges();
        }
    }
}
