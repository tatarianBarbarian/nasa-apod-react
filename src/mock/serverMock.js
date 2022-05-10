import { rest, setupWorker } from "msw";
import { formatDate, getPrevDate } from "../date";
import { API_URL } from "../api";

export const handler = rest.get(API_URL, (req, res, ctx) => {
    const reqDate = req.url.searchParams.get('date');
    const today = formatDate(new Date());

    if (reqDate === today) {
        return res(
            ctx.json({
                "date": "2022-05-08",
                "explanation": "Today's pic",
                "hdurl": "/src/mock/img/1_hd.jpg",
                "media_type": "image",
                "service_version": "v1",
                "title": "Spiral Galaxy NGC 1512: The Inner Rings",
                "url": "/src/mock/img/1.jpg"
            })
        )
    }

    if (reqDate === formatDate(getPrevDate(new Date()))) {
        return res(
            ctx.json({
                "copyright": "Tara Mostofi",
                "date": "2022-05-07",
                "explanation": "On certain dates in February, an elusive firefall can be spotted at sunset in Yosemite National Park, when water flows, the weather cooperates and the direction to the setting Sun is just right. Often photographed from vantage points below, at the right moment the park's seasonal Horsetail Fall is isolated in the shadows of the steep walls of El Capitan. Then, still illuminated with rays of reddened sunlight the waterfall briefly takes on a dramatic, fiery appearance. But a Horsetail firefall can be photographed by moonlight too. Even more elusive by moonlight, the firefall effect can also be seen when a bright Moon sets at the right direction along the western horizon. And skies were clear enough for this well-planned imaging of an ephemeral Horsetail firefall, lit by a bright gibbous Moon setting in the early morning hours of April 15.",
                "hdurl": "/src/mock/img/2_hd.jpg",
                "media_type": "image",
                "service_version": "v1",
                "title": "Firefall by Moonlight",
                "url": "/src/mock/img/2.jpg"
            })
        )
    }

    return res(ctx.json({
        "copyright": "Carlos Taylor",
        "date": "2022-05-06",
        "explanation": "This cosmic skyscape features glowing gas and dark dust clouds along side the young stars of NGC 3572. A beautiful emission nebula and star cluster it sails far southern skies within the nautical constellation Carina. Stars from NGC 3572 are toward top center in the telescopic frame that would measure about 100 light-years across at the cluster's estimated distance of 9,000 light-years. The visible interstellar gas and dust is part of the star cluster's natal molecular cloud. Dense streamers of material within the nebula, eroded by stellar winds and radiation, clearly trail away from the energetic young stars. They are likely sites of ongoing star formation with shapes reminiscent of the Tadpoles of IC 410 better known to northern skygazers.  In the coming tens to hundreds of millions of years, gas and stars in the cluster will be dispersed though, by gravitational tides and by violent supernova explosions that end the short lives of the massive cluster stars.",
        "hdurl": "/src/mock/img/3_hd.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "NGC 3572 and the Southern Tadpoles",
        "url": "/src/mock/img/3.jpg"
    }))
})

export const worker = setupWorker(handler);
