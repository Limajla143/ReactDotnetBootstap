using API.Validations;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Brand
    {
        [Key]
        public int BrandId { get; set; }

        [Required(ErrorMessage = "The field with name {0} is required")]
        [StringLength(10)]
        [FirstLetterUppercase]
        public string BrandName { get; set; }
    }
}
