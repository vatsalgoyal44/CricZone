#!/bin/bash

# Create an array of team names
teams=('IND' 'AUS' 'AFG' 'BAN' 'NZL' 'ENG')

# Set the tour name and number of overs
tour='ICC T20 Worldcup 2023'
overs=20

# Create an array of famous stadium names
venues=('MCG' 'Eden Gardens' 'Wankhede Stadium' 'The Oval' 'Old Trafford' 'M. Chinnaswamy Stadium' 'Newlands' 'Lahore Gaddafi Stadium' 'Sharjah Cricket Stadium' 'Dubai International Cricket Stadium' 'Sydney Cricket Ground')


team1=${teams[$RANDOM % ${#teams[@]}]}
team2=${teams[$RANDOM % ${#teams[@]}]}

# Ensure that the two teams are not the same
while [ "$team1" == "$team2" ]; do
    team2=${teams[$RANDOM % ${#teams[@]}]}
done

# Choose a random venue
venue=${venues[$RANDOM % ${#venues[@]}]}

# Run the simulation command
echo "Match $i: $team1 vs $team2 at $venue"
python3 simulate_live.py -t1 $team1 -t2 $team2 -tour "$tour" -v "$venue" -o $overs -s 2

