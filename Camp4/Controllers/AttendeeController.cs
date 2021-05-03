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
        [HttpPost]
        public IActionResult AddGroup(Attendee attendee)
        {
            _attendeeRepository.Add(attendee);
            return CreatedAtAction("Get", new { id = attendee.Id }, attendee);
        }

    }
}
