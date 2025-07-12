export interface Domain {
  id: string
  name: string
  icon: string
}

export interface Level {
  id: string
  name: string
  description: string
  color: string
}

export type DomainId =
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'mobile'
  | 'devops'
  | 'data'
  | 'ml'
  | 'cybersecurity'
  | 'blockchain'
  | 'gamedev'

export const domains: Domain[] = [
  { id: 'frontend', name: 'Frontend Development', icon: '🎨' },
  { id: 'backend', name: 'Backend Development', icon: '⚙️' },
  { id: 'fullstack', name: 'Full Stack Development', icon: '🔧' },
  { id: 'mobile', name: 'Mobile Development', icon: '📱' },
  { id: 'devops', name: 'DevOps & Cloud', icon: '☁️' },
  { id: 'data', name: 'Data Science & Analytics', icon: '📊' },
  { id: 'ml', name: 'Machine Learning & AI', icon: '🤖' },
  { id: 'cybersecurity', name: 'Cybersecurity', icon: '🔒' },
  { id: 'blockchain', name: 'Blockchain', icon: '⛓️' },
  { id: 'gamedev', name: 'Game Development', icon: '🎮' }
]

export const topicsByDomain: Record<DomainId, string[]> = {
  frontend: ['HTML/CSS', 'JavaScript', 'React', 'Vue.js', 'Angular', 'TypeScript', 'Responsive Design', 'Web Performance'],
  backend: ['Node.js', 'Python', 'Java', 'C#', 'Go', 'APIs', 'Databases', 'Microservices'],
  fullstack: ['MEAN Stack', 'MERN Stack', 'Django', 'Laravel', 'Ruby on Rails', 'System Design', 'Architecture'],
  mobile: ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'Kotlin', 'Swift', 'Mobile UI/UX'],
  devops: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Infrastructure', 'Monitoring', 'Linux'],
  data: ['Python', 'R', 'SQL', 'Pandas', 'NumPy', 'Data Visualization', 'Statistics', 'ETL'],
  ml: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'TensorFlow', 'PyTorch', 'Algorithms'],
  cybersecurity: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Penetration Testing', 'OWASP', 'Risk Assessment'],
  blockchain: ['Ethereum', 'Smart Contracts', 'Solidity', 'Web3', 'DeFi', 'NFTs', 'Consensus Algorithms'],
  gamedev: ['Unity', 'Unreal Engine', 'C++', 'Game Design', '3D Graphics', 'Physics', 'Game Optimization']
}

export const levels: Level[] = [
  { id: 'beginner', name: 'Beginner', description: 'Entry level, basic concepts', color: 'bg-green-100 text-green-800' },
  { id: 'intermediate', name: 'Intermediate', description: 'Mid-level, practical experience', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'advanced', name: 'Advanced', description: 'Senior level, complex scenarios', color: 'bg-red-100 text-red-800' },
  { id: 'expert', name: 'Expert', description: 'Architect level, system design', color: 'bg-purple-100 text-purple-800' }
]
