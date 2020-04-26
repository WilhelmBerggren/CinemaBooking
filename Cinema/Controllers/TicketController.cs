using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cinema.Data;
using Cinema.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Cinema.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly CinemaContext _context;

        public TicketController(CinemaContext context)
        {
            _context = context;
        }

        // GET: api/Ticket
        [HttpGet]
        public ActionResult<IEnumerable<Ticket>> GetTickets() => _context.Tickets.ToList();

        // GET: api/Ticket/5
        [HttpGet("{id}")]
        public ActionResult<Ticket> GetTicket(int id)
        {
            if (!TicketExists(id)) return NotFound();

            var ticket = _context.Tickets.Find(id);

            return ticket;
        }

        // POST: api/Ticket
        [HttpPost]
        public ActionResult<Ticket> PostTickets(IEnumerable<Ticket> tickets)
        {
            tickets = tickets.Distinct().ToList();

            if (tickets.Count() < 1 || tickets.Count() > 12) 
                return StatusCode(StatusCodes.Status422UnprocessableEntity);
            
            var viewing = _context.Viewings
                .Where(v => v.ID == tickets.ElementAt(0).Viewing.ID)
                .Include(v => v.Salon)
                .Include(v => v.Film)
                .FirstOrDefault();

            if (viewing == null) 
                return NotFound();
            
            if (tickets.Any(t => (t.Seat < 1 || t.Seat > viewing.Salon.Seats))) 
                return StatusCode(StatusCodes.Status422UnprocessableEntity);

            var viewingTickets = _context.Tickets.Where(t => t.Viewing.ID == viewing.ID);
            if (tickets.Any(t => viewingTickets.Any(vt => vt.Seat == t.Seat))) 
                return StatusCode(StatusCodes.Status409Conflict);

            var entities = tickets.Select(t => new Ticket { Seat = t.Seat, Viewing = viewing }).ToArray();
            var response = new List<EntityEntry<Ticket>>();
            foreach(Ticket t in entities)
                response.Add(_context.Tickets.Add(new Ticket { Seat = t.Seat, Viewing = _context.Viewings.Find(viewing.ID) }));

            _context.SaveChanges();

            return CreatedAtAction("GetTicket", response.Select(e => new Ticket {
                ID = e.Entity.ID,
                Seat = e.Entity.Seat,
                Viewing = new Viewing { ID = e.Entity.Viewing.ID } 
            }));
        }

        // DELETE: api/Ticket/5
        [HttpDelete]
        public ActionResult<Ticket> DeleteTickets(IEnumerable<Ticket> tickets)
        {
            var response = new List<EntityEntry<Ticket>>();
            foreach(Ticket t in tickets)
            {
                if (!TicketExists(t.ID)) return NotFound();
                response.Add(_context.Tickets.Remove(_context.Tickets.Find(t.ID)));
            }

            _context.SaveChanges();
            
            return Ok(tickets);
        }

        private bool TicketExists(int id)
        {
            return _context.Tickets.Any(e => e.ID == id);
        }
    }
}
