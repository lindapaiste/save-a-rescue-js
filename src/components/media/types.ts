export interface Size {
  width: number;
  height: number;
}

export interface ImageFile {
  width: number;
  height: number;
  src: string;
  alt?: string;
}

export interface SrcSet extends ImageFile {
  files?: ImageFile[];
  alt?: string;
}
