using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Camp4.Models;
using Camp4.Repositories;
using Camp4.Utils;

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
                        Select g.Id, g.[Name], up.firstName, up.lastName
                        FROM [Group] g
                        LEFT JOIN UserProfile up on up.groupId = g.Id
                        
                        
                    ";
                    var reader = cmd.ExecuteReader();
                    var groups = new List<Group>();
                    Group group = new Group();

                    while (reader.Read())
                    {

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
                        Select g.Id, g.[Name], up.firstName, up.lastName, a.firstName AS attendeeFirst, a.lastName AS attendeeLast, a.Id AS attendeeId
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
            }
        }
        private Group newGroupFromDb(SqlDataReader reader)
        {
            return new Group()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                UserProfile = new UserProfile() 
                {
                    FirstName = DbUtils.GetString(reader, "firstName"),
                    LastName = DbUtils.GetString(reader, "lastName")
                }
                
            };
        }

    }
}
