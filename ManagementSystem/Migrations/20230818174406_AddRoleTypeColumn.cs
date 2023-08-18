using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleTypeColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "RoleType",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "661b6abd-c393-4dde-880d-8e9cc5ed51b2", "1", "Admin", "Admin" },
                    { "72adec77-e115-44a3-af92-b19ee91a3305", "2", "User", "User" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "RoleType", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "63c27a02-c812-4fbe-9d24-a023f378046c", 0, "17f43f52-8249-4d9b-a6a5-7b2a70b0264d", "admin@test.com", true, "", "", false, null, "ADMIN@TEST.COM", "ADMIN", "AQAAAAEAACcQAAAAECk86bCkmvzJikmTje3O2dFIqhbs/EVFNEDZwcvw4aSjono+Nym8FO42tS7jigDuDA==", null, false, null, "0baf1cb7-a8a0-447b-b40d-a45471ca5cb7", false, "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "661b6abd-c393-4dde-880d-8e9cc5ed51b2", "63c27a02-c812-4fbe-9d24-a023f378046c" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "72adec77-e115-44a3-af92-b19ee91a3305");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "661b6abd-c393-4dde-880d-8e9cc5ed51b2", "63c27a02-c812-4fbe-9d24-a023f378046c" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "661b6abd-c393-4dde-880d-8e9cc5ed51b2");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "63c27a02-c812-4fbe-9d24-a023f378046c");

            migrationBuilder.DropColumn(
                name: "RoleType",
                table: "AspNetUsers");

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
    }
}
