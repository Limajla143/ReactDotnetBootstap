using API.Data;
using API.Dtos;
using API.Entities;
using API.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class TypesController : BaseApiController
    {
        private readonly StoreContext context;
        private readonly ILogger<TypesController> logger;
        private readonly IMapper mapper;

        public TypesController(StoreContext _context, ILogger<TypesController> _logger, IMapper _mapper)
        {
            context = _context;
            logger = _logger;
            mapper = _mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<TypesDto>>> GetTypes([FromQuery] PaginationDto paginationDto)
        {
            var queryable = context.Types.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var types = await queryable.OrderBy(x => x.TypeName).Paginate(paginationDto).ToListAsync();

            return mapper.Map<List<TypesDto>>(types);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TypesDto>> GetTypesById(int id)
        {
            var types = await context.Types.FirstOrDefaultAsync(x => x.TypeId == id);

            if (types == null)
            {
                logger.LogWarning($"Genre with Id {id} no found");
                return NotFound();
            }
            return mapper.Map<TypesDto>(types);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TypesCreationDto typesCreationDto)
        {
            var types = mapper.Map<Types>(typesCreationDto);
            context.Add(types);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] TypesCreationDto typesCreationDto)
        {

            var types = await context.Types.FirstOrDefaultAsync(x => x.TypeId == id);

            if (types == null)
            {
                return NotFound();
            }
            types= mapper.Map(typesCreationDto, types);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var exists = await context.Types.AnyAsync(x => x.TypeId == id);

            if (!exists)
            {
                return NotFound();
            }
            context.Types.Remove(new Types() { TypeId = id });
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
