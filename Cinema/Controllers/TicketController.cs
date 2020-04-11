using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cinema.Data;
using Cinema.Models;

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
        public ActionResult<Ticket> PostTicket(Ticket ticket)
        {
            if (!_context.Viewings.Any(v => v.ID == ticket.Viewing.ID)) return NotFound();
            if (_context.Tickets.Any(t => t.Seat == ticket.Seat && t.Viewing.ID == ticket.Viewing.ID))
                return StatusCode(409); //already exists

            var viewing = _context.Viewings.Find(ticket.Viewing.ID);

            var saved = _context.Tickets.Add(new Ticket { Seat = ticket.Seat, Viewing = viewing });
            _context.SaveChanges();

            return CreatedAtAction("GetTicket", new Ticket { 
                ID = saved.Entity.ID, 
                Seat = saved.Entity.Seat, 
                Viewing = new Viewing { ID = saved.Entity.Viewing.ID } 
            });
        }

        // DELETE: api/Ticket/5
        [HttpDelete]
        public ActionResult<Ticket> DeleteTicket(Ticket ticket)
        {
            if (!TicketExists(ticket.ID)) return NotFound();

            _context.Tickets.Remove(_context.Tickets.Find(ticket.ID));
            _context.SaveChanges();

            return ticket;
        }

        private bool TicketExists(int id)
        {
            return _context.Tickets.Any(e => e.ID == id);
        }
    }
}
