using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddedEventLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "39aedea4-e636-4ea1-a2fe-e8bfd97b4f3b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c5b8ad12-805b-41e6-a935-4bf99fab3e81");

            migrationBuilder.CreateTable(
                name: "EventCategory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventCategory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EventLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EventCategoryId = table.Column<int>(type: "int", nullable: false),
                    TimeStamp = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventLogs_EventCategory_EventCategoryId",
                        column: x => x.EventCategoryId,
                        principalTable: "EventCategory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "17cf9692-50d3-46cf-8416-1213eb2a88e7", null, "Admin", "ADMIN" },
                    { "ac71c573-c5c3-454f-9873-119a75b3393e", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventLogs_EventCategoryId",
                table: "EventLogs",
                column: "EventCategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventLogs");

            migrationBuilder.DropTable(
                name: "EventCategory");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "17cf9692-50d3-46cf-8416-1213eb2a88e7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ac71c573-c5c3-454f-9873-119a75b3393e");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "39aedea4-e636-4ea1-a2fe-e8bfd97b4f3b", null, "User", "USER" },
                    { "c5b8ad12-805b-41e6-a935-4bf99fab3e81", null, "Admin", "ADMIN" }
                });
        }
    }
}
