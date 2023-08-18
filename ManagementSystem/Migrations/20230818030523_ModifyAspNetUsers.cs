using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class ModifyAspNetUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1ff9442a-1951-4435-aa96-e46d1c1e2892", "1", "Admin", "Admin" },
                    { "c6cb0df5-91bc-4999-80f5-b6edd8229722", "2", "User", "User" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "70efcb39-ca56-4c18-ad46-73e69ebcb0ef", 0, "8b67175e-446b-41cf-80ff-c47421fd9b35", "admin@test.com", true, "", "", false, null, "ADMIN@TEST.COM", "ADMIN", "AQAAAAEAACcQAAAAEC9Mlbt6kHBYpOaCxxcr+OivCDzsPr8gN2UCzBWlCW+QjqjSzc9YKsiqPN97g30aqg==", null, false, "5d8b7973-7720-4137-9df9-5a2581a0e474", false, "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "1ff9442a-1951-4435-aa96-e46d1c1e2892", "70efcb39-ca56-4c18-ad46-73e69ebcb0ef" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c6cb0df5-91bc-4999-80f5-b6edd8229722");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "1ff9442a-1951-4435-aa96-e46d1c1e2892", "70efcb39-ca56-4c18-ad46-73e69ebcb0ef" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1ff9442a-1951-4435-aa96-e46d1c1e2892");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "70efcb39-ca56-4c18-ad46-73e69ebcb0ef");

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
    }
}
