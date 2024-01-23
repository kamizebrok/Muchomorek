using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using MuchomorekBack.IRepository;
using MuchomorekBack.Model;

namespace MuchomorekBack.Repository
{
    public class HarvestRepository : CRUDRepository<Harvest>, IHarvestRepository
    {
        private readonly DbSet<Harvest> table;
        private readonly ContextModel _contextModel;
        public HarvestRepository()
        {
            _contextModel = new ContextModel();
            table = _contextModel.Set<Harvest>();
        }
        public async Task<List<Harvest>> addHarvestLot(List<Harvest> harvestList)
        {
            foreach(Harvest harvest in harvestList)
            {
                await table.AddAsync(harvest);
                await _contextModel.SaveChangesAsync();
            }
            return harvestList;
        }
    }
}
