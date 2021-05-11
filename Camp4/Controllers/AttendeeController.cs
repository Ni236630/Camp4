using Camp4.Models;
using Camp4.Repositories;
using Microsoft.AspNetCore.Mvc;


namespace Camp4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendeeController : ControllerBase
    {
        private readonly IAttendeeRepository _attendeeRepository;

        public AttendeeController(IAttendeeRepository attendeeRepository)
        {
            _attendeeRepository = attendeeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_attendeeRepository.GetAll());
        }

        [HttpGet("group/{id}")]
        public IActionResult getByGroup(int id)
        {
            return Ok(_attendeeRepository.GetByGroup(id));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_attendeeRepository.GetById(id));
        }

        [HttpPost]
        public IActionResult AddAttendee(Attendee attendee)
        {
            attendee.GroupId = 1;
            attendee.BerthId = 1;
            attendee.EmergencyContactId = 1;
            _attendeeRepository.Add(attendee);
            return CreatedAtAction("AddAttendee", new { id = attendee.Id }, attendee);
        }



    }
}
