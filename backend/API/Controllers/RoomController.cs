using System;
using System.ComponentModel.DataAnnotations;
using Application.Abstractions;
using DataAccess.Repositories;
using Domain;
using Domain.API.RoomIdentity;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [ApiController]
    [Route("room/auth")]
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
    }

    //[HttpPost("room/auth/create")]
    //public IActionResult Create(Room room)
    //{
    //    Room _room = new()
    //    {
    //        RoomName = room.RoomName,
    //        RoomCapacity = room.RoomCapacity,
    //        Password = BCrypt.Net.BCrypt.HashPassword(room.Password),
    //        Email = room.Email.ToLower(),
    //        RoomType = room.RoomType,
    //        RoomFeatures = room.RoomFeatures,
    //        RoomLocation = room.RoomLocation,
            
    //    };
    //    if (string.IsNullOrEmpty(room.Password))
    //    {
    //        _room.Password = null;
    //    }

    //    try
    //    {
    //        Room returnedRoom = RoomRepository.Create(_room);
    //        string jwt = _jwtService.Generate(_room.Id);
    //        return Created("success", new { jwt });
    //    }
    //    catch (FormatException e)
    //    {
    //        return BadRequest(new { message = e.Message });
    //    }
    //    catch (Exception)
    //    {
    //        return BadRequest(new { message = "Email already exists" });
    //    }
    //}
}

