import pandas as pd
import psycopg2 as pg
from psycopg2.extensions import register_adapter, AsIs
import numpy


def addapt_numpy_float64(numpy_float64):
    return AsIs(numpy_float64)
def addapt_numpy_int64(numpy_int64):
    return AsIs(numpy_int64)
register_adapter(numpy.float64, addapt_numpy_float64)
register_adapter(numpy.int64, addapt_numpy_int64)

def update(matchid):
    
    #connect to database
    conn = pg.connect(database='criczone',host="localhost",user="postgres",password="1234")
    # conn = pg.connect(database='Criczone')
    cur = conn.cursor()

    #import player records
    cur.execute("SELECT * FROM player")
    players = cur.fetchall()
    #make dataframe of player records
    #TODO: Fix the columns later
    # df = pd.DataFrame(players, columns = ['playerid','player_name', 
    #                                       'role','batting_style','bowling_style', 'matches', 'innings', 
    #                                       'runs','wickets', 'runs_conceded', 'overs'])
    df = pd.DataFrame(players, columns = ['playerid','player_name', 
                                          'role','batting_style','bowling_style', 'matches', 'innings', 
                                          'runs','balls','wickets', 'runs_conceded', 'overs'])

    #import match scorecard
    cur.execute(f"SELECT * FROM matchwise_player_performance where matchid = {matchid}")
    match = cur.fetchall()
    #make dataframe of match scorecard
    #TODO: Fix the columns later
    df_match = pd.DataFrame(match, columns = ['playerid', 'matchid', 'teamid', 'runs', 'balls', 'fours', 'sixes', 'strike_rate', 'wickets', 'runs_conceded','overs'])

    #update player records
    for i in range(len(df_match)):
        #find entry of player in player records
        index = df.index[df['playerid'] == df_match['playerid'][i]]
        #update player records
        df['matches'][index] += 1
        if df_match['balls'][i] != 0:
            df['innings'][index] += 1
            df['runs'][index] += df_match['runs'][i]
            df['balls'][index] += df_match['balls'][i]
        if df_match['overs'][i] != 0:
            df['wickets'][index] += df_match['wickets'][i]
            df['runs_conceded'][index] += df_match['runs_conceded'][i]
            df['overs'][index] += df_match['overs'][i]

    #rewrite dataframe to database
    for i in range(len(df)):
        cur.execute(f"UPDATE player SET matches = %s, \
                    innings = %s, runs = %s, \
                    balls = %s, \
                    wickets = %s, runs_conceded = %s, \
                    overs = %s \
                    WHERE playerid = %s ", 
                        (df['matches'][i], df['innings'][i], 
                         df['runs'][i], df['balls'][i], 
                         df['wickets'][i], 
                         df['runs_conceded'][i], df['overs'][i],  
                         df['playerid'][i]))
        conn.commit()