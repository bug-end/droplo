export interface NavigationItem {
  id: string;
  label: string;
  url?: string;
  children?: NavigationItem[];
}

export interface NavigationFormData {
  name: string;
  link: string;
}
