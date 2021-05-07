using Camp4.Models;
using Camp4.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        [HttpPost]
        public IActionResult AddAttendee(Attendee attendee)
        {
            _attendeeRepository.Add(attendee);
            return CreatedAtAction("AddAttendee", new { id = attendee.Id }, attendee);
        }



    }
}
