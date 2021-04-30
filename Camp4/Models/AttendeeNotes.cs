using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Camp4.Models
{
    public class AttendeeNotes
    {
        public int Id { get; set; }
        public int AttendeeId { get; set; }
        public string Content { get; set; }
        public DateTime dateEdited { get; set; }
    }
}
