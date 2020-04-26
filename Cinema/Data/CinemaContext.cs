using Microsoft.EntityFrameworkCore;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Film>().ToTable("Film");
            modelBuilder.Entity<Salon>().ToTable("Salon");
            modelBuilder.Entity<Ticket>().ToTable("Ticket");
            modelBuilder.Entity<Viewing>().ToTable("Viewing");
        }
    }
}
