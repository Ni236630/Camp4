using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Camp4.Models;
using Camp4.Utils;

namespace Camp4.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirstName, up.firebaseId, up.LastName, up.Email, up.DateCreated, up.UserRoleId, up.GroupId, up.BerthId, up.EmergencyContactId, g.[name]
                        FROM UserProfile up
                        LEFT JOIN [Group] g ON g.id = up.GroupId
                        ";
                    var reader = cmd.ExecuteReader();
                    var userProfiles = new List<UserProfile>();
                    while (reader.Read())
                    {
                        userProfiles.Add(NewUserProfileFromDb(reader));
                    }
                    reader.Close();
                    return userProfiles;
                }
            }
        }

          

        public UserProfile GetByUserProfileId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirstName,up.firebaseId, up.LastName, up.Email, up.DateCreated, up.UserRoleId, up.GroupId, up.BerthId, up.EmergencyContactId, g.[name]
                        FROM UserProfile up
                        LEFT JOIN [Group] g ON g.id = up.GroupId
                        WHERE up.Id = @Id
                        ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    UserProfile userProfile = null;
                    

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        userProfile = NewUserProfileFromDb(reader);
      
                            userProfile.group = new Group
                            {
                               Name = DbUtils.GetString(reader, "name"),
                                
                            };
                        
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public UserProfile GetByFirebaseUserId(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                 
                    cmd.CommandText = @"
                        SELECT up.Id, up.firstName, up.lastName, up.firebaseId, up.email, up.dateCreated, up.userRoleId, up.groupId, up.berthId, up.emergencyContactId, g.[name]
                        FROM UserProfile up
                        LEFT JOIN [Group] g ON g.id = up.GroupId
                        WHERE up.firebaseId = @firebaseId
                    
                    ";

                    DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);
                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = NewUserProfileFromDb(reader);
                    }
                    reader.Close();

                    return userProfile;
                }

            }
        }
    

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseId, FirstName, LastName, 
                                                                 Email, DateCreated, GroupId, UserRoleId, BerthId, EmergencyContactId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseId, @FirstName, @LastName, 
                                                @Email, @DateCreated, @GroupId, @UserRoleId, @BerthId, @EmergencyContactId)";
                    DbUtils.AddParameter(cmd, "@FirebaseId", userProfile.FirebaseId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@DateCreated", userProfile.DateCreated);
                    DbUtils.AddParameter(cmd, "@GroupId", userProfile.GroupId);
                    DbUtils.AddParameter(cmd, "@UserRoleId", userProfile.UserRoleId);
                    DbUtils.AddParameter(cmd, "@BerthId", userProfile.BerthId);
                    DbUtils.AddParameter(cmd, "@EmergencyContactId", userProfile.EmergencyContactId);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                            SET UserRoleId = @UserRole, firstName = @FirstName, lastName = @LastName
                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, @"UserRole", userProfile.UserRoleId);
                    DbUtils.AddParameter(cmd, "@Id", userProfile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }





        private UserProfile NewUserProfileFromDb(SqlDataReader reader)
        {
            return new UserProfile()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                FirebaseId = DbUtils.GetString(reader, "firebaseId"),
                FirstName = DbUtils.GetString(reader, "firstName"),
                LastName = DbUtils.GetString(reader, "lastName"),
                Email = DbUtils.GetString(reader, "email"),
                UserRoleId = DbUtils.GetInt(reader, "userRoleId"),
                EmergencyContactId = DbUtils.GetInt(reader, "emergencyContactId"),
                BerthId = DbUtils.GetInt(reader, "berthId"),
                GroupId = DbUtils.GetInt(reader, "groupId"),
               
                //UserType = new UserType()
                //{
                //    Id = DbUtils.GetInt(reader, "UserTypeId"),
                //    Name = DbUtils.GetString(reader, "UserTypeName"),
                //}
            };
        }
    }
}
