export interface Team {
    id: string,
    abbreviation: string,
    city: string,
    conference: string,
    division: string,
    full_name: string,
    name: string
}

export interface Result {
    id: string,
    date: Date,
    home_team: {
        id: string,
        abbreviation: string,
        city: string,
        conference: string,
        division: string,
        full_name: string,
        name: string
    },
    home_team_score: number,
    period: number,
    postseason: boolean,
    season: number,
    status: string,
    time: string,
    visitor_team: {
        id: string,
        abbreviation: string,
        city: string,
        conference: string,
        division: string,
        full_name: string,
        name: string
    },
    visitor_team_score: number,
    winStatus: string
}
