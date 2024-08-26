using Microsoft.EntityFrameworkCore;
using Web_App_Form.Models;

namespace Web_App_Form.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<WebForm> WebForms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<WebForm>()
                .HasKey(wf => wf.Id);

            modelBuilder.Entity<WebForm>()
                .Property(wf => wf.Id)
                .ValueGeneratedOnAdd();
        }
    }
}
