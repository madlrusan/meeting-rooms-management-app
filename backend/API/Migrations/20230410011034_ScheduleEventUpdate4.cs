using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ScheduleEventUpdate4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "de71a089-0aa2-4b7d-b146-37d9a900104a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fdac9bb6-6728-4742-b0a2-24cb6a25435d");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedTimeUTC",
                table: "ScheduleEvents",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1e611e6f-32ab-4820-a2b1-97ad47ce2820", null, "User", "USER" },
                    { "f2e7ab23-a346-4192-9119-3f6ad4dcb86b", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1e611e6f-32ab-4820-a2b1-97ad47ce2820");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f2e7ab23-a346-4192-9119-3f6ad4dcb86b");

            migrationBuilder.DropColumn(
                name: "CreatedTimeUTC",
                table: "ScheduleEvents");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "de71a089-0aa2-4b7d-b146-37d9a900104a", null, "Admin", "ADMIN" },
                    { "fdac9bb6-6728-4742-b0a2-24cb6a25435d", null, "User", "USER" }
                });
        }
    }
}
