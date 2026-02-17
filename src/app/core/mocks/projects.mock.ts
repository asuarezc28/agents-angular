export interface Project {
  id: string;
  name: string;
  companyId: string;
}

export const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'Piloto VoC 2026', companyId: '1' },
  { id: '2', name: 'Digital Transformation', companyId: '1' },
  { id: '3', name: 'AI Platform', companyId: '2' },
  { id: '4', name: 'Cloud Migration', companyId: '2' },
  { id: '5', name: 'Research Project', companyId: '3' },
];