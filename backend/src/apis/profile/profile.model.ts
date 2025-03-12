import { z } from 'zod'
import { PrivateProfileSchema, PublicProfileSchema } from './profile.validator'
import { sql } from '../../utils/database.utils'

/**
 * The shape of the private profile that is only used by express. it must never be returned to the controller.
 * @property profileId {string} the primary key
 * @property profileActivationToken {string|null} the profile's activation token
 * @property profileCreateAt {string} the profile's date of creation
 * @property profileEmail {string|null} the profile's email
 * @property profileHash {string} the profile's hash
 * @property profileUsername {string} the profile's username
 **/

export type PrivateProfile = z.infer<typeof PrivateProfileSchema>

/**
 * insert a new profile into the profile table
 * @param profile the profile to insert
 * @returns "profile successfully created"
 **/

export async function insertProfile (profile: PrivateProfile): Promise<string> {
    const { profileId, profileActivationToken, profileCreateAt, profileEmail, profileHash, profileUsername } = profile
    await sql `INSERT INTO profile(profile_id, profile_activation_token, profile_created_at, profile_email, profile_hash, profile_username) VALUES (${profileId}, ${profileActivationToken}, ${profileCreateAt}, ${profileEmail}, ${profileHash}, ${profileUsername})`
    return 'Profile Successfully Created'
}