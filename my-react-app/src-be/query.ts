/**
 * @file home to all the sql queries
 */

import postgres from "postgres";

const sql = postgres({
    ssl: 'require',
});

export const createSchemas = async () => {
    await sql.begin(async sql => {
//         await sql`
// CREATE TABLE Season (
//     season_year INT NOT NULL PRIMARY KEY,
//     season_name VARCHAR(64) NOT NULL UNIQUE
// );`;

        await sql`
CREATE TABLE Contact (
    contact_id INT NOT NULL PRIMARY KEY,
    contact_phone_number CHAR(12) UNIQUE,
    contact_first_name VARCHAR(64),
    contact_last_name VARCHAR(64)
);
`;

        await sql`
CREATE TABLE Event (
    event_id INT NOT NULL PRIMARY KEY,
    event_name VARCHAR(256) NOT NULL,
    event_date DATE NOT NULL,
    event_type VARCHAR(64) NOT NULL,
    event_location VARCHAR(256) NOT NULL,
    event_season_year INT NOT NULL REFERENCES Season(season_year)
);
`;

        await sql`
CREATE TABLE Team (
    team_id VARCHAR(16) NOT NULL PRIMARY KEY,
    team_name VARCHAR(256) NOT NULL,
    team_organization VARCHAR(256) NOT NULL,
    team_location VARCHAR(256) NOT NULL
);
`;

        await sql`
CREATE TABLE Registration (
    team_id VARCHAR(16) NOT NULL REFERENCES Team(team_id),
    event_id INT NOT NULL REFERENCES Event(event_id),
    judge_contact_id INT NOT NULL REFERENCES Contact(contact_id),
    judge_notebook_score INT,
    judge_hours INT NOT NULL DEFAULT 0,
    PRIMARY KEY (team_id, event_id)
);
`;

        await sql`
CREATE TABLE Mentors (
    mentor_contact_id INT NOT NULL REFERENCES Contact(contact_id),
    team_id VARCHAR(16) NOT NULL REFERENCES Team(team_id),
    mentor_hours INT NOT NULL DEFAULT 0,
    PRIMARY KEY (mentor_contact_id, team_id)
);
`;

        await sql`
CREATE TABLE Volunteers (
    volunteer_contact_id INT NOT NULL REFERENCES Contact(contact_id),
    event_id INT NOT NULL REFERENCES Event(event_id),
    volunteer_hours INT NOT NULL DEFAULT 0,
    PRIMARY KEY (volunteer_contact_id, event_id)
);
`;

        await sql`
CREATE TABLE Award (
    award_id INT NOT NULL PRIMARY KEY,
    award_name VARCHAR(255) NOT NULL,
    award_qualification VARCHAR(255) NOT NULL,
    award_team_id VARCHAR(16) NOT NULL,
    award_event_id INT NOT NULL, 
    FOREIGN KEY (award_team_id, award_event_id) REFERENCES Registration(team_id, event_id)
);
`;

        await sql`
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
    FOREIGN KEY (match_team_id_red_1, event_id) REFERENCES Registration(team_id, event_id),
    FOREIGN KEY (match_team_id_red_2, event_id) REFERENCES Registration(team_id, event_id),
    FOREIGN KEY (match_team_id_blue_1, event_id) REFERENCES Registration(team_id, event_id),
    FOREIGN KEY (match_team_id_blue_2, event_id) REFERENCES Registration(team_id, event_id)
);
`;
    });
};

export const insertSeason = async (year: number, name: string) => await sql`
INSERT INTO Season (season_year, season_name) VALUES (${year}, ${name})
`;

export const getSeasons = async () => await sql`
SELECT *
    FROM Season;
`;