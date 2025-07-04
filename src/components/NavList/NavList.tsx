import FileIcon from "@/icons/FileIcon";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { NavItemSettings } from "../NavItemSettings/NavItemSettings";
import styles from "./NavList.module.css";
import { NavListProps } from "./types";

export const NavList = ({
  pageTabs,
  setPageTabs,
  activeItemIndex,
  setActiveItemIndex,
  openSettingsIndex,
  setOpenSettingsIndex,
  addPageHandler,
}: NavListProps) => {
  const dragPageItem = useRef<number | null>(null);
  const dragOverPageItem = useRef<number | null>(null);
  const listItemContainerRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listItemContainerRefs.current) {
        const isClickInsideAny = listItemContainerRefs.current.some((ref) =>
          ref?.contains(event.target as Node)
        );
        if (!isClickInsideAny) {
          setOpenSettingsIndex(null);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDragStart = (index: number) => {
    dragPageItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverPageItem.current = index;
  };

  const handleDragEnd = () => {
    const fromPos = dragPageItem.current;
    const toPos = dragOverPageItem.current;
    // If dropped at same place return
    if (fromPos === null || toPos === null || fromPos === toPos) return;

    const newPageTabs = [...pageTabs];
    // pick the dragged Item
    const draggedItem = newPageTabs.splice(fromPos, 1)[0];
    // put in the new position
    newPageTabs.splice(toPos, 0, draggedItem);

    setPageTabs(newPageTabs);
    dragPageItem.current = null;
    dragOverPageItem.current = null;
  };

  const settingsClickHandler = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSettingsIndex((prev: number | null) =>
      prev === index ? null : index
    );
  };

  return (
    <ul className={styles.navContainer}>
      {pageTabs.map((pageTab, index) => {
        return (
          <li
            key={pageTab.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            className={styles.navListItem}
            ref={(listItem: any) =>
              (listItemContainerRefs.current[index] = listItem)
            }
          >
            <Link
              href={`${pageTab.href}`}
              onClick={() => {
                setActiveItemIndex(index);
                setOpenSettingsIndex(null);
              }}
              className={`${
                index === activeItemIndex ? styles.activeLink : ""
              }`}
            >
              <FileIcon />
              {pageTab.label}
              <div
                className={styles.settings}
                onClick={(e) => settingsClickHandler(e, index)}
                data-testid="settings-button"
              >
                <div></div>
                <div></div>
                <div></div>
              </div>
            </Link>
            {openSettingsIndex === index && (
              <NavItemSettings label={pageTab.label} />
            )}
            {index < pageTabs.length - 1 && (
              <div className={styles.plusButtonWrapper}>
                <button onClick={() => addPageHandler(index)}>+</button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};
