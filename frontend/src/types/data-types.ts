export interface Link {
  url: string;
  title?: string;
  tags?: string[];
}

export interface HighlightedTitle {
  highlighted: string;
  prepend?: string;
  append?: string;
}

export interface Error {
  name: string;
  message: string;
  errorDetails?: object;
  config?: object;
}

export interface ProjectData {
  title: string;
  year?: number;
  private: boolean;

  publicLink: Link;
  devLink?: Link;
  stageLink?: Link;

  repository: {
    platform: string;
    name: string;
    url: string;
  };

  database?: Link;
}
