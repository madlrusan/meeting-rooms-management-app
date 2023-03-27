using Application.Abstractions;
using Domain.API.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            try
            {
                var token = await _userRepository.Login(model);
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

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            try
            {
                await _userRepository.Register(model);
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

        [HttpGet("checkSession")]
        [Authorize]
        public IActionResult CheckSession()
        {
            return Ok();
        }
    }
}