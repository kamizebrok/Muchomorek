using MuchomorekBack.DTO;
using MuchomorekBack.IService;
using MuchomorekBack.Model;
using MuchomorekBack.IRepository;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MuchomorekBack.Service
{
    public class HarvestService : IHarvestService
    {
        private readonly IHarvestRepository _harvestRepository;

        public HarvestService(IHarvestRepository harvestRepository)
        {
            _harvestRepository = harvestRepository;
        }
        public async Task<Harvest> addHarvest(DTOHarvest dtoHarvest)
        {
            Harvest zbiory = new Harvest(dtoHarvest.Name, dtoHarvest.Type, dtoHarvest.Count, dtoHarvest.Date, dtoHarvest.Latitude, dtoHarvest.Longitude);
            return await _harvestRepository.add(zbiory);
        }

        public async Task<List<Harvest>> listAllHarvest()
        {
            return await _harvestRepository.ListAll();
        }

        public async Task<List<Harvest>> listHarvest(int page)
        {
            return await _harvestRepository.ListAll(page);
        }
    }
}
