import postgres from "postgres";

const sql = postgres({
    ssl: 'require',
});

export const createSchemas = async () => await sql`
CREATE TABLE Season (
    season_year INT NOT NULL PRIMARY KEY,
    season_name VARCHAR(64) NOT NULL UNIQUE
);
`;

export const insertSeason = async (year: number, name: string) => await sql`
INSERT INTO Season (season_year, season_name) VALUES (${year}, ${name})
`;

export const getSeasons = async () => await sql`
SELECT *
    FROM Season;
`;