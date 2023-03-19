using API.Validations;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Types
    {
        [Key]
        public int TypeId { get; set; }

        [Required(ErrorMessage = "The field with name {0} is required")]
        [StringLength(10)]
        [FirstLetterUppercase]
        public string TypeName { get; set; }
    }
}
