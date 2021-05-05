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
                        Select Id, Name
                        FROM [Group]
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
                        SELECT Id, Name
                        FROM [Group]
                        WHERE Id = @id
                    ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    Group group = null;

                    var reader = cmd.ExecuteReader();
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
                        INSERT INTO UserProfile (Name)
                        OUTPUT INSERTED.ID
                        VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@Name", group.Name);

                    group.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        private Group newGroupFromDb(SqlDataReader reader)
        {
            return new Group()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name")
            };
        }

    }
}
