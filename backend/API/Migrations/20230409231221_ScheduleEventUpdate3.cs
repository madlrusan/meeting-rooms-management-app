using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ScheduleEventUpdate3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_ScheduleEvents_ScheduleEventId",
                table: "Rooms");

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
                    { "de71a089-0aa2-4b7d-b146-37d9a900104a", null, "Admin", "ADMIN" },
                    { "fdac9bb6-6728-4742-b0a2-24cb6a25435d", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleEventRoom_ScheduleEventsId",
                table: "ScheduleEventRoom",
                column: "ScheduleEventsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ScheduleEventRoom");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "de71a089-0aa2-4b7d-b146-37d9a900104a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fdac9bb6-6728-4742-b0a2-24cb6a25435d");

            migrationBuilder.AddColumn<string>(
                name: "ScheduleEventId",
                table: "Rooms",
                type: "nvarchar(450)",
                nullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_ScheduleEvents_ScheduleEventId",
                table: "Rooms",
                column: "ScheduleEventId",
                principalTable: "ScheduleEvents",
                principalColumn: "Id");
        }
    }
}
