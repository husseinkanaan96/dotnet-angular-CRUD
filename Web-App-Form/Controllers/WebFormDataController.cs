using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Web_App_Form.Data;
using Web_App_Form.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Web_App_Form.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebFormDataController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WebFormDataController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostForm(WebForm webForm)
        {
            if (webForm == null)
            {
                return BadRequest("WebForm is null.");
            }

            _context.WebForms.Add(webForm);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetWebForm", new { id = webForm.Id }, webForm);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WebForm>>> GetWebForms()
        {
            return await _context.WebForms.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WebForm>> GetWebForm(int id)
        {
            var webForm = await _context.WebForms.FindAsync(id);

            if (webForm == null)
            {
                return NotFound();
            }

            return webForm;
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAll()
        {
            _context.WebForms.RemoveRange(_context.WebForms);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWebForm(int id)
        {
            var webForm = await _context.WebForms.FindAsync(id);

            if (webForm == null)
            {
                return NotFound();
            }

            _context.WebForms.Remove(webForm);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutForm(int id, WebForm webForm)
        {
            if (id != webForm.Id)
            {
                return BadRequest();
            }

            if (!WebFormExists(id))
            {
                return NotFound();
            }

            _context.Entry(webForm).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WebFormExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool WebFormExists(int id)
        {
            return _context.WebForms.Any(e => e.Id == id);
        }
    }
}
