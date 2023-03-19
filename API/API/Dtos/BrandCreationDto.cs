using API.Entities;
using API.Validations;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class BrandCreationDto
    {
        [Required(ErrorMessage = "The field with name {0} is required")]
        [StringLength(10)]
        [FirstLetterUppercase]
        public string Name { get; set; }
    }
}
