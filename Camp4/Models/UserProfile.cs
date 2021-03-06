using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Camp4.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
       
        public string Email { get; set; }
       
        public DateTime DateCreated { get; set; }
        public int UserRoleId { get; set; }
        public int GroupId { get; set; }
        public int BerthId { get; set; }
        public int EmergencyContactId { get; set; }
        public string FirebaseId { get; set; }

        public Group group { get; set; }


    }
}
