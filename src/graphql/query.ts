import { gql } from "@apollo/client";

export const GET_LEADERBOARD = gql`
    query GetLeaderboard {
        leaderboard(timeframe: SEASON) {
            firstName
            lastName
            profilePictureUrl
            stats(timeframe: SEASON) {
                verticalDistance(system: IMPERIAL)
                topSpeed(system: IMPERIAL)
                runCount
            }
        }
    }
`;
