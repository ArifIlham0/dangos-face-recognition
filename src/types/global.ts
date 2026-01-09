type Theme = {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

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

type GlobalResponse<T> = {
  status?: number | null;
  message?: string | null;
  data?: T | null;
  total_item?: number | null;
  page?: number | null;
  page_size?: number | null;
  total_page?: number | null;
}

type GlobalQueryParams = {
  page?: number | null;
  page_size?: number | null;
  query?: string | null;
}

export type { Theme, Translations, Locale, GlobalResponse, GlobalQueryParams };