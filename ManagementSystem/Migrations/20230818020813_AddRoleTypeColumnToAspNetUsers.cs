using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleTypeColumnToAspNetUsers : Migration
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
                    { "098ea760-76ce-4415-9533-09582b409d76", "2", "User", "User" },
                    { "0eb14a35-e6b4-4c65-9d0c-226e5a17dbda", "1", "Admin", "Admin" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "0c0e31ac-38ac-4a88-b181-3a476997a3f7", 0, "0386d6e4-3b95-443a-92b2-d0baf38e77e3", "admin@test.com", true, "", "", false, null, "ADMIN@TEST.COM", "ADMIN", "AQAAAAEAACcQAAAAEOhnJ4hFH4CQpe+HrnRAYMphu5g0ePur8Zg7zY8KWOkSksUe9iidOUuULDsRObZLBA==", null, false, "83519311-96bc-4ac4-8cf6-c2e8b367aa93", false, "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "0eb14a35-e6b4-4c65-9d0c-226e5a17dbda", "0c0e31ac-38ac-4a88-b181-3a476997a3f7" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "098ea760-76ce-4415-9533-09582b409d76");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "0eb14a35-e6b4-4c65-9d0c-226e5a17dbda", "0c0e31ac-38ac-4a88-b181-3a476997a3f7" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0eb14a35-e6b4-4c65-9d0c-226e5a17dbda");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0c0e31ac-38ac-4a88-b181-3a476997a3f7");

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
