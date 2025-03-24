DROP TABLE IF EXISTS watch_list_favorite CASCADE;
DROP TABLE IF EXISTS watch_list_hidden CASCADE;
DROP TABLE IF EXISTS watch_list_later CASCADE;
DROP TABLE IF EXISTS review CASCADE;
DROP TABLE IF EXISTS anime_genres CASCADE;
DROP TABLE IF EXISTS anime CASCADE;
DROP TABLE IF EXISTS profile CASCADE;
DROP TABLE IF EXISTS genres CASCADE;

CREATE TABLE anime (
                       anime_id UUID PRIMARY KEY,
                       anime_jikan_id INT,
                       anime_aired_end DATE,
                       anime_aired_start DATE,
                       anime_broadcast TEXT,
                       anime_description TEXT,
                       anime_demographic TEXT,
                       anime_duration TEXT,
                       anime_episodes SMALLINT,
                       anime_rating TEXT,
                       anime_rank INT,
                       anime_score FLOAT,
                       anime_status TEXT,
                       anime_title TEXT,
                       anime_title_english TEXT,
                       anime_title_japanese TEXT,
                       anime_type TEXT,
                       anime_trailer_url TEXT,
                       anime_youtube_thumbnail_url TEXT,
                       anime_thumbnail_url TEXT
);

CREATE TABLE genres (
                        genres_id UUID PRIMARY KEY,
                        genres_name TEXT
);

CREATE TABLE anime_genres (
                              anime_genres_anime_id UUID REFERENCES anime(anime_id),
                              anime_genres_genres_id UUID REFERENCES genres(genres_id),
                              PRIMARY KEY (anime_genres_anime_id, anime_genres_genres_id)
);

CREATE TABLE profile (
                         profile_id UUID PRIMARY KEY,
                         profile_activation_token TEXT,
                         profile_create_at TIMESTAMPTZ,
                         profile_email TEXT UNIQUE,
                         profile_hash TEXT,
                         profile_username TEXT
);
CREATE TABLE watch_list_later (
                                  watch_list_anime_id UUID REFERENCES anime(anime_id),
                                  watch_list_profile_id UUID REFERENCES profile(profile_id),
                                  watch_list_rank SMALLINT,
                                  PRIMARY KEY (watch_list_anime_id, watch_list_profile_id)
);
CREATE TABLE watch_list_hidden (
                                  watch_list_anime_id UUID REFERENCES anime(anime_id),
                                  watch_list_profile_id UUID REFERENCES profile(profile_id),
                                  watch_list_rank SMALLINT,
                                  PRIMARY KEY (watch_list_anime_id, watch_list_profile_id)
);
CREATE TABLE watch_list_favorite (
                                  watch_list_anime_id UUID REFERENCES anime(anime_id),
                                  watch_list_profile_id UUID REFERENCES profile(profile_id),
                                  watch_list_rank SMALLINT,
                                  PRIMARY KEY (watch_list_anime_id, watch_list_profile_id)
);
CREATE TABLE review (
                        review_id UUID PRIMARY KEY,
                        review_jikan_id INT,
                        review_profile_id UUID REFERENCES profile(profile_id),
                        review_anime_rating SMALLINT,
                        review_body TEXT,
                        review_created_at TIMESTAMPTZ,
                        review_spoiler BOOLEAN,
                        review_status TEXT
);

CREATE INDEX IF NOT EXISTS idx_anime_anime_id ON anime(anime_id);
CREATE INDEX IF NOT EXISTS idx_genres_genres_id ON genres(genres_id);
CREATE INDEX IF NOT EXISTS idx_anime_genres_anime_id ON anime_genres(anime_genres_anime_id);
CREATE INDEX IF NOT EXISTS idx_anime_genres_genres_id ON anime_genres(anime_genres_genres_id);
CREATE INDEX IF NOT EXISTS idx_profile_profile_id ON profile(profile_id);
CREATE INDEX IF NOT EXISTS idx_watch_list_anime_id ON watch_list_later(watch_list_anime_id);
CREATE INDEX IF NOT EXISTS idx_watch_list_profile_id ON watch_list_later(watch_list_profile_id);
CREATE INDEX IF NOT EXISTS idx_watch_list_anime_id ON watch_list_hidden(watch_list_anime_id);
CREATE INDEX IF NOT EXISTS idx_watch_list_profile_id ON watch_list_hidden(watch_list_profile_id);
CREATE INDEX IF NOT EXISTS idx_watch_list_anime_id ON watch_list_favorite(watch_list_anime_id);
CREATE INDEX IF NOT EXISTS idx_watch_list_profile_id ON watch_list_favorite(watch_list_profile_id);
CREATE INDEX IF NOT EXISTS idx_review_profile_id ON review(review_profile_id);
