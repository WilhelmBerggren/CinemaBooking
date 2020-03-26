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
        public DbSet<Film> Films { get; set; }
        public DbSet<Salon> Salons { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Viewing> Viewings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Film>();
            modelBuilder.Entity<Salon>();
            modelBuilder.Entity<Viewing>().HasOne(v => v.Film);
            modelBuilder.Entity<Viewing>().HasOne(v => v.Salon);
            modelBuilder.Entity<Viewing>().HasMany(v => v.Tickets);
            modelBuilder.Entity<Ticket>().HasOne(t => t.Viewing);
        }
    }
}
