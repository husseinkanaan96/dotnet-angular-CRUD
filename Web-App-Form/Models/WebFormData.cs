using System.ComponentModel.DataAnnotations;

namespace Web_App_Form.Models
{
    public class WebForm

    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string firstName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string lastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string email { get; set; } = string.Empty;

        [Range(0, 150)]
        public int age { get; set; }

        [Phone]
        public string phone { get; set; } = string.Empty;

        [Required]
        public string city { get; set; } = string.Empty;

    }
}