import { rest } from "msw";
import { formatDate, getPrevDate } from "../date";
import { API_URL } from "../api";
import { subDays } from "date-fns";

const todayPic = {
    "date": "2022-05-08",
    "explanation": "Today's pic",
    "hdurl": "/src/mock/img/1_hd.jpg",
    "media_type": "image",
    "service_version": "v1",
    "title": "Spiral Galaxy NGC 1512: The Inner Rings",
    "url": "/src/mock/img/1.jpg"
};

const video = {
    "date":"2022-05-09",
    "explanation":"What's that passing in front of the Sun? It looks like a moon, but it can't be Earth's Moon, because it isn't round. It's the Martian moon Phobos.  The featured video was taken from the surface of Mars a month ago by the Perseverance rover. Phobos, at 11.5 kilometers across, is 150 times smaller than Luna (our moon) in diameter, but also 50 times closer to its parent planet.  In fact, Phobos is so close to Mars that it is expected to break up and crash into Mars within the next 50 million years.  In the near term, the low orbit of Phobos results in more rapid solar eclipses than seen from Earth. The featured video is shown in real time -- the transit really took about 40 seconds,as shown. The videographer -- the robotic rover Perseverance (Percy) -- continues to explore Jezero Crater on Mars, searching not only for clues to the watery history of the now dry world, but evidence of ancient microbial life.   New Social Mirror: APOD now available on mastodon",
    "media_type":"video",
    "service_version":"v1",
    "title":"A Martian Eclipse: Phobos Crosses the Sun",
    "url":"https://www.youtube.com/embed/aKK7vS2CHC8?rel=0"
}

const fallbackPic = {
    "copyright": "Carlos Taylor",
    "date": "2022-05-06",
    "explanation": "This cosmic skyscape features glowing gas and dark dust clouds along side the young stars of NGC 3572. A beautiful emission nebula and star cluster it sails far southern skies within the nautical constellation Carina. Stars from NGC 3572 are toward top center in the telescopic frame that would measure about 100 light-years across at the cluster's estimated distance of 9,000 light-years. The visible interstellar gas and dust is part of the star cluster's natal molecular cloud. Dense streamers of material within the nebula, eroded by stellar winds and radiation, clearly trail away from the energetic young stars. They are likely sites of ongoing star formation with shapes reminiscent of the Tadpoles of IC 410 better known to northern skygazers.  In the coming tens to hundreds of millions of years, gas and stars in the cluster will be dispersed though, by gravitational tides and by violent supernova explosions that end the short lives of the massive cluster stars.",
    "hdurl": "/src/mock/img/3_hd.jpg",
    "media_type": "image",
    "service_version": "v1",
    "title": "NGC 3572 and the Southern Tadpoles",
    "url": "/src/mock/img/3.jpg"
}

const other = {
    "copyright": "Jean-Charles Cuillandre",
    "date": "2009-04-13",
    "explanation": "Just fix your camera to a tripod and you too can make an image of graceful trails traced by the stars as planet Earth rotates on its axis.  Making a time lapse video like that shown above may require more effort, though. Made on 2006 October 13 from Mauna Kea, Hawaii, USA, this video nicely captured what you might see of the night sky if you could keep your brain from changing your perceived visual image about every hundredth of a second. Starting from a dark sky and point-like stars, the video demonstrates how stars appear to move over the night as the world turns. Near the center of the developing bull's-eye pattern is Polaris, the North Star.  Visible in the left foreground is the 3.7-meter aperture Canada-France-Hawaii Telescope (CFHT). The red glow that illuminated the CFHT dome near the beginning of the film was created by a car leaving the volcanic summit. The Moon rose about half way through the video and created a white glow that gradually illuminated most of the CFHT dome. The above remarkable time-lapse video was constructed from about 1,000 consecutive frames taken with a digital camera over nearly nine hours.   digg_url = 'http://apod.nasa.gov/apod/ap090413.html'; digg_skin = 'compact';",
    "media_type": "other",
    "service_version": "v1",
    "title": "Star Trails over the Canada-France-Hawaii Telescope"
}

const isTests = import.meta.env.TEST;

export const handler = rest.get(API_URL, (req, res, ctx) => {
    const reqDate = req.url.searchParams.get('date');
    const todayRaw = isTests ? new Date('2022-05-13') : new Date();
    const today = formatDate(todayRaw);

    if (reqDate === today) {
        return res(
            ctx.json(todayPic)
        )
    }

    if (reqDate === formatDate(subDays(todayRaw, 1))) {
        return res(
            ctx.json(video)
        )
    }

    if (reqDate === formatDate(subDays(todayRaw, 2))) {
        return res(
            ctx.json(other)
        )
    }

    return res(ctx.json(fallbackPic))
})
