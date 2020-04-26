using System.Collections.Generic;
using System.Linq;
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
        public ActionResult<IEnumerable<Salon>> GetSalons()
        {
            return _context.Salons.ToList();
        }

        // GET: api/Salon/5
        [HttpGet("{id}")]
        public ActionResult<Salon> GetSalon(int id)
        {
            var salon = _context.Salons.Find(id);

            if (salon == null)
            {
                return NotFound();
            }

            return salon;
        }

        // GET: api/Salon/5/Viewings
        [HttpGet("{id}/Viewings")]
        public ActionResult<IEnumerable<Viewing>> GetSalonViewings(int id)
        {
            var salon = _context.Salons.Find(id);

            if (salon == null)
            {
                return NotFound();
            }

            var viewings = _context.Viewings
                .Where(v => v.Salon == salon)
                .Include(v => v.Salon)
                .ToArray();

            return viewings;
        }

        private bool SalonExists(int id)
        {
            return _context.Salons.Any(e => e.ID == id);
        }
    }
}
