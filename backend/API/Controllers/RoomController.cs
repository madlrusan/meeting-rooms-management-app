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
       
        public RoomController(IRoomRepository roomRepository)
		{
			_roomRepository = roomRepository;
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login(RoomLoginModel model)
        {
            try
            {
                var token = await _roomRepository.Login(model);
                return Ok(new { Token = token });
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost("createRoom")]
        public async Task<IActionResult> CreateRoom(RoomCreateModel model)
        {
            try
            {
                await _roomRepository.CreateRoom(model);
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

        [HttpGet("getAllRooms")]
        public async Task<ActionResult<IEnumerable<RoomsViewModel>>> GetAllUsers()
        {
            var entities = await _roomRepository.GetAllRooms();
            return Ok(entities);
        }
        
        [HttpPut("updateRoom")]
        [Authorize]
        public async Task<IActionResult> UpdateRoom(UpdateRoomModel model)
        {
            try
            {
                await _roomRepository.UpdateRoom(model);
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

        [HttpDelete("deleteRoom")]
        [Authorize]
        public async Task<IActionResult> DeleteRoom(DeleteRoomModel model)
        {
            try
            {
                await _roomRepository.DeleteRoom(model);
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

