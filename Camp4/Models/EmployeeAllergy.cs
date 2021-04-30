using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Camp4.Models
{
    public class EmployeeAllergy
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int AllergyId { get; set; }
    }
}
