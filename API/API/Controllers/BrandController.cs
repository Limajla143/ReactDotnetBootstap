using API.Data;
using API.Dtos;
using API.Entities;
using API.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BrandController : BaseApiController
    {
        private readonly StoreContext context;
        private readonly ILogger<BrandController> logger;
        private readonly IMapper mapper;

        public BrandController(StoreContext _context, ILogger<BrandController> _logger, IMapper _mapper)
        {
            context = _context;
            logger = _logger;
            mapper = _mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<BrandDto>>> GetBrand([FromQuery] PaginationDto paginationDto)
        {
            var queryable = context.Brands.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var Brand = await queryable.OrderBy(x => x.BrandName).Paginate(paginationDto).ToListAsync();

            return mapper.Map<List<BrandDto>>(Brand);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BrandDto>> GetBrandById(int id)
        {
            var Brand = await context.Brands.FirstOrDefaultAsync(x => x.BrandId == id);

            if (Brand == null)
            {
                logger.LogWarning($"Brand with Id {id} no found");
                return NotFound();
            }
            return mapper.Map<BrandDto>(Brand);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] BrandCreationDto brandCreationDto)
        {
            var Brand = mapper.Map<Brand>(brandCreationDto);
            context.Add(Brand);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] BrandCreationDto brandCreationDto)
        {

            var Brand = await context.Brands.FirstOrDefaultAsync(x => x.BrandId == id);

            if (Brand == null)
            {
                return NotFound();
            }
            Brand = mapper.Map(brandCreationDto, Brand);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var exists = await context.Brands.AnyAsync(x => x.BrandId == id);

            if (!exists)
            {
                return NotFound();
            }
            context.Brands.Remove(new Brand() { BrandId = id });
            await context.SaveChangesAsync();
            return NoContent();
        }

    }
}
