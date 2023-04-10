using API.Data;
using API.Dtos;
using API.Entities;
using API.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext context;
        private readonly IMapper mapper;
        private readonly ImageService imageService;

        public ProductsController(StoreContext _context, IMapper _mapper, ImageService _imageService)
        {
            context = _context;
            mapper = _mapper;
            imageService = _imageService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] PaginationDto paginationDto)
        {
            var queryable = context.Products.Include(x => x.Brand).Include(y => y.Type).AsQueryable();

            if(!string.IsNullOrEmpty(paginationDto.Name))
            {
                queryable = queryable.Where(x => x.Name.ToLower().Trim().Contains(paginationDto.Name.ToLower().Trim()));
            }

            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var products = await queryable.OrderBy(x => x.Name).Paginate(paginationDto).ToListAsync();

            return mapper.Map<List<Product>>(products);
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.Products.Include(x => x.Brand).Include(y => y.Type)
                .Where(z => z.ProductId == id).FirstOrDefaultAsync();

            if(product == null) return NotFound();

            return product;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        public async Task<ActionResult<Product>> CreateProduct([FromForm] ProductCreationDto productDto)
        {
            var product = mapper.Map<Product>(productDto);

            if (productDto.PictureUrl != null)
            {
                var imageResult = await imageService.AddImageAsync(productDto.PictureUrl);

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails
                    {
                        Title = imageResult.Error.Message
                    });

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            context.Products.Add(product);
            var result = await context.SaveChangesAsync() > 0;
            if (result) return NoContent();
            return BadRequest(new ProblemDetails { Title = "Problem adding product" });
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Product>> UpdateProduct(int id, [FromForm] ProductUpdateDto productDto)
        {
            var product = await context.Products.FindAsync(id);

            if (product == null) return NotFound();

            mapper.Map(productDto, product);

            if (productDto.PictureUrl != null)
            {
                var imageUploadResult = await imageService.AddImageAsync(productDto.PictureUrl);

                if (imageUploadResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageUploadResult.Error.Message });

                if (!string.IsNullOrEmpty(product.PublicId))
                    await imageService.DeleteImageAsync(product.PublicId);

                product.PictureUrl = imageUploadResult.SecureUrl.ToString();
                product.PublicId = imageUploadResult.PublicId;
            }

            var result = await context.SaveChangesAsync() > 0;

            if (result) return Ok(product);

            return BadRequest(new ProblemDetails { Title = "Problem updating product" });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await context.Products.FindAsync(id);

            if (product == null) return NotFound();

            if (!string.IsNullOrEmpty(product.PublicId))
                await imageService.DeleteImageAsync(product.PublicId);

            context.Products.Remove(product);

            var result = await context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting product" });
        }

        // For Selectors
        [Route("SelectType")]
        [HttpGet]
        public async Task<ActionResult<List<TypesDto>>> GetTypesForProduct()
        {
            List<Types> types = await context.Types.ToListAsync();

            if (types == null) return new List<TypesDto>();

            return mapper.Map<List<TypesDto>>(types);
        }

        [Route("SelectBrand")]
        [HttpGet]
        public async Task<ActionResult<List<BrandDto>>> GetBrandsForProduct()
        {
            List<Brand> brands = await context.Brands.ToListAsync();

            if (brands == null) return new List<BrandDto>();

            return mapper.Map<List<BrandDto>>(brands);
        }

    }
}

