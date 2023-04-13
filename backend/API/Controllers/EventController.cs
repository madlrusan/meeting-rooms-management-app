using System;
using Domain;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Domain.API.EventsIdentity;
using Application.Abstractions;

namespace API.Controllers
{
    [ApiController]
    [Route("event/")]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }


        [HttpPost("createEvent")]
        public async Task<IActionResult> CreateEvent(EventCreateModel model)
        {
            try
            {
                await _eventRepository.CreateEvent(model);
                return Ok();
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("getAllEvents")]
        public async Task<ActionResult<IEnumerable<EventViewModel>>> GetAllEvents()
        {
            var entities = await _eventRepository.GetAllEvents();
            return Ok(entities);
        }

        [HttpPut("updateEvent")]
        public async Task<IActionResult> UpdateEvent(EventUpdateModel model)
        {
            try
            {
                await _eventRepository.UpdateEvent(model);
                return Ok();
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpDelete("deleteEvent")]
        public async Task<IActionResult> DeleteEvent(EventDeleteModel model)
        {
            try
            {
                await _eventRepository.DeleteEvent(model);
                return Ok();
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}

