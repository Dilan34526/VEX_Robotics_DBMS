import { useState, useEffect } from 'react';
import { VdbRes, VdbMatch, VdbTeam, VdbMatchRaw, VdbJudge, VdbMentor, VdbVolunteer, VdbContact } from './types';

type VdbEvent = { event_id: number };

const useFetch = <O, T=O>(
    url: string, 
    transformData: (data: O) => T=data => data as unknown as T,
) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await fetch(url);
            const responseData: VdbRes<O> = await response.json();
            
            setData(transformData(responseData.data!));
            setLoading(false);
        })();
    }, [url, transformData]);

    return { data, loading };
};

export const useMatches = (selectedEvent: VdbEvent | null) => {
    if (!selectedEvent) {
        return {matches: null, loading: true};
    }


    const { data: matches, loading } = useFetch(
        `//localhost:5174/event/${selectedEvent.event_id}/match`, 
        (matches: VdbMatchRaw[]) => 
            matches.map(match => ({
                ...match,
                match_time: new Date(match.match_time)
            }))
    );

    return { matches, loading };
};

export const useTeams = (selectedEvent: VdbEvent | null) => {
    if (!selectedEvent) {
        return {teams: null, loading: true};
    }

    const { data: teams, loading } = useFetch<VdbTeam[]>(
        `//localhost:5174/event/${selectedEvent.event_id}/team`,
    );

    return { teams, loading };
};

export const useJudges = (selectedEvent: VdbEvent | null) => {
    if (!selectedEvent) {
        return {judges: null, loading: true};
    }

    const { data: judges, loading } = useFetch<VdbContact[]>(
        `//localhost:5174/event/${selectedEvent.event_id}/judge`,
        judges => judges.map(judge => ({...judge}))
    );

    return { judges, loading };
};

export const useMentors = (selectedEvent: VdbEvent | null) => {
    if (!selectedEvent) {
        return {mentors: null, loading: true};
    }

    const { data: mentors, loading } = useFetch<VdbContact[]>(
        `//localhost:5174/event/${selectedEvent.event_id}/mentor`,
        mentors => mentors.map(mentor => ({...mentor}))
    );

    return { mentors, loading };
};

export const useVolunteers = (selectedEvent: VdbEvent | null) => {
    if (!selectedEvent) {
        return {volunteers: null, loading: true};
    }

    const { data: volunteers, loading } = useFetch<VdbContact[]>(
        `//localhost:5174/event/${selectedEvent.event_id}/volunteer`, 
        volunteers => volunteers.map(volunteer => ({...volunteer}))
    );

    return { volunteers, loading };
}; 