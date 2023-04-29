#!/bin/bash

# Create an array of team names
teams=('IND' 'AUS' 'AFG' 'BAN' 'NZ' 'ENG')

# Set the tour name and number of overs
tour='ICC T20 Worldcup 2023'
overs=20

# Create an array of famous stadium names
venues=('Lord\'s' 'MCG' 'Eden Gardens' 'Wankhede Stadium' 'The Oval' 'Old Trafford' 'M. Chinnaswamy Stadium' 'Newlands' 'Lahore Gaddafi Stadium' 'Sharjah Cricket Stadium' 'Dubai International Cricket Stadium' 'Sydney Cricket Ground')

# Loop through all combinations of team pairs
for ((i=0;i<${#teams[@]};++i)); do
    for ((j=i+1;j<${#teams[@]};++j)); do
        # Choose a random venue
        venue=${venues[$RANDOM % ${#venues[@]}]}

        # Run the simulation command
        echo "Running simulation: ${teams[i]} vs ${teams[j]} at $venue"
        python simulate_live.py -t1 ${teams[i]} -t2 ${teams[j]} -tour "$tour" -v "$venue" -o $overs
    done
done
