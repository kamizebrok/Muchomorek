using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Threading;

namespace MuchomorekBack.Model
{
    public class ContextModel : DbContext
    {
        private readonly string _connectionString = "server=localhost;user=root;database=harvest;password=admin;port=3306";

        public ContextModel(DbContextOptions<ContextModel> options) : base(options)
        {
        }

        public ContextModel()
        {
        }

        public DbSet<Harvest> Harvest { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(_connectionString, ServerVersion.AutoDetect(_connectionString));
        }
    }
}
