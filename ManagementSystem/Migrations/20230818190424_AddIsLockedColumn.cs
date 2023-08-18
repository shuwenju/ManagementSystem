using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddIsLockedColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
