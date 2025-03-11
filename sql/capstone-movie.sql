-- Drop tables if they exist
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS watch_list;
DROP TABLE IF EXISTS anime_genres;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS anime;
DROP TABLE IF EXISTS profile;

-- Create the "anime" table
CREATE TABLE anime (
                       anime_id UUID PRIMARY KEY,
                       anime_aired_end DATE,
                       anime_aired_start DATE,
                       anime_broadcast TEXT,
                       anime_description TEXT,
                       anime_demographic TEXT,
                       anime_duration DECIMAL,
                       anime_episodes SMALLINT,
                       anime_genres TEXT,
                       anime_instagram_url TEXT,
                       anime_official_website_url TEXT,
                       anime_producer TEXT,
                       anime_rating DECIMAL,
                       anime_status TEXT,
                       anime_title TEXT,
                       anime_title_alt TEXT, -- Japanese Name
                       anime_twitter_url TEXT,
                       anime_type TEXT
);

-- Create the "genres" table
CREATE TABLE genres (
                        genres_id UUID PRIMARY KEY,
                        genres_name TEXT
);

-- Create the "anime_genres" junction table for many-to-many relationship between anime and genres
CREATE TABLE anime_genres (
                              anime_genres_anime_id UUID REFERENCES anime(anime_id),
                              anime_genres_genres_id UUID REFERENCES genres(genres_id),
                              PRIMARY KEY (anime_genres_anime_id, anime_genres_genres_id)
);

-- Create the "profile" table
CREATE TABLE profile (
                         profile_id UUID PRIMARY KEY,
                         profile_activation_token TEXT,
                         profile_create_at TIMESTAMPTZ,
                         profile_email TEXT,
                         profile_hash TEXT,
                         profile_username TEXT
);

-- Create the "watch_list" table, associating anime and profiles with additional info
CREATE TABLE watch_list (
                            watch_list_anime_id UUID REFERENCES anime(anime_id),
                            watch_list_profile_id UUID REFERENCES profile(profile_id),
                            watch_list_favorite SMALLINT,
                            watch_list_hidden SMALLINT,
                            watch_list_later SMALLINT,
                            PRIMARY KEY (watch_list_anime_id, watch_list_profile_id)
);

-- Create the "review" table for storing reviews related to anime and profiles
CREATE TABLE review (
                        review_id UUID PRIMARY KEY,
                        review_anime_id UUID REFERENCES anime(anime_id),
                        review_profile_id UUID REFERENCES profile(profile_id),
                        review_anime_rating SMALLINT,
                        review_body TEXT, -- Content of the post
                        review_created_at TIMESTAMPTZ,
                        review_spoiler BOOLEAN,
                        review_status TEXT -- draft, posted
);

-- Create necessary indexes for optimization

-- Index on anime table for faster lookups by anime_id
CREATE INDEX IF NOT EXISTS idx_anime_anime_id ON anime(anime_id);

-- Index on genres table for faster lookups by genres_id
CREATE INDEX IF NOT EXISTS idx_genres_genres_id ON genres(genres_id);

-- Index on anime_genres table for faster lookups by anime_id and genres_id
CREATE INDEX IF NOT EXISTS idx_anime_genres_anime_id ON anime_genres(anime_genres_anime_id);
CREATE INDEX IF NOT EXISTS idx_anime_genres_genres_id ON anime_genres(anime_genres_genres_id);

-- Index on profile table for faster lookups by profile_id
CREATE INDEX IF NOT EXISTS idx_profile_profile_id ON profile(profile_id);

-- Index on watch_list table for faster lookups by anime_id and profile_id
CREATE INDEX IF NOT EXISTS idx_watch_list_anime_id ON watch_list(watch_list_anime_id);
CREATE INDEX IF NOT EXISTS idx_watch_list_profile_id ON watch_list(watch_list_profile_id);

-- Index on review table for faster lookups by anime_id and profile_id
CREATE INDEX IF NOT EXISTS idx_review_anime_id ON review(review_anime_id);
CREATE INDEX IF NOT EXISTS idx_review_profile_id ON review(review_profile_id);
