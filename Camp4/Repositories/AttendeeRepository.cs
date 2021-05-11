using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Camp4.Models;
using Camp4.Utils;

namespace Camp4.Repositories
{
    public class AttendeeRepository : BaseRepository, IAttendeeRepository
    {
        public AttendeeRepository(IConfiguration configuration) : base(configuration) { }

        public List<Attendee> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirstName, LastName, GroupId, BerthId, EmergencyContactId
                        FROM Attendee
                        ";
                    var reader = cmd.ExecuteReader();
                    var attendees = new List<Attendee>();
                    while (reader.Read())
                    {
                        attendees.Add(NewAttendeeFromDb(reader));
                    }
                    reader.Close();
                    return attendees;
                }
            }
        }

        public List<Attendee> GetByGroup(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirstName, LastName, GroupId, BerthId, EmergencyContactId
                        FROM Attendee
                        WHERE GroupId = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    var attendees = new List<Attendee>();
                    while (reader.Read())
                    {
                        attendees.Add(NewAttendeeFromDb(reader));
                    }
                    reader.Close();
                    return attendees;
                }
            }
        }



        public Attendee GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirstName, LastName, GroupId, BerthId, EmergencyContactId
                        FROM Attendee
                        WHERE Id = @Id
                        ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Attendee attendee = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        attendee = NewAttendeeFromDb(reader);
                    }
                    reader.Close();

                    return attendee;
                }
            }
        }


        public void Add(Attendee attendee)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Attendee (firstName, lastName, groupId, berthId, emergencyContactId)
                        OUTPUT INSERTED.ID
                        VALUES (@FirstName, @LastName, @GroupId, @BerthId, @EmergencyContactId)
                    ";
                    DbUtils.AddParameter(cmd, "@FirstName", attendee.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", attendee.LastName);
                    DbUtils.AddParameter(cmd, "@GroupId", attendee.GroupId);
                    DbUtils.AddParameter(cmd, "@BerthId", attendee.BerthId);
                    DbUtils.AddParameter(cmd, "@EmergencyContactId", attendee.EmergencyContactId);

                    attendee.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        private Attendee NewAttendeeFromDb(SqlDataReader reader)
        {
            return new Attendee()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                FirstName = DbUtils.GetString(reader, "FirstName"),
                LastName = DbUtils.GetString(reader, "LastName"),
                BerthId = DbUtils.GetInt(reader, "BerthId"),
                GroupId = DbUtils.GetInt(reader, "GroupId"),
                EmergencyContactId = DbUtils.GetInt(reader, "EmergencyContactId")

            };
        }
    }
}
