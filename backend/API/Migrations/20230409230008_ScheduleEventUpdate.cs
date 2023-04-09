using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ScheduleEventUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "61fe855f-80e6-4594-becb-a43ac9350eca");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c407a2d3-04ab-4aef-91be-51b4b6cd2616");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3bec2268-a45b-4520-bfac-4399bc4badf3", null, "Admin", "ADMIN" },
                    { "47a30839-59b4-4ad5-8f42-d98ce5a74f9b", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3bec2268-a45b-4520-bfac-4399bc4badf3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "47a30839-59b4-4ad5-8f42-d98ce5a74f9b");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "61fe855f-80e6-4594-becb-a43ac9350eca", null, "User", "USER" },
                    { "c407a2d3-04ab-4aef-91be-51b4b6cd2616", null, "Admin", "ADMIN" }
                });
        }
    }
}
