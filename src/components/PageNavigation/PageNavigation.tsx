"use client";

import { defaultPages } from "@/constants/constant";
import { IPageTab } from "@/types/common";
import { idGenerator } from "@/utils/idGenerator";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NavList } from "../NavList/NavList";
import styles from "./PageNavigation.module.css";

export const PageNavigation = () => {
  const params = useParams();
  const pageSlug = params.slug as string;
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(0);
  const [openSettingsIndex, setOpenSettingsIndex] = useState<number | null>(
    null
  );
  const [pageTabs, setPageTabs] = useState<IPageTab[]>(defaultPages);

  useEffect(() => {
    try {
      const pagesStore = localStorage.getItem("pages");
      if (pagesStore) {
        const parsedPages = JSON.parse(pagesStore);
        setPageTabs(parsedPages);
      }
    } catch (err) {
      console.error("Localstorage access failed:", err);
      setPageTabs(defaultPages);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pages", JSON.stringify(pageTabs));

    if (pageSlug) {
      const slugLabel = decodeURIComponent(pageSlug);
      const indexActivePage = pageTabs.findIndex(
        (tab) => tab.label.toLowerCase() === slugLabel.toLowerCase()
      );
      setActiveItemIndex(indexActivePage);
    }
  }, [pageTabs, pageSlug]);

  const addPageHandler = (index: number) => {
    // remove the settings handler when "Add page" button or "+" button is clicked
    if (openSettingsIndex) setOpenSettingsIndex(null);

    // for simplicity, using prompt
    const pageName = prompt("Enter the name of page");

    if (pageName) {
      setPageTabs((prevArray: IPageTab[]) => {
        const cloneArray = [...prevArray];
        cloneArray.splice(index + 1, 0, {
          label: pageName,
          id: idGenerator(),
          href: `/${pageName}`,
        });
        return cloneArray;
      });
    }
  };

  return (
    <nav className={styles.navBar}>
      <NavList
        pageTabs={pageTabs}
        setPageTabs={setPageTabs}
        activeItemIndex={activeItemIndex}
        setActiveItemIndex={setActiveItemIndex}
        openSettingsIndex={openSettingsIndex}
        setOpenSettingsIndex={setOpenSettingsIndex}
        addPageHandler={addPageHandler}
      />
      <button
        onClick={() => addPageHandler(pageTabs.length - 1)}
        className={styles.addPageBtn}
      >
        Add page
      </button>
    </nav>
  );
};
