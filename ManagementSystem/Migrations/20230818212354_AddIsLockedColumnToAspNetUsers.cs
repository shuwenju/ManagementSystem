using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddIsLockedColumnToAspNetUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

			migrationBuilder.AddColumn<int>(
		name: "IsLocked",
		table: "AspNetUsers",
		nullable: true); // Could be null
		


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
        
        
        
        
        }

		/// <inheritdoc />


		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DeleteData(
				table: "AspNetUsers",
				keyColumn: "Id",
				keyValue: "43aa12d5-f1f6-46d8-bce5-78cf53377676");

			migrationBuilder.DeleteData(
				table: "AspNetRoles",
				keyColumn: "Id",
				keyValue: "275d260d-e4e4-47ca-97b6-5e928984c6e9");

			migrationBuilder.DeleteData(
				table: "AspNetRoles",
				keyColumn: "Id",
				keyValue: "f2783e39-6858-41fe-8d0e-81cbb26f61bc");

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
