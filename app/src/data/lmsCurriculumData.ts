import type { CurriculumTrack } from '../types/lms';

export const CURRICULUM_TRACKS: readonly CurriculumTrack[] = Object.freeze([
  {
    id: 'futurepath-navigator',
    code: 'CRS-FP-01',
    category: 'career_exploration',
    title: 'FuturePath Navigator',
    tagline: 'Discover Your True Potential & Build Your Career Map',
    description:
      'A scientific approach for school and early-college students to understand innate aptitudes, cognitive strengths, and personality traits through psychometrics and DMIT-based frameworks before making subject and career decisions.',
    targetAudience: 'Middle & High School Students (Grades 8–12), Parents, and Early College Explorers',
    estimatedWeeks: 4,
    totalHours: 16,
    level: 'Foundational',
    councilLead: {
      name: 'Shri Khumukcham Roshaan Singh',
      title: 'Executive Career Coach & Corporate Mentor',
      affiliation: 'EduPlus Council / Kolkata Hub',
      portraitFilename: 'council-khumukcham-roshaan-singh-v2.webp',
    },
    certificationTitle: 'Certified Career Readiness & Aptitude Strategist',
    prerequisites: ['Open curiosity about personal strengths', 'Willingness to complete self-reflection exercises'],
    learningOutcomes: [
      'Decode personal cognitive styles and natural strengths using psychometric metrics',
      'Make confident stream selections (Science, Commerce, Arts, Vocational) aligned with long-term goals',
      'Construct a 5-year educational and career milestone roadmap',
      'Identify both emerging technology domains and timeless professional pathways',
    ],
    modules: [
      {
        id: 'fp-mod-1',
        trackId: 'futurepath-navigator',
        order: 1,
        title: 'Scientific Psychometrics & Cognitive Profiling',
        description: 'Explore the foundations of DMIT and psychometric evaluations to decode brain dominance, learning modalities, and natural talents.',
        estimatedHours: 5,
        lessons: [
          {
            id: 'fp-les-101',
            moduleId: 'fp-mod-1',
            title: 'Foundations of Aptitude: Beyond Classroom Grades',
            durationMinutes: 25,
            type: 'video',
            summary: 'Why academic grades alone do not indicate career happiness or long-term competence, and how psychometrics bridges the gap.',
            videoEmbedId: 'aqz-KE-bpKQ',
            // videoUrl: undefined, // TODO: replace with hosted lesson video
            contentMarkdown: `### The Limits of Marks as a Predictor

For decades, students have been funneled into career decisions solely based on 10th or 12th board examination scores. Yet real-world job satisfaction and exceptional performance depend on:

1. **Innate Cognitive Wiring**: How your brain processes abstract concepts vs practical sensory data.
2. **Behavioral Motivators**: Whether you thrive in collaborative environments or quiet deep-work settings.
3. **Execution Stamina**: Persistence through specialized problems.

Psychometric testing provides a scientific mirror. Instead of telling you what you *must* do, it illuminates where your energy naturally multiplies.`,
            keyTakeaways: [
              'Grades measure syllabus retention; psychometrics measure cognitive aptitude and behavioral inclination.',
              'Multiple intelligences (spatial, logical, linguistic, kinesthetic) each lead to distinct high-value career paths.',
              'Early clarity prevents costly collegiate stream switches later.',
            ],
            practicalExercise: 'Write down three activities where you lose track of time and identify whether they involve people, systems, words, or physical materials.',
            resources: [
              { title: 'EduPlus Aptitude Diagnostic Guide', type: 'document', url: '#' },
              { title: 'Multiple Intelligences Self-Audit Worksheet', type: 'worksheet', url: '#' },
            ],
          },
          {
            id: 'fp-les-102',
            moduleId: 'fp-mod-1',
            title: 'DMIT & Learning Modalities: Visual, Auditory, Kinesthetic',
            durationMinutes: 30,
            type: 'reading',
            summary: 'Understanding Dermatoglyphics Multiple Intelligence Testing and discovering your optimal sensory learning modality.',
            prerequisiteLessonIds: ['fp-les-101'],
            contentMarkdown: `### How You Absorb Knowledge Best

Every learner processes input through varying sensory channels. When you study in discordance with your primary modality, retention drops significantly.

- **Visual Learners**: Think in spatial diagrams, mind maps, and structured orthogonal tables.
- **Auditory Learners**: Absorb nuanced logic through podcasts, verbal discussions, and lectures.
- **Kinesthetic Learners**: Learn by building physical or software prototypes, writing, and hands-on experiments.

By identifying your dominant modality, you can reduce study fatigue by 40% while doubling retention efficiency.`,
            keyTakeaways: [
              'Modality alignment accelerates exam revision and complex topic mastery.',
              'Kinesthetic learners benefit strongly from building working models or writing summary cheat sheets.',
              'Auditory learners should incorporate peer-teaching and voice playback into study routines.',
            ],
            practicalExercise: 'Adapt one chapter of your current study material into your dominant modality (e.g., turn text notes into a diagram or explain it out loud).',
          },
        ],
        quiz: {
          id: 'fp-quiz-1',
          moduleId: 'fp-mod-1',
          title: 'Module 1 Knowledge Check: Cognitive Profiling',
          description: 'Assess your understanding of psychometric diagnostics and cognitive learning modalities.',
          passingPercentage: 70,
          questions: [
            {
              id: 'fp-q1',
              prompt: 'What primary advantage do psychometric evaluations offer over standard school test marks?',
              options: [
                'They predict exact future salary brackets with 100% accuracy',
                'They decode innate cognitive aptitudes, learning modalities, and behavioral inclinations',
                'They replace the need to attend high school examinations',
                'They only measure memorization speed for board exams',
              ],
              correctIndex: 1,
              explanation: 'Psychometrics measures intrinsic cognitive wiring and behavioral traits rather than transient memory retention.',
            },
            {
              id: 'fp-q2',
              prompt: 'A kinesthetic learner retains difficult technical concepts best through which method?',
              options: [
                'Reading plain unformatted text for 6 consecutive hours',
                'Listening to radio audio without taking notes',
                'Building physical or digital prototypes, writing code, or hands-on simulations',
                'Memorizing bullet points in silence without interaction',
              ],
              correctIndex: 2,
              explanation: 'Kinesthetic learners thrive on active physical engagement, problem-solving, and tactile manipulation of ideas.',
            },
            {
              id: 'fp-q3',
              prompt: 'How does identifying multiple intelligences help during high school stream selection?',
              options: [
                'It prevents forced choices based solely on peer pressure or rigid conventions',
                'It guarantees immediate admission without college entrance requirements',
                'It eliminates the need for math and language training',
                'It limits students to only one single job title for life',
              ],
              correctIndex: 0,
              explanation: 'Self-awareness gives students the confidence to select academic streams that align with their authentic strengths.',
            },
          ],
        },
      },
      {
        id: 'fp-mod-2',
        trackId: 'futurepath-navigator',
        order: 2,
        title: 'Stream Selection & Modern Interdisciplinary Pathways',
        description: 'Navigate Science, Commerce, and Humanities with a forward-looking lens on AI, renewable energy, bio-sciences, and design.',
        estimatedHours: 6,
        lessons: [
          {
            id: 'fp-les-201',
            moduleId: 'fp-mod-2',
            title: 'Deconstructing the Board Streams: Science, Commerce, Arts',
            durationMinutes: 35,
            type: 'video',
            summary: 'A deep comparative analysis of board stream trajectories and how modern universities value cross-disciplinary competence.',
            prerequisiteLessonIds: ['fp-les-102'],
            videoEmbedId: 'dQw4w9WgXcQ',
            // videoUrl: undefined, // TODO: replace with hosted lesson video
            contentMarkdown: `### The Modern Matrix of Disciplines

Traditional boundaries between Science and Arts have dissolved in top global research institutions:

- **Computational Social Science**: Combines statistical algorithms with sociopolitical analysis.
- **Biomedical Ethics & Law**: Melds molecular biology with legal governance.
- **Design Engineering**: Unites aesthetic principles with mechanical and electronic manufacturing.

When picking your board stream, prioritize core quantitative and communicative foundations that preserve optionality.`,
            keyTakeaways: [
              'Retain quantitative literacy regardless of whether you choose Commerce, Science, or Humanities.',
              'Interdisciplinary combinations are increasingly favored by modern Ivy League and premier Indian institutes.',
              'Do not select streams based on fear of a single subject; diagnose the root blocker instead.',
            ],
            practicalExercise: 'Map out 2 backup pathways that branch out from your primary chosen stream.',
          },
        ],
        quiz: {
          id: 'fp-quiz-2',
          moduleId: 'fp-mod-2',
          title: 'Module 2 Knowledge Check: Stream & Pathway Strategy',
          description: 'Test your understanding of modern academic streams and cross-disciplinary careers.',
          passingPercentage: 70,
          questions: [
            {
              id: 'fp-q4',
              prompt: 'Which skill provides the greatest career optionality across both Science and Commerce?',
              options: [
                'Rote memorization of historical dates',
                'Quantitative reasoning and clear written communication',
                'Avoiding all computer tools',
                'Only studying in isolation',
              ],
              correctIndex: 1,
              explanation: 'Quantitative literacy and concise written expression form the bedrock of almost every high-impact profession.',
            },
            {
              id: 'fp-q5',
              prompt: 'Why are cross-disciplinary degrees gaining prominence in global institutions?',
              options: [
                'Because single disciplines are no longer taught anywhere',
                'Because real-world challenges like green energy and AI governance require multifaceted problem-solving',
                'Because they take less time to complete',
                'Because entrance tests have been completely discontinued',
              ],
              correctIndex: 1,
              explanation: 'Complex modern challenges sit at the intersection of technology, human behavior, and institutional policy.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'lifeskills-lab',
    code: 'CRS-LS-02',
    category: 'human_capabilities',
    title: 'LifeSkills Lab',
    tagline: 'Non-Negotiable Human Capabilities for an Automated World',
    description:
      'Equips learners with critical soft skills: persuasive verbal and written communication, scenario-based problem solving, emotional intelligence, financial literacy, and digital ethics.',
    targetAudience: 'Secondary Students, College Undergraduates, and Early-Career Professionals',
    estimatedWeeks: 6,
    totalHours: 24,
    level: 'Foundational',
    councilLead: {
      name: 'Smt. Nutan Nongthongbam',
      title: 'Life Skills Specialist & Public Health Educator',
      affiliation: 'EduPlus Council / Imphal Hub',
      portraitFilename: 'council-nutan-nongthongbam-v2.webp',
    },
    certificationTitle: 'Certified LifeSkills & Human Capabilities Practitioner',
    prerequisites: ['Commitment to weekly speaking and writing practice'],
    learningOutcomes: [
      'Present complex ideas clearly and persuasively under time constraints',
      'Deploy structured decision-making frameworks in ambiguous personal and professional scenarios',
      'Manage personal finances: budgeting, compounding, inflation, and risk mitigation',
      'Navigate digital communication tools and AI workflows safely and ethically',
    ],
    modules: [
      {
        id: 'ls-mod-1',
        trackId: 'lifeskills-lab',
        order: 1,
        title: 'Verbal Mastery & Public Presentation',
        description: 'Techniques for clear voice modulation, structured argumentation, and calm confidence before audiences.',
        estimatedHours: 8,
        lessons: [
          {
            id: 'ls-les-101',
            moduleId: 'ls-mod-1',
            title: 'The Architecture of a 3-Minute Persuasive Pitch',
            durationMinutes: 30,
            type: 'video',
            summary: 'Structuring thoughts using the Hook, Problem, Solution, and Call to Action formula.',
            videoEmbedId: 'dQw4w9WgXcQ',
            // videoUrl: undefined, // TODO: replace with hosted lesson video
            contentMarkdown: `### The Four Pillars of Clear Speech

Whether speaking to a classroom, an admissions committee, or a future investor, high-impact speech follows four clean phases:

1. **The Hook (15 seconds)**: Provocative question, surprising empirical statistic, or relatable human vignette.
2. **The Problem Statement (45 seconds)**: Clarify the friction point without unnecessary jargon.
3. **The Core Solution & Evidence (90 seconds)**: Present your central proposal backed by 2 concrete proof points.
4. **The Call to Action (30 seconds)**: State the exact next step you are asking the listener to take.

Eliminate filler words ("um", "like", "actually") by replacing them with deliberate, comfortable 1-second pauses.`,
            keyTakeaways: [
              'Silence is a powerful rhetorical tool; pause instead of using verbal crutches.',
              'Every presentation must have one clear, memorable thesis sentence.',
              'Body language should be open, grounded, and devoid of fidgeting.',
            ],
            practicalExercise: 'Record a 90-second video explaining one concept you learned this week to a friend. Watch it and note every filler word.',
          },
        ],
        quiz: {
          id: 'ls-quiz-1',
          moduleId: 'ls-mod-1',
          title: 'Module 1 Knowledge Check: Verbal Mastery',
          description: 'Evaluate your grasp of presentation frameworks and vocal delivery.',
          passingPercentage: 70,
          questions: [
            {
              id: 'ls-q1',
              prompt: 'What is the most effective way to eliminate verbal filler words like "um" and "uh"?',
              options: [
                'Speaking at maximum speed without stopping',
                'Replacing fillers with deliberate, calm 1-second pauses',
                'Looking exclusively at the floor while speaking',
                'Reading every word from a script without looking up',
              ],
              correctIndex: 1,
              explanation: 'Pausing gives your brain time to formulate the next sentence while projecting composure and authority.',
            },
            {
              id: 'ls-q2',
              prompt: 'What should the final 30 seconds of a persuasive presentation always contain?',
              options: [
                'An apology for taking up people’s time',
                'A clear, actionable Call to Action (CTA)',
                'A new unrelated topic',
                'A recitation of the entire speech again',
              ],
              correctIndex: 1,
              explanation: 'A strong conclusion guides the audience directly toward the desired outcome or decision.',
            },
          ],
        },
      },
      {
        id: 'ls-mod-2',
        trackId: 'lifeskills-lab',
        order: 2,
        title: 'Financial Literacy: Compounding, Budgeting & Risk',
        description: 'Understand the math of money: inflation, emergency reserves, compound interest, and responsible budgeting.',
        estimatedHours: 8,
        lessons: [
          {
            id: 'ls-les-201',
            moduleId: 'ls-mod-2',
            title: 'The 50/30/20 Rule and the Power of Compounding',
            durationMinutes: 40,
            type: 'reading',
            summary: 'Practical financial rules of thumb for students starting stipends, pocket allowances, or first salaries.',
            contentMarkdown: `### Managing Capital Before You Earn Millions

Financial independence is not determined by how much you earn, but how much you retain and compound:

- **50% Needs**: Essential shelter, sustenance, utilities, and health.
- **30% Discretionary**: Personal projects, social events, books, and hobbies.
- **20% Savings & Compounding**: Emergency fund and index investments.

**The Rule of 72**: Divide 72 by the annual percentage rate of return to estimate how many years it takes for your investment to double. At 10% annual returns, capital doubles approximately every 7.2 years.`,
            keyTakeaways: [
              'Time in the market compounds capital exponentially; starting 5 years earlier makes a monumental difference.',
              'An emergency fund of 3–6 months of basic living costs is non-negotiable before taking risky speculative bets.',
              'Differentiate strictly between assets that generate cashflow and liabilities that bleed maintenance costs.',
            ],
            practicalExercise: 'Draft a personal monthly cash-flow ledger categorizing your last 30 days of expenses into Needs, Wants, and Savings.',
          },
        ],
      },
    ],
  },
  {
    id: 'expert-connect-live',
    code: 'CRS-EC-03',
    category: 'industry_mentorship',
    title: 'Expert Connect Live',
    tagline: 'Learn Directly from Global Pioneers Across Industry & Academia',
    description:
      'Direct interactive sessions and masterclasses connecting students with seasoned practitioners in green hydrogen, maritime logistics, legal governance, medical sciences, and automotive engineering.',
    targetAudience: 'Pre-University & Undergraduate Students Seeking Industry Grounding',
    estimatedWeeks: 4,
    totalHours: 16,
    level: 'Intermediate',
    councilLead: {
      name: 'Dr. Soram Bobby Singh',
      title: 'Principal Scientist, Green Hydrogen & Energy Materials',
      affiliation: 'EduPlus Council / South Korea Lab',
      portraitFilename: 'council-soram-bobby-singh-v2.webp',
    },
    certificationTitle: 'Industry Insights & Executive Mentorship Credential',
    prerequisites: ['Completion of FuturePath Navigator or secondary school science/business basics'],
    learningOutcomes: [
      'Understand the daily realities and skill expectations of cutting-edge industrial careers',
      'Formulate intelligent, professional inquiries during executive networking opportunities',
      'Analyze real-world corporate case studies from renewable energy, maritime, and automotive sectors',
    ],
    modules: [
      {
        id: 'ec-mod-1',
        trackId: 'expert-connect-live',
        order: 1,
        title: 'Frontiers in Sustainable Technology & Clean Energy',
        description: 'Examine green hydrogen production, supercapacitors, and international research internship pathways.',
        estimatedHours: 5,
        lessons: [
          {
            id: 'ec-les-101',
            moduleId: 'ec-mod-1',
            title: 'Green Hydrogen: The Next Generation Energy Carrier',
            durationMinutes: 35,
            type: 'video',
            summary: 'How water-splitting technologies and clean energy storage are creating thousands of new engineering disciplines globally.',
            videoEmbedId: 'tgbNymZ7vqY',
            // videoUrl: undefined, // TODO: replace with hosted lesson video
            contentMarkdown: `### The Global Energy Transition

Hydrogen is the most abundant element in the universe, but separating it cleanly requires breakthroughs in:

- **Electrocatalysis**: Finding alternatives to expensive noble metals like platinum and iridium.
- **Membrane Durability**: Polymer electrolyte membrane systems that operate reliably for decades.
- **Storage & Cryogenics**: Safely storing compressed gas or liquid hydrogen for maritime transport.

Students aiming for high-impact research careers in South Korea, Germany, or Japan must build a strong foundation in electrochemistry, material physics, and thermodynamics.`,
            keyTakeaways: [
              'Clean hydrogen eliminates greenhouse gas emissions in heavy transport and steel manufacturing.',
              'Material science is a key bottleneck and opportunity area for aspiring engineers.',
              'Global collaborative research networks welcome young researchers with strong lab discipline.',
            ],
            practicalExercise: 'Write a 250-word abstract summarizing how a regional industry in your home state could transition to clean energy.',
          },
        ],
        quiz: {
          id: 'ec-quiz-1',
          moduleId: 'ec-mod-1',
          title: 'Module 1 Knowledge Check: Sustainable Technology',
          description: 'Assess understanding of clean energy careers and research principles.',
          passingPercentage: 70,
          questions: [
            {
              id: 'ec-q1',
              prompt: 'What makes green hydrogen distinct from grey or blue hydrogen?',
              options: [
                'It is colored green with chemical dyes',
                'It is produced via water electrolysis powered entirely by renewable electricity',
                'It is extracted directly from coal mines without processing',
                'It cannot be stored in tanks',
              ],
              correctIndex: 1,
              explanation: 'Green hydrogen is generated through electrolysis using 100% renewable power, producing zero carbon emissions.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'global-admissions-studio',
    code: 'CRS-GA-04',
    category: 'global_admissions',
    title: 'Global Admissions Studio',
    tagline: 'Your End-to-End Gateway to Domestic & Worldwide Higher Studies',
    description:
      'Rigorous guidance for competitive domestic exams (JEE, NEET, CUET, CLAT, IMU CET) alongside international admissions across the USA, UK, Europe, Australia, and Vietnam MBBS programs.',
    targetAudience: 'High School Seniors, Gap-Year Aspirants, and Study-Abroad Seekers',
    estimatedWeeks: 8,
    totalHours: 32,
    level: 'Advanced',
    councilLead: {
      name: 'Dr. Ngangbam Shantikumar Meetei',
      title: 'Professor of English & International Programs',
      affiliation: 'Hungkuo Delin University of Technology, Taiwan',
      portraitFilename: 'council-ngangbam-shantikumar-meetei-v2.webp',
    },
    certificationTitle: 'Global Admissions & Academic Strategy Fellow',
    prerequisites: ['High school academic transcript', 'Target degree or field of study identified'],
    learningOutcomes: [
      'Master strategic study schedules and mock test triage for JEE/NEET/CUET/IMU CET',
      'Shortlist domestic and international universities balancing academic rankings with financial scholarships',
      'Write compelling, authentic Statements of Purpose (SOP) that stand out to admissions deans',
      'Navigate visa documentation, financial affidavits, and consular interviews with zero errors',
    ],
    modules: [
      {
        id: 'ga-mod-1',
        trackId: 'global-admissions-studio',
        order: 1,
        title: 'Crafting an Irresistible Statement of Purpose (SOP)',
        description: 'How to write admissions essays that articulate intellectual vitality, resilience, and specific institutional fit.',
        estimatedHours: 10,
        lessons: [
          {
            id: 'ga-les-101',
            moduleId: 'ga-mod-1',
            title: 'Anatomy of a Winning Academic Essay: The 5-Part Formula',
            durationMinutes: 45,
            type: 'video',
            summary: 'Avoid the cliché childhood story; learn how top universities evaluate authentic intellectual curiosity.',
            videoEmbedId: 'jNQXAC9IVRw',
            // videoUrl: undefined, // TODO: replace with hosted lesson video
            contentMarkdown: `### Moving Beyond Clichés in Admissions Essays

Admissions committees read thousands of essays starting with *"Ever since I was a child, I dreamed of..."* Stand out by anchoring your narrative in specific, recent intellectual turning points:

1. **The Catalyst (Paragraph 1)**: An intellectual puzzle, experiment, or challenge that triggered your focused investigation.
2. **Academic Preparation (Paragraph 2)**: Rigorous coursework, independent literature reviews, or lab work demonstrating competence.
3. **Overcoming Friction (Paragraph 3)**: A moment where an initial hypothesis or project failed, and how you adapted methodically.
4. **Why This Specific Department (Paragraph 4)**: Name 2 specific professors, labs, or curriculum modules unique to that institution.
5. **Future Vision (Paragraph 5)**: How this training enables you to address concrete regional or global challenges upon graduation.`,
            keyTakeaways: [
              'Specificity wins: Name specific professors and lab facilities rather than vague compliments about campus beauty.',
              'Show, do not tell: Demonstrate curiosity through projects and books read, not self-congratulatory adjectives.',
              'Proofread for straight-line clarity; remove passive voice and flowery hyperbole.',
            ],
            practicalExercise: 'Draft a 150-word opening paragraph for your dream program focusing on a specific project or academic question.',
          },
        ],
        quiz: {
          id: 'ga-quiz-1',
          moduleId: 'ga-mod-1',
          title: 'Module 1 Knowledge Check: Admissions Essays',
          description: 'Assess your understanding of admissions storytelling and institutional alignment.',
          passingPercentage: 70,
          questions: [
            {
              id: 'ga-q1',
              prompt: 'What is the biggest weakness found in generic Statement of Purpose drafts?',
              options: [
                'Writing in grammatically correct English',
                'Listing vague childhood clichés and generic praise without naming specific professors, labs, or courses',
                'Explaining technical projects in detail',
                'Demonstrating quantitative competence',
              ],
              correctIndex: 1,
              explanation: 'Top universities want to see why their specific program aligns with your concrete intellectual objectives.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'career-launchpad',
    code: 'CRS-CL-05',
    category: 'placement_careers',
    title: 'Career Launchpad',
    tagline: 'From Degree to Direct Job Placement in India & Worldwide',
    description:
      'A structured employment accelerator: ATS-optimized resume engineering, technical and behavioral interview preparation, LinkedIn personal branding, and verified corporate placement matching.',
    targetAudience: 'Graduating Seniors, Job Seekers, and Career Switchers',
    estimatedWeeks: 6,
    totalHours: 24,
    level: 'Professional',
    councilLead: {
      name: 'Mr. Roshan Khumukcham',
      title: 'Co-Founder & Corporate Talent Strategist',
      affiliation: 'EduPlus Council / Kolkata Hub',
      portraitFilename: 'council-roshan-khumukcham-v2.webp',
    },
    certificationTitle: 'Certified Career Placement & Employability Fellow',
    prerequisites: ['Resume draft or portfolio of academic/professional projects'],
    learningOutcomes: [
      'Engineer an ATS-friendly resume with quantified impact metrics (X-Y-Z formula)',
      'Aces technical and HR behavioral interviews using the STAR framework',
      'Optimize LinkedIn profile to rank in top search results for target recruiters',
      'Navigate salary and benefits negotiation with composure and industry benchmark data',
    ],
    modules: [
      {
        id: 'cl-mod-1',
        trackId: 'career-launchpad',
        order: 1,
        title: 'Modern Resume Engineering: The X-Y-Z Metric Method',
        description: 'Transform passive job descriptions into quantified accomplishments that pass ATS parsers and impress hiring managers.',
        estimatedHours: 8,
        lessons: [
          {
            id: 'cl-les-101',
            moduleId: 'cl-mod-1',
            title: 'The Google X-Y-Z Formula for Bullet Points',
            durationMinutes: 30,
            type: 'reading',
            summary: 'Accomplished [X], as measured by [Y], by doing [Z]. Learn how to quantify engineering and business contributions.',
            contentMarkdown: `### Turning Duties into Quantified Impact

Most resumes fail because they list passive tasks: *"Responsible for website updates."* Hiring managers look for agency, metrics, and outcomes:

- **Weak**: *"Helped build a React web dashboard."*
- **Strong**: *"Engineered a modular React 19 administrative portal, decreasing page latency by 45% as measured by Lighthouse, through code splitting and tree-shaking optimization."*

#### Key Structural Rules:
1. **One-page limit** for candidates with under 5 years of experience.
2. **Straight-line typography**: Use clean sans-serif fonts (Inter, Arial) with zero complex multi-column tables that break ATS parsers.
3. **Reverse chronological ordering** with verifiable dates and company names.`,
            keyTakeaways: [
              'Every bullet point should show an action verb, a quantifiable measurement, and the technical mechanism.',
              'Avoid graphical bars or progress stars for skill levels; list technologies grouped logically.',
              'Match keyword frequency with the exact job description requirements.',
            ],
            practicalExercise: 'Rewrite three bullet points on your current resume using the X-Y-Z formula.',
          },
        ],
        quiz: {
          id: 'cl-quiz-1',
          moduleId: 'cl-mod-1',
          title: 'Module 1 Knowledge Check: Resume Engineering',
          description: 'Test your understanding of ATS formatting and impact quantification.',
          passingPercentage: 70,
          questions: [
            {
              id: 'cl-q1',
              prompt: 'Which bullet point demonstrates the proper Google X-Y-Z impact formula?',
              options: [
                'Handled daily administrative and technical duties in the department',
                'Decreased API response latency by 35% across 10,000 daily requests by implementing Redis caching pipelines',
                'Knowledge of Python, JavaScript, and database systems',
                'Worked hard as a team player on various group projects',
              ],
              correctIndex: 1,
              explanation: 'Option 2 clearly states what was accomplished (35% latency drop), the scale (10,000 requests), and the action taken (Redis caching).',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'innovation-studio-educator',
    code: 'CRS-IS-06',
    category: 'stem_pedagogy',
    title: 'Innovation Studio & Educator Academy',
    tagline: 'Empowering Teachers & Building School Innovation Hubs',
    description:
      'Transforming schools into centers of invention through STEM and robotics labs, coupled with advanced pedagogical coaching for educators integrating AI and modern digital learning tools.',
    targetAudience: 'School Principals, STEM Teachers, Pedagogy Coaches, and Education Entrepreneurs',
    estimatedWeeks: 6,
    totalHours: 24,
    level: 'Professional',
    councilLead: {
      name: 'Dr. Tomba Singh Thokchom',
      title: 'Associate Professor & Pedagogy Specialist',
      affiliation: 'Faculty of Education, KSV, Gujarat',
      portraitFilename: 'council-tomba-singh-thokchom-v2.webp',
    },
    certificationTitle: 'Master Educator & Educational Innovation Practitioner',
    prerequisites: ['Teaching or educational leadership experience'],
    learningOutcomes: [
      'Design and deploy student-centered STEM and robotics makerspaces in schools',
      'Integrate AI-assisted tutoring and adaptive formative assessments into lesson planning',
      'Foster entrepreneurial prototyping and problem-solving cohorts among students',
    ],
    modules: [
      {
        id: 'is-mod-1',
        trackId: 'innovation-studio-educator',
        order: 1,
        title: 'Modern Pedagogy & Technology-Integrated Classrooms',
        description: 'Moving from passive chalk-and-talk to active, inquiry-based and project-driven learning.',
        estimatedHours: 8,
        lessons: [
          {
            id: 'is-les-101',
            moduleId: 'is-mod-1',
            title: 'Flipped Classrooms & Inquiry-Driven Learning',
            durationMinutes: 35,
            type: 'video',
            summary: 'How to shift lecture delivery to self-paced digital modules so classroom time is reserved for collaborative problem-solving.',
            videoEmbedId: 'V-_O7nl0Ii0',
            // videoUrl: undefined, // TODO: replace with hosted lesson video
            contentMarkdown: `### Transforming Classroom Energy

When a teacher lectures uninterrupted for 45 minutes, attention degrades within the first 12 minutes. In an inquiry-driven flipped model:

1. **At Home / Self-Paced**: Students review short 10-minute conceptual videos and diagnostic reading.
2. **In the Classroom**: Students work in small pods to solve real scenario challenges, debate ethical edge-cases, or assemble prototypes.
3. **The Teacher as Facilitator**: Rather than an unapproachable lecturer on a stage, the educator moves between groups diagnosing individual conceptual roadblocks.`,
            keyTakeaways: [
              'Active recall through collaborative problem solving achieves double the long-term retention of passive listening.',
              'Formative quick-check quizzes give teachers immediate insight into what needs review.',
              'Classroom architecture should allow flexible reconfiguration of desks into collaborative clusters.',
            ],
            practicalExercise: 'Design a 45-minute flipped lesson plan for a difficult topic in your subject area.',
          },
        ],
        quiz: {
          id: 'is-quiz-1',
          moduleId: 'is-mod-1',
          title: 'Module 1 Knowledge Check: Modern Pedagogy',
          description: 'Evaluate your grasp of inquiry-based learning and classroom technology orchestration.',
          passingPercentage: 70,
          questions: [
            {
              id: 'is-q1',
              prompt: 'What is the primary role of an educator in a modern flipped classroom model?',
              options: [
                'To read the textbook verbatim from front to back',
                'To act as an active facilitator diagnosing blockers and guiding collaborative problem-solving',
                'To completely remove themselves from the room',
                'To forbid students from asking questions',
              ],
              correctIndex: 1,
              explanation: 'The teacher evolves from a static lecturer to a high-impact diagnostic coach and mentor.',
            },
          ],
        },
      },
    ],
  },

  {
    id: 'fp-mock-01',
    code: 'CRS-FP-01-A',
    category: 'career_exploration',
    title: 'Advanced DMIT Analytics',
    tagline: 'Deep Dive into Psychometric Modeling',
    description: 'Learn how to interpret complex psychometric data and apply it to organizational psychology.',
    targetAudience: 'HR Professionals, Psychology Students',
    estimatedWeeks: 4,
    totalHours: 15,
    level: 'Advanced',
    councilLead: {
      name: 'Shri Khumukcham Roshaan Singh',
      title: 'Executive Career Coach & Corporate Mentor',
      affiliation: 'EduPlus Council / Kolkata Hub',
      portraitFilename: 'council-khumukcham-roshaan-singh-v2.webp',
    },
    certificationTitle: 'Advanced DMIT Analyst',
    prerequisites: ['FuturePath Navigator completion'],
    learningOutcomes: ['Interpret multiple intelligences data', 'Advise organizations on talent placement'],
    modules: [
      {
        id: "fp-mock-01-mod-1",
        title: "Interpreting Brain Dominance Patterns",
        trackId: "fp-mock-01",
        order: 1,
        description: "Analyze prefrontal vs occipital cognitive preferences.",
        estimatedHours: 5,
        lessons: [
          {
            id: "fp-mock-01-les-1",
            moduleId: "fp-mock-01-mod-1",
            title: "Left vs Right Brain Paradigm Shifts",
            type: "video",
            durationMinutes: 45,
            summary: "Deconstructing the neuroscience behind logical and creative dominance.",
            contentMarkdown: "### Understanding Hemispheric Dominance\n\nThe traditional left/right brain model is oversimplified, but understanding hemispheric specialization helps decode why some students struggle with abstract algebra while excelling in spatial geometry.",
            keyTakeaways: ["Hemispheric specialization", "Spatial vs Verbal intelligence"]
          }
        ]
      }
    ]
  },
  {
    id: 'fp-mock-02',
    code: 'CRS-FP-01-B',
    category: 'career_exploration',
    title: 'Behavioral Economics for Careers',
    tagline: 'Understanding irrational choices in stream selection',
    description: 'A study on how cognitive biases affect educational and career choices in high school students.',
    targetAudience: 'High School Counselors, Parents',
    estimatedWeeks: 3,
    totalHours: 12,
    level: 'Intermediate',
    councilLead: {
      name: 'Shri Khumukcham Roshaan Singh',
      title: 'Executive Career Coach & Corporate Mentor',
      affiliation: 'EduPlus Council / Kolkata Hub',
      portraitFilename: 'council-khumukcham-roshaan-singh-v2.webp',
    },
    certificationTitle: 'Behavioral Career Strategist',
    prerequisites: [],
    learningOutcomes: ['Identify 5 common cognitive biases in students', 'Implement nudges for better choices'],
    modules: [
      {
        id: "fp-mock-02-mod-1",
        title: "Cognitive Biases in Teenagers",
        trackId: "fp-mock-02",
        order: 1,
        description: "How peer pressure and authority bias ruin career trajectories.",
        estimatedHours: 4,
        lessons: [
          {
            id: "fp-mock-02-les-1",
            moduleId: "fp-mock-02-mod-1",
            title: "The Halo Effect of 'Safe' Careers",
            type: "reading",
            durationMinutes: 30,
            summary: "Why parents push students toward conventional streams.",
            contentMarkdown: "### The Illusion of Safety\n\nEngineering and Medicine are often chosen not for aptitude, but for the perceived social safety net they provide.",
            keyTakeaways: ["Halo effect", "Sunk cost fallacy in education"]
          }
        ]
      }
    ]
  },
  {
    id: 'ls-mock-01',
    code: 'CRS-LS-02-A',
    category: 'human_capabilities',
    title: 'Conflict Resolution Strategies',
    tagline: 'Navigating professional and personal disputes',
    description: 'Frameworks for de-escalating tension, empathetic listening, and finding win-win scenarios in collaborative environments.',
    targetAudience: 'Early-Career Professionals, Managers',
    estimatedWeeks: 4,
    totalHours: 16,
    level: 'Intermediate',
    councilLead: {
      name: 'Smt. Nutan Nongthongbam',
      title: 'Life Skills Specialist & Public Health Educator',
      affiliation: 'EduPlus Council / Imphal Hub',
      portraitFilename: 'council-nutan-nongthongbam-v2.webp',
    },
    certificationTitle: 'Certified Conflict Resolution Practitioner',
    prerequisites: ['LifeSkills Lab completion'],
    learningOutcomes: ['Master the 4-step de-escalation technique', 'Lead difficult conversations'],
    modules: [
      {
        id: "ls-mock-01-mod-1",
        title: "De-Escalation Tactics",
        trackId: "ls-mock-01",
        order: 1,
        description: "How to bring emotional temperature down.",
        estimatedHours: 5,
        lessons: [
          {
            id: "ls-mock-01-les-1",
            moduleId: "ls-mock-01-mod-1",
            title: "Active Listening in High-Stress Situations",
            type: "video",
            durationMinutes: 35,
            summary: "Mirroring, labeling, and tactical empathy.",
            contentMarkdown: "### Tactical Empathy\n\nNever tell an angry person to calm down. Instead, label their emotion: 'It seems like you are incredibly frustrated by this timeline.'",
            keyTakeaways: ["Mirroring", "Labeling emotions"]
          }
        ]
      }
    ]
  },
  {
    id: 'ls-mock-02',
    code: 'CRS-LS-02-B',
    category: 'human_capabilities',
    title: 'Advanced Financial Modeling',
    tagline: 'Beyond the 50/30/20 Rule',
    description: 'Deep dive into DCF valuation, options basics, and tax optimization for personal finance.',
    targetAudience: 'College Graduates',
    estimatedWeeks: 6,
    totalHours: 24,
    level: 'Advanced',
    councilLead: {
      name: 'Smt. Nutan Nongthongbam',
      title: 'Life Skills Specialist & Public Health Educator',
      affiliation: 'EduPlus Council / Imphal Hub',
      portraitFilename: 'council-nutan-nongthongbam-v2.webp',
    },
    certificationTitle: 'Advanced Personal Finance Strategist',
    prerequisites: ['Basic Financial Literacy'],
    learningOutcomes: ['Build a personal DCF model', 'Optimize regional tax brackets'],
    modules: [
      {
        id: "ls-mock-02-mod-1",
        title: "Discounted Cash Flows",
        trackId: "ls-mock-02",
        order: 1,
        description: "Valuing future income in present terms.",
        estimatedHours: 8,
        lessons: [
          {
            id: "ls-mock-02-les-1",
            moduleId: "ls-mock-02-mod-1",
            title: "Time Value of Money Deep Dive",
            type: "reading",
            durationMinutes: 40,
            summary: "Calculating NPV for personal investments.",
            contentMarkdown: "### Net Present Value (NPV)\n\nA dollar today is worth more than a dollar tomorrow. We use the discount rate to figure out exactly how much more.",
            keyTakeaways: ["Discount rate", "Inflation adjustment"]
          }
        ]
      }
    ]
  },
  {
    id: 'ec-mock-01',
    code: 'CRS-EC-03-A',
    category: 'industry_mentorship',
    title: 'Semiconductor Fabrication Basics',
    tagline: 'Inside the cleanroom: How chips are made',
    description: 'An overview of photolithography, etching, and doping processes in modern semiconductor foundries.',
    targetAudience: 'Engineering Students',
    estimatedWeeks: 5,
    totalHours: 20,
    level: 'Foundational',
    councilLead: {
      name: 'Dr. Soram Bobby Singh',
      title: 'Principal Scientist, Green Hydrogen & Energy Materials',
      affiliation: 'EduPlus Council / South Korea Lab',
      portraitFilename: 'council-soram-bobby-singh-v2.webp',
    },
    certificationTitle: 'Semiconductor Basics Certificate',
    prerequisites: ['High School Physics'],
    learningOutcomes: ['Understand the 5 steps of wafer fab', 'Identify key industry players'],
    modules: [
      {
        id: "ec-mock-01-mod-1",
        title: "Cleanroom Operations",
        trackId: "ec-mock-01",
        order: 1,
        description: "The pristine environment required for nano-scale manufacturing.",
        estimatedHours: 6,
        lessons: [
          {
            id: "ec-mock-01-les-1",
            moduleId: "ec-mock-01-mod-1",
            title: "Introduction to Photolithography",
            type: "video",
            durationMinutes: 50,
            summary: "Using extreme ultraviolet light to print circuits on silicon.",
            contentMarkdown: "### Printing the Impossible\n\nPhotolithography is analogous to traditional film photography, but operating at the atomic scale using EUV lasers.",
            keyTakeaways: ["EUV lithography", "Photoresist layers"]
          }
        ]
      }
    ]
  },
  {
    id: 'ec-mock-02',
    code: 'CRS-EC-03-B',
    category: 'industry_mentorship',
    title: 'Battery Chemistries of the Future',
    tagline: 'Solid-state and beyond',
    description: 'Explore the transition from Lithium-ion to Solid-state, Sodium-ion, and other advanced battery technologies for EVs.',
    targetAudience: 'Material Science Students',
    estimatedWeeks: 4,
    totalHours: 16,
    level: 'Intermediate',
    councilLead: {
      name: 'Dr. Soram Bobby Singh',
      title: 'Principal Scientist, Green Hydrogen & Energy Materials',
      affiliation: 'EduPlus Council / South Korea Lab',
      portraitFilename: 'council-soram-bobby-singh-v2.webp',
    },
    certificationTitle: 'Advanced Battery Tech Analyst',
    prerequisites: ['Basic Chemistry'],
    learningOutcomes: ['Compare energy densities of 4 battery types', 'Analyze EV market constraints'],
    modules: [
      {
        id: "ec-mock-02-mod-1",
        title: "Solid-State Advancements",
        trackId: "ec-mock-02",
        order: 1,
        description: "Replacing liquid electrolytes with solid polymers.",
        estimatedHours: 5,
        lessons: [
          {
            id: "ec-mock-02-les-1",
            moduleId: "ec-mock-02-mod-1",
            title: "Dendrite Prevention in Solid State",
            type: "reading",
            durationMinutes: 30,
            summary: "How solid electrolytes prevent dangerous dendrite formation.",
            contentMarkdown: "### The Dendrite Problem\n\nIn liquid Li-ion batteries, microscopic lithium spikes called dendrites can pierce the separator, causing catastrophic short circuits.",
            keyTakeaways: ["Dendrite short circuits", "Ceramic separators"]
          }
        ]
      }
    ]
  },
  {
    id: 'ga-mock-01',
    code: 'CRS-GA-04-A',
    category: 'global_admissions',
    title: 'Ivy League Interview Prep',
    tagline: 'Mastering the Alumni Interview',
    description: 'Strategies for presenting authentic intellectual curiosity during high-stakes university admissions interviews.',
    targetAudience: 'High School Seniors',
    estimatedWeeks: 2,
    totalHours: 8,
    level: 'Advanced',
    councilLead: {
      name: 'Dr. Ngangbam Shantikumar Meetei',
      title: 'Professor of English & International Programs',
      affiliation: 'Hungkuo Delin University of Technology, Taiwan',
      portraitFilename: 'council-ngangbam-shantikumar-meetei-v2.webp',
    },
    certificationTitle: 'Interview Strategy Master',
    prerequisites: ['Global Admissions Studio'],
    learningOutcomes: ['Conduct 3 mock interviews', 'Formulate compelling closing questions'],
    modules: [
      {
        id: "ga-mock-01-mod-1",
        title: "The Alumni Interview",
        trackId: "ga-mock-01",
        order: 1,
        description: "How to hold a conversation, not an interrogation.",
        estimatedHours: 4,
        lessons: [
          {
            id: "ga-mock-01-les-1",
            moduleId: "ga-mock-01-mod-1",
            title: "Mastering the Alumni Interview Framework",
            type: "video",
            durationMinutes: 45,
            summary: "Structuring your responses to sound natural but highly impressive.",
            contentMarkdown: "### Conversational Agility\n\nAlumni interviewers are looking for one thing: 'Would I want this 18-year-old as my roommate or lab partner?'",
            keyTakeaways: ["Intellectual vitality", "Authenticity over rehearsed lines"]
          }
        ]
      }
    ]
  },
  {
    id: 'ga-mock-02',
    code: 'CRS-GA-04-B',
    category: 'global_admissions',
    title: 'European Universities Blueprint',
    tagline: 'Low-cost, high-impact education in the EU',
    description: 'A complete guide to navigating admissions in Germany, France, and the Nordic countries, focusing on English-taught programs.',
    targetAudience: 'Study-Abroad Seekers',
    estimatedWeeks: 4,
    totalHours: 16,
    level: 'Intermediate',
    councilLead: {
      name: 'Dr. Ngangbam Shantikumar Meetei',
      title: 'Professor of English & International Programs',
      affiliation: 'Hungkuo Delin University of Technology, Taiwan',
      portraitFilename: 'council-ngangbam-shantikumar-meetei-v2.webp',
    },
    certificationTitle: 'EU Admissions Strategist',
    prerequisites: [],
    learningOutcomes: ['Identify 10 tuition-free English programs', 'Navigate the Blocked Account visa process'],
    modules: [
      {
        id: "ga-mock-02-mod-1",
        title: "Navigating German Admissions",
        trackId: "ga-mock-02",
        order: 1,
        description: "Understanding Uni-Assist and public university requirements.",
        estimatedHours: 5,
        lessons: [
          {
            id: "ga-mock-02-les-1",
            moduleId: "ga-mock-02-mod-1",
            title: "The Blocked Account & Visa Process",
            type: "reading",
            durationMinutes: 25,
            summary: "Financial prerequisites for a German student visa.",
            contentMarkdown: "### Sperrkonto (Blocked Account)\n\nTo study in Germany, you must prove you can support yourself by locking approximately 11,208 Euros in a blocked account.",
            keyTakeaways: ["Sperrkonto requirements", "Uni-Assist timelines"]
          }
        ]
      }
    ]
  },
  {
    id: 'cl-mock-01',
    code: 'CRS-CL-05-A',
    category: 'placement_careers',
    title: 'Technical Interview Data Structures',
    tagline: 'Cracking the FAANG algorithms',
    description: 'A rigorous bootcamp on Arrays, Trees, Graphs, and Dynamic Programming for software engineering placements.',
    targetAudience: 'Computer Science Graduates',
    estimatedWeeks: 8,
    totalHours: 40,
    level: 'Advanced',
    councilLead: {
      name: 'Mr. Roshan Khumukcham',
      title: 'Co-Founder & Corporate Talent Strategist',
      affiliation: 'EduPlus Council / Kolkata Hub',
      portraitFilename: 'council-roshan-khumukcham-v2.webp',
    },
    certificationTitle: 'DSA Interview Specialist',
    prerequisites: ['Basic Programming'],
    learningOutcomes: ['Solve 50+ medium LeetCode problems', 'Master Big-O time complexity analysis'],
    modules: [
      {
        id: "cl-mock-01-mod-1",
        title: "Graph Algorithms",
        trackId: "cl-mock-01",
        order: 1,
        description: "Mastering BFS, DFS, and topological sort.",
        estimatedHours: 10,
        lessons: [
          {
            id: "cl-mock-01-les-1",
            moduleId: "cl-mock-01-mod-1",
            title: "Breadth-First Search for Shortest Path",
            type: "video",
            durationMinutes: 60,
            summary: "Implementing BFS using queues.",
            contentMarkdown: "### The Queue Data Structure\n\nBFS relies on a First-In-First-Out (FIFO) queue to explore the graph level by level.",
            keyTakeaways: ["O(V+E) time complexity", "Queue implementation"]
          }
        ]
      }
    ]
  },
  {
    id: 'cl-mock-02',
    code: 'CRS-CL-05-B',
    category: 'placement_careers',
    title: 'Consulting Case Interviews',
    tagline: 'Frameworks for McKinsey, BCG, Bain',
    description: 'Learn how to structure ambiguous business problems, estimate market sizes, and present recommendations to partners.',
    targetAudience: 'MBA Aspirants, Business Graduates',
    estimatedWeeks: 5,
    totalHours: 20,
    level: 'Advanced',
    councilLead: {
      name: 'Mr. Roshan Khumukcham',
      title: 'Co-Founder & Corporate Talent Strategist',
      affiliation: 'EduPlus Council / Kolkata Hub',
      portraitFilename: 'council-roshan-khumukcham-v2.webp',
    },
    certificationTitle: 'Case Interview Master',
    prerequisites: ['Basic Business Acumen'],
    learningOutcomes: ['Master 4 core case frameworks', 'Perform rapid mental math estimations'],
    modules: [
      {
        id: "cl-mock-02-mod-1",
        title: "Market Sizing Frameworks",
        trackId: "cl-mock-02",
        order: 1,
        description: "Fermi problems and guesstimates.",
        estimatedHours: 4,
        lessons: [
          {
            id: "cl-mock-02-les-1",
            moduleId: "cl-mock-02-mod-1",
            title: "Top-Down vs Bottom-Up Estimation",
            type: "reading",
            durationMinutes: 30,
            summary: "How to estimate the number of pianos in Chicago.",
            contentMarkdown: "### Structured Logic over Exact Math\n\nInterviewers don't care about the exact number. They care about your assumptions and structural breakdown.",
            keyTakeaways: ["MECE principle", "Sanity checking math"]
          }
        ]
      }
    ]
  },
  {
    id: 'is-mock-01',
    code: 'CRS-IS-06-A',
    category: 'stem_pedagogy',
    title: 'AI in the Classroom',
    tagline: 'Automating administrative drag',
    description: 'How educators can use LLMs to generate lesson plans, grade formative assessments, and create adaptive worksheets.',
    targetAudience: 'K-12 Teachers',
    estimatedWeeks: 3,
    totalHours: 12,
    level: 'Intermediate',
    councilLead: {
      name: 'Dr. Tomba Singh Thokchom',
      title: 'Associate Professor & Pedagogy Specialist',
      affiliation: 'Faculty of Education, KSV, Gujarat',
      portraitFilename: 'council-tomba-singh-thokchom-v2.webp',
    },
    certificationTitle: 'AI-Empowered Educator',
    prerequisites: [],
    learningOutcomes: ['Prompt engineer a 5-day lesson plan', 'Automate multiple-choice grading'],
    modules: [
      {
        id: "is-mock-01-mod-1",
        title: "Prompt Engineering for Teachers",
        trackId: "is-mock-01",
        order: 1,
        description: "Getting exactly what you want from ChatGPT.",
        estimatedHours: 4,
        lessons: [
          {
            id: "is-mock-01-les-1",
            moduleId: "is-mock-01-mod-1",
            title: "Generating Differentiated Worksheets",
            type: "video",
            durationMinutes: 35,
            summary: "Using AI to create 3 varying difficulty levels of the same assignment.",
            contentMarkdown: "### Differentiated Instruction\n\nYou can prompt an LLM to take a core text and rewrite it at a 5th-grade, 8th-grade, and 12th-grade reading level simultaneously.",
            keyTakeaways: ["Persona prompting", "Output formatting"]
          }
        ]
      }
    ]
  },
  {
    id: 'is-mock-02',
    code: 'CRS-IS-06-B',
    category: 'stem_pedagogy',
    title: 'Setting up a Robotics Makerspace',
    tagline: 'From budget to launch',
    description: 'A practical guide for school principals on procuring 3D printers, Arduinos, and designing curriculum for a high-school makerspace.',
    targetAudience: 'School Administrators',
    estimatedWeeks: 4,
    totalHours: 16,
    level: 'Advanced',
    councilLead: {
      name: 'Dr. Tomba Singh Thokchom',
      title: 'Associate Professor & Pedagogy Specialist',
      affiliation: 'Faculty of Education, KSV, Gujarat',
      portraitFilename: 'council-tomba-singh-thokchom-v2.webp',
    },
    certificationTitle: 'Makerspace Director',
    prerequisites: ['Innovation Studio & Educator Academy'],
    learningOutcomes: ['Draft a $5000 lab procurement budget', 'Design safety protocols for 3D printing'],
    modules: [
      {
        id: "is-mock-02-mod-1",
        title: "Hardware Procurement",
        trackId: "is-mock-02",
        order: 1,
        description: "Maximizing ROI on school budgets.",
        estimatedHours: 5,
        lessons: [
          {
            id: "is-mock-02-les-1",
            moduleId: "is-mock-02-mod-1",
            title: "Choosing the Right 3D Printers for Schools",
            type: "reading",
            durationMinutes: 25,
            summary: "Balancing reliability, safety, and filament cost.",
            contentMarkdown: "### FDM vs Resin for Classrooms\n\nResin printers offer high detail but involve toxic chemicals and messy post-processing. Stick to enclosed FDM printers using PLA plastic for high schools.",
            keyTakeaways: ["Enclosed FDM printers", "PLA filament safety"]
          }
        ]
      }
    ]
  }
]);

export const CATEGORY_METADATA: Record<
  string,
  { label: string; badge: string; colorClass: string }
> = {
  career_exploration: {
    label: 'Career Exploration',
    badge: 'Psychometrics',
    colorClass: 'border-primary/40 text-primary',
  },
  human_capabilities: {
    label: 'Human Capabilities',
    badge: 'LifeSkills',
    colorClass: 'border-primary/40 text-primary',
  },
  industry_mentorship: {
    label: 'Industry Mentorship',
    badge: 'Expert Connect',
    colorClass: 'border-primary/40 text-primary',
  },
  global_admissions: {
    label: 'Global Admissions',
    badge: 'Higher Studies',
    colorClass: 'border-primary/40 text-primary',
  },
  placement_careers: {
    label: 'Placement & Careers',
    badge: 'Employment',
    colorClass: 'border-primary/40 text-primary',
  },
  stem_pedagogy: {
    label: 'STEM & Educator Academy',
    badge: 'Innovation',
    colorClass: 'border-primary/40 text-primary',
  },
};
