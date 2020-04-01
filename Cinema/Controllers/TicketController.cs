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
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
        {
            return await _context.Tickets.ToListAsync();
        }

        // GET: api/Ticket/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _context.Tickets.Include(t => t.Viewing)
                .FirstOrDefaultAsync(t => t.ID == id);

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }

        // POST: api/Ticket
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
        {
            var viewing = await _context.Viewings.FindAsync(ticket.Viewing.ID);
            var t = new Ticket { Seat = ticket.Seat, Viewing = viewing };
            _context.Tickets.Add(t);
            await _context.SaveChangesAsync();

            viewing.Tickets.Add(t);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicket", new { id = ticket.ID }, ticket);
        }

        // DELETE: api/Ticket/5
        [HttpDelete]
        public async Task<ActionResult<Ticket>> DeleteTicket(Ticket ticket)
        {        
            Console.WriteLine(ticket.Seat);
            Console.WriteLine(ticket.Viewing.ID);
            var actualViewing = await _context.Viewings.Include(v => v.Tickets).Where(t => t.ID == ticket.Viewing.ID).FirstOrDefaultAsync();
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
            await _context.SaveChangesAsync();

            _context.Tickets.Remove(actualTicket);
            await _context.SaveChangesAsync();

            return actualTicket;
        }

        private bool TicketExists(int id)
        {
            return _context.Tickets.Any(e => e.ID == id);
        }
    }
}
