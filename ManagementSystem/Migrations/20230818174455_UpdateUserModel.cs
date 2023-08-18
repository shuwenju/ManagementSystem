using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1037dfd2-6c22-4801-842e-6bb138578c41", "2", "User", "User" },
                    { "6a5ab776-440c-4b45-be4c-6b3fa5ce305a", "1", "Admin", "Admin" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "RoleType", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "b4fa2163-c29c-4bc2-b2d9-5bbd81150a1b", 0, "78fe3c33-2016-4f90-b55d-87c39c9b715d", "admin@test.com", true, "", "", false, null, "ADMIN@TEST.COM", "ADMIN", "AQAAAAEAACcQAAAAEIomhmPPfTS6FpStedhfhUCvZpEVc01gOMnl/P/Hz+CemX2Wq1sAP+M53s9oX1bs2w==", null, false, null, "49abd522-1d04-4302-9c94-5811b55f5074", false, "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "6a5ab776-440c-4b45-be4c-6b3fa5ce305a", "b4fa2163-c29c-4bc2-b2d9-5bbd81150a1b" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1037dfd2-6c22-4801-842e-6bb138578c41");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "6a5ab776-440c-4b45-be4c-6b3fa5ce305a", "b4fa2163-c29c-4bc2-b2d9-5bbd81150a1b" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6a5ab776-440c-4b45-be4c-6b3fa5ce305a");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b4fa2163-c29c-4bc2-b2d9-5bbd81150a1b");

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
    }
}
