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
    public class ViewingController : ControllerBase
    {
        private readonly CinemaContext _context;

        public ViewingController(CinemaContext context)
        {
            _context = context;
        }

        // GET: api/Viewing
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Viewing>>> GetViewings()
        {
            return await _context.Viewings
                .Include(v => v.Film)
                .Include(v => v.Salon)
                .ToListAsync();
        }

        // GET: api/Viewing/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Viewing>> GetViewing(int id)
        {
            var viewing = await _context.Viewings.FindAsync(id);

            if (viewing == null)
            {
                return NotFound();
            }

            return viewing;
        }

        // GET: api/Viewing/5/Ticket
        [HttpGet("{id}/Ticket")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetViewingTicket(int id)
        {
            var viewing = await _context.Viewings.FindAsync(id);

            if (viewing == null)
            {
                return NotFound();
            }

            var tickets = await _context.Tickets
                .Where(t => t.Viewing == viewing)
                .Select(t => new Ticket { ID = t.ID, Seat = t.Seat })
                .ToArrayAsync();

            return tickets;
        }

        // POST: api/Viewing
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Viewing>> PostViewing(Viewing viewing)
        {
            _context.Viewings.Add(viewing);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetViewing", new { id = viewing.ID }, viewing);
        }
    }
}
