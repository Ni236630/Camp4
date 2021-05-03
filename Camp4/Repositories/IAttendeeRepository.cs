using Camp4.Models;
using System.Collections.Generic;

namespace Camp4.Repositories
{
    public interface IAttendeeRepository
    {
        void Add(Attendee attendee);
        List<Attendee> GetAll();
        Attendee GetById(int id);
    }
}