using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Camp4.Models;
using Camp4.Repositories;
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
                        SELECT up.Id, up.FirstName, up.LastName, up.Email, up.DateCreated, up.UserRoleId, up.GroupId, up.BerthId, up.EmergencyContactId, g.[name]
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
                        SELECT up.Id, up.FirstName, up.LastName, up.Email, up.DateCreated, up.UserRoleId, up.GroupId, up.BerthId, up.EmergencyContactId, g.[name]
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
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public UserProfile GetByFirebaseUserId(string FirebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                 
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirstName, up.LastName, up.Email, up.DateCreated, up.UserRoleId, up.GroupId, up.BerthId, up.EmergencyContactId, g.[name]
                        FROM UserProfile up
                        LEFT JOIN [Group] g ON g.id = up.GroupId
                        WHERE FirebaseId = @FirebaseId
                    
                    ";

                    DbUtils.AddParameter(cmd, "@FirebaseId", FirebaseId);

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
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, 
                                                @Email, @DateCreated, @GroupId, @UserTypeId, @BerthId, @EmergencyContactId)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@DateCreated", userProfile.DateCreated);
                    DbUtils.AddParameter(cmd, "@GroupId", userProfile.GroupId);
                    DbUtils.AddParameter(cmd, "@UserRole", userProfile.UserRole);
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
                            SET UserTypeId = @UserTypeId
                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, @"UserRole", userProfile.UserRole);
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
                FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                FirstName = DbUtils.GetString(reader, "FirstName"),
                LastName = DbUtils.GetString(reader, "LastName"),
                Email = DbUtils.GetString(reader, "Email"),
                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                UserRole = DbUtils.GetInt(reader, "UserRole"),
                EmergencyContactId = DbUtils.GetInt(reader, "EmergencyContactId"),
                BerthId = DbUtils.GetInt(reader, "BerthId"),
                GroupId = DbUtils.GetInt(reader, "GroupId"),
                //UserType = new UserType()
                //{
                //    Id = DbUtils.GetInt(reader, "UserTypeId"),
                //    Name = DbUtils.GetString(reader, "UserTypeName"),
                //}
            };
        }
    }
}
