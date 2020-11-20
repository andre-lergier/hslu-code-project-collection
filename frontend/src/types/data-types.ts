export interface Link {
  url: string;
  title?: string;
  tags?: string[];
}

export interface HighlightedTitle {
  highlighted: string;
  append: string;
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
