using Camp4.Models;
using System.Collections.Generic;

namespace Camp4.Repositories
{
    public interface IGroupRepository
    {
        void Add(Group group);
        List<Group> GetAll();
    }
}