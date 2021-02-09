using Microsoft.EntityFrameworkCore;

namespace DataAccess.Models
{
    public partial class STSCapitalContext: DbContext
    {
        public STSCapitalContext(DbContextOptions<STSCapitalContext> options) : base(options)
        {

        }
        public  DbSet<User> User { get; set; }
        public  DbSet<Task> Task { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User", "dbo");
                entity.HasIndex(e => e.Email)
                    .HasName("UQ__User__Email")
                    .IsUnique();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.UserGuid)
                   .IsRequired()
                   .HasMaxLength(50);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.FullName).HasMaxLength(150);

                entity.Property(e => e.Initials).HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.PasswordHash).HasMaxLength(4000);

                entity.Property(e => e.Phone).HasMaxLength(50);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<Task>(entity =>
            {
                entity.ToTable("Task", "dbo");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.TaskGuid)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Description)
                    .HasMaxLength(500);

                entity.Property(e => e.TaskDate).HasColumnType("datetime");
                entity.Property(e => e.TaskFromTime).HasColumnType("datetime");
                entity.Property(e => e.TaskToTime).HasColumnType("datetime");

                entity.Property(e => e.Location).HasMaxLength(200);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            });
        }
    }
}
