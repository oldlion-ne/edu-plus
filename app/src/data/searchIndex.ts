export type SearchCategory = 'Programs' | 'Platform' | 'Community' | 'General';

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  path: string;
  category: SearchCategory;
}

export const searchIndex: SearchItem[] = [
  { id: '1', title: 'Learning Portal (LMS)', description: 'Interactive curriculum modules, assessments, and council certificates.', path: '/lms', category: 'Platform' },
  { id: '2', title: 'Programs Overview', description: 'Explore structured learning tracks and certifications.', path: '/programs', category: 'Platform' },
  { id: '3', title: 'Knowledge Hub', description: 'Articles, guides, and curated research resources.', path: '/knowledge-hub', category: 'Platform' },
  { id: '4', title: 'Guidance & Counseling', description: 'Expert advice and personalised mentoring pathways.', path: '/guidance', category: 'Platform' },
  { id: '5', title: 'Events', description: 'Workshops, webinars, and in-person gatherings.', path: '/events', category: 'Community' },
  { id: '6', title: 'Council', description: 'Meet the leaders and advisory board shaping EduPlus.', path: '/council', category: 'Community' },
  { id: '7', title: 'News', description: 'Latest announcements, press releases, and updates.', path: '/news', category: 'Community' },
  { id: '8', title: 'About Us', description: 'Learn about the mission and vision behind EduPlus Skills.', path: '/about', category: 'General' },
  { id: '9', title: 'Pricing & Tracks', description: 'View our subscription plans and program tracks.', path: '/pricing', category: 'General' },
  { id: '10', title: 'Contact Support', description: 'Get in touch with our team for assistance or inquiries.', path: '/contact', category: 'General' },
  { id: '11', title: 'MBBS Abroad (Vietnam)', description: 'Affordable English-medium medical programs at Hong Bang International University.', path: '/programs?tab=01', category: 'Programs' },
  { id: '12', title: 'Overseas Placement & Dubai Jobs', description: 'Career mapping and international placements in Dubai.', path: '/programs?tab=02', category: 'Programs' },
  { id: '13', title: 'Summer Camps & Skills', description: 'Regional camps covering IoT, Robotics, Plastic Engineering.', path: '/programs?tab=03', category: 'Programs' },
  { id: '14', title: 'Vision Talk & Mentorship', description: '4-month mentorship program bridging classroom to career.', path: '/programs?tab=04', category: 'Programs' },
];
