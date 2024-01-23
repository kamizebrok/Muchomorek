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
            Harvest zbiory = new Harvest(dtoHarvest.Name, dtoHarvest.Type, dtoHarvest.Count, DateTime.Now, dtoHarvest.Latitude, dtoHarvest.Longitude);
            return await _harvestRepository.add(zbiory);
        }
        public async Task<List<Harvest>> addHarvestLot(List<DTOHarvestWithVoid> zbiory)
        {
            List<Harvest> output = new List<Harvest>();
            foreach(DTOHarvestWithVoid x in zbiory)
            {
                output.Add(new Harvest("None",x.Type,x.Amount,DateTime.Now,x.Latitude,x.Longitude));
            }
            return await _harvestRepository.addHarvestLot(output);
        }
        public async Task<List<DTOHarvestListElement>> listAllHarvest()
        {
            List<Harvest> input = await _harvestRepository.ListAll();
            List<DTOHarvestListElement> output = new List<DTOHarvestListElement>();
            foreach(Harvest x in input){
                output.Add(new DTOHarvestListElement(x.Type, x.Count, x.Latitude, x.Longitude));
            }
            return output;
        }

        public async Task<List<Harvest>> listHarvest(int page)
        {
            return await _harvestRepository.ListAll(page);
        }
    }
}
