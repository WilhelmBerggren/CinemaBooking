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
    public class FilmController : ControllerBase
    {
        private readonly CinemaContext _context;

        public FilmController(CinemaContext context)
        {
            _context = context;
        }

        // GET: api/Film
        [HttpGet]
        public ActionResult<IEnumerable<Film>> GetFilms()
        {
            return _context.Films.ToList();
        }

        // GET: api/Film/5
        [HttpGet("{id}")]
        public ActionResult<Film> GetFilm(int id)
        {
            var film = _context.Films.Find(id);

            if (film == null)
            {
                return NotFound();
            }

            return film;
        }

        // GET: api/Film/5/Viewings
        [HttpGet("{id}/Viewings")]
        public ActionResult<IEnumerable<Viewing>> GetFilmViewings(int id)
        {
            var film = _context.Films.Find(id);

            if (film == null)
            {
                return NotFound();
            }

            var viewings = _context.Viewings
                .Where(v => v.Film == film)
                .Include(v => v.Salon)
                .ToArray();

            return viewings;
        }
    }
}
