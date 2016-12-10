/**
 * Created by varik on 12/7/16.
 */
import Config from '../config/oneSignal';

export default function prettyData(data) {
  console.log('prettyData', data)
    return {
        user_fb_id: data.profile.id,
        user_note_id: Config.userId,
        profile: {
            name: data.profile.name,
            email: data.profile.email,
            age_range: {
                min: data.profile.age_range.min || 0,
                max: data.profile.age_range.max || 0,
            },
            profile_url: data.profile.link,
            picture: data.profile.picture.data.url
        }
    }
}
