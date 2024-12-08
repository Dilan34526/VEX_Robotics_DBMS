import { useState, useEffect } from 'react';
import { VdbRes, VdbMatch, VdbTeam, VdbMatchRaw, VdbJudge, VdbMentor, VdbVolunteer, VdbContact, VdbAward } from './types';

type VdbEvent = { event_id: number };

const cache = new Map<string, any>();

const useCachedFetch = <O, T=O>(
    url: string, 
    transformData: (data: O) => T=data => data as unknown as T,
) => {
    const [data, setData] = useState<T | null>(cache.get(url) ?? null);
    const [loading, setLoading] = useState(!cache.has(url));

    useEffect(() => {
        if (!cache.has(url)) {
            (async () => {
                const response = await fetch(url);
                const responseData: VdbRes<O> = await response.json();
                
                const transformedData = transformData(responseData.data!);
                cache.set(url, transformedData);
                setData(transformedData);
                setLoading(false);
            })();
        }
    }, [url, transformData]);

    return { data, loading };
};

export const useMatches = (selectedEvent: VdbEvent | null) => {
    if (selectedEvent === null) {
        return {matches: null, loading: true};
    }


    const { data: matches, loading } = useCachedFetch(
        `//localhost:5174/event/${selectedEvent.event_id}/match`, 
        (matches: VdbMatchRaw[]) => 
            matches.map(match => ({
                ...match,
                match_time: new Date(match.match_time)
            }))
    );

    return { matches, loading };
};

export const useTeams = (selectedEvent: VdbEvent | null, searchQuery='') => {
    if (selectedEvent === null) {
        return {teams: null, loading: true};
    }

    const { data, loading } = useCachedFetch<VdbTeam[]>(
        `//localhost:5174/event/${selectedEvent.event_id}/team`,
    );

    let teams = data;
    if (searchQuery !== '') {  
        teams = teams?.filter(team => `${team.team_id} ${team.team_name}`.toLowerCase().includes(searchQuery.toLowerCase())) ?? null;
    }

    return { teams, loading };
};

export const useJudges = (selectedEvent: VdbEvent | null, judgesSearch: string) => {
    if (selectedEvent === null) {
        return {judges: null, loading: true};
    }

    const { data, loading } = useCachedFetch<VdbContact[]>(
        `//localhost:5174/event/${selectedEvent.event_id}/judge`,
        judges => judges.map(judge => ({...judge}))
    );

    let judges = data;
    if (judgesSearch !== '') {
        judges = judges?.filter(judge => `${judge.contact_first_name} ${judge.contact_last_name}`.toLowerCase().includes(judgesSearch.toLowerCase())) ?? null;
    }

    return { judges, loading };
};

export const useMentors = (selectedEvent: VdbEvent | null, mentorsSearch: string) => {
    if (selectedEvent === null) {
        return {mentors: null, loading: true};
    }

    const { data, loading } = useCachedFetch<VdbMentor[]>(
        `//localhost:5174/event/${selectedEvent.event_id}/mentor`,
        mentors => mentors.map(mentor => ({...mentor}))
    );

    let mentors = data;
    if (mentorsSearch !== '') {
        mentors = mentors?.filter(mentor => `${mentor.contact_first_name} ${mentor.contact_last_name}`.toLowerCase().includes(mentorsSearch.toLowerCase())) ?? null;
    }

    return { mentors, loading };
};

export const useVolunteers = (selectedEvent: VdbEvent | null, volunteersSearch: string) => {
    if (selectedEvent === null) {
        return {volunteers: null, loading: true};
    }

    const { data, loading } = useCachedFetch<VdbContact[]>(
        `//localhost:5174/event/${selectedEvent.event_id}/volunteer`, 
        volunteers => volunteers.map(volunteer => ({...volunteer}))
    );

    let volunteers = data;
    if (volunteersSearch !== '') {
        volunteers = volunteers?.filter(volunteer => `${volunteer.contact_first_name} ${volunteer.contact_last_name}`.toLowerCase().includes(volunteersSearch.toLowerCase())) ?? null;
    }

    return { volunteers, loading };
}; 

export const useContacts = (selectedEvent: VdbEvent | null, judgesSearch: string, mentorsSearch: string, volunteersSearch: string) => {
    if (selectedEvent === null) {
        return {judges: null, mentors: null, volunteers: null, loading: true};
    }

    const { judges, loading: judgesLoading } = useJudges(selectedEvent, judgesSearch);
    const { mentors, loading: mentorsLoading } = useMentors(selectedEvent, mentorsSearch);
    const { volunteers, loading: volunteersLoading } = useVolunteers(selectedEvent, volunteersSearch);
    const { teams, loading: teamsLoading } = useTeams(selectedEvent);

    if (judgesLoading || mentorsLoading || volunteersLoading || teamsLoading) {
        return {judges: null, mentors: null, volunteers: null, loading: true};
    }

    const teamsById = new Map(teams!.map(team => [team.team_id, team]));
    const judgesById = new Map(judges!.map(judge => [judge.contact_id, judge]));
    const mentorsById = new Map(mentors!.map(mentor => [mentor.contact_id, mentor]));

    const teamsByJudge = new Map<number, VdbTeam[]>();
    const teamsByMentor = new Map<number, VdbTeam[]>();
    for (const team of teams!) {
        const judge = judgesById.get(team.judge_contact_id)!;
        if (teamsByJudge.has(judge.contact_id)) {
            teamsByJudge.get(judge.contact_id)!.push(team);
        } else {
            teamsByJudge.set(judge.contact_id, [team]);
        }
    }

    for (const mentor of mentors!) {
        if (teamsByMentor.has(mentor.contact_id)) {
            teamsByMentor.get(mentor.contact_id)!.push(teamsById.get(mentor.team_id)!);
        } else {
            teamsByMentor.set(mentor.contact_id, [teamsById.get(mentor.team_id)!]);
        }
    }

    const mentorsList = [...teamsByMentor.entries()].map(([mentorId, teams]) => ({...mentorsById.get(mentorId)!, teams}));
    const judgesList = [...teamsByJudge.entries()].map(([judgeId, teams]) => ({...judgesById.get(judgeId)!, teams}));

    return { judges: judgesList, mentors: mentorsList, volunteers, loading: false };
};

export const useAwards = (selectedEvent: VdbEvent | null) => {
    if (selectedEvent === null) {
        return {awards: null, loading: true};
    }

    const { data: awards, loading } = useCachedFetch<VdbAward[]>(
        `//localhost:5174/event/${selectedEvent.event_id}/award`,
    );

    return { awards, loading };
};