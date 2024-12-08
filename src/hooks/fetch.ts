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