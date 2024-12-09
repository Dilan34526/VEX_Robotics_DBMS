/**
 * @file home to all the sql queries
 */

import * as fs from "fs/promises";
import * as path from "path";

import postgres from "postgres";

const sql = postgres({
    ssl: 'require',
});

const createSchemas = async (s=sql) => {
    await s`
CREATE TABLE Season (
    season_year INT NOT NULL PRIMARY KEY,
    season_name VARCHAR(64) NOT NULL UNIQUE
);`;

    await s`
CREATE TABLE Contact (
    contact_id INT NOT NULL PRIMARY KEY,
    contact_phone_number CHAR(12) UNIQUE,
    contact_first_name VARCHAR(64),
    contact_last_name VARCHAR(64)
);
`;

    await s`
CREATE TABLE Event (
    event_id INT NOT NULL PRIMARY KEY,
    event_name VARCHAR(256) NOT NULL,
    event_date DATE NOT NULL,
    event_type VARCHAR(64) NOT NULL,
    event_location VARCHAR(256) NOT NULL,
    event_season_year INT NOT NULL REFERENCES Season(season_year)
);
`;

    await s`
CREATE TABLE Team (
    team_id VARCHAR(16) NOT NULL PRIMARY KEY,
    team_name VARCHAR(256) NOT NULL,
    team_organization VARCHAR(256) NOT NULL,
    team_location VARCHAR(256) NOT NULL
);
`;

    await s`
CREATE TABLE Registration (
    team_id VARCHAR(16) NOT NULL REFERENCES Team(team_id),
    event_id INT NOT NULL REFERENCES Event(event_id),
    judge_contact_id INT NOT NULL REFERENCES Contact(contact_id),
    judge_notebook_score INT,
    judge_hours DECIMAL(6, 2) NOT NULL DEFAULT 0,
    PRIMARY KEY (team_id, event_id)
);
`;

    await s`
CREATE TABLE Mentors (
    mentor_contact_id INT NOT NULL REFERENCES Contact(contact_id),
    team_id VARCHAR(16) NOT NULL REFERENCES Team(team_id),
    mentor_hours DECIMAL(6, 2) NOT NULL DEFAULT 0,
    PRIMARY KEY (mentor_contact_id, team_id)
);
`;

    await s`
CREATE TABLE Volunteers (
    volunteer_contact_id INT NOT NULL REFERENCES Contact(contact_id),
    event_id INT NOT NULL REFERENCES Event(event_id),
    volunteer_hours DECIMAL(6, 2) NOT NULL DEFAULT 0,
    PRIMARY KEY (volunteer_contact_id, event_id)
);
`;

    await s`
CREATE TABLE Award (
    award_id INT NOT NULL PRIMARY KEY,
    award_name VARCHAR(255) NOT NULL,
    award_qualification VARCHAR(255) NOT NULL,
    award_team_id VARCHAR(16) NOT NULL,
    award_event_id INT NOT NULL, 
    FOREIGN KEY (award_team_id, award_event_id) REFERENCES Registration(team_id, event_id) ON DELETE CASCADE
);
`;

    await s`
CREATE TABLE Match (
    match_id INT NOT NULL PRIMARY KEY,
    match_red_score INT NOT NULL DEFAULT 0,
    match_blue_score INT NOT NULL DEFAULT 0,
    match_team_id_red_1 VARCHAR(16) NOT NULL,
    match_team_id_red_2 VARCHAR(16) NOT NULL,
    match_team_id_blue_1 VARCHAR(16) NOT NULL,
    match_team_id_blue_2 VARCHAR(16) NOT NULL,
    match_time DATE NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (match_team_id_red_1, event_id) REFERENCES Registration(team_id, event_id) ON DELETE CASCADE,
    FOREIGN KEY (match_team_id_red_2, event_id) REFERENCES Registration(team_id, event_id) ON DELETE CASCADE,
    FOREIGN KEY (match_team_id_blue_1, event_id) REFERENCES Registration(team_id, event_id) ON DELETE CASCADE,
    FOREIGN KEY (match_team_id_blue_2, event_id) REFERENCES Registration(team_id, event_id) ON DELETE CASCADE
);
`;
};

export const insertSeason = async (year: number, name: string, s=sql) => await s`
INSERT INTO Season (season_year, season_name)
    VALUES
        (${year}, ${name});
`;

export const insertContact = async (id: number, phone: string, fname: string, lname: string, s=sql) => await s`
INSERT INTO Contact (contact_id, contact_phone_number, contact_first_name, contact_last_name)
    VALUES
        (${id}, ${phone}, ${fname}, ${lname});
`;

export const insertEvent = async (id: number, name: string, date: Date, type: string, state: string, year: number, s=sql) => await s`
INSERT INTO Event (event_id, event_name, event_date, event_type, event_location, event_season_year)
    VALUES
        (${id}, ${name}, ${date.getTime()}, ${type}, ${state}, ${year});
`;

export const insertTeam = async (id: string, name: string, organization: string, location: string, s=sql) => await s`
INSERT INTO Team (team_id, team_name, team_organization, team_location)
    VALUES
        (${id}, ${name}, ${organization}, ${location});
`;

export const insertRegistration = async (teamId: string, eventId: number, judgeId: number, judgeScore: number, judgeHours: number, s=sql) => await s`
INSERT INTO Registration (team_id, event_id, judge_contact_id, judge_notebook_score, judge_hours)
    VALUES
        (${teamId}, ${eventId}, ${judgeId}, ${judgeScore}, ${judgeHours});
`;

export const insertMentors = async (mentorId: number, teamId: string, hours: number, s=sql) => await s`
INSERT INTO Mentors (mentor_contact_id, team_id, mentor_hours)
    VALUES
        (${mentorId}, ${teamId}, ${hours});
`;

export const insertVolunteers = async (volunteerId: number, eventId: number, hours: number, s=sql) => await s`
INSERT INTO Volunteers (volunteer_contact_id, event_id, volunteer_hours)
    VALUES
        (${volunteerId}, ${eventId}, ${hours});
`;

export const insertAward = async (id: number, name: string, qualification: string, teamId: string, eventId: number, s=sql) => await s`
INSERT INTO Award (award_id, award_name, award_qualification, award_team_id, award_event_id)
    VALUES
        (${id}, ${name}, ${qualification}, ${teamId}, ${eventId});
`;

export const insertMatch = async (id: number, redScore: number, blueScore: number, teamIdRed1: string, teamIdRed2: string, teamIdBlue1: string, teamIdBlue2: string, time: Date, eventId: number, s=sql) => await s`
INSERT INTO Match (match_id, match_red_score, match_blue_score, match_team_id_red_1, match_team_id_red_2, match_team_id_blue_1, match_team_id_blue_2, match_time, event_id)
    VALUES
        (${id}, ${redScore}, ${blueScore}, ${teamIdRed1}, ${teamIdRed2}, ${teamIdBlue1}, ${teamIdBlue2}, ${time.getTime()}, ${eventId});
`;

const loadTable = async (filename: string, parseParts: (columns: string[]) => Promise<any>) => {
    for await (const line of (await fs.open(path.join(import.meta.dirname, filename))).readLines()) {
        await parseParts(line.split("\t"));
    }
};

const loadMockData = (s=sql) => {
    const seasonPromise = loadTable("./mock-data/Season.txt", ([year, name]) =>
            insertSeason(parseInt(year), name, s));

    const contactPromise = loadTable("./mock-data/Contact.txt", ([id, fname, lname, phone]) =>
            insertContact(parseInt(id), phone, fname, lname, s));

    const eventPromise = seasonPromise.then(
        () => loadTable("./mock-data/Event.txt", ([id, name, date, type, state, year]) =>
                insertEvent(parseInt(id), name, new Date(date), type, state, parseInt(year), s))
    );
    const teamPromise = loadTable("./mock-data/Team.txt", ([id, name, organization, city, state, country]) =>
            insertTeam(id, name, organization, `${city}, ${state}, ${country}`, s));

    const registrationPromise = Promise.all([teamPromise, eventPromise, contactPromise]).then(
        () => loadTable("./mock-data/Registration.txt", ([teamId, eventId, judgeId, judgeHours, score]) =>
                insertRegistration(teamId, parseInt(eventId), parseInt(judgeId), parseInt(score), parseFloat(judgeHours), s))
    );
    const mentorsPromise = Promise.all([contactPromise, teamPromise]).then(
        () => loadTable("./mock-data/Mentors.txt", ([mentorId, teamId, hours]) =>
                insertMentors(parseInt(mentorId), teamId, parseFloat(hours), s))
    );
    const volunteersPromise = Promise.all([contactPromise, eventPromise]).then(
        () => loadTable("./mock-data/Volunteers.txt", ([volunteerId, eventId, hours]) =>
                insertVolunteers(parseInt(volunteerId), parseInt(eventId), parseFloat(hours), s))
    );
    const awardPromise = registrationPromise.then(
        () => loadTable("./mock-data/Award.txt", ([id, name, qualification, teamId, eventId]) =>
                insertAward(parseInt(id), name, qualification, teamId, parseInt(eventId), s))
    );
    const matchPromise = registrationPromise.then(
        () => loadTable("./mock-data/Match.txt", ([time, id, teamIdRed1, teamIdRed2, teamIdBlue1, teamIdBlue2, redScore, blueScore, eventId]) =>
                insertMatch(parseInt(id), parseInt(redScore), parseInt(blueScore), teamIdRed1, teamIdRed2, teamIdBlue1, teamIdBlue2, new Date(time), parseInt(eventId), s))
    );

    return Promise.all([seasonPromise, contactPromise, eventPromise, teamPromise, registrationPromise, mentorsPromise, volunteersPromise, awardPromise, matchPromise]);
};

const dropAllTables = async (s=sql) => {
    await s`DROP TABLE Match;`;
    await s`DROP TABLE Award;`;
    await s`DROP TABLE Volunteers;`;
    await s`DROP TABLE Mentors;`;
    await s`DROP TABLE Registration;`;
    await s`DROP TABLE Team;`;
    await s`DROP TABLE Event;`;
    await s`DROP TABLE Contact;`;
    await s`DROP TABLE Season;`;
};


// transaction that initializes the database schemas and mock data
export const initialize = () => sql.begin(async sql => {
    await createSchemas(sql);
    await loadMockData(sql);
});

// transaction that resets the database
export const reset = () => sql.begin(async sql => {
    await dropAllTables(sql);
    await createSchemas(sql);
    await loadMockData(sql);
});

export const getSeasons = () => sql`
SELECT *
    FROM Season;
`;

export const getEvents = () => sql`
SELECT *
    FROM Event;
`;

export const getTeamsByEventId = (eventId: number) => sql`
SELECT t.*, r.judge_contact_id, r.judge_notebook_score, r.judge_hours
    FROM Registration r
        JOIN Team t ON t.team_id = r.team_id
    WHERE r.event_id = ${eventId};
`;

export const getAwardsByEventId = (eventId: number) => sql`
SELECT *
    FROM Award
    WHERE award_event_id = ${eventId};
`;

export const getVolunteersByEventId = (eventId: number) => sql`
SELECT DISTINCT c.*, SUM(v.volunteer_hours) AS volunteer_hours
    FROM Volunteers v
        JOIN Contact c ON v.volunteer_contact_id = c.contact_id
        JOIN Event e ON v.event_id = e.event_id
    WHERE v.event_id = ${eventId}
    GROUP BY c.contact_id;  
`;

export const getMentorsByEventId = (eventId: number) => sql`
SELECT DISTINCT c.*, m.team_id, SUM(m.mentor_hours) AS mentor_hours
    FROM Mentors m
        JOIN Contact c ON m.mentor_contact_id = c.contact_id
        JOIN Registration r ON m.team_id = r.team_id
    WHERE r.event_id = ${eventId}
    GROUP BY c.contact_id, m.team_id;
`;

export const getJudgesByEventId = (eventId: number) => sql`  
SELECT DISTINCT c.*, r.judge_hours
    FROM Registration r
        JOIN Contact c ON r.judge_contact_id = c.contact_id
    WHERE r.event_id = ${eventId};
`;

export const getMatchesByEventId = (eventId: number) => sql`
SELECT *
    FROM Match
    WHERE event_id = ${eventId};
`;

export const getTripleImpactContributor = async (seasonYear: number) => (await sql`
SELECT c.contact_first_name, c.contact_last_name,
        SUM(v.volunteer_hours + m.mentor_hours + r.judge_hours) AS total_hours,
        SUM(v.volunteer_hours) AS volunteer_hours,
        SUM(m.mentor_hours) AS mentor_hours,
        SUM(r.judge_hours) AS judge_hours
    FROM Contact c
        JOIN Registration r ON r.judge_contact_id = c.contact_id
        JOIN Event ej ON ej.event_id = r.event_id
        JOIN Mentors m ON m.mentor_contact_id = c.contact_id
        JOIN Team t ON t.team_id = m.team_id
        JOIN Volunteers v ON v.volunteer_contact_id = c.contact_id
        JOIN Event ev ON ev.event_id = v.event_id
    WHERE ej.event_season_year = ${seasonYear}
        AND ev.event_season_year = ${seasonYear}
        AND t.team_id IN (
            SELECT r.team_id
                FROM Registration r
                    JOIN Event e ON e.event_id = r.event_id
            WHERE e.event_season_year = ${seasonYear}
        )
    GROUP BY c.contact_id
    HAVING SUM(v.volunteer_hours) > 0
        AND SUM(m.mentor_hours) > 0
        AND SUM(r.judge_hours) > 0
    ORDER BY total_hours DESC
    LIMIT 1;
`)[0];

export const deleteRegistration = (teamId: string, eventId: number) => sql`
DELETE FROM Registration
    WHERE team_id = ${teamId}
        AND event_id = ${eventId};
`;
