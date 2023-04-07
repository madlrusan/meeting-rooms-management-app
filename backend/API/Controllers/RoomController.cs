using System;
using System.ComponentModel.DataAnnotations;
using Application.Abstractions;
using DataAccess.Repositories;
using Domain.API.RoomIdentity;
using Microsoft.AspNetCore.Mvc;
//using BCryptNet = BCrypt.Net.BCrypt;
using BCryptNetCore = BCrypt.Net.BCrypt;

namespace API.Controllers
{
    [ApiController]
    [Route("rooms/")]
    public class RoomController : ControllerBase
	{
		private readonly IRoomRepository roomRepository;
        //private readonly JwtService _jwtService;

        public RoomController(IRoomRepository roomRepository)
		{
			this.roomRepository = roomRepository;
		}

        //[HttpPost("login")]
        //public async Task<IActionResult> Login(string email, string password)
        //      {
        //          Room user = roomRepository.Login(email);
        //          if (user == null)
        //          {
        //              return BadRequest(new { message = "Invalid Credentials" });
        //          }

        //          if (!BCryptNetCore.Verify(password, user.Password))
        //          {
        //              return BadRequest(new { message = "Invalid Credentials" });
        //          }
        //          string jwt = _jwtService.Generate(user.Id);
        //          return Ok(new { user, jwt });
        //      }
        //[HttpGet("getAllUser")]
        //public async Task<ActionResult<IEnumerable<RoomViewsModel>>> GetAllRooms()
        //{
        //    var entities = await roomRepository.GetAllRooms();
        //    return Ok(entities);
        //}
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

