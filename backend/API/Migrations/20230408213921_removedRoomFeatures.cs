using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class removedRoomFeatures : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoomFeature");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ad3c7bbe-9baf-4113-96a0-95b513c84b5a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b03fbd51-af05-4a7b-83ab-4835319f317c");

            migrationBuilder.DropColumn(
                name: "CreatedTime",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Rooms");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "79784f2f-3f76-40f9-978b-8bc2ffbdd3b6", null, "Admin", "ADMIN" },
                    { "818e6cfc-5719-4827-a810-8531b38339de", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "79784f2f-3f76-40f9-978b-8bc2ffbdd3b6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "818e6cfc-5719-4827-a810-8531b38339de");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedTime",
                table: "Rooms",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Rooms",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "RoomFeature",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RoomId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomFeature", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoomFeature_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "ad3c7bbe-9baf-4113-96a0-95b513c84b5a", null, "Admin", "ADMIN" },
                    { "b03fbd51-af05-4a7b-83ab-4835319f317c", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoomFeature_RoomId",
                table: "RoomFeature",
                column: "RoomId");
        }
    }
}
