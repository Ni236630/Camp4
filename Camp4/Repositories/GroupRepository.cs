using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Camp4.Models;
using Camp4.Repositories;
using Camp4.Utils;
using System.Linq;

namespace Camp4.Repositories
{
    public class GroupRepository : BaseRepository, IGroupRepository
    {
        public GroupRepository(IConfiguration configuration) : base(configuration) { }

        public List<Group> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        Select g.Id, g.[Name],up.id as userId, up.firstName, up.lastName
                        FROM [Group] g
                        LEFT JOIN UserProfile up on up.groupId = g.Id
                        
                        
                    ";
                    var reader = cmd.ExecuteReader();
                    var groups = new List<Group>();
                    Group group = new Group();
                    group.UserProfile = new UserProfile();
                    while (reader.Read())
                    {
                     


                        if (DbUtils.IsNotDbNull(reader, "userId"))
                        {
                            group.UserProfile = new UserProfile
                            {
                                Id = DbUtils.GetInt(reader, "userId"),
                                FirstName = DbUtils.GetString(reader, "firstName"),
                                LastName = DbUtils.GetString(reader, "lastName")
                            };
                        }
                        groups.Add(newGroupFromDb(reader));

                    };

                    reader.Close();
                    return groups;
                }
            }
        }

        public Group getGroupById(int id)
        {
            using( var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        Select g.Id, g.[Name], up.Id as userId, up.firstName, up.lastName, a.firstName AS attendeeFirst, a.lastName AS attendeeLast, a.Id AS attendeeId
                        FROM [Group] g
                        LEFT JOIN UserProfile up on up.groupId = g.Id
                        LEFT JOIN Attendee a on a.groupId = g.Id
                        WHERE g.Id = @id
                    ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    Group group = null;
                   

                    var reader = cmd.ExecuteReader();
                    while(reader.Read())
                    {
                        if (group == null)
                        {
                            group = newGroupFromDb(reader);
                            group.attendees = new List<Attendee>();
                            group.UserProfile = new UserProfile();
                        }
                        if (DbUtils.IsNotDbNull(reader, "userId"))
                        {
                            group.UserProfile = new UserProfile
                            {
                                Id = DbUtils.GetInt(reader, "userId"),
                                FirstName = DbUtils.GetString(reader, "firstName"),
                                LastName = DbUtils.GetString(reader, "lastName")
                            };
                        }

                        if (DbUtils.IsNotDbNull(reader, "attendeeId"))
                        {
                            group.attendees.Add(new Attendee()
                            {
                                Id = DbUtils.GetInt(reader, "attendeeId"),
                                FirstName = DbUtils.GetString(reader, "attendeeFirst"),
                                LastName = DbUtils.GetString(reader, "attendeeLast"),
                               
                            });
                        }
                    }
                    if(reader.Read())
                    {
                        group = newGroupFromDb(reader);
                    }
                    reader.Close();
                    return group;

                }
            }
        }

   

        public void Add(Group group)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [Group] ([name])
                        OUTPUT INSERTED.ID
                        VALUES (@name)";

                    DbUtils.AddParameter(cmd, "@name", group.Name);

                    group.Id = (int)cmd.ExecuteScalar();

                }

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE UserProfile
                    SET groupId  = @userPgroupId
                     WHERE Id = @userId
                    ";

                    DbUtils.AddParameter(cmd, "@userPgroupId", group.Id);
                    DbUtils.AddParameter(cmd, "@userId", group.UserProfile.Id);

                    cmd.ExecuteNonQuery();
                }

                using (var cmd = conn.CreateCommand())
                {
                    var sql = @"";
                    for (int i = 0; i < group.attendees.Count(); i++)
                    {
                        sql += $@"
                    UPDATE Attendee 
                    SET groupId = @groupId{i}
                    WHERE Id = @attendeeId{i}
                    ";
                        DbUtils.AddParameter(cmd, $"@groupId{i}", group.Id);
                        DbUtils.AddParameter(cmd, $"@attendeeId{i}", $"{ group.attendees[i].Id}");
                    }

                    cmd.CommandText = sql; 
                    cmd.ExecuteNonQuery();
                }
                
            }
        }

        public void UpdateGroup(Group group)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [Group]
                            SET [Name] = @name
                        WHERE Id = @id
                    ";


                    DbUtils.AddParameter(cmd, "@name", group.Name);
                    DbUtils.AddParameter(cmd, "@id", group.Id);

                    cmd.ExecuteNonQuery();
                }

                if (group.UserProfile.Id != null)
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                    UPDATE UserProfile
                    SET groupId  = @userPgroupId
                     WHERE Id = @userId
                    ";

                        DbUtils.AddParameter(cmd, "@userPgroupId", group.Id);
                        DbUtils.AddParameter(cmd, "@userId", group.UserProfile.Id);

                        cmd.ExecuteNonQuery();
                    }
                }

                
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                    UPDATE Attendee
                    SET groupId  = 1
                     WHERE groupId = @groupId
                    ";

                        DbUtils.AddParameter(cmd, "@groupId", group.Id);

                        cmd.ExecuteNonQuery();
                    
                }

                using (var cmd = conn.CreateCommand())
                {
                    var sql = @"";
                    for (int i = 0; i < group.attendees.Count(); i++)
                    {
                        sql += $@"
                    UPDATE Attendee 
                    SET groupId = @groupId{i}
                    WHERE Id = @attendeeId{i}
                    ";
                        DbUtils.AddParameter(cmd, $"@groupId{i}", group.Id);
                        DbUtils.AddParameter(cmd, $"@attendeeId{i}", $"{ group.attendees[i].Id}");
                    }

                    cmd.CommandText = sql;
                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Group newGroupFromDb(SqlDataReader reader)
        {
            return new Group()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
             
                
             };
        }

    }
}
