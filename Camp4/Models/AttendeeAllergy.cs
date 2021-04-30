using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Camp4.Models
{
    public class AttendeeAllergy
    {
        public int Id { get; set; }
        public int AttendeeId { get; set; }
        public int AllergyId { get; set; }
    }
}
