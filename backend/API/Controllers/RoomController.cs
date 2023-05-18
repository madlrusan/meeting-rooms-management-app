using System;
using System.ComponentModel.DataAnnotations;
using Application.Abstractions;
using DataAccess.Repositories;
using Domain;
using Domain.API.RoomIdentity;
using Domain.API.UserIdentity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [ApiController]
    [Route("room/")]
    public class RoomController : ControllerBase
	{
		private readonly IRoomRepository _roomRepository;
        private readonly IEventLogRepository _eventLogRepository;

        public RoomController(IRoomRepository roomRepository, IEventLogRepository eventLogRepository)
		{
			_roomRepository = roomRepository;
            _eventLogRepository = eventLogRepository;
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login(RoomLoginModel model)
        {
            try
            {
                var token = await _roomRepository.Login(model);
                _eventLogRepository.logEvent($"Successful login room : {model.Email}", EventLogType.Success);

                return Ok(new { Token = token });
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't login room. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't login room. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }
        }

        [HttpPost("createRoom")]
        public async Task<IActionResult> CreateRoom(RoomCreateModel model)
        {
            try
            {
                await _roomRepository.CreateRoom(model);
                _eventLogRepository.logEvent($"Successful created room : {model.Email}", EventLogType.Success);

                return Ok();
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't create room. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't create room. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }
        }

        [HttpGet("getAllRooms")]
        public async Task<ActionResult<IEnumerable<RoomsViewModel>>> GetAllUsers()
        {
            
            try
            {
                var entities = await _roomRepository.GetAllRooms();
                _eventLogRepository.logEvent($"Successful get all rooms", EventLogType.Success);

                return Ok(entities);
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't get all rooms. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't get all rooms. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }
        }
        
        [HttpPut("updateRoom")]
        [Authorize]
        public async Task<IActionResult> UpdateRoom(UpdateRoomModel model)
        {
            try
            {
                await _roomRepository.UpdateRoom(model);
                _eventLogRepository.logEvent($"Successful updated room : {model.Email}", EventLogType.Success);

                return Ok();
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't update room. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't update room. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }
        }

        [HttpDelete("deleteRoom")]
        [Authorize]
        public async Task<IActionResult> DeleteRoom(DeleteRoomModel model)
        {
            try
            {
                await _roomRepository.DeleteRoom(model);
                _eventLogRepository.logEvent($"Successful deleted room with id : {model.Id}", EventLogType.Success);

                return Ok();
            }
            catch(ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't delete room. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't delete room. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }
        }
    }

}

