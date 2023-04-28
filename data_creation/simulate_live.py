# import numpy as np
import pandas as pd
import psycopg2 as pg
import argparse
import random
import update
from datetime import date
from time import sleep

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
    parser.add_argument('-tour', '--tour', help='touranment name', required=True)
    parser.add_argument('-d', '--database', help='database name', default = 'criczone')
    parser.add_argument('-s', '--sleep', help='sleep time', type = int, default = 0)
    parser.add_argument('-v', '--venue', help='venue', required = True)
    parser.add_argument('-o', '--over', help='overs', type = int, required = True)
    args = parser.parse_args()

    #connect to database
    conn = pg.connect(database=args.database,host="localhost",user="postgres",password="Mittal@279")
    # conn = pg.connect(database=args.database)
    cur = conn.cursor()

    cur.execute("INSERT INTO match (id,date,venue,tour_name,team1,team2,year) VALUES (%s,%s,%s,%s,%s,%s,%s)", (matchid,current_date, args.venue, args.tour,args.team1,args.team2,current_year))
    
    #Choose pl ayers from player table in the database, using 3 letter code to match ID
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

    overs=args.over

    shots = ['0', '1', '2', '3', '4', '6', 'W']        #list of possible shots

    #make match scorecard dataframe
    df = pd.DataFrame(columns = ['playerid', 'matchid', 'teamid', 'runs', 'balls', 'fours', 'sixes', 'strike_rate', 'wickets', 'runs_conceded', 'overs'])
    #Enter all players from team1 and team2 in the dataframe
    for player in team1:
        df.loc[len(df)] = [player[0], matchid, args.team1, 0, 0, 0, 0, 0, 0, 0, 0]
    for player in team2:
        df.loc[len(df)] = [player[0], matchid, args.team2, 0, 0, 0, 0, 0, 0, 0, 0]
    
    for i, row in df.iterrows():
        cur.execute("INSERT INTO %s (%s) VALUES %s" % ('matchwise_player_performance', ','.join(df.columns), tuple(row)))
    
    cur.execute("INSERT INTO matchwise_team_performance (teamid,matchid,result,total_score,total_wickets) VALUES (%s,%s,%s,%s,%s)", (args.team1,matchid,"In Progress",0,0))
    cur.execute("INSERT INTO matchwise_team_performance (teamid,matchid,result,total_score,total_wickets) VALUES (%s,%s,%s,%s,%s)", (args.team2,matchid,"In Progress",0,0))
    conn.commit()

    #first innings
    wickets = 0
    #choose 5 bowlers
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
            sleep(args.sleep)
            #choose shot
            # shot = np.random.choice(shots, 1, p = [0.1, 0.3, 0.2, 0.1, 0.1, 0.1, 0.1])
            shot = random.choices(shots, k=1, weights = [0.1, 0.3, 0.2, 0.1, 0.1, 0.1, 0.1])
            shot = shot[0]
            if shot == 'W':
                wickets += 1
                df.loc[df['playerid'] == bowler[0], 'overs'] += 0.1
                df.loc[df['playerid'] == bowler[0], 'wickets'] += 1
                df.loc[df['playerid'] == bat[0], 'balls'] += 1
                df.loc[df['playerid'] == bat[0], 'strike_rate'] = df.loc[df['playerid'] == bat[0], 'runs']/df.loc[df['playerid'] == bat[0], 'balls']
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

            cur.execute(f"INSERT into commentary values ({matchid},{over},{ball},\'{bat[0]}\',\'{bowler[0]}\',\'{shot}\',1)")

            #update matchwise_player_performance table
            for i, row in df.iterrows():
                cur.execute("UPDATE %s SET runs=%s, balls=%s, fours=%s, sixes=%s, strike_rate=%s, wickets=%s, runs_conceded=%s, overs=%s \
                            WHERE playerid=\'%s\' AND matchid=\'%s\'" \
                            % ('matchwise_player_performance', row['runs'], row['balls'], row['fours'], row['sixes'], \
                            row['strike_rate'], row['wickets'], row['runs_conceded'], row['overs'], row['playerid'], row['matchid']))
                cur.execute("UPDATE %s SET total_score=%s, total_wickets=%s WHERE teamid=\'%s\' AND matchid=\'%s\'" % ('matchwise_team_performance', team1score, team1wicks, args.team1, matchid))
                cur.execute("UPDATE %s SET total_score=%s, total_wickets=%s WHERE teamid=\'%s\' AND matchid=\'%s\'" % ('matchwise_team_performance', team2score, team2wicks, args.team2, matchid))
            conn.commit()
        df.loc[df['playerid'] == bowler[0], 'overs'] += 0.4
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
            if(team2score>team1score):
                break
            sleep(args.sleep)
            shot = random.choices(shots, k=1, weights = [0.1, 0.3, 0.2, 0.1, 0.1, 0.1, 0.1])
            shot = shot[0]
            if shot == 'W':
                wickets += 1
                df.loc[df['playerid'] == bowler[0], 'overs'] += 0.1
                df.loc[df['playerid'] == bowler[0], 'wickets'] += 1
                df.loc[df['playerid'] == bat[0], 'balls'] += 1
                df.loc[df['playerid'] == bat[0], 'strike_rate'] = df.loc[df['playerid'] == bat[0], 'runs']/df.loc[df['playerid'] == bat[0], 'balls']
                team2wicks+=1
                if wickets == 10:
                    break
                bat = team2[wickets+1]
            else:
                df.loc[df['playerid'] == bat[0], 'runs'] += int(shot)
                team2score+=int(shot)
                df.loc[df['playerid'] == bowler[0], 'runs_conceded'] += int(shot)
                df.loc[df['playerid'] == bat[0], 'balls'] += 1
                df.loc[df['playerid'] == bat[0], 'strike_rate'] = df.loc[df['playerid'] == bat[0], 'runs']/df.loc[df['playerid'] == bat[0], 'balls']
                if shot == '4':
                    df.loc[df['playerid'] == bat[0], 'fours'] += 1
                elif shot == '6':
                    df.loc[df['playerid'] == bat[0], 'sixes'] += 1
                df.loc[df['playerid'] == bowler[0], 'overs'] += 0.1

            cur.execute(f"INSERT into commentary values ({matchid},{over},{ball},\'{bat[0]}\',\'{bowler[0]}\',\'{shot}\',2)")

            for i, row in df.iterrows():
                cur.execute("UPDATE %s SET runs=%s, balls=%s, fours=%s, sixes=%s, strike_rate=%s, wickets=%s, runs_conceded=%s, overs=%s \
                            WHERE playerid=\'%s\' AND matchid=\'%s\'" \
                            % ('matchwise_player_performance', row['runs'], row['balls'], row['fours'], row['sixes'], \
                            row['strike_rate'], row['wickets'], row['runs_conceded'], row['overs'], row['playerid'], row['matchid']))
                cur.execute("UPDATE %s SET total_score=%s, total_wickets=%s WHERE teamid=\'%s\' AND matchid=\'%s\'" % ('matchwise_team_performance', team1score, team1wicks, args.team1, matchid))
                cur.execute("UPDATE %s SET total_score=%s, total_wickets=%s WHERE teamid=\'%s\' AND matchid=\'%s\'" % ('matchwise_team_performance', team2score, team2wicks, args.team2, matchid))
            conn.commit()
        df.loc[df['playerid'] == bowler[0], 'overs'] += 0.4
        if wickets == 10:
            break
        temp = bat1
        bat1 = bat2
        bat2 = temp


    for i, row in df.iterrows():
        cur.execute("UPDATE %s SET runs=%s, balls=%s, fours=%s, sixes=%s, strike_rate=%s, wickets=%s, runs_conceded=%s, overs=%s \
                     WHERE playerid=\'%s\' AND matchid=\'%s\'" \
                     % ('matchwise_player_performance', row['runs'], row['balls'], row['fours'], row['sixes'], \
                     row['strike_rate'], row['wickets'], row['runs_conceded'], row['overs'], row['playerid'], row['matchid']))
        
    #Close the database connection
    
    if(team1score>team2score):
        cur.execute(f"UPDATE matchwise_team_performance SET result = 'win' where teamid = \'{args.team1}\'")
        cur.execute(f"UPDATE matchwise_team_performance SET result = 'lost' where teamid = \'{args.team2}\'")
    elif (team2score>team1score):
        cur.execute(f"UPDATE matchwise_team_performance SET result = 'lost' where teamid = \'{args.team1}\'")
        cur.execute(f"UPDATE matchwise_team_performance SET result = 'win' where teamid = \'{args.team2}\'")
    else:
        cur.execute(f"UPDATE matchwise_team_performance SET result = 'draw' where teamid = \'{args.team1}\'")
        cur.execute(f"UPDATE matchwise_team_performance SET result = 'draw' where teamid = \'{args.team2}\'")

    conn.commit()
    cur.close()
    conn.close()

    update.update(matchid)
    
        
                
        


        
        
            