

namespace Camp4.Models
{
    public class Attendee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int GroupId { get; set; }
        public int BerthId { get; set; }
        public int EmergencyContactId { get; set; }

    }
}
