using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class add_order_status_col : Migration
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
                    { "984c5660-4132-4d5d-8e41-f15d8d33dadb", "2", "User", "User" },
                    { "aa9f737f-f648-4c1f-8225-00246e9b060b", "1", "Admin", "Admin" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "a77b674c-2bb5-4805-98a5-5c001c942541", 0, "5b5eaf00-7df2-4c23-8663-7aa6ddb01839", "admin@test.com", true, "", "", false, null, "ADMIN@TEST.COM", "ADMIN", "AQAAAAEAACcQAAAAEN6sOxvREgFNiU0g0/S4qtUJ36LKiLGYfXT+3qdgVC71NWHIbS42Wl0n5ChGp+Z+kQ==", null, false, "35ea24d3-73da-4952-a557-d8a7bf17eb96", false, "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "aa9f737f-f648-4c1f-8225-00246e9b060b", "a77b674c-2bb5-4805-98a5-5c001c942541" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "984c5660-4132-4d5d-8e41-f15d8d33dadb");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "aa9f737f-f648-4c1f-8225-00246e9b060b", "a77b674c-2bb5-4805-98a5-5c001c942541" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aa9f737f-f648-4c1f-8225-00246e9b060b");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a77b674c-2bb5-4805-98a5-5c001c942541");

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
