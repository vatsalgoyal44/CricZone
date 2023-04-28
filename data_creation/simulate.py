import numpy as np
import pandas as pd
import psycopg2 as pg
import argparse
import random
import update
from datetime import date

current_date = date.today()
current_year = current_date.year
# Generate a random 4-digit number
matchid = random.randint(10000, 99999)

# Print the random number
print(matchid)

#script to choose 11 players from each team
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-t1', '--team1', help='team1 3 letter code', required=True)
    parser.add_argument('-t2', '--team2', help='team2 3 letter code', required=True)
    parser.add_argument('-d', '--database', help='database name', default = 'criczone')
    args = parser.parse_args()

    #connect to database
    conn = pg.connect(database=args.database,host="localhost",user="postgres")
    # conn = pg.connect(database=args.database)
    cur = conn.cursor()

    #Choose players from player table in the database, using 3 letter code to match ID
    #Choose 11 players
    cur.execute(f"SELECT * FROM player_team natural join player WHERE teamid ilike '{args.team1}'  AND role = 'WK-Batsman' ORDER BY RANDOM() LIMIT 1")
    team1 = cur.fetchall()
    cur.execute(f"SELECT * FROM player_team natural join player WHERE teamid ilike '{args.team1}'  AND role != 'WK-Batsman' ORDER BY RANDOM() LIMIT 10")
    team1.extend(cur.fetchall())

    #Repeat the same for team2
    cur.execute(f"SELECT * FROM player_team natural join player WHERE teamid ilike '{args.team2}'  AND role = 'WK-Batsman' ORDER BY RANDOM() LIMIT 1")
    team2 = cur.fetchall() 
    cur.execute(f"SELECT * FROM player_team natural join player WHERE teamid ilike '{args.team2}'  AND role != 'WK-Batsman' ORDER BY RANDOM() LIMIT 10")
    team2.extend(cur.fetchall())

    #Choose number of balls based on format
    # if args.format == 'T20':
    #     overs = 20
    # elif args.format == 'ODI':
    #     overs = 50
    overs=20

    shots = ['0', '1', '2', '3', '4', '6', 'W']        #list of possible shots

    #Simulate the game
    # toss = np.random.randint(0,2)
    # if toss == 0:
    #     temp = team1
    #     team1 = team2
    #     team2 = temp

    #make match scorecard dataframe
    df = pd.DataFrame(columns = ['playerid', 'matchid', 'teamid', 'runs', 'balls', 'fours', 'sixes', 'strike_rate', 'wickets', 'runs_conceded', 'overs'])
    #Enter all players from team1 and team2 in the dataframe
    for player in team1:
        df.loc[len(df)] = [player[0], matchid, args.team1, 0, 0, 0, 0, 0, 0, 0, 0]
    for player in team2:
        df.loc[len(df)] = [player[0], matchid, args.team2, 0, 0, 0, 0, 0, 0, 0, 0]
    
    #If format is test, then each team gets 2 innings
    
    #first innings
    wickets = 0
    #choose 5 bowlers
    # bowlers = np.random.choice(team2, 5, replace = False)
    bowlers = random.sample(team2, k=5)
    #choose first batsmen
    bat1 = team1[0]
    bat2 = team1[1]
    team1score=0
    team2score=0
    team1wicks=0
    team2wicks=0
    for over in range(overs):
        bowler = bowlers[over%5]
        bat = bat1
        for ball in range(6):
            #choose shot
            # shot = np.random.choice(shots, 1, p = [0.1, 0.3, 0.2, 0.1, 0.1, 0.1, 0.1])
            shot = random.choices(shots, k=1, weights = [0.1, 0.3, 0.2, 0.1, 0.1, 0.1, 0.1])
            shot = shot[0]
            if shot == 'W':
                wickets += 1
                df.loc[df['playerid'] == bowler[0], 'overs'] += 0.1
                df.loc[df['playerid'] == bowler[0], 'wickets'] += 1
                team1wicks+=1
                if wickets == 10:
                    break
                bat = team1[wickets+1]
            else:
                #update batsman's score
                df.loc[df['playerid'] == bat[0], 'runs'] += int(shot)
                team1score+=int(shot)
                df.loc[df['playerid'] == bowler[0], 'runs_conceded'] += int(shot)
                df.loc[df['playerid'] == bat[0], 'balls'] += 1
                df.loc[df['playerid'] == bat[0], 'strike_rate'] = df.loc[df['playerid'] == bat[0], 'runs']/df.loc[df['playerid'] == bat[0], 'balls']
                if shot == '4':
                    df.loc[df['playerid'] == bat[0], 'fours'] += 1
                elif shot == '6':
                    df.loc[df['playerid'] == bat[0], 'sixes'] += 1
                #update bowler's score
                df.loc[df['playerid'] == bowler[0], 'overs'] += 0.1
        df.loc[df['playerid'] == bowler[0], 'overs'] += 0.5
        if wickets == 10:
            break
        #swap batsmen
        temp = bat1
        bat1 = bat2
        bat2 = temp

    #repeat for second innings
    wickets = 0
    # bowlers = np.random.choice(team1, 5, replace = False)
    bowlers = random.sample(team1, k=5)
    bat1 = team2[0]
    bat2 = team2[1]
    for over in range(overs):
        bowler = bowlers[over%5]
        bat = bat1
        for ball in range(6):
            # shot = np.random.choice(shots, 1, p = [0.1, 0.3, 0.2, 0.1, 0.1, 0.1, 0.1])
            shot = random.choices(shots, k=1, weights = [0.1, 0.3, 0.2, 0.1, 0.1, 0.1, 0.1])
            shot = shot[0]
            if shot == 'W':
                wickets += 1
                df.loc[df['playerid'] == bowler[0], 'overs'] += 0.1
                df.loc[df['playerid'] == bowler[0], 'wickets'] += 1
                team2wicks+=1
                if wickets == 10:
                    break
                bat = team2[wickets+1]
            else:
                df.loc[df['playerid'] == bat[0], 'runs'] += int(shot)
                team2score+=int(shot)
                df.loc[df['playerid'] == bowler[0], 'runs_conceded'] += int(shot)
                df.loc[df['playerid'] == bat[0], 'balls'] += 1
                df.loc[df['playerid'] == bat[0], 'strike_rate'] = 100*(df.loc[df['playerid'] == bat[0], 'runs']/df.loc[df['playerid'] == bat[0], 'balls'])
                if shot == '4':
                    df.loc[df['playerid'] == bat[0], 'fours'] += 1
                elif shot == '6':
                    df.loc[df['playerid'] == bat[0], 'sixes'] += 1
                df.loc[df['playerid'] == bowler[0], 'overs'] += 0.1
        df.loc[df['playerid'] == bowler[0], 'overs'] += 0.5
        if wickets == 10:
            break
        temp = bat1
        bat1 = bat2
        bat2 = temp

    #Load the dataframe to a database table
    # df.to_sql('matchwise_player_performance', conn, if_exists='append', index=False)
    # df.to_csv('matchwise_player_performance.csv', index=False)
    # df = pd.read_csv('matchwise_player_performance.csv')
    for i, row in df.iterrows():
        cur.execute("INSERT INTO %s (%s) VALUES %s" % ('matchwise_player_performance', ','.join(df.columns), tuple(row)))
    #Close the database connection
    cur.execute("INSERT INTO match (id,date,venue,tour_name,team1,team2,year) VALUES (%s,%s,%s,%s,%s,%s,%s)", (matchid,current_date, 'Vankhede',"ICC-Worldcup",args.team1,args.team2,current_year))
    if(team1score>team2score):
        cur.execute("INSERT INTO matchwise_team_performance (teamid,matchid,result,total_score,total_wickets) VALUES (%s,%s,%s,%s,%s)", (args.team1,matchid,"win",team1score,team1wicks))
        cur.execute("INSERT INTO matchwise_team_performance (teamid,matchid,result,total_score,total_wickets) VALUES (%s,%s,%s,%s,%s)", (args.team2,matchid,"lost",team2score,team2wicks))
    elif (team2score>team1score):
        cur.execute("INSERT INTO matchwise_team_performance (teamid,matchid,result,total_score,total_wickets) VALUES (%s,%s,%s,%s,%s)", (args.team1,matchid,"lost",team1score,team1wicks))
        cur.execute("INSERT INTO matchwise_team_performance (teamid,matchid,result,total_score,total_wickets) VALUES (%s,%s,%s,%s,%s)", (args.team2,matchid,"win",team2score,team2wicks))
    else:
        cur.execute("INSERT INTO matchwise_team_performance (teamid,matchid,result,total_score,total_wickets) VALUES (%s,%s,%s,%s,%s)", (args.team1,matchid,"draw",team1score,team1wicks))
        cur.execute("INSERT INTO matchwise_team_performance (teamid,matchid,result,total_score,total_wickets) VALUES (%s,%s,%s,%s,%s)", (args.team2,matchid,"draw",team2score,team2wicks))
    conn.commit()
    cur.close()
    conn.close()

    update.update(matchid)
    
        
                
        


        
        
            