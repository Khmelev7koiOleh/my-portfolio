export type DesktopIconType = "folder" | "file" | "user" | "mail";

export interface DesktopItem {
  id: string;
  name: string;
  type: DesktopIconType;
  position: {
    x: number;
    y: number;
  };
}
