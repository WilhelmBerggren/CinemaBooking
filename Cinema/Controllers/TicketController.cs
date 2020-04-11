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
        public ActionResult<IEnumerable<Ticket>> GetTickets()
        {
            return _context.Tickets.ToList();
        }

        // GET: api/Ticket/5
        [HttpGet("{id}")]
        public ActionResult<Ticket> GetTicket(int id)
        {
            var ticket = _context.Tickets.Include(t => t.Viewing)
                .FirstOrDefault(t => t.ID == id);

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }

        // POST: api/Ticket
        [HttpPost]
        public ActionResult<Ticket> PostTicket(Ticket ticket)
        {
            var viewing = _context.Viewings.Find(ticket.Viewing.ID);
            var t = new Ticket { Seat = ticket.Seat, Viewing = viewing };
            
            _context.Tickets.Add(t);
            _context.SaveChanges();
            viewing.Tickets.Add(t);
            _context.SaveChanges();
            return CreatedAtAction("GetTicket", new { id = ticket.ID }, ticket);
        }

        // DELETE: api/Ticket/5
        [HttpDelete]
        public ActionResult<Ticket> DeleteTicket(Ticket ticket)
        {        
            Console.WriteLine(ticket.Seat);
            Console.WriteLine(ticket.Viewing.ID);
            var actualViewing = _context.Viewings.Include(v => v.Tickets).Where(t => t.ID == ticket.Viewing.ID).FirstOrDefault();
            var actualTicket = actualViewing.Tickets.Where(t => t.Seat == ticket.Seat).FirstOrDefault();

            if (actualViewing == null)
            {
                return NotFound();
            }
            if (actualTicket == null)
            {
                return NotFound();
            }

            Console.WriteLine(actualTicket.Seat + ' ' + actualViewing.ID);

            actualViewing.Tickets.Remove(actualTicket);
            _context.SaveChanges();

            _context.Tickets.Remove(actualTicket);
            _context.SaveChanges();

            return actualTicket;
        }

        private bool TicketExists(int id)
        {
            return _context.Tickets.Any(e => e.ID == id);
        }
    }
}
