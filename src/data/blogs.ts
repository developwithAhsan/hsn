export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
}

export const STATIC_BLOGS: Blog[] = [
  {
    id: '1',
    title: 'The Evolution of T20 Cricket: From Entertainment to Strategy',
    excerpt: 'Explore how T20 cricket has transformed from a mere entertainment format into a highly strategic game dominated by data and analytics.',
    category: 'Analysis',
    date: 'Feb 20, 2026',
    author: 'Cricket Expert',
    content: `
## The Birth of a Revolution
When T20 cricket was first introduced in 2003, many purists dismissed it as a "gimmick" or "hit-and-giggle" cricket. However, two decades later, it has become the financial engine of the sport and a hotbed for tactical innovation.

## Data-Driven Decisions
Modern T20 is no longer just about hitting every ball for six. Teams now employ data scientists to analyze match-ups, entry points for batsmen, and defensive lines for bowlers. Every delivery is a calculated risk.

## Specialized Roles
The format has given rise to specialized roles like 'finishers', 'powerplay specialists', and 'death-over experts'. Players are now selected based on their ability to perform in specific phases of the game.
    `
  },
  {
    id: '2',
    title: 'Top 10 Greatest Cricket Stadiums in the World',
    excerpt: 'A journey through the most iconic cricket grounds, from the historic Lord\'s to the massive Narendra Modi Stadium.',
    category: 'Travel',
    date: 'Feb 19, 2026',
    author: 'Stadium Scout',
    content: `
## 1. Lord's, London (The Home of Cricket)
With its iconic pavilion and the honors board, Lord's remains the ultimate destination for any cricket fan.

## 2. Melbourne Cricket Ground (MCG), Australia
Known for its massive capacity and electric atmosphere, especially during the Boxing Day Test.

## 3. Narendra Modi Stadium, Ahmedabad
The largest cricket stadium in the world, a marvel of modern engineering with a capacity of over 130,000.

## 4. Eden Gardens, Kolkata
The "Lords of the East," famous for its passionate and vocal crowd.
    `
  },
  {
    id: '3',
    title: 'How to Master the Art of Spin Bowling: A Comprehensive Guide',
    excerpt: 'Learn the technical nuances of leg-spin and off-spin, including grip, flight, and the importance of variations.',
    category: 'Tutorial',
    date: 'Feb 18, 2026',
    author: 'Coach Spin',
    content: `
## The Grip
The foundation of spin bowling lies in the grip. For off-spin, the index and middle fingers do the work. For leg-spin, it's about the wrist and the third finger.

## Flight and Loop
Spin is not just about turning the ball; it's about deceiving the batsman in the air. Using flight to draw the batsman forward is a key skill.

## Variations
The 'Doosra', 'Googly', and 'Top-spinner' are essential weapons in a modern spinner's arsenal. Mastering these variations keeps the batsman guessing.
    `
  },
  {
    id: '4',
    title: 'The History of the Ashes: Cricket\'s Oldest Rivalry',
    excerpt: 'Delve into the origin of the Ashes and why this biennial series between England and Australia remains the pinnacle of Test cricket.',
    category: 'History',
    date: 'Feb 17, 2026',
    author: 'History Buff',
    content: `
## The Mock Obituary
The rivalry began in 1882 after Australia's first win on English soil. A mock obituary in The Sporting Times stated that English cricket had died and "the body will be cremated and the ashes taken to Australia."

## The Urn
The tiny terracotta urn, supposedly containing the ashes of a burnt bail, has become the most coveted trophy in the sport.

## Modern Legends
From Warne's "Ball of the Century" to Stokes' Headingley miracle, the Ashes continues to produce legendary moments.
    `
  },
  {
    id: '5',
    title: 'Understanding Cricket Formats: Test vs ODI vs T20',
    excerpt: 'A beginner\'s guide to the three main formats of international cricket and what makes each of them unique.',
    category: 'Guide',
    date: 'Feb 16, 2026',
    author: 'Cricket 101',
    content: `
## Test Cricket: The Ultimate Test
Played over five days, it tests a player's skill, endurance, and mental strength. It's the purest form of the game.

## One Day Internationals (ODI)
A 50-over format that balances the patience of Test cricket with the aggression of T20s. The World Cup remains the most prestigious ODI tournament.

## T20 Internationals
Fast-paced, high-energy, and completed in about three hours. It's the format that has brought cricket to a global audience.
    `
  },
  {
    id: '6',
    title: 'The Rise of Women\'s Cricket: A New Era',
    excerpt: 'How women\'s cricket has broken barriers and achieved unprecedented growth in popularity and professionalism.',
    category: 'News',
    date: 'Feb 15, 2026',
    author: 'Sports Reporter',
    content: `
## Breaking Records
The 2020 T20 World Cup final at the MCG saw over 86,000 fans, a landmark moment for women's sports globally.

## Professional Leagues
The introduction of the WPL in India and the WBBL in Australia has provided a platform for female cricketers to showcase their talent on a grand stage.

## Equal Pay
More boards are moving towards equal match fees for men and women, signaling a shift towards true equality in the sport.
    `
  },
  {
    id: '7',
    title: 'Essential Cricket Gear for Beginners: What You Really Need',
    excerpt: 'Starting your cricket journey? Here is a list of essential equipment you need to stay safe and perform your best.',
    category: 'Equipment',
    date: 'Feb 14, 2026',
    author: 'Gear Head',
    content: `
## The Bat
Choosing the right weight and size is crucial. Beginners should start with a lighter bat to develop proper technique.

## Protective Gear
A helmet, pads, gloves, and an abdominal guard are non-negotiable for safety when playing with a hard leather ball.

## Footwear
Spikes are essential for grip on the pitch, while rubber-soled shoes are better for indoor or synthetic surfaces.
    `
  },
  {
    id: '8',
    title: 'Diet and Fitness Secrets of Modern Cricketers',
    excerpt: 'Learn about the rigorous training regimes and nutritional plans that keep elite cricketers at the top of their game.',
    category: 'Health',
    date: 'Feb 13, 2026',
    author: 'Fitness Pro',
    content: `
## The Yo-Yo Test
Fitness standards have skyrocketed. The Yo-Yo test is now a mandatory benchmark for many international teams.

## Nutrition
High-protein diets, complex carbohydrates, and meticulous hydration plans are the norm. Gone are the days of tea and biscuits during intervals.

## Recovery
Ice baths, compression wear, and physiotherapy are vital for maintaining performance throughout a long season.
    `
  },
  {
    id: '9',
    title: 'The Impact of Technology in Cricket: DRS, Snicko, and Hotspot',
    excerpt: 'How technology has changed the way cricket is officiated and analyzed by fans and experts alike.',
    category: 'Technology',
    date: 'Feb 12, 2026',
    author: 'Tech Guru',
    content: `
## Decision Review System (DRS)
DRS has significantly reduced the number of "howlers" in the game, though it remains a topic of debate among fans.

## Ball Tracking
Hawk-Eye and Virtual Eye provide a mathematical prediction of the ball's path, essential for LBW decisions.

## Edge Detection
Ultra-edge and Snickometer use sound waves to detect if the ball has hit the bat, providing clarity in caught-behind appeals.
    `
  },
  {
    id: '10',
    title: 'Famous Cricket Captains and Their Leadership Styles',
    excerpt: 'Analyzing the leadership philosophies of legendary captains like MS Dhoni, Ricky Ponting, and Steve Waugh.',
    category: 'Leadership',
    date: 'Feb 11, 2026',
    author: 'Strategy Analyst',
    content: `
## MS Dhoni: Captain Cool
Known for his calm demeanor under pressure and instinctive decision-making. He led India to three ICC trophies.

## Ricky Ponting: The Aggressor
A leader who led by example with the bat and demanded high standards of aggression and excellence from his team.

## Steve Waugh: Mental Disintegration
Pioneered the concept of "mental disintegration" and built one of the most dominant Test teams in history.
    `
  },
  {
    id: '11',
    title: 'The Psychology of Batting: Staying Calm Under Pressure',
    excerpt: 'Batting is as much a mental game as it is physical. Discover the techniques used by pros to stay focused.',
    category: 'Psychology',
    date: 'Feb 10, 2026',
    author: 'Mind Coach',
    content: `
## Routine
Having a consistent pre-ball routine helps batsmen reset and focus on the next delivery.

## Visualization
Many top players visualize successful shots and scenarios before they even step onto the field.

## Managing Nerves
Accepting pressure as a part of the game rather than fighting it is key to performing in high-stakes situations.
    `
  },
  {
    id: '12',
    title: 'How IPL Changed the Landscape of Global Cricket',
    excerpt: 'The Indian Premier League has not only changed cricket financially but also tactically and culturally.',
    category: 'Business',
    date: 'Feb 09, 2026',
    author: 'Market Watch',
    content: `
## Financial Powerhouse
The IPL is now one of the most valuable sports leagues in the world, attracting massive investment and global talent.

## Skill Exchange
Playing alongside international stars has accelerated the development of young domestic players.

## The T20 Circuit
The success of the IPL has led to a proliferation of T20 leagues worldwide, creating a new career path for cricketers.
    `
  },
  {
    id: '13',
    title: 'A Guide to Cricket Fielding Positions: Where to Stand and Why',
    excerpt: 'From Slips to Long-on, understand the logic behind various fielding placements and their strategic importance.',
    category: 'Strategy',
    date: 'Feb 08, 2026',
    author: 'Fielding Coach',
    content: `
## Attacking Positions
Slips, Gully, and Short-leg are designed to take catches when the bowler is on top.

## Defensive Positions
Long-on, Long-off, and Deep Mid-wicket are used to save boundaries and restrict the scoring rate.

## The Captain's Role
Setting the field is a constant battle between the captain and the batsman, requiring quick thinking and tactical awareness.
    `
  },
  {
    id: '14',
    title: 'The Most Iconic Moments in Cricket History',
    excerpt: 'Relive the moments that defined the sport, from the 1983 World Cup win to the 2019 World Cup final.',
    category: 'History',
    date: 'Feb 07, 2026',
    author: 'Cricket Fanatic',
    content: `
## 1983 World Cup Final
India's underdog victory against the mighty West Indies changed the course of cricket in the subcontinent.

## 2019 World Cup Final
The "Barely a Margin" final at Lord's, decided by a boundary countback, remains the most dramatic finish in history.

## Warne's Ball of the Century
The delivery that announced Shane Warne to the world and revived the art of leg-spin.
    `
  },
  {
    id: '15',
    title: 'Future of Cricket: Is the T10 Format the Next Big Thing?',
    excerpt: 'As attention spans shorten, could the 10-over format be the key to cricket\'s inclusion in the Olympics?',
    category: 'Future',
    date: 'Feb 06, 2026',
    author: 'Visionary',
    content: `
## Speed and Excitement
T10 matches are completed in 90 minutes, making them ideal for television and multi-sport events like the Olympics.

## Tactical Shifts
In T10, there is no time for consolidation. Every ball is an event, requiring a completely different mindset from players.

## Global Expansion
The format is being used to introduce cricket to non-traditional markets like the USA and Europe.
    `
  },
  {
    id: '16',
    title: 'The Art of Captaincy: More Than Just Setting Fields',
    excerpt: 'Explore the subtle nuances of cricket captaincy, from managing player egos to reading the pitch and making tactical gambles.',
    category: 'Leadership',
    date: 'Feb 05, 2026',
    author: 'Tactical Mind',
    content: `
## Man Management
A great captain knows how to get the best out of every individual. Whether it's a confidence-boosting word to a young bowler or managing a superstar's ego, man management is 70% of the job.

## Reading the Game
Anticipating a batsman's next move or sensing a shift in the pitch's behavior allows a captain to stay one step ahead. It's about proactive rather than reactive leadership.

## Risk vs Reward
Sometimes, a captain must take a gamble—like giving an extra over to an expensive but wicket-taking bowler. These high-stakes decisions often define a captain's legacy.
    `
  }
];
