export interface EditorialIllustration {
  readonly src: string;
  readonly alt: string;
  readonly aspectClass: string;
  readonly objectPositionClass: string;
  readonly sizes: string;
}

const heroAspect = 'aspect-[4/3] max-md:aspect-[3/2] max-md:max-h-[360px]';
const landscapeAspect = 'aspect-[3/2]';
const heroSizes = '(min-width: 1024px) 45vw, 100vw';
const landscapeSizes =
  '(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw';

const normalizeBaseUrl = (baseUrl: string) => {
  const normalizedBase = baseUrl || '/';
  return normalizedBase.endsWith('/') ? normalizedBase : `${normalizedBase}/`;
};

const editorialAssetUrl = (filename: string) =>
  `${normalizeBaseUrl(import.meta.env.BASE_URL)}images/editorial/${filename}`;

const hero = (filename: string, alt: string): EditorialIllustration =>
  Object.freeze({
    src: editorialAssetUrl(filename),
    alt,
    aspectClass: heroAspect,
    objectPositionClass: 'object-center',
    sizes: heroSizes,
  });

const landscape = (filename: string, alt: string): EditorialIllustration =>
  Object.freeze({
    src: editorialAssetUrl(filename),
    alt,
    aspectClass: landscapeAspect,
    objectPositionClass: 'object-center',
    sizes: landscapeSizes,
  });

export const editorialIllustrations = Object.freeze({
  home: hero(
    'home-campus-walk-v2.webp',
    'East Asian learners approaching an amber-lit education pavilion',
  ),
  about: hero(
    'about-mentorship-table-v2.webp',
    'Founders and a learner sharing ideas at an equal-height mentorship table',
  ),
  programs: hero(
    'programs-focus-studio-v2.webp',
    'Learners mapping a curriculum pathway together in a focused studio',
  ),
  knowledge: hero(
    'knowledge-quiet-archive-v2.webp',
    'Learners reading and listening in a quiet modular learning archive',
  ),
  knowledgeEmpty: Object.freeze({
    src: editorialAssetUrl('knowledge-quiet-archive-v2.webp'),
    alt: 'A quiet archive suggesting broader resource discovery',
    aspectClass: 'aspect-square',
    objectPositionClass: 'object-center',
    sizes: '240px',
  }),
  council: hero(
    'council-roundtable-v2.webp',
    'East Asian experts exchanging ideas around an equal roundtable',
  ),
  guidance: hero(
    'guidance-pathfinding-v2.webp',
    'A mentor and learner considering branches on a shared pathway map',
  ),
  news: hero(
    'news-field-notes-v2.webp',
    'A reporter documenting a quiet education interview',
  ),
  events: hero(
    'events-learning-beyond-walls-v2.webp',
    'Learners collaborating during an outdoor education experience',
  ),
  contact: hero(
    'contact-open-channel-v2.webp',
    'People sending and receiving a message through an open channel',
  ),
  login: hero(
    'login-threshold-v2.webp',
    'A staff member entering a calm amber-lit workspace',
  ),
  newsCommunity: landscape(
    'news-community-classroom-v2.webp',
    'A community learning center opening in Manipur',
  ),
  newsSpeech: landscape(
    'news-speech-intervention-v2.webp',
    'A speech therapist supporting a learner with an educator present',
  ),
  newsEnergy: landscape(
    'news-green-energy-v2.webp',
    'A researcher and student examining a green hydrogen demonstration',
  ),
  newsCoaching: landscape(
    'news-behavioral-coaching-v2.webp',
    'A mentor and learner practicing a professional interview',
  ),
} satisfies Record<string, EditorialIllustration>);

export const councilPortraits = Object.freeze(
  [
    'bikash-oinam',
    'roshan-khumukcham',
    'ronen-akoijam',
    'soram-bobby-singh',
    'romen-ningthoujam',
    'khumukcham-roshaan-singh',
    'nutan-nongthongbam',
    'takhellambam-geetarani',
    'rojit-keisham',
    'ngangbam-shantikumar-meetei',
    'ronendrojit-akoijam',
    'purnimashi-moirangthem',
    'tomba-singh-thokchom',
    'usham-rojio',
  ].map((slug) => editorialAssetUrl(`council-${slug}-v2.webp`)),
);
