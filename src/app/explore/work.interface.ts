import { WType, License, Language, Framework, Tool} from '../common/global';

export interface WorkModel {
  type: WType;
  title: string;
  subtitle: string;
  description: string;
  license: License[];
  languages: Language[];
  frameworks: Framework[];
  tools: Tool[];
  tags: string[];
  children: string[];
  dependency: string[];
}
