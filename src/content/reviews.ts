/**
 * Single source of truth for every public Fiverr review shown on the site.
 *
 * `reviewStats` below is derived from this list, not hand-counted, and
 * `profile.ts` reads `reviewStats` instead of hardcoding numbers — so the qa
 * answer, the "Paid Client Work" stats block and the review feed in About.tsx
 * cannot disagree with each other.
 *
 * README.md and llms.txt are plain text, not code, and still have to be
 * updated by hand when this list changes — there is no build step that
 * regenerates prose documentation from data.
 */

export type Review = {
  name: string
  country: string
  rating: number
  time: string
  text: string
  category: string
}

export const reviews: Review[] = [
  { name: 'tzem98', country: 'DE', rating: 5, time: 'September 2026', text: 'This is what I call the highest level of quality. I’m extremely impressed with him. He gave it his all, fulfilled every single one of my wishes, and made sure everything was exactly how I wanted it. I had absolutely no problems. He was always committed, responsive, and went the extra mile to make everything perfect. The quality, effort, and professionalism were outstanding. I couldn’t be happier with the result. Truly top-quality work!', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'jakemedia207', country: 'US', rating: 5, time: 'February 2026', text: 'Helped me with my p1s 10/10 would recommend', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'tob_hu', country: 'CH', rating: 4, time: 'September 2025', text: 'Thank you for your Support!', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'skilnotfound', country: 'US', rating: 5, time: 'September 2025', text: 'Was very helpful and willing to help immediately. Was also very flexible in helping with the issue we were in vastly different time zones which meant it was difficult for us to always be online at the same time, But i would frequently get very early morning replies. 10/10 would reach out for consulting again.', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'kendrickcharles', country: 'US', rating: 5, time: 'October 2025', text: 'He was great and very attentive.', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'azproperties16', country: 'US', rating: 5, time: 'August 2025', text: "Amazing job! Wiktor helped me set up my 3d printer in a fraction of the time that I spent trying to set it up myself. He's absolutely worth it!", category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'atalavera3', country: 'US', rating: 5, time: 'August 2025', text: 'Very professional and helpful, quick to the point', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'jmwilson125', country: 'US', rating: 5, time: 'July 2025', text: 'Wiktor was very knowledgeable in klipper and helped me out a lot with my project', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'aaronw12', country: 'US', rating: 5, time: 'August 2025', text: 'Went above and beyond my initial requests. Very responsive and will be my Go-To for all my 3D printer needs.', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'jschanaker', country: 'US', rating: 5, time: 'March 2024', text: 'Wiktor did a great job and was very helpful along the way. Would recommend.', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'ccburton11', country: 'US', rating: 5, time: 'January 2024', text: "He was very helpful, knowledgeable, and responsive. I went in with bad print settings I couldn't figure out and left with a working printer, printing perfectly!", category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'redvsgoo', country: 'US', rating: 5, time: 'February 2024', text: 'Great service, excellent communication, and good to work with. I got the top tier service, and it was shown through his work. 100% would recommend his work to anyone looking to have marlin firmware made for their 3D printer.', category: 'Embedded C++ for 3D printers' },
  { name: 'ccrank85', country: 'US', rating: 5, time: 'November 2023', text: "This guy knows what he's doing. Helped me get my modified ender 3 printing again. I've been scratching my head on the problems with it for months and he helped me get it working in a couple days.", category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'the6thcrow', country: 'US', rating: 5, time: 'October 2023', text: 'Had some weird issues going on with my ender 3 pro after I tried to compile my own firmware, but we were able to fix it. Quick communication and very friendly. I extremely recommend him to do your custom firmware.', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'malikeost', country: 'US', rating: 5, time: 'September 2023', text: 'Good communication from seller, even with limited knowledge and still completed help setting up my printer.', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'owenland681', country: 'GB', rating: 5, time: 'August 2023', text: 'Absolutely Great!', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'keyven343', country: 'CA', rating: 5, time: 'July 2023', text: 'He give a very great support, gave me the courage to go back to my big project in 3d printing', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'keyven343', country: 'CA', rating: 5, time: 'June 2023', text: 'Hes my tech now, very nice in comunication and very nice :)', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'keithbfiver', country: 'US', rating: 5, time: 'May 2023', text: 'Amazing service. Super fast. Same day. And great communication. Got my printer working perfectly and fast. Thank you!', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'marlonvella', country: 'MT', rating: 5, time: 'April 2023', text: 'He stayed with me all the way he is amazing thank you', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'amarokstudios', country: 'US', rating: 5, time: 'March 2023', text: 'Absolutely amazing. If you are having issues with your 3D printer/Marlin firmware, this seller is definitely the place to go. I have an Ender 3 V1 with a CR Touch and filament runout sensor installed and I needed some help getting the firmware updated to use it. Definitely would recommend!', category: 'Embedded C++ for 3D printers' },
  { name: 'thee_kkid', country: 'US', rating: 5, time: 'February 2023', text: 'Thanks for helping me adjust my Easter and explaining to me what was wrong with my Internet', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'hendriski', country: 'GB', rating: 5, time: 'January 2023', text: "Great and Fast service. My Ender 3 is working perfect now. Am running the latest Marlin firmware and all done in an hour. He even added a little extra for the same price. Definitely gonna order from him again.", category: 'Embedded C++ for 3D printers' },
  { name: 'lztechs', country: 'PL', rating: 5, time: 'December 2022', text: 'Incredible seller! Very helpful and patient. Would definitely recommend!!', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'sure4thing', country: 'US', rating: 5, time: 'November 2022', text: 'They worked nonstop with me to get my printer back up and running. Very knowledgeable and fast at replying. Will go to again in the future!', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'ggabs_does', country: 'US', rating: 5, time: 'October 2022', text: 'Fixed my printer! Had a max temp error and he helped me within a day! I will definitely be back!!', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'ritchie176', country: 'IE', rating: 5, time: 'September 2022', text: "Absolutely fantastic help! Was willing to work through the issue with me in a comprehensive manner. Overall just a great service. I can't give you one reason to not choose Wiktor's service :D", category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'fallenlight1', country: 'US', rating: 5, time: 'August 2022', text: 'Wonderful I have used him twice now and will reach out again if needed', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'user03095544', country: 'NZ', rating: 5, time: 'July 2022', text: 'Seller has been really amazing. He knew exactly what to do and guided me through the process. I would recommend him to anyone who is having difficulties. Great service and will definitely work with him again.', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'lztechs', country: 'PL', rating: 5, time: 'June 2022', text: 'Incredible experience, this seller has huge knowledge. Totally recommend!', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'bellemalcolm', country: 'HK', rating: 5, time: 'May 2022', text: 'Have a lot of knowledge about 3D printers, very nice to work with, wonderful service!', category: 'Embedded Linux / DevOps (Armbian)' },
  { name: 'lztechs', country: 'PL', rating: 5, time: 'April 2022', text: '20/10, he has huge knowledge in 3d printing. I would love to work with him again', category: 'Embedded Linux / DevOps (Armbian)' },
]

const NUMBER_WORDS = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve',
]

const countryCount = new Set(reviews.map((review) => review.country)).size

export const reviewStats = {
  total: reviews.length,
  fiveStar: reviews.filter((review) => review.rating === 5).length,
  countries: countryCount,
  countriesWord: NUMBER_WORDS[countryCount] ?? String(countryCount),
}
