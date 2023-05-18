using Application.Abstractions;
using Domain.API.UserIdentity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using Domain;

namespace API.Controllers
{
    [ApiController]
    [Route("user/")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IEventLogRepository _eventLogRepository;

        public UserController(IUserRepository userRepository, IEventLogRepository eventLogRepository)
        {
            _userRepository = userRepository;
            _eventLogRepository = eventLogRepository;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            try
            {
                var token = await _userRepository.Login(model);
                _eventLogRepository.logEvent($"Successful login user : {model.Email}", EventLogType.Success);

                return Ok(new { Token = token });
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't login user. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't login user. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            try
            {
                await _userRepository.Register(model);
                _eventLogRepository.logEvent($"Successful register user : {model.Email}", EventLogType.Success);
                return Ok();
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't register user. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't register user. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }
        }

        [HttpGet("checkSession")]
        [Authorize]
        public IActionResult CheckSession()
        {
            return Ok();
        }

        [HttpGet("getAllUsers")]
        public async Task<ActionResult<IEnumerable<UsersViewModel>>> GetAllUsers()
        {
            try
            {
                var entities = await _userRepository.GetAllUsers();
                _eventLogRepository.logEvent($"Successful get all users", EventLogType.Success);

                return Ok(entities);
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't get all users. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't get all users. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }

        }

        [HttpPut("updateUser")]
        [Authorize]
        public async Task<IActionResult> UpdateUser(UpdateUserModel model)
        {
            try
            {
                await _userRepository.UpdateUser(model);
                _eventLogRepository.logEvent($"Successful updated user : {model.Email}", EventLogType.Success);

                return Ok();
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't update user. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't update user. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }
        }

        [HttpDelete("deleteUser")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(DeleteUserModel model)
        {
            try
            {
                await _userRepository.DeleteUser(model);
                _eventLogRepository.logEvent($"Successful deleted user with : {model.Id}", EventLogType.Success);

                return Ok();
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't delete user. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't delete user. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }
        }

        [HttpGet("getUserById")]
        [Authorize]
        public async Task<IActionResult> GetUser(string Id)
        {
            try
            {
                var user  = await _userRepository.GetUser(Id);
                _eventLogRepository.logEvent($"Successful get user with : {Id}", EventLogType.Success);

                return Ok(user);
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't get user by id. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't get user by id. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }
        }
       
        [HttpPut("updateUserPasssword")]
        [Authorize]
        public async Task<IActionResult> UpdateUserPassword(UpdatePasswordModel model)
        {
            try
            {
                await _userRepository.UpdateUserPassword(model);
                _eventLogRepository.logEvent($"Successful updated password for user with : {model.Id}", EventLogType.Success);

                return Ok();
            }
            catch (ValidationException ex)
            {
                _eventLogRepository.logEvent($"Couldn't update password. Error: {ex.Message}, InnerException: {ex.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = ex.Message });
            }
            catch (Exception e)
            {
                _eventLogRepository.logEvent($"Couldn't update password. Error: {e.Message}, InnerException: {e.InnerException}", EventLogType.Error);
                return BadRequest(new { Exception = e.Message });
            }
        }
    }
}