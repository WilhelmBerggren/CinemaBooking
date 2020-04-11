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
        public ActionResult<IEnumerable<Viewing>> GetViewings()
        {
            return _context.Viewings
                .Include(v => v.Film)
                .Include(v => v.Salon)
                .ToList();
        }

        // GET: api/Viewing/5
        [HttpGet("{id}")]
        public ActionResult<Viewing> GetViewing(int id)
        {
            var viewing = _context.Viewings.Find(id);

            if (viewing == null)
            {
                return NotFound();
            }

            return viewing;
        }

        // GET: api/Viewing/5/Ticket
        [HttpGet("{id}/Ticket")]
        public ActionResult<IEnumerable<Ticket>> GetViewingTicket(int id)
        {
            var viewing = _context.Viewings.Find(id);

            if (viewing == null)
            {
                return NotFound();
            }

            var tickets = _context.Tickets
                .Where(t => t.Viewing == viewing)
                .Select(t => new Ticket { ID = t.ID, Seat = t.Seat })
                .ToArray();

            return tickets;
        }
    }
}
