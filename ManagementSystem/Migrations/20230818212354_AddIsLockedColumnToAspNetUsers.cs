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

			migrationBuilder.AddColumn<string>(
		name: "IsLocked",
		table: "AspNetUsers",
		nullable: true); // Could be null
		


	
        
        }

		/// <inheritdoc />


		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropColumn(
			  name: "IsLocked",
			  table: "AspNetUsers");



		}



	}
}
