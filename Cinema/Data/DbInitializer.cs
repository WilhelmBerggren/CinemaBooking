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
            context.Database.EnsureDeleted();
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
                new Viewing { Film = films[0], Salon = salons[0], Time = timeSlots[0], Tickets = new List<Ticket>() },
                new Viewing { Film = films[0], Salon = salons[0], Time = timeSlots[2], Tickets = new List<Ticket>() },
                new Viewing { Film = films[1], Salon = salons[1], Time = timeSlots[1], Tickets = new List<Ticket>() },
                new Viewing { Film = films[1], Salon = salons[1], Time = timeSlots[2], Tickets = new List<Ticket>() },
                new Viewing { Film = films[2], Salon = salons[0], Time = timeSlots[0], Tickets = new List<Ticket>() }
            };

            foreach(var viewing in viewings)
            {
                context.Viewings.Add(viewing);
            }

            context.SaveChanges();


            var tickets = new List<Ticket>();
            var random = new Random();
            foreach(var viewing in viewings)
            {
                for(var i = 1; i <= viewing.Salon.Seats; i++)
                {
                    if(random.NextDouble() < 0.5)
                    {
                        tickets.Add(new Ticket { Seat = i, Viewing = viewing });
                    }
                }
            }
            
            foreach (var ticket in tickets)
            {
                context.Tickets.Add(ticket);
            }
            context.SaveChanges();

            foreach (var ticket in tickets)
            {
                context.Viewings.Find(ticket.Viewing.ID).Tickets.Add(ticket);
            }
            context.SaveChanges();
        }
    }
}
