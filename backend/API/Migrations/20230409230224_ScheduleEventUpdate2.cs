using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ScheduleEventUpdate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3bec2268-a45b-4520-bfac-4399bc4badf3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "47a30839-59b4-4ad5-8f42-d98ce5a74f9b");

            migrationBuilder.AddColumn<string>(
                name: "ScheduleEventId",
                table: "Rooms",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ScheduleEvents",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RecurrenceRule = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HostId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScheduleEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScheduleEvents_AspNetUsers_HostId",
                        column: x => x.HostId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a10934bf-53b2-4002-9168-d03fdfe25239", null, "User", "USER" },
                    { "dc0771f3-5cd2-4881-bb55-8933688b9af6", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_ScheduleEventId",
                table: "Rooms",
                column: "ScheduleEventId");

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleEvents_HostId",
                table: "ScheduleEvents",
                column: "HostId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_ScheduleEvents_ScheduleEventId",
                table: "Rooms",
                column: "ScheduleEventId",
                principalTable: "ScheduleEvents",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_ScheduleEvents_ScheduleEventId",
                table: "Rooms");

            migrationBuilder.DropTable(
                name: "ScheduleEvents");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_ScheduleEventId",
                table: "Rooms");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a10934bf-53b2-4002-9168-d03fdfe25239");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dc0771f3-5cd2-4881-bb55-8933688b9af6");

            migrationBuilder.DropColumn(
                name: "ScheduleEventId",
                table: "Rooms");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3bec2268-a45b-4520-bfac-4399bc4badf3", null, "Admin", "ADMIN" },
                    { "47a30839-59b4-4ad5-8f42-d98ce5a74f9b", null, "User", "USER" }
                });
        }
    }
}
