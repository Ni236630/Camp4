using Camp4.Models;
using System.Collections.Generic;

namespace Camp4.Repositories
{
    public interface IAttendeeRepository
    {
        void Add(Attendee attendee);
        List<Attendee> GetAll();
        List<Attendee> GetByGroup(int id);
        Attendee GetById(int id);
    }
}