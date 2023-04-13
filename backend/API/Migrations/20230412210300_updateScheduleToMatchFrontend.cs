using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class updateScheduleToMatchFrontend : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ScheduleEventRoom");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1e611e6f-32ab-4820-a2b1-97ad47ce2820");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f2e7ab23-a346-4192-9119-3f6ad4dcb86b");

            migrationBuilder.AddColumn<string>(
                name: "RoomId",
                table: "ScheduleEvents",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4414024f-7ade-4b81-afaa-9630f67201cc", null, "User", "USER" },
                    { "95538f96-30cf-4576-920f-a6237a042b27", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleEvents_RoomId",
                table: "ScheduleEvents",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduleEvents_Rooms_RoomId",
                table: "ScheduleEvents",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScheduleEvents_Rooms_RoomId",
                table: "ScheduleEvents");

            migrationBuilder.DropIndex(
                name: "IX_ScheduleEvents_RoomId",
                table: "ScheduleEvents");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4414024f-7ade-4b81-afaa-9630f67201cc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "95538f96-30cf-4576-920f-a6237a042b27");

            migrationBuilder.DropColumn(
                name: "RoomId",
                table: "ScheduleEvents");

            migrationBuilder.CreateTable(
                name: "ScheduleEventRoom",
                columns: table => new
                {
                    RoomsId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ScheduleEventsId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScheduleEventRoom", x => new { x.RoomsId, x.ScheduleEventsId });
                    table.ForeignKey(
                        name: "FK_ScheduleEventRoom_Rooms_RoomsId",
                        column: x => x.RoomsId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ScheduleEventRoom_ScheduleEvents_ScheduleEventsId",
                        column: x => x.ScheduleEventsId,
                        principalTable: "ScheduleEvents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1e611e6f-32ab-4820-a2b1-97ad47ce2820", null, "User", "USER" },
                    { "f2e7ab23-a346-4192-9119-3f6ad4dcb86b", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleEventRoom_ScheduleEventsId",
                table: "ScheduleEventRoom",
                column: "ScheduleEventsId");
        }
    }
}
