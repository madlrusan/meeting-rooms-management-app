using System;
using API.Configuration;
using DataAccess;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSwaggerGenConfig();
var connectionString = builder.Configuration.GetConnectionString("Db");
builder.Services.AddDbContext<AppDbContext>(c => c.UseSqlServer(connectionString, b => b.MigrationsAssembly("API")));
if (connectionString is not null)
{
    builder.Services.AddServices(connectionString);
}

var jwtSecretKey = builder.Configuration["jwtOptions:Secret"];
builder.Services.AddAuthConfig(jwtSecretKey);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<AppDbContext>();
    //context.Database.Migrate();
}
// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true).AllowCredentials());
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
