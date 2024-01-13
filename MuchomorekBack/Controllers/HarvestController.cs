using Microsoft.AspNetCore.Mvc;
using MuchomorekBack.IService;
using MuchomorekBack.DTO;

namespace MuchomorekBack.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HarvestController : ControllerBase
    {
        private readonly IHarvestService _harvestService;
        public HarvestController(IHarvestService harvestService)
        {
            _harvestService = harvestService;
        }

        [HttpPost]
        public async Task<IActionResult> addHarvest([FromBody] DTOHarvest zbiory)
        {
            return Ok(await _harvestService.addHarvest(zbiory));
        }
        [HttpGet]
        public async Task<IActionResult> listHarvest(int page)
        {
            return Ok(await _harvestService.listHarvest(page));
        }
        [HttpGet]
        public async Task<IActionResult> listAllHarvest()
        {
            return Ok(await _harvestService.listAllHarvest());
        }
    }
}
