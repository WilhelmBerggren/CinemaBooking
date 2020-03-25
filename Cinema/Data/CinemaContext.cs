using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cinema.Models;

namespace Cinema.Data
{
    public class CinemaContext : DbContext
    {
        public CinemaContext(DbContextOptions<CinemaContext> options) : base(options)
        {
        }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Row> Rows { get; set; }
        public DbSet<Film> Films { get; set; }
        public DbSet<Salon> Salons { get; set; }
        public DbSet<Theater> Theaters { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Viewing> Viewings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Seat>();
            modelBuilder.Entity<Row>().HasMany(r => r.Seats);
            modelBuilder.Entity<Film>();
            modelBuilder.Entity<Viewing>().HasOne(v => v.Film);
            modelBuilder.Entity<Viewing>().HasOne(v => v.Salon);
            modelBuilder.Entity<Salon>().HasMany(s => s.Rows);
            modelBuilder.Entity<Theater>().HasMany(t => t.Salons);
            modelBuilder.Entity<Ticket>().HasOne(t => t.Viewing);
            modelBuilder.Entity<Ticket>().HasOne(t => t.Row);
            modelBuilder.Entity<Ticket>().HasOne(t => t.Seat);
        }
    }
}
