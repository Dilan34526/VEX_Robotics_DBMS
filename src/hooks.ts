import { useState, useEffect, useMemo, useRef } from 'react';
import { VdbRes, VdbMatch, VdbTeam, VdbMatchRaw, VdbJudge, VdbMentor, VdbVolunteer, VdbContact, VdbAward, VdbSeason, VdbTripleImpactContributor } from './types';

type VdbEvent = { event_id: number };

const cache = new Map<string, any>();
export const clearCache = () => {
    cache.clear();
};

export const useCachedFetch = <O, T=O>(
    url: string | null, 
    transformData: (data: O) => T=data => data as unknown as T,
) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);

    const signal = useRef(new AbortController());

    const reload = async () => {
        if (url === null) return;

        setLoading(true);

        const response = await fetch(url, { signal: signal.current.signal });
        const responseData: VdbRes<O> = await response.json();
        
        const transformedData = transformData(responseData.data!);
        cache.set(url, transformedData);
        setData(transformedData);
        setLoading(false);
    };

    const set = (data: T) => {
        if (url === null) return;

        signal.current.abort();
        signal.current = new AbortController();

        cache.set(url, data);
        setData(data);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);

        if (url === null) return;

        if (cache.has(url)) {
            setData(cache.get(url));
            setLoading(false);
            return;
        }

        reload();
    }, [url, transformData]);

    const flushCache = () => {
        if (url === null || !cache.has(url)) return Promise.resolve();

        cache.delete(url);

        return reload();
    };

    return { data, loading, flushCache, set };
};

export const useMatches = (selectedEvent: VdbEvent | null) => {
    const { data: matches, loading, flushCache } = useCachedFetch(
        selectedEvent === null ? null : `//localhost:5174/event/${selectedEvent.event_id}/match`, 
        (matches: VdbMatchRaw[]) => 
            matches.map(match => ({
                ...match,
                match_time: new Date(match.match_time)
            }))
    );

    return { matches, loading, flushCache };
};

export const useTeams = (selectedEvent: VdbEvent | null, searchQuery='') => {
    const { data, loading, flushCache, set } = useCachedFetch<VdbTeam[]>(
        selectedEvent === null ? null : `//localhost:5174/event/${selectedEvent.event_id}/team`,
    );

    let teams = data;
    if (searchQuery !== '') {  
        teams = teams?.filter(team => `${team.team_id} ${team.team_name}`.toLowerCase().includes(searchQuery.toLowerCase())) ?? null;
    }

    return {
        teams,
        loading,
        flushCache,
        setTeams: set,
    };
};

export const useJudges = (selectedEvent: VdbEvent | null, judgesSearch: string) => {
    const { data, loading, flushCache } = useCachedFetch<VdbJudge[]>(
        selectedEvent === null ? null : `//localhost:5174/event/${selectedEvent.event_id}/judge`,
    );

    let judges = data;
    if (judgesSearch !== '') {
        judges = judges?.filter(judge => `${judge.contact_first_name} ${judge.contact_last_name}`.toLowerCase().includes(judgesSearch.toLowerCase())) ?? null;
    }

    return { judges, loading, flushCache };
};

export const useMentors = (selectedEvent: VdbEvent | null, mentorsSearch: string) => {
    const { data, loading, flushCache } = useCachedFetch<VdbMentor[]>(
        selectedEvent === null ? null : `//localhost:5174/event/${selectedEvent.event_id}/mentor`,
    );

    let mentors = data;
    if (mentorsSearch !== '') {
        mentors = mentors?.filter(mentor => `${mentor.contact_first_name} ${mentor.contact_last_name}`.toLowerCase().includes(mentorsSearch.toLowerCase())) ?? null;
    }

    return { mentors, loading, flushCache };
};

export const useVolunteers = (selectedEvent: VdbEvent | null, volunteersSearch: string) => {
    const { data, loading, flushCache } = useCachedFetch<VdbVolunteer[]>(
        selectedEvent === null ? null : `//localhost:5174/event/${selectedEvent.event_id}/volunteer`, 
    );

    let volunteers = data;
    if (volunteersSearch !== '') {
        volunteers = volunteers?.filter(volunteer => `${volunteer.contact_first_name} ${volunteer.contact_last_name}`.toLowerCase().includes(volunteersSearch.toLowerCase())) ?? null;
    }

    return { volunteers, loading, flushCache };
}; 

export const useContacts = (selectedEvent: VdbEvent | null, judgesSearch: string, mentorsSearch: string, volunteersSearch: string) => {
    if (selectedEvent === null) {
        return {judges: null, mentors: null, volunteers: null, loading: true};
    }

    const { judges, loading: judgesLoading, flushCache: judgesFlushCache } = useJudges(selectedEvent, judgesSearch);
    const { mentors, loading: mentorsLoading, flushCache: mentorsFlushCache } = useMentors(selectedEvent, mentorsSearch);
    const { volunteers, loading: volunteersLoading, flushCache: volunteersFlushCache } = useVolunteers(selectedEvent, volunteersSearch);
    const { teams, loading: teamsLoading, flushCache: teamsFlushCache } = useTeams(selectedEvent);

    const loading = judgesLoading || mentorsLoading || volunteersLoading || teamsLoading;
    const {mentorList, judgeList, volunteerList} = useMemo(() => {
        if (loading) {
            return {judgeList: null, mentorList: null, volunteerList: null};
        }

        const teamsById = new Map(teams!.map(team => [team.team_id, team]));
        const judgesById = new Map(judges!.map(judge => [judge.contact_id, judge]));
        const mentorsById = new Map(mentors!.map(mentor => [mentor.contact_id, mentor]));
        const volunteersById = new Map(volunteers!.map(volunteer => [volunteer.contact_id, volunteer]));

        const teamsByJudge = new Map<number, VdbTeam[]>();
        const teamsByMentor = new Map<number, VdbTeam[]>();

        const hoursByJudge = new Map<number, number>();
        const hoursByVolunteer = new Map<number, number>();
        const hoursByMentor = new Map<number, number>();

        for (const team of teams!) {
            const judge = judgesById.get(team.judge_contact_id)!;

            if (teamsByJudge.has(judge.contact_id)) {
                teamsByJudge.get(judge.contact_id)!.push(team);
            } else {
                teamsByJudge.set(judge.contact_id, [team]);
            }

            if (hoursByJudge.has(judge.contact_id)) {
                hoursByJudge.set(judge.contact_id, hoursByJudge.get(judge.contact_id)! + parseFloat(judge.judge_hours));
            } else {
                hoursByJudge.set(judge.contact_id, parseFloat(judge.judge_hours));
            }
        }

        for (const mentor of mentors!) {
            if (teamsByMentor.has(mentor.contact_id)) {
                teamsByMentor.get(mentor.contact_id)!.push(teamsById.get(mentor.team_id)!);
            } else {
                teamsByMentor.set(mentor.contact_id, [teamsById.get(mentor.team_id)!]);
            }

            if (hoursByMentor.has(mentor.contact_id)) {
                hoursByMentor.set(mentor.contact_id, hoursByMentor.get(mentor.contact_id)! + parseFloat(mentor.mentor_hours));
            } else {
                hoursByMentor.set(mentor.contact_id, parseFloat(mentor.mentor_hours));
            }
        }

        for (const volunteer of volunteers!) {
            if (hoursByVolunteer.has(volunteer.contact_id)) {
                hoursByVolunteer.set(volunteer.contact_id, hoursByVolunteer.get(volunteer.contact_id)! + parseFloat(volunteer.volunteer_hours));
            } else {
                hoursByVolunteer.set(volunteer.contact_id, parseFloat(volunteer.volunteer_hours));
            }
        }

        return {
            mentorList: [...teamsByMentor.entries()].map(([mentorId, teams]) => ({
                ...mentorsById.get(mentorId)!,
                teams,
                hours: hoursByMentor.get(mentorId)!,
            })),
            judgeList: [...teamsByJudge.entries()].map(([judgeId, teams]) => ({
                ...judgesById.get(judgeId)!,
                teams,
                hours: hoursByJudge.get(judgeId)!,
            })),
            volunteerList: [...hoursByVolunteer.entries()].map(([volunteerId, hours]) => ({
                ...volunteersById.get(volunteerId)!,
                hours,
            })),
        };
    }, [teams, judges, mentors, volunteers]);

    return { judges: judgeList, mentors: mentorList, volunteers: volunteerList, loading };
};

export const useAwards = (selectedEvent: VdbEvent | null, useInitialCache=true) => {
    const { data: awards, loading, flushCache } = useCachedFetch<VdbAward[]>(
        selectedEvent === null ? null : `//localhost:5174/event/${selectedEvent.event_id}/award`,
    );

    return { awards, loading, flushCache };
};

export const useTripleImpactContributor = (selectedSeason: VdbSeason | null) => {
    const { data: tripleImpactContributor, loading, flushCache } = useCachedFetch<VdbTripleImpactContributor>(
        selectedSeason === null ? null : `//localhost:5174/season/${selectedSeason.season_year}/triple-impact-contributor`,
    );

    return { tripleImpactContributor, loading, flushCache };
};

export const useStingiestJudge = (selectedSeason: VdbSeason | null) => {
    const { data: stingiestJudge, loading, flushCache } = useCachedFetch<VdbContact & { avg_score: string }>(
        selectedSeason === null ? null : `//localhost:5174/season/${selectedSeason.season_year}/stingiest-judge`,
    );

    return { stingiestJudge, loading, flushCache };
};

export const useVolunteersBySeason = (selectedSeason: VdbSeason | null) => {
    const { data: volunteersBySeason, loading, flushCache } = useCachedFetch<(VdbContact & { total_hours: string })[]>(
        selectedSeason === null ? null : `//localhost:5174/season/${selectedSeason.season_year}/volunteers`,  
    );

    return { volunteersBySeason, loading, flushCache };
};
