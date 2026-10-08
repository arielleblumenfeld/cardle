/**
 * Cardle word bank.
 *
 * To add a word, append an entry to CLASSIC_ANSWERS (5 letters) or MINI_ANSWERS (3 letters).
 *   word:     the answer, uppercase, exact length for its mode (checked at startup in dev)
 *   category: shown as the first hint — keep it broad ("Campus tradition")
 *   hint:     the second, more specific hint — should not contain the word itself
 *   fact:     shown after the game ends
 *
 * Answers are always accepted as guesses, even if they're not in the English
 * dictionary (e.g. HUANG, FLOMO, GSB).
 *
 * Note: the daily schedule is derived from the order of this list, so adding
 * words reshuffles which word lands on which future date.
 */

export type Category =
  | 'Campus tradition'
  | 'Landmark'
  | 'Residence'
  | 'Student life'
  | 'Academics'
  | 'Athletics'
  | 'History'
  | 'Silicon Valley'

export interface Answer {
  word: string
  category: Category
  hint: string
  fact: string
}

export const CLASSIC_ANSWERS: Answer[] = [
  {
    word: 'TREES',
    category: 'Campus tradition',
    hint: 'The Band’s famously goofy, unofficial mascot — and there’s one on the seal, too.',
    fact: 'The Stanford Tree is the mascot of the Band, not the university. A new Tree is picked every year after “Tree Week,” when hopefuls pull stunts to win the costume.',
  },
  {
    word: 'HOOPS',
    category: 'Athletics',
    hint: 'You might hear this at Maples Pavilion.',
    fact: 'Stanford basketball plays at Maples Pavilion. The women’s team has won three NCAA championships: 1990, 1992, and 2021.',
  },
  {
    word: 'QUADS',
    category: 'Landmark',
    hint: 'Sandstone arcades and red tile roofs around a big courtyard.',
    fact: 'The Main Quad was the original heart of campus, with sandstone arcades, red tile roofs, and Memorial Church at its center. You can also find the Law School’s Crown Quad and the Engineering Quad.',
  },
  {
    word: 'FOUNT',
    category: 'Campus tradition',
    hint: 'Hopping between these on a warm night is a rite of passage.',
    fact: 'Fountain hopping is a beloved Stanford tradition. Students splash through fountains across campus, like the Claw in White Plaza.',
  },
  {
    word: 'FROSH',
    category: 'Student life',
    hint: 'What Stanford calls its first-year students.',
    fact: 'At Stanford, first-years are “frosh,” and many live in all-frosh dorms where their RAs plan traditions like dorm-wide fountain hops.',
  },
  {
    word: 'ROBLE',
    category: 'Residence',
    hint: 'One of the oldest dorms on campus. Its name is Spanish for “oak.”',
    fact: 'Roble Hall opened in 1918 and is one of Stanford’s oldest residence halls. “Roble” is Spanish for oak, a nod to the oak woodlands around campus.',
  },
  {
    word: 'STERN',
    category: 'Residence',
    hint: 'A residence complex with its own dining hall, home to houses like Larkin and Twain.',
    fact: 'Stern Hall is a residence complex made up of several houses, including Larkin, Twain, and Burbank, plus Stern Dining.',
  },
  {
    word: 'GATES',
    category: 'Academics',
    hint: 'The computer science building, named after a famous software founder.',
    fact: 'The Gates Computer Science Building opened in 1996. Larry Page and Sergey Brin worked there as PhD students while building the search engine that became Google.',
  },
  {
    word: 'HUANG',
    category: 'Academics',
    hint: 'An engineering center named for the founder of a major chip company.',
    fact: 'The Jen-Hsun Huang Engineering Center is named for NVIDIA’s co-founder and CEO, who earned his master’s in electrical engineering at Stanford.',
  },
  {
    word: 'RODIN',
    category: 'Landmark',
    hint: 'A sculpture garden near the Cantor Arts Center, with The Gates of Hell.',
    fact: 'Stanford has one of the largest collections of Rodin bronzes outside Paris. The outdoor sculpture garden includes a cast of The Gates of Hell.',
  },
  {
    word: 'TOYON',
    category: 'Residence',
    hint: 'An upperclass dorm named after a native California shrub.',
    fact: 'Toyon Hall is named for the toyon shrub, also called “California holly,” whose red berries appear in winter.',
  },
  {
    word: 'CLARK',
    category: 'Academics',
    hint: 'The colorful home of Bio-X, named for a Netscape co-founder.',
    fact: 'The James H. Clark Center houses Stanford Bio-X, an interdisciplinary biosciences institute. Clark was a Stanford professor before he co-founded Silicon Graphics and Netscape.',
  },
  {
    word: 'PALMS',
    category: 'Landmark',
    hint: 'They line the grand drive leading to the Oval.',
    fact: 'Palm Drive is the tree-lined entrance to campus. It runs from El Camino Real to the Oval, framing the view of the Main Quad and Memorial Church.',
  },
  {
    word: 'FROST',
    category: 'Landmark',
    hint: 'An outdoor amphitheater where you might catch a summer concert.',
    fact: 'Frost Amphitheater opened in 1937 and has hosted acts from the Grateful Dead to today’s touring artists, all under the trees.',
  },
  {
    word: 'PSETS',
    category: 'Student life',
    hint: 'Weekly homework that keeps CS and math majors up late.',
    fact: '“Psets,” or problem sets, are due weekly in many Stanford STEM classes. Late-night pset sessions in dorm lounges are a shared experience.',
  },
  {
    word: 'BIKES',
    category: 'Student life',
    hint: 'Thousands of these clog the racks outside lecture halls.',
    fact: 'Stanford’s huge, flat campus makes it one of the most bike-friendly universities in the country, and the traffic circles get famously chaotic between classes.',
  },
  {
    word: 'COUPA',
    category: 'Student life',
    hint: 'A Venezuelan-inspired café inside Green Library.',
    fact: 'Coupa Café is a student favorite for coffee and arepas. Its campus locations include Green Library and the Y2E2 building.',
  },
  {
    word: 'DOERR',
    category: 'Academics',
    hint: 'Stanford’s newest school, focused on climate and sustainability.',
    fact: 'The Stanford Doerr School of Sustainability opened in 2022, its first new school in 70 years. It was launched with a major gift from John and Ann Doerr.',
  },
  {
    word: 'GREEN',
    category: 'Landmark',
    hint: 'Stanford’s main library, and also a color.',
    fact: 'Cecil H. Green Library is Stanford’s main library. Its grand reading rooms and quiet stacks are some of the most popular study spots on campus.',
  },
  {
    word: 'FLOMO',
    category: 'Residence',
    hint: 'The nickname for Florence Moore Hall.',
    fact: 'FloMo (Florence Moore Hall) is a cluster of houses with Spanish bird names, including Alondra, Cardenal, Gavilan, Mirlo, and Paloma.',
  },
  {
    word: 'AXESS',
    category: 'Academics',
    hint: 'The student portal for enrolling in classes.',
    fact: 'Axess is Stanford’s student system for enrollment, grades, and financial info. Its name is a pun on “access.”',
  },
  {
    word: 'SUNET',
    category: 'Student life',
    hint: 'Every student’s login ID is named after this network.',
    fact: 'Your SUNet ID is your Stanford login. SUNet stands for Stanford University Network.',
  },
  {
    word: 'WACKY',
    category: 'Campus tradition',
    hint: 'Graduates show up in costume for this commencement walk.',
    fact: 'At the Wacky Walk, graduating seniors storm into Stanford Stadium at commencement in costumes, props, and elaborate group themes.',
  },
  {
    word: 'TOWER',
    category: 'Landmark',
    hint: 'A 285-foot landmark you can see from almost anywhere on campus.',
    fact: 'Hoover Tower was completed in 1941 for Stanford’s 50th anniversary. Its observation deck has one of the best views of campus and the Bay.',
  },
  {
    word: 'OTERO',
    category: 'Residence',
    hint: 'A frosh house in Wilbur Hall.',
    fact: 'Otero is one of the houses in Wilbur Hall, alongside Arroyo, Cedro, Junipero, Okada, Rinconada, Soto, and Trancos.',
  },
  {
    word: 'CEDRO',
    category: 'Residence',
    hint: 'A Wilbur Hall house whose name is Spanish for “cedar.”',
    fact: 'Cedro is a frosh house in Wilbur Hall. Like many Stanford houses, it has a Spanish name.',
  },
  {
    word: 'OKADA',
    category: 'Residence',
    hint: 'The Asian American–themed house in Wilbur Hall.',
    fact: 'Okada is Stanford’s Asian American theme house, part of Wilbur Hall. Residents host events that celebrate Asian American history and culture.',
  },
  {
    word: 'MIRLO',
    category: 'Residence',
    hint: 'A FloMo house named after the Spanish word for “blackbird.”',
    fact: 'Mirlo is one of the houses in Florence Moore Hall. Each FloMo house is named for a bird in Spanish.',
  },
  {
    word: 'VADEN',
    category: 'Student life',
    hint: 'Where students go when they catch the dorm cold.',
    fact: 'Vaden Health Services is Stanford’s student health center, offering medical care, counseling, and wellness programs.',
  },
  {
    word: 'QUAKE',
    category: 'History',
    hint: 'In 1906 this sent a statue of Louis Agassiz headfirst into the pavement.',
    fact: 'The 1906 San Francisco earthquake badly damaged campus. Memorial Church’s spire collapsed, and a statue of naturalist Louis Agassiz fell headfirst into a walkway.',
  },
  {
    word: 'KNOLL',
    category: 'Landmark',
    hint: 'A hilltop building that houses Stanford’s computer music center.',
    fact: 'The Knoll is a historic building on a hill that houses CCRMA, Stanford’s center for computer music research.',
  },
  {
    word: 'CCRMA',
    category: 'Academics',
    hint: 'A music and acoustics research center, pronounced like “karma.”',
    fact: 'CCRMA, the Center for Computer Research in Music and Acoustics, is where John Chowning developed FM synthesis. Stanford licensed it to Yamaha, and it powered legendary synthesizers like the DX7.',
  },
  {
    word: 'HASSO',
    category: 'Academics',
    hint: 'The d.school’s official name starts with this first name.',
    fact: 'The Hasso Plattner Institute of Design, better known as the d.school, popularized design thinking. It’s named for SAP co-founder Hasso Plattner.',
  },
  {
    word: 'YAHOO',
    category: 'Silicon Valley',
    hint: 'Two EE grad students started this web directory in a campus trailer.',
    fact: 'Jerry Yang and David Filo started Yahoo! in 1994 as Stanford grad students. It was originally called “Jerry and David’s Guide to the World Wide Web.”',
  },
  {
    word: 'CISCO',
    category: 'Silicon Valley',
    hint: 'A networking giant founded in 1984 by two Stanford computing staffers.',
    fact: 'Cisco was co-founded by Len Bosack and Sandy Lerner, who worked on Stanford’s computer networks. Its name comes from San Francisco.',
  },
  {
    word: 'BEARS',
    category: 'Athletics',
    hint: 'The rivals across the Bay that Stanford plays in the Big Game.',
    fact: 'Stanford and the Cal Golden Bears have played the Big Game since 1892, and the winner takes home the Stanford Axe.',
  },
  {
    word: 'BRAUN',
    category: 'Academics',
    hint: 'The music building, home to practice rooms and Campbell Recital Hall.',
    fact: 'The Braun Music Center houses the Department of Music, including Campbell Recital Hall and dozens of practice rooms.',
  },
  {
    word: 'THINK',
    category: 'Academics',
    hint: 'The name of a former first-year course requirement.',
    fact: 'For years, every Stanford frosh took a THINK course on big questions. The COLLEGE requirement replaced it in 2021.',
  },
  {
    word: 'CARTA',
    category: 'Academics',
    hint: 'The course-planning site students check for class reviews and schedules.',
    fact: 'Carta, built by Stanford researchers, helps students explore courses with reviews, schedules, and historical data. It’s a staple of quarterly class planning.',
  },
  {
    word: 'WINDS',
    category: 'History',
    hint: 'Stanford’s German motto is about these, of freedom.',
    fact: 'Stanford’s unofficial motto, “Die Luft der Freiheit weht,” means “The wind of freedom blows.” It was a favorite saying of first president David Starr Jordan.',
  },
]

export const MINI_ANSWERS: Answer[] = [
  {
    word: 'AXE',
    category: 'Athletics',
    hint: 'The trophy that goes to the Big Game winner.',
    fact: 'The Stanford Axe first appeared at an 1899 baseball game against Cal. Cal students stole it, and it stayed in Berkeley until Stanford students took it back in 1930. Since 1933 it has gone to the Big Game winner.',
  },
  {
    word: 'CAL',
    category: 'Athletics',
    hint: 'Stanford’s archrival across the Bay.',
    fact: 'Stanford vs. Cal is one of college football’s oldest rivalries. Their first Big Game was in 1892.',
  },
  {
    word: 'ROW',
    category: 'Residence',
    hint: '“The ___” is a stretch of houses, co-ops, and Greek residences.',
    fact: 'The Row is a stretch of upperclass houses, co-ops, and Greek houses, many in historic buildings along Mayfield Avenue and nearby streets.',
  },
  {
    word: 'GSB',
    category: 'Academics',
    hint: 'The business school, by its initials.',
    fact: 'The GSB (Graduate School of Business) was founded in 1925 and is one of the most selective MBA programs in the world.',
  },
  {
    word: 'PWR',
    category: 'Academics',
    hint: 'Every undergrad takes this writing requirement, known by its initials.',
    fact: 'PWR, the Program in Writing and Rhetoric, is the writing requirement every Stanford undergrad completes.',
  },
  {
    word: 'SUN',
    category: 'Silicon Valley',
    hint: 'A tech giant whose name stood for Stanford University Network.',
    fact: 'Sun Microsystems was founded in 1982 by Stanford grads, and its name stood for Stanford University Network.',
  },
  {
    word: 'ACC',
    category: 'Athletics',
    hint: 'The athletic conference Stanford joined in 2024.',
    fact: 'Stanford left the Pac-12 and joined the Atlantic Coast Conference (ACC) in 2024.',
  },
  {
    word: 'LAW',
    category: 'Academics',
    hint: 'Its school sits around Crown Quad.',
    fact: 'Stanford Law School is based at Crown Quad and is known for its small class sizes.',
  },
  {
    word: 'RED',
    category: 'History',
    hint: '“Cardinal” refers to this, not a bird.',
    fact: 'Stanford’s nickname, the Cardinal, refers to the color cardinal red, not the bird. The school adopted it in 1981.',
  },
]

if (import.meta.env.DEV) {
  for (const [list, len] of [[CLASSIC_ANSWERS, 5], [MINI_ANSWERS, 3]] as const) {
    const seen = new Set<string>()
    for (const a of list) {
      if (a.word.length !== len || !/^[A-Z]+$/.test(a.word)) console.error(`Cardle: "${a.word}" must be ${len} uppercase letters`)
      if (seen.has(a.word)) console.error(`Cardle: duplicate answer "${a.word}"`)
      seen.add(a.word)
    }
  }
}
