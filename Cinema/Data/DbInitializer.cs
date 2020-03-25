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

            if (context.Theaters.Any())
            {
                return;
            }

            context.Seats.Add(new Seat { SeatNumber = 1 });
            context.SaveChanges();

            context.Rows.Add(new Row { RowNumber = 1, Seats = new List<Seat>() });
            context.SaveChanges();

            context.Salons.Add(new Salon { Name = "Salon 1", Rows = new List<Row>() });
            context.SaveChanges();

            context.Theaters.Add(new Theater { Name = "Berras Bio", Salons = new List<Salon>() });
            context.SaveChanges();

            context.Films.Add(new Film { Name = "Slagsmålsklubben" });
            context.SaveChanges();

            context.Viewings.Add(new Viewing { });
            context.SaveChanges();

            context.Tickets.Add(new Ticket { });
            context.SaveChanges();

            context.Rows.First().Seats.Add(context.Seats.First());
            context.Salons.First().Rows.Add(context.Rows.First());
            context.Theaters.First().Salons.Add(context.Salons.First());
            context.Tickets.First().Viewing = context.Viewings.First();
            context.Tickets.First().Row = context.Rows.First();
            context.Tickets.First().Seat = context.Seats.First();
            context.Viewings.First().Film = context.Films.First();
            context.Viewings.First().Salon = context.Salons.First();
            context.SaveChanges();
        }
    }
}
