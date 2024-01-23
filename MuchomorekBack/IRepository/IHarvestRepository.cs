using MuchomorekBack.Model;

namespace MuchomorekBack.IRepository
{
    public interface IHarvestRepository : ICRUDRepository<Harvest>
    {
        Task<List<Harvest>> addHarvestLot(List<Harvest> harvestList);
    }
}
