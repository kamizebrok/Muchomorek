using MuchomorekBack.DTO;
using MuchomorekBack.Model;

namespace MuchomorekBack.IService
{
    public interface IHarvestService
    {
        public Task<Harvest> addHarvest(DTOHarvest dtoHarvest);
        public Task<List<Harvest>> listHarvest(int page);
        public Task<List<DTOHarvestListElement>> listAllHarvest();
        public Task<List<Harvest>> addHarvestLot(List<DTOHarvestWithVoid> zbiory);
    }
}
