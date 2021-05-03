USE [master]

IF db_id('Camp4') IS NULl
  CREATE DATABASE [Camp4]
GO

USE [Camp4]
GO



DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserRole];
DROP TABLE IF EXISTS [Attendee];
DROP TABLE IF EXISTS [Group];
DROP TABLE IF EXISTS [EmergencyContact];
DROP TABLE IF EXISTS [Allergy];
DROP TABLE IF EXISTS [AttendeeAllergy];
DROP TABLE IF EXISTS [UserProfileAllergy];
DROP TABLE IF EXISTS [Berth];
DROP TABLE IF EXISTS [UserProfileBerth];
DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [AttendeeNote];
GO




CREATE TABLE [UserProfile] (
  [id] int PRIMARY KEY IDENTITY,
  [firebaseId] NVARCHAR(28) NOT NULL,
  [firstName] nvarchar(255) NOT NULL,
  [lastName] nvarchar(255) NOT NULL,
  [email] nvarchar(255) NOT NULL,
  [dateCreated] timestamp NOT NULL,
  [userRoleId] int NOT NULL,
  [groupId] int NOT NULL,
  [berthId] int NOT NULL,
  [emergencyContactId] int NOT NULL,
   



)
GO

CREATE TABLE [UserRole] (
  [id] int PRIMARY KEY IDENTITY,
  [name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Attendee] (
  [id] int PRIMARY KEY IDENTITY,
  [firstName] nvarchar(255) NOT NULL,
  [lastName] nvarchar(255) NOT NULL,
  [groupId] int NOT NULL,
  [berthId] int NOT NULL,
  [emergencyContactId] int NOT NULL
)
GO

CREATE TABLE [Group] (
  [id] int PRIMARY KEY IDENTITY,
  [name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [EmergencyContact] (
  [id] int PRIMARY KEY IDENTITY,
  [firstName] nvarchar(255) NOT NULL,
  [lastName] nvarchar(255) NOT NULL,
  [address] nvarchar(255) NOT NULL,
  [phoneNumber] nvarchar(255) NOT NULL,
  [relaionship] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Allergy] (
  [id] int PRIMARY KEY IDENTITY,
  [name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [UserProfileAllergy] (
  [id] int PRIMARY KEY IDENTITY,
  [userProfileId] int NOT NULL,
  [allergyId] int NOT NULL
)
GO

CREATE TABLE [AttendeeAllergy] (
  [id] int PRIMARY KEY IDENTITY,
  [attendeeId] int NOT NULL,
  [allergyId] int NOT NULL
)
GO

CREATE TABLE [Berth] (
  [id] int PRIMARY KEY IDENTITY,
  [name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [UserProfileBerth] (
  [id] int PRIMARY KEY IDENTITY,
  [berthId] int NOT NULL,
  [userProfileId] int NOT NULL
)
GO

CREATE TABLE [Comment] (
  [id] int PRIMARY KEY IDENTITY,
  [content] nvarchar(255) NOT NULL,
  [dateCreated] datetime NOT NULL,
  [userProfileId] int NOT NULL
)
GO

CREATE TABLE [AttendeeNote] (
  [id] int PRIMARY KEY IDENTITY,
  [attendeeId] int NOT NULL,
  [content] nvarchar(255) NOT NULL,
  [dateEdited] datetime NOT NULL
)
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([userRoleId]) REFERENCES [UserRole] ([id])
GO

ALTER TABLE [Attendee] ADD FOREIGN KEY ([groupId]) REFERENCES [Group] ([id])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([groupId]) REFERENCES [Group] ([id])
GO

ALTER TABLE [UserProfileBerth] ADD FOREIGN KEY ([berthId]) REFERENCES [Berth] ([id])
GO

ALTER TABLE [UserProfileBerth] ADD FOREIGN KEY ([userProfileId]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([userProfileId]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [AttendeeNote] ADD FOREIGN KEY ([attendeeId]) REFERENCES [Attendee] ([id])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([emergencyContactId]) REFERENCES [EmergencyContact] ([id])
GO

ALTER TABLE [Attendee] ADD FOREIGN KEY ([emergencyContactId]) REFERENCES [EmergencyContact] ([id])
GO

ALTER TABLE [Attendee] ADD FOREIGN KEY ([berthId]) REFERENCES [Berth] ([id])
GO

ALTER TABLE [UserProfileAllergy] ADD FOREIGN KEY ([userProfileId]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [UserProfileAllergy] ADD FOREIGN KEY ([allergyId]) REFERENCES [Allergy] ([id])
GO

ALTER TABLE [AttendeeAllergy] ADD FOREIGN KEY ([attendeeId]) REFERENCES [Attendee] ([id])
GO

ALTER TABLE [AttendeeAllergy] ADD FOREIGN KEY ([allergyId]) REFERENCES [Allergy] ([id])
GO

