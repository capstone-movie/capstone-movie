-- Drop tables if they exist
DROP TABLE IF EXISTS watch_list;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS anime_genres;
DROP TABLE IF EXISTS anime;
DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS genres;

-- Create the "anime" table
CREATE TABLE anime (
                       anime_id UUID PRIMARY KEY,
                       anime_aired_end DATE,
                       anime_aired_start DATE,
                       anime_broadcast VARCHAR(256),
                       anime_description VARCHAR(2048),
                       anime_demographic VARCHAR(256),
                       anime_duration DECIMAL,
                       anime_episodes SMALLINT,
                       anime_genres VARCHAR(256),
                       anime_instagram_url VARCHAR(2048),
                       anime_official_website_url VARCHAR(2048),
                       anime_producer VARCHAR(256),
                       anime_rating DECIMAL,
                       anime_status VARCHAR(128),
                       anime_title VARCHAR(256),
                       anime_title_alt VARCHAR(256),
                       anime_twitter_url VARCHAR(2048),
                       anime_type VARCHAR(128)
);

-- Create the "genres" table
CREATE TABLE genres (
                        genres_id UUID PRIMARY KEY,
                        genres_name VARCHAR(256)
);

-- Create the "anime_genres" junction table
CREATE TABLE anime_genres (
                              anime_genres_anime_id UUID REFERENCES anime(anime_id),
                              anime_genres_genres_id UUID REFERENCES genres(genres_id),
                              PRIMARY KEY (anime_genres_anime_id, anime_genres_genres_id)
);

-- Create the "profile" table
CREATE TABLE profile (
                         profile_id UUID PRIMARY KEY,
                         profile_activation_token VARCHAR(32),
                         profile_create_at TIMESTAMPTZ,
                         profile_email VARCHAR(256) UNIQUE,
                         profile_hash VARCHAR(97),
                         profile_username VARCHAR(128)
);

-- Create the "watch_list" table
CREATE TABLE watch_list (
                            watch_list_anime_id UUID REFERENCES anime(anime_id),
                            watch_list_profile_id UUID REFERENCES profile(profile_id),
                            watch_list_favorite SMALLINT,
                            watch_list_hidden SMALLINT,
                            watch_list_later SMALLINT,
                            PRIMARY KEY (watch_list_anime_id, watch_list_profile_id)
);

-- Create the "review" table
CREATE TABLE review (
                        review_id UUID PRIMARY KEY,
                        review_anime_id UUID REFERENCES anime(anime_id),
                        review_profile_id UUID REFERENCES profile(profile_id),
                        review_anime_rating SMALLINT,
                        review_body VARCHAR(2048),
                        review_created_at TIMESTAMPTZ,
                        review_spoiler BOOLEAN,
                        review_status VARCHAR(128)
);

-- Create necessary indexes for optimization
CREATE INDEX IF NOT EXISTS idx_anime_anime_id ON anime(anime_id);
CREATE INDEX IF NOT EXISTS idx_genres_genres_id ON genres(genres_id);
CREATE INDEX IF NOT EXISTS idx_anime_genres_anime_id ON anime_genres(anime_genres_anime_id);
CREATE INDEX IF NOT EXISTS idx_anime_genres_genres_id ON anime_genres(anime_genres_genres_id);
CREATE INDEX IF NOT EXISTS idx_profile_profile_id ON profile(profile_id);
CREATE INDEX IF NOT EXISTS idx_watch_list_anime_id ON watch_list(watch_list_anime_id);
CREATE INDEX IF NOT EXISTS idx_watch_list_profile_id ON watch_list(watch_list_profile_id);
CREATE INDEX IF NOT EXISTS idx_review_anime_id ON review(review_anime_id);
CREATE INDEX IF NOT EXISTS idx_review_profile_id ON review(review_profile_id);
