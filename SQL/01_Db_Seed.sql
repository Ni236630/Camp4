
USE [Camp4]
GO

set identity_insert [EmergencyContact] on
insert into EmergencyContact ([id], FirstName, LastName, [address], phoneNumber, relaionship ) values (1, 'John', 'Doe',   'some address here',  '555-0555', 'Father');
insert into EmergencyContact ([id], FirstName, LastName, [address], phoneNumber, relaionship ) values (2, 'Jane', 'Doe',   'some address here',  '555-0556', 'Mother');
set identity_insert [EmergencyContact] off

set identity_insert [UserRole] on
insert into [UserRole] ([id], [Name]) VALUES (1, 'Admin'), (2, 'Employee');
set identity_insert [UserRole] off

set identity_insert [Allergy] on
insert into [Allergy] ([id], [Name]) VALUES (1, 'Bees'), (2, 'Peanut Butter'), (3, 'PCN');
set identity_insert [Allergy] off


set identity_insert [Group] on
insert into [Group] ([id], [Name]) VALUES (1, 'not assigned'),(2, 'Sneaky Sneks'), (3, 'Awesome Opossums'), (4, 'Liberators of Liberty');
set identity_insert [Group] off

set identity_insert [Berth] on
insert into [Berth] ([id], [Name]) VALUES (1, 'not assigned'), (2, 'Cabin in the Woods'), (3, 'HufflePuff');
set identity_insert [Berth] off

set identity_insert [Attendee] on
insert into Attendee ([id], FirstName, LastName, groupId, berthId, emergencyContactId ) values (1, 'Foob', 'Baroness',   1,  1, 2);
insert into Attendee ([id], FirstName, LastName, groupId, berthId, emergencyContactId ) values (2, 'Foober', 'Barons',   2,  1, 1);
set identity_insert [Attendee] off

set identity_insert [AttendeeAllergy] on
insert into AttendeeAllergy ([id], attendeeId, allergyId) values ( 1, 1, 1);
insert into AttendeeAllergy ([id], attendeeId, allergyId) values ( 2, 1, 2);
set identity_insert [AttendeeAllergy] off

set identity_insert [AttendeeNote] on
insert into AttendeeNote ([id], attendeeId, Content, dateEdited) values (2, 1, 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', '2020-05-04');
set identity_insert [AttendeeNote] off

set identity_insert [UserProfile] on
insert into UserProfile ([id], Email, FirstName, LastName, userRoleId, GroupId, firebaseId, berthId, emergencyContactId ) values (1, 'foo@bar.com', 'Foo', 'Barington',  1, 1, 'OKE4SvCGHnTP2LV7gB6QzS74GWl1', 1, 1);
set identity_insert [UserProfile] off

set identity_insert [Comment] on
insert into Comment ([id], UserProfileId, Content, dateCreated) values (1, 1, 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', '2020-05-04');
insert into Comment ([id], UserProfileId, Content, dateCreated) values (2, 1, 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', '2020-05-04');
set identity_insert [Comment] off

set identity_insert [UserProfileAllergy] on
insert into UserProfileAllergy ([id], userProfileId, allergyId) values ( 1, 1, 2);
insert into UserProfileAllergy ([id], userProfileId, allergyId) values ( 2, 1, 1);
set identity_insert [UserProfileAllergy] off


set identity_insert [UserProfileBerth] on
insert into [UserProfileBerth] ([id], userProfileId, berthId) VALUES (1, 1, 1), (2, 1, 2);
set identity_insert [UserProfileBerth] off


