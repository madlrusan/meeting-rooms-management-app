using Domain;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DataAccess.Services
{
    public class JwtService
    {
        private readonly string SECRET_KEY = "Licenta 2023 Ioana-Madalina Rusan";

        public string GenerateToken(User existingUser, IList<string> roles)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var claims = GenerateClaims(existingUser, roles);
            var tokenDescriptor = GenerateTokenDescriptor(claims);
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private SecurityTokenDescriptor GenerateTokenDescriptor(List<Claim> claims)
        {
            var key = Encoding.ASCII.GetBytes(SECRET_KEY);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            return tokenDescriptor;
        }
        private List<Claim> GenerateClaims(User existingUser, IList<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, existingUser.Id),
                new Claim(JwtRegisteredClaimNames.Email, existingUser.Email),
                new Claim(ClaimTypes.Name, existingUser.FirstName + " " + existingUser.LastName),
            };
            if ((bool)existingUser.isFirstLoggin) claims.Add(new Claim("firstLog", "true"));
            else claims.Add(new Claim("firstLog", "false"));
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            return claims;
        }

        private List<Claim> GenerateRoomClaims(Room existingRoom)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, existingRoom.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, existingRoom.Email),
                new Claim(ClaimTypes.Name, existingRoom.RoomName)
            };
            return claims;
        }

        public string GenerateRoomToken(Room existingRoom)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var claims = GenerateRoomClaims(existingRoom);
            var tokenDescriptor = GenerateTokenDescriptor(claims);
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}