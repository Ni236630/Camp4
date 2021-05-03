using System.Collections.Generic;
using Camp4.Models;

namespace Camp4.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<UserProfile> GetAll();
        UserProfile GetByUserProfileId(int id);
        void Update(UserProfile userProfile);
       

    }
}