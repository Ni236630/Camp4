using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Camp4.Models
{
    public class Comments
    {
        public int Id { get; set; }
        public string Content { get; set;  }
        public DateTime DateCreated { get; set; }
        public int UserProfileId { get; set; }
    }
}
