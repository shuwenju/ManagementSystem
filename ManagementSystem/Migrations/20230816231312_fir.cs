using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class fir : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "74d18254-9ed4-43f7-9abd-11d1773c3e09");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "9cbc35f0-81d3-473a-a2ea-f8b19064afb9", "0f79c319-88e6-4ae6-83b2-49aa9a9b3eb4" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9cbc35f0-81d3-473a-a2ea-f8b19064afb9");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0f79c319-88e6-4ae6-83b2-49aa9a9b3eb4");

            migrationBuilder.AddColumn<string>(
                name: "OrderStatus",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2bc40c5c-03fd-4ff1-ab98-d2a6c1dde155", "2", "User", "User" },
                    { "53fc4c29-f706-4854-900e-aee889d6ddcd", "1", "Admin", "Admin" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "bd77a741-9f70-47ed-9a8c-82647481bc1c", 0, "d51744b3-a94c-4033-859e-c103be7909c9", "admin@test.com", true, "", "", false, null, "ADMIN@TEST.COM", "ADMIN", "AQAAAAEAACcQAAAAEAGgjXmtYdJ7BMtfvZMPwkg8sxKd+y3a/iyUNYUCUtglOT8esBh/zyGAlCl7qvvs+Q==", null, false, "670bc38b-799b-4c19-8188-ce194289b052", false, "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "53fc4c29-f706-4854-900e-aee889d6ddcd", "bd77a741-9f70-47ed-9a8c-82647481bc1c" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2bc40c5c-03fd-4ff1-ab98-d2a6c1dde155");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "53fc4c29-f706-4854-900e-aee889d6ddcd", "bd77a741-9f70-47ed-9a8c-82647481bc1c" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "53fc4c29-f706-4854-900e-aee889d6ddcd");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "bd77a741-9f70-47ed-9a8c-82647481bc1c");

            migrationBuilder.DropColumn(
                name: "OrderStatus",
                table: "Orders");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "74d18254-9ed4-43f7-9abd-11d1773c3e09", "2", "User", "User" },
                    { "9cbc35f0-81d3-473a-a2ea-f8b19064afb9", "1", "Admin", "Admin" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "0f79c319-88e6-4ae6-83b2-49aa9a9b3eb4", 0, "bdc1e57e-4901-4821-986d-cc2ee5cb0b47", "admin@test.com", true, "", "", false, null, "ADMIN@TEST.COM", "ADMIN", "AQAAAAEAACcQAAAAEOIZ81pEjzsw+C5kJMt7Vg0WsySMsApupRnoPwLxakU86OpOypHFc48PEluyoE2ZEw==", null, false, "626a8781-72eb-43af-994a-95f5fc51faa3", false, "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "9cbc35f0-81d3-473a-a2ea-f8b19064afb9", "0f79c319-88e6-4ae6-83b2-49aa9a9b3eb4" });
        }
    }
}
