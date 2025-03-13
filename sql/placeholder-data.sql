 -- Insert fake profile data
 INSERT INTO profile (
     profile_id,
     profile_activation_token,
     profile_create_at,
     profile_email,
     profile_hash,
     profile_username
 ) VALUES (
              'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
              'some-activation-token',
              '2025-03-13T20:24:33Z',
              'fakeemail@example.com',
              'somehashedpassword',
              'fakeusername'
          );

 -- Insert fake anime data
 INSERT INTO anime (
     anime_id,
     anime_aired_end,
     anime_aired_start,
     anime_broadcast,
     anime_description,
     anime_demographic,
     anime_duration,
     anime_episodes,
     anime_genres,
     anime_instagram_url,
     anime_official_website_url,
     anime_producer,
     anime_rating,
     anime_status,
     anime_title,
     anime_title_alt,
     anime_twitter_url,
     anime_type
 ) VALUES (
              'd2f1a4e2-3e5c-4a1b-9d42-45d8c9a3e8b1',
              '2025-05-01T00:00:00Z',
              '2025-01-01T00:00:00Z',
              'Weekly on Sundays',
              'This is a fake anime description for testing purposes. The anime follows the adventures of a protagonist in a fictional world.',
              'Shounen',
              24,
              12,
              'Action, Adventure, Fantasy',
              'https://www.instagram.com/fakeanime',
              'https://www.fakeanime.com',
              'Fake Studio',
              8.5,
              'Finished Airing',
              'Fake Anime Title',
              'Alternate Fake Anime Title',
              'https://twitter.com/fakeanime',
              'TV'
          );
