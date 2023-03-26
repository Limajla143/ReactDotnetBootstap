using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class ProductCreationDto
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        public IFormFile PictureUrl { get; set; }

        public int BrandId { get; set; }
        public int TypeId { get; set; }

        [Required]
        public int QuantityStock { get; set; }

        public string PublicId { get; set; }
    }
}
