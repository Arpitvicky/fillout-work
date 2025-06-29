import { IPageTab } from "@/types/common";

export interface NavListProps {
  pageTabs: IPageTab[];
  setPageTabs: (items: IPageTab[]) => void;
  activeItemIndex: number | null;
  setActiveItemIndex: (index: number) => void;
  openSettingsIndex: number | null;
  setOpenSettingsIndex: React.Dispatch<React.SetStateAction<number | null>>;
  addPageHandler: (index: number) => void;
}
