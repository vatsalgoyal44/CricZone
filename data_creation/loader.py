import numpy as np
import pandas as pd
import psycopg2 as pg
import argparse

#script to load data from csv to postgresql

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-f', '--file', help='csv file to load', required=True)
    parser.add_argument('-t', '--table', help='table name to load', required=True)
    parser.add_argument('-d', '--database', help='database name', required=True)
    args = parser.parse_args()

    #connect to database
    conn = pg.connect(database=args.database,host="localhost",user="postgres")
    cur = conn.cursor()

    #read csv file
    df = pd.read_csv(args.file)

    # #create table if does not exist
    # cur.execute("CREATE TABLE IF NOT EXISTS %s (%s)" % (args.table, ','.join(df.columns)))

    #copy data from csv file to table
    for i, row in df.iterrows():
        cur.execute("INSERT INTO %s (%s) VALUES %s" % (args.table, ','.join(df.columns), tuple(row)))

    #commit changes
    conn.commit()
    cur.close()
    conn.close()
