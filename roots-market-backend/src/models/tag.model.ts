export class Tag {
  tagId?: number;
  artisanId: number;
  name: string;

  constructor(artisanId: number, name: string, tagId?: number) {
    this.tagId = tagId;
    this.artisanId = artisanId;
    this.name = name;
  }
}
