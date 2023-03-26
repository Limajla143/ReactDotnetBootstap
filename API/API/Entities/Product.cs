using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public decimal Price { get; set; }

        public string PictureUrl { get; set; }

        public int BrandId { get; set; }
        public Brand Brand { get; set; }

        public int TypeId { get; set; }
        public Types Type { get; set; }

        public int QuantityStock { get; set; }

        public string PublicId { get; set; }
    }
}
