using System;
using Domain;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Authorization;
using Domain.API.EventsIdentity;
using Application.Abstractions;
using DataAccess;
using System.Text.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("event/")]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;
        private readonly AppDbContext _appDbContext;
        private readonly IEventLogRepository _eventLogRepository;

        public EventController(IEventRepository eventRepository, AppDbContext appDbContext, IEventLogRepository eventLogRepository)
        {
            _eventRepository = eventRepository;
            _appDbContext = appDbContext;
            _eventLogRepository = eventLogRepository;
        }


        [HttpPost("createEvent")]
        public async Task<IActionResult> CreateEvent(EventCreateModel model)
        {
            try

            {
                await _eventRepository.CreateEvent(model);
                _eventLogRepository.logEvent($"Successful created event {model.Subject}", EventLogType.Success);
                return Ok();
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't create event. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't create event. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new {Exception = e.Message});
            }
        }

        [HttpGet("getAllEvents")]
        public async Task<ActionResult<IEnumerable<EventViewModel>>> GetAllEvents()
        {
            try
            {
                var entities = await _eventRepository.GetAllEvents();
                _eventLogRepository.logEvent($"Successful get all events", EventLogType.Success);

                return Ok(entities);
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't get all events. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't get all events. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }

        }

        [HttpPut("updateEvent")]
        public async Task<IActionResult> UpdateEvent(EventUpdateModel model)
        {
            try
            {
                await _eventRepository.UpdateEvent(model);
                _eventLogRepository.logEvent($"Successful updated event {model.Subject}", EventLogType.Success);

                return Ok();
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't update event. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't update event. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }
        }

        [HttpDelete("deleteEvent")]
        public async Task<IActionResult> DeleteEvent(EventDeleteModel model)
        {
            try
            {
                await _eventRepository.DeleteEvent(model);
                _eventLogRepository.logEvent($"Successful deleted event  with id {model.Id}", EventLogType.Success);

                return Ok();
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't delete event. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't delete event. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }
        }

        [HttpGet("getAllEventsMobile")]
        public async Task<ActionResult<IEnumerable<EventViewModelMobile>>> GetAllEventsMobile()
        {
            
            try
            {
                var entities = await _eventRepository.GetAllEventsMobile();
                _eventLogRepository.logEvent($"Successful get all events", EventLogType.Success);
                return Ok(entities);
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't get all events for mobile. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't get all events for mobile. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }
        }

        [HttpPost("createEventMobile")]
        public async Task<IActionResult> CreateEventMobile(EventCreateModelMobile model)
        {
            try

            {
                await _eventRepository.CreateEventMobile(model);
                _eventLogRepository.logEvent($"Successful created event {model.Subject}", EventLogType.Success);

                return Ok();
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't create event for mobile. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't create event for mobile. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }
        }
    }
}

