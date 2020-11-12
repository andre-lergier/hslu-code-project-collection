export interface Link {
  url: string;
  tags?: [string];
}

export interface ProjectData {
  title: string;
  publicLink: Link;
  devLink?: Link;
  stageLink?: Link;
  year?: number;

}
