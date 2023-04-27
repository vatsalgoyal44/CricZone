CREATE TABLE match (
	id integer NOT NULL,
	date DATE NOT NULL,
	venue VARCHAR(255),
	tour_name VARCHAR(255),
	team1 CHAR(3) NOT NULL,
	team2 CHAR(3) NOT NULL,
	year integer NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE matchwise_team_performance (
	teamid CHAR(3) NOT NULL,
	matchid integer NOT NULL,
	result VARCHAR(255) NOT NULL,
	total_score integer NOT NULL,
	total_wickets integer NOT NULL,
	PRIMARY KEY (teamid,matchid)
);

CREATE TABLE team (
	teamid CHAR(3) NOT NULL,
	team_name VARCHAR(255) NOT NULL,
	level VARCHAR(255) NOT NULL,
	PRIMARY KEY (teamid)
);

CREATE TABLE player (
	playerid CHAR(6) NOT NULL,
	player_name VARCHAR(255) NOT NULL,
	role VARCHAR(255) NOT NULL,
	batting_style VARCHAR(255) NOT NULL,
	bowling_style VARCHAR(255) NOT NULL,
	matches integer NOT NULL DEFAULT 0,
	innings integer NOT NULL DEFAULT 0,
	runs integer NOT NULL DEFAULT 0,
	balls integer NOT NULL DEFAULT 0,
	wickets integer NOT NULL DEFAULT 0,
	runs_conceded integer NOT NULL DEFAULT 0,
	overs integer NOT NULL DEFAULT 0,
	PRIMARY KEY (playerid)
);

CREATE TABLE tournament (
	tour_name VARCHAR(255) NOT NULL,
	format VARCHAR(255) NOT NULL,
	PRIMARY KEY (tour_name)
);



CREATE TABLE player_team (
	teamid CHAR(3) NOT NULL,
	playerid CHAR(6) NOT NULL,
	PRIMARY KEY (teamid,playerid)
);



CREATE TABLE tour_team (
	tour_name VARCHAR(255) NOT NULL,
	teamid CHAR(3) NOT NULL,
	PRIMARY KEY (tour_name,teamid)
);

CREATE TABLE commentary (
	matchid integer NOT NULL,
	over integer NOT NULL,
	ball integer NOT NULL,
	batsman CHAR(6) NOT NULL,
	bowler CHAR(6) NOT NULL,
	action VARCHAR(255) NOT NULL,
	innings integer NOT NULL,
	PRIMARY KEY (matchid,over,ball,innings)
);


CREATE TABLE matchwise_player_performance (
	playerid CHAR(6) NOT NULL,
	matchid integer NOT NULL,
	teamid CHAR(3) NOT NULL,
	runs integer NOT NULL DEFAULT 0,
	balls integer NOT NULL DEFAULT 0,
	fours integer NOT NULL DEFAULT 0,
	sixes integer NOT NULL DEFAULT 0,
	strike_rate integer NOT NULL DEFAULT 0,
	wickets integer NOT NULL DEFAULT 0,
	runs_conceded integer NOT NULL DEFAULT 0,
	overs integer NOT NULL DEFAULT 0,
	PRIMARY KEY (playerid,matchid)
);

ALTER TABLE match ADD FOREIGN KEY (tour_name) REFERENCES tournament(tour_name);
ALTER TABLE match ADD FOREIGN KEY (team1) REFERENCES team(teamid);
ALTER TABLE match ADD FOREIGN KEY (team2) REFERENCES team(teamid);
ALTER TABLE matchwise_team_performance ADD FOREIGN KEY (teamid) REFERENCES team(teamid);
ALTER TABLE matchwise_team_performance ADD FOREIGN KEY (matchid) REFERENCES match(id);
ALTER TABLE player_team ADD FOREIGN KEY (teamid) REFERENCES team(teamid);
ALTER TABLE player_team ADD FOREIGN KEY (playerid) REFERENCES player(playerid);
ALTER TABLE tour_team ADD FOREIGN KEY (tour_name) REFERENCES tournament(tour_name);
ALTER TABLE tour_team ADD FOREIGN KEY (teamid) REFERENCES team(teamid);
ALTER TABLE matchwise_player_performance ADD FOREIGN KEY (playerid) REFERENCES player(playerid);
ALTER TABLE matchwise_player_performance ADD FOREIGN KEY (matchid) REFERENCES match(id);
ALTER TABLE matchwise_player_performance ADD FOREIGN KEY (teamid) REFERENCES team(teamid);
ALTER TABLE commentary ADD FOREIGN KEY (bowler) REFERENCES player(playerid);
ALTER TABLE commentary ADD FOREIGN KEY (batsman) REFERENCES player(playerid);
ALTER TABLE commentary ADD FOREIGN KEY (matchid) REFERENCES match(id);
