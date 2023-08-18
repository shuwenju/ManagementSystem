using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserModelForIsLocked : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a8a650c9-6a4d-4543-b3e7-40f124b893a7");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "f2fdae14-113e-44c2-bc11-6446fcc21100", "39f7bcad-bf64-4612-921a-ac69a0a3b0dd" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f2fdae14-113e-44c2-bc11-6446fcc21100");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "39f7bcad-bf64-4612-921a-ac69a0a3b0dd");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "352ed77c-2526-4ce1-89c3-11fe9e50ca59", "1", "Admin", "Admin" },
                    { "9ef526f4-2ac7-4e85-8323-9d10e9bcd61c", "2", "User", "User" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "RoleType", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "a803d1e4-f1fc-4300-8fc3-e5a8824e6d3e", 0, "0b9d48ad-60fb-4cd4-abfa-48df56544ec0", "admin@test.com", true, "", "", false, null, "ADMIN@TEST.COM", "ADMIN", "AQAAAAEAACcQAAAAENjIJjAQARVTD2s9C0vaYvauuyFL/Anj0jlJbUZnLhlmrWzXKXgXUUGHSQjinEOUnQ==", null, false, null, "f57298e5-3dfe-4c12-8975-50e0107b9507", false, "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "352ed77c-2526-4ce1-89c3-11fe9e50ca59", "a803d1e4-f1fc-4300-8fc3-e5a8824e6d3e" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9ef526f4-2ac7-4e85-8323-9d10e9bcd61c");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "352ed77c-2526-4ce1-89c3-11fe9e50ca59", "a803d1e4-f1fc-4300-8fc3-e5a8824e6d3e" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "352ed77c-2526-4ce1-89c3-11fe9e50ca59");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a803d1e4-f1fc-4300-8fc3-e5a8824e6d3e");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a8a650c9-6a4d-4543-b3e7-40f124b893a7", "2", "User", "User" },
                    { "f2fdae14-113e-44c2-bc11-6446fcc21100", "1", "Admin", "Admin" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "RoleType", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "39f7bcad-bf64-4612-921a-ac69a0a3b0dd", 0, "25763db8-e4f3-4e75-a68e-7f885d174040", "admin@test.com", true, "", "", false, null, "ADMIN@TEST.COM", "ADMIN", "AQAAAAEAACcQAAAAEMRYMl3kZT1fyhIVAcY8lALu3SGBE4xpkgeO7DkneG7P1e8Cek4MHECI0iDLMerLig==", null, false, null, "ad50d824-aac0-4f0d-b139-d78589afed16", false, "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "f2fdae14-113e-44c2-bc11-6446fcc21100", "39f7bcad-bf64-4612-921a-ac69a0a3b0dd" });
        }
    }
}
