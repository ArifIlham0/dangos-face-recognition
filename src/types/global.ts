type Theme = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

type Locale = {
  tag: string
  name: string
  icon: React.ComponentType<any>
}

type GlobalQueryParams = {
  page?: number;
  page_size?: number;
}

export type { Theme, Translations, Locale, GlobalQueryParams };