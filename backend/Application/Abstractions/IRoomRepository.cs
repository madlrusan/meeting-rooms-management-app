using System;
using Domain;
using Domain.API.Identity;

namespace Application.Abstractions
{
	public interface IRoomRepository
	{
        Room Create(Room room);
        Room GetByEmail(string email);
        Room GetById(int id);
        Room Login(string email);
        Room Delete(int id);

    }
}

