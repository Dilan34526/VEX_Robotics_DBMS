export type VdbRes<T> = {
    data?: T,
    error: string,
};

export type VdbSeason = {
    season_year: number,
    season_name: string,
};

export type VdbEvent = {
    event_id: number,
    event_name: string,
    event_date: string,
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

export type VdbMatch = {
    match_id: number,
    match_registration_id: number,
    match_name: string,
    match_time: string,
};