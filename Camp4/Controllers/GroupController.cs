﻿using Camp4.Models;
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
    public class GroupController : ControllerBase
    {
        private readonly IGroupRepository _groupRepository;

        public GroupController(IGroupRepository groupRepository)
        {
            _groupRepository = groupRepository;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_groupRepository.GetAll());
        }
        [HttpPost]
        public IActionResult AddGroup(Group group)
        {
            _groupRepository.Add(group);
            return CreatedAtAction("Get", new { id = group.Id }, group);
        }

    }
}