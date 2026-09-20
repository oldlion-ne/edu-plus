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
              { title: 'EduPlus Aptitude Diagnostic Guide', type: 'document' },
              { title: 'Multiple Intelligences Self-Audit Worksheet', type: 'worksheet' },
            ],
          },
          {
            id: 'fp-les-102',
            moduleId: 'fp-mod-1',
            title: 'DMIT & Learning Modalities: Visual, Auditory, Kinesthetic',
            durationMinutes: 30,
            type: 'reading',
            summary: 'Understanding Dermatoglyphics Multiple Intelligence Testing and discovering your optimal sensory learning modality.',
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
            videoEmbedId: 'dQw4w9WgXcQ',
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
]);

export const CATEGORY_METADATA: Record<
  string,
  { label: string; badge: string; colorClass: string }
> = {
  all: { label: 'All Tracks', badge: '6 Tracks', colorClass: 'border-border' },
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
