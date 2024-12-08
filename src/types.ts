export type VdbRes<T> = {
    data?: T,
    error: string,
};

export type VdbSeason = {
    season_year: number,
    season_name: string,
};

export type VdbEventRaw = {
    event_id: number,
    event_name: string,
    event_date: string,
    event_type: string,
    event_location: string,
    event_season_year: number,
};

export type VdbEvent = {
    event_id: number,
    event_name: string,
    event_date: Date,
    event_type: string,
    event_location: string,
    event_season_year: number,
};

export type VdbTeam = {
    team_id: number,
    team_name: string,
    team_number: number,
};

export type VdbAward = {
    award_id: number,
    award_name: string,
    award_event_id: number,
    award_team_id: number,
};

export type VdbContact = {
    contact_id: number,
    contact_first_name: string,
    contact_last_name: string,
    contact_email: string,
    contact_phone: string,
};

export type VdbJudge = VdbContact & {
    team_id: number,
    judge_hours: number,
};

export type VdbMentor = VdbContact & {
    team_id: number,
};

export type VdbVolunteer = VdbContact & {
    volunteer_hours: number,
};

export type VdbMatchRaw = {
    match_id: number,
    match_red_score: number,
    match_blue_score: number,
    match_team_id_red_1: string,
    match_team_id_red_2: string,
    match_team_id_blue_1: string,
    match_team_id_blue_2: string,
    match_time: string,
    event_id: number,
};

export type VdbMatch = {
    match_id: number,
    match_red_score: number,
    match_blue_score: number,
    match_team_id_red_1: string,
    match_team_id_red_2: string,
    match_team_id_blue_1: string,
    match_team_id_blue_2: string,
    match_time: Date,
    event_id: number,
};