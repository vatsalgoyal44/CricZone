import argparse, psycopg2, sys, csv
from psycopg2.extras import execute_values

edges = None
toposort = None
visited = None

def printtableschema(table, cursor):
    queryforforeignkeys = f"SELECT conrelid::regclass AS table_name, conname AS foreign_key, pg_get_constraintdef(oid) FROM pg_constraint WHERE  contype = 'f' and conrelid::regclass::text = '{table}' AND    connamespace = 'public'::regnamespace ORDER  BY conrelid::regclass::text, contype DESC;"
    queryforcolumnnames = f"SELECT attname, format_type(atttypid, atttypmod), attnum FROM   pg_attribute WHERE  attrelid = '{table}'::regclass AND    attnum > 0 AND    NOT attisdropped ORDER  BY attnum;"
    queryforunique = f"SELECT indkey FROM   pg_index i JOIN   pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey) WHERE  i.indrelid = '{table}'::regclass AND    i.indisunique AND NOT i.indisprimary group by indkey;"
    queryforprimary = f"SELECT a.attname FROM   pg_index i JOIN   pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey) WHERE  i.indrelid = '{table}'::regclass AND    i.indisprimary;"

    columnids = {}
    finaloutput = f"create table {table}(\n"

    cursor.execute(queryforcolumnnames)
    output = cursor.fetchall()

    for column in output:
        columnids[str(column[2])] = column[0]
        finaloutput = finaloutput + f"{column[0]} {column[1]},\n"
        
    cursor.execute(queryforprimary)
    output = cursor.fetchall()
    primary_key_exp="PRIMARY KEY ("
    for key in output:
        primary_key_exp=primary_key_exp+key[0]+','               
    primary_key_exp=primary_key_exp[:-1]+'),\n'

    finaloutput=finaloutput+primary_key_exp

    cursor.execute(queryforforeignkeys)
    output = cursor.fetchall()
    for out in output:
        finaloutput = finaloutput + out[2] + ",\n"
        

    cursor.execute(queryforunique)
    output = cursor.fetchall()
    for uniquekey in output:
        uniquekey = uniquekey[0].strip().split(' ')
        finaloutput = finaloutput + "UNIQUE("
        for key in uniquekey:
            finaloutput = finaloutput + columnids[key.strip()] + ","
                
        finaloutput = finaloutput[:-1]
        finaloutput = finaloutput + "),\n"
    finaloutput = finaloutput[:-2]


    finaloutput = finaloutput + "\n);"

    print(finaloutput)



def main(args):
    connection = psycopg2.connect(host = 'localhost', database = 'criczone', user = 'postgres')
    cursor = connection.cursor()
    
    if(args.import_table_data):
        file = open(args.path, 'r')
        reader = csv.reader(file)
        headings = next(reader)
        headerstring = "("
        for col in headings:
            headerstring = headerstring + col + ','
        headerstring = headerstring[:-1]
        headerstring = headerstring + ")"
        data = list(reader)
        data = [tuple(x) for x in data]
        query = f'''INSERT INTO {args.table} {headerstring} VALUES %s'''
        execute_values(cursor, query, data)
        connection.commit()
        cursor.close()
        connection.close()
        
    if(args.export_table_data):
        query = f'''SELECT * FROM {args.table} WHERE 1 = 2 '''
        cursor.execute(query)
        headings = [desc[0] for desc in cursor.description]
        query = f'''SELECT * from {args.table}'''
        cursor.execute(query)
        output = cursor.fetchall()
        
        cursor.close()
        connection.close()

        f = None
        
        if args.format=='csv':
            if(args.path):
                f = open(args.path, 'w', newline="")
                writer = csv.writer(f)
                writer.writerow(headings)
                writer.writerows(list(output))
            else:
                print(*headings, sep=',')
                for row in output:
                    printstring = ""
                    for entry in row:
                        if("," in str(entry)):
                            printstring = printstring + "\"" + str(entry) + "\"" + ","
                        else:
                            printstring = printstring + str(entry) + ','
                    printstring = printstring[:-1]
                    print(printstring)

        elif args.format=='sql':
            headerstring = "("
            for col in headings:
                headerstring = headerstring + col + ","
            headerstring = headerstring[:-1]
            headerstring = headerstring + ")"
            if(args.path):
                f = open(args.path, 'w')
            for line in output:
                vals = "("
                for col in list(line):
                    vals = vals + '\'' + str(col) + '\'' + ","
                vals = vals[:-1]
                vals = vals + ")"
                insert_q=f"INSERT INTO {args.table} {headerstring} VALUES {vals};"
                
                if(f):
                    insert_q=insert_q+"\n"
                    f.write(insert_q)
                else:
                    print(insert_q)
    
    if(args.import_sql):
        f = open(args.path, 'r')
        queries = f.read()
        queries = queries.strip().split(';')
        queries.remove('')
        for query in queries:
            query = query.strip()
            query = query + ';'
            cursor.execute(query)
            connection.commit()        
                    

    if(args.show_tables):
        query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE' and table_schema = 'public' ORDER BY TABLE_NAME;"
        cursor.execute(query)
        output = cursor.fetchall()
        for table in output:
            print(table[0])



    if(args.show_table_schema):
        # queryforforeignkeys = f"SELECT conrelid::regclass AS table_name, conname AS foreign_key, pg_get_constraintdef(oid) FROM pg_constraint WHERE  contype = 'f' and conrelid::regclass::text = '{args.table}' AND    connamespace = 'public'::regnamespace ORDER  BY conrelid::regclass::text, contype DESC;"
        # queryforcolumnnames = f"SELECT attname, format_type(atttypid, atttypmod), attnum FROM   pg_attribute WHERE  attrelid = '{args.table}'::regclass AND    attnum > 0 AND    NOT attisdropped ORDER  BY attnum;"
        # queryforunique = f"SELECT indkey FROM   pg_index i JOIN   pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey) WHERE  i.indrelid = '{args.table}'::regclass AND    i.indisunique AND NOT i.indisprimary group by indkey;"
        # queryforprimary = f"SELECT a.attname FROM   pg_index i JOIN   pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey) WHERE  i.indrelid = '{args.table}'::regclass AND    i.indisprimary;"

        # columnids = {}
        # finaloutput = f"create table {args.table}(\n"

        # cursor.execute(queryforcolumnnames)
        # output = cursor.fetchall()

        # for column in output:
        #     columnids[str(column[2])] = column[0]
        #     finaloutput = finaloutput + f"{column[0]} {column[1]},\n"
        
        # cursor.execute(queryforprimary)
        # output = cursor.fetchall()
        # primary_key_exp="PRIMARY KEY ("
        # for key in output:
        #     primary_key_exp=primary_key_exp+key[0]+','               
        # primary_key_exp=primary_key_exp[:-1]+'),\n'

        # finaloutput=finaloutput+primary_key_exp

        # cursor.execute(queryforforeignkeys)
        # output = cursor.fetchall()
        # for out in output:
        #     finaloutput = finaloutput + out[2] + ",\n"
        

        # cursor.execute(queryforunique)
        # output = cursor.fetchall()
        # for uniquekey in output:
        #     uniquekey = uniquekey[0].strip().split(' ')
        #     finaloutput = finaloutput + "UNIQUE("
        #     for key in uniquekey:
        #         finaloutput = finaloutput + columnids[key.strip()] + ","
                
        #     finaloutput = finaloutput[:-1]
        #     finaloutput = finaloutput + "),\n"
        # finaloutput = finaloutput[:-2]


        # finaloutput = finaloutput + "\n);"

        # print(finaloutput)
        printtableschema(args.table, cursor)



    if(args.export_database_schema):
        query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE' and table_schema = 'public';"
        cursor.execute(query)
        output = cursor.fetchall()
        tabledict = {}
        adjlist = {}
        for i, table in enumerate(output):
            tabledict[table[0]] = i
            adjlist[i] = []


        for table in output:
            queryforforeignkeys = f"SELECT conrelid::regclass AS table_name, conname AS foreign_key, pg_get_constraintdef(oid) FROM pg_constraint WHERE  contype = 'f' and conrelid::regclass::text = '{table[0]}' AND    connamespace = 'public'::regnamespace ORDER  BY conrelid::regclass::text, contype DESC;"
            cursor.execute(queryforforeignkeys)
            forienkeysoutuput = cursor.fetchall()
            for out in forienkeysoutuput:
                out = out[2]
                out = out.strip().split()
                out = out[4]
                out = out.strip().split('(')[0]
                
                if tabledict[table[0]] not in adjlist[tabledict[out]]:
                        adjlist[tabledict[out]].append(tabledict[table[0]])
        
        # print(adjlist)

        indegrees = {node : 0 for node in adjlist.keys()}

        for node in adjlist.keys():
            for neighbor in adjlist[node]:
                indegrees[neighbor]+=1
        
        noincoming = []
        for node in adjlist.keys():
            if indegrees[node] == 0:
                noincoming.append(node)

        topological_ordering = []

        while len(noincoming) > 0:

        # add one of those nodes to the ordering
            node = noincoming.pop()
            topological_ordering.append(node)
        
            # decrement the indegree of that node's neighbors
            for neighbor in adjlist[node]:
                indegrees[neighbor] -= 1
                if indegrees[neighbor] == 0:
                    noincoming.append(neighbor)

        for tablenum in topological_ordering:
            printtableschema(output[tablenum][0], cursor)



        
    
    if(args.testing):
        cursor.execute("DROP TABLE IF EXISTS test;")
        cursor.execute("CREATE TABLE test (id serial PRIMARY KEY, num integer, data varchar);")
        cursor.execute("INSERT INTO test (num, data) VALUES (%s, %s)", (100, "abc'def"))
        cursor.execute("INSERT INTO test (num, data) VALUES (%s, %s)", (200, "abc'def"))
        cursor.execute("INSERT INTO test (num, data) VALUES (%s, %s)", (100, "abc'def"))
        
        cursor.execute("SELECT * FROM test;")
        row = cursor.fetchone()
        while row != None:
            print(row)
            row = cursor.fetchone()
        
        cursor.execute("SELECT * FROM test where num = 100;")
        print(cursor.fetchall())

        cursor.execute("SELECT * FROM test;")
        print(cursor.fetchmany(3))

    if connection:
        cursor.close()
        connection.close()
    

        

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--name")
    parser.add_argument("--user")
    parser.add_argument("--pswd")
    parser.add_argument("--host")
    parser.add_argument("--port")
    parser.add_argument("--import-table-data", action='store_true')
    parser.add_argument("--export-table-data", action='store_true')
    parser.add_argument("--show-tables", action='store_true')
    parser.add_argument("--show-table-schema", action='store_true')
    parser.add_argument("--table")
    parser.add_argument("--format")
    parser.add_argument("--import-sql", action='store_true')
    parser.add_argument("--path")
    parser.add_argument("--export-database-schema", action='store_true')
    parser.add_argument("--testing", action = 'store_true')

    args = parser.parse_args()
    main(args)