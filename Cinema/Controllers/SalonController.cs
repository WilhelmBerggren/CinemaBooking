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
    public class SalonController : ControllerBase
    {
        private readonly CinemaContext _context;

        public SalonController(CinemaContext context)
        {
            _context = context;
        }

        // GET: api/Salon
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Salon>>> GetSalons()
        {
            return await _context.Salons.ToListAsync();
        }

        // GET: api/Salon/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Salon>> GetSalon(int id)
        {
            var salon = await _context.Salons.FindAsync(id);

            if (salon == null)
            {
                return NotFound();
            }

            return salon;
        }

        // GET: api/Salon/5/Viewings
        [HttpGet("{id}/Viewings")]
        public async Task<ActionResult<IEnumerable<Viewing>>> GetSalonViewings(int id)
        {
            var salon = await _context.Salons.FindAsync(id);

            if (salon == null)
            {
                return NotFound();
            }

            var viewings = await _context.Viewings
                .Where(v => v.Salon == salon)
                .Include(v => v.Salon)
                .ToArrayAsync();

            return viewings;
        }

        private bool SalonExists(int id)
        {
            return _context.Salons.Any(e => e.ID == id);
        }
    }
}
