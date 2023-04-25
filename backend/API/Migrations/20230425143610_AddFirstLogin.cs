using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddFirstLogin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3fe4b2e3-7b85-44ad-a12b-8208b9452b9d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e2f3c2ec-9225-431b-9a05-97fd7af54f63");

            migrationBuilder.AddColumn<bool>(
                name: "isFirstLoggin",
                table: "AspNetUsers",
                type: "bit",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "39aedea4-e636-4ea1-a2fe-e8bfd97b4f3b", null, "User", "USER" },
                    { "c5b8ad12-805b-41e6-a935-4bf99fab3e81", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "39aedea4-e636-4ea1-a2fe-e8bfd97b4f3b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c5b8ad12-805b-41e6-a935-4bf99fab3e81");

            migrationBuilder.DropColumn(
                name: "isFirstLoggin",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3fe4b2e3-7b85-44ad-a12b-8208b9452b9d", null, "Admin", "ADMIN" },
                    { "e2f3c2ec-9225-431b-9a05-97fd7af54f63", null, "User", "USER" }
                });
        }
    }
}
