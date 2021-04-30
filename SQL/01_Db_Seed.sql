USE [Camp4]
GO

set identity_insert [userProfile] on
insert into UserProfile ([id], Email, FirstName, LastName,  dateCreated, UserTypeId, groupId, FirebaseUserId, berthId, emergencyContactId ) values (1, 'foo@bar.com', 'Foo', 'Barington',  '2020-04-23',  1, 0, 'OKE4SvCGHnTP2LV7gB6QzS74GWl1', 1, 1);
set identity_insert [userProfile] off

set identity_insert [userRole] on
insert into [userRole] ([id], [Name]) VALUES (1, 'Admin'), (2, 'Employee');
set identity_insert [userRole] off

set identity_insert [attendees] on
insert into attendees ([id], FirstName, LastName, groupId, berthId, emergencyContactId ) values (1, 'Foob', 'Baroness',   1, , 1, 2);
insert into attendees ([id], FirstName, LastName, groupId, berthId, emergencyContactId ) values (2, 'Foober', 'Barons',   2, , 1, 3);
set identity_insert [attendees] off

set identity_insert [Group] on
insert into [Group] ([id], [Name]) VALUES (1, 'not assigned'),(2, 'Sneaky Sneks'), (3, 'Awesome Opossums'), (4, 'Liberators of Liberty');
set identity_insert [Group] off

set identity_insert [emergencyContact] on
insert into emergencyContact ([id], FirstName, LastName, [address], phoneNumber, relaionship ) values (1, 'John', 'Doe',   'some address here',  '555-0555', 'Father');
insert into emergencyContact ([id], FirstName, LastName, [address], phoneNumber, relaionship ) values (2, 'Jane', 'Doe',   "some address here",  '555-0556', 'Mother');
set identity_insert [emergencyContact] off

set identity_insert [allergy] on
insert into [allergy] ([id], [Name]) VALUES (1, 'Bees'), (2, 'Peanut Butter'), (3, 'PCN');
set identity_insert [allergy] off

set identity_insert [attendeeAllergy] on
insert into attendeeAllergy ([id], attendeeId, allergyId) values ( 1, 1, 1);
insert into attendeeAllergy ([id], attendeeId, allergyId) values ( 2, 1, 2);
set identity_insert [attendeeAllergy] off

set identity_insert [userProfileAllergy] on
insert into userProfileAllergy ([id], userProfileId, allergyId) values ( 1, 1, 2);
insert into userProfileAllergy ([id], userProfileId, allergyId) values ( 2, 1, 1);
set identity_insert [userProfileAllergy] off

set identity_insert [berth] on
insert into [berth] ([id], [Name]) VALUES (1, 'not assigned'), (2, 'Cabin in the Woods'), (3, 'HufflePuff');
set identity_insert [berth] off

set identity_insert [userProfileBerth] on
insert into [berth] ([id], userProfileId, berthId) VALUES (1, 1, 1), (2, 1, 2);
set identity_insert [userProfileBerth] off

set identity_insert [Comment] on
insert into Comment ([id], UserProfileId, Content, dateCreated) values (1, 1, 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', '2020-05-04');
insert into Comment ([id], UserProfileId, Content, dateCreated) values (2, 2, 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', '2020-05-04');
set identity_insert [Comment] off

set identity_insert [attendeeNotes] on
insert into attendeeNotes ([id], attendeeId, Content, dateCreated) values (2, 1, 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', '2020-05-04');
set identity_insert [attendeeNotes] off

