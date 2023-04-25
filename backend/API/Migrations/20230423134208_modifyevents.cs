using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class modifyevents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5064b0b3-5a05-4d6a-88b9-6d09fe6259cf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "634d42b1-67a9-445c-84f2-3909d8b7ff5e");

            migrationBuilder.AddColumn<int>(
                name: "EventId",
                table: "ScheduleEvents",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3fe4b2e3-7b85-44ad-a12b-8208b9452b9d", null, "Admin", "ADMIN" },
                    { "e2f3c2ec-9225-431b-9a05-97fd7af54f63", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3fe4b2e3-7b85-44ad-a12b-8208b9452b9d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e2f3c2ec-9225-431b-9a05-97fd7af54f63");

            migrationBuilder.DropColumn(
                name: "EventId",
                table: "ScheduleEvents");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5064b0b3-5a05-4d6a-88b9-6d09fe6259cf", null, "User", "USER" },
                    { "634d42b1-67a9-445c-84f2-3909d8b7ff5e", null, "Admin", "ADMIN" }
                });
        }
    }
}
