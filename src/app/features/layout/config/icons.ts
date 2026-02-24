import {
  Activity,
  BarChart3,
  FileText,
  FolderKanban,
  Newspaper,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-angular';
import { NavIconKey } from '../models/navigation-config';

const iconMap: Record<NavIconKey, typeof Newspaper> = {
  newspaper: Newspaper,
  chart: BarChart3,
  users: Users,
  settings: Settings,
  folder: FolderKanban,
  shield: ShieldCheck,
  file: FileText,
  activity: Activity,
};

export function getIcon(iconKey: NavIconKey): typeof Newspaper {
  return iconMap[iconKey];
}
