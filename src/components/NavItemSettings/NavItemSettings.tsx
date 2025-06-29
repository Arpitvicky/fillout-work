import { settingsConfig } from "@/constants/constant";
import Image from "next/image";
import styles from "./NavItemSettings.module.css";

export const NavItemSettings = ({ label }: { label: string }) => {
  return (
    <>
      <div className={styles.settingsWrapper}>
        <div className={styles.settingsHeader}>Settings</div>
        <ul>
          {settingsConfig.map((config) => (
            <li onClick={() => alert(config.id + " clicked")} key={config.id}>
              <Image
                className={styles.logo}
                src={config.imgUrl}
                alt={config.id + " logo"}
                width={16}
                height={16}
              />
              <span>{config.label}</span>
            </li>
          ))}
        </ul>
        <div className={styles.settingsFooter}>
          <button onClick={() => alert("Delete clicked on " + label)}>
            <Image
              className={styles.logo}
              src="/delete.svg"
              alt={"delete logo"}
              width={16}
              height={16}
            />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </>
  );
};
