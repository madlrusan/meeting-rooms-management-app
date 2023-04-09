using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ScheduleEvent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "79784f2f-3f76-40f9-978b-8bc2ffbdd3b6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "818e6cfc-5719-4827-a810-8531b38339de");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "61fe855f-80e6-4594-becb-a43ac9350eca", null, "User", "USER" },
                    { "c407a2d3-04ab-4aef-91be-51b4b6cd2616", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "79784f2f-3f76-40f9-978b-8bc2ffbdd3b6", null, "Admin", "ADMIN" },
                    { "818e6cfc-5719-4827-a810-8531b38339de", null, "User", "USER" }
                });
        }
    }
}
