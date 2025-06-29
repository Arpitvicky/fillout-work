import { idGenerator } from "@/utils/idGenerator";

export const defaultPages = [
  { label: "Info", id: idGenerator(), href: "/" },
  { label: "Details", id: idGenerator(), href: "/details" },
  { label: "Others", id: idGenerator(), href: "/others" },
  { label: "Ending", id: idGenerator(), href: "/ending" },
];

export const settingsConfig = [
    { label: "Set as first page", id: "setAsFirstPage", imgUrl: "/flag.svg" },
    { label: "Rename", id: "rename", imgUrl: "/pencil.svg" },
    { label: "Copy", id: "copy", imgUrl: "/copy.svg" },
    { label: "Duplicate", id: "duplicate", imgUrl: "/square.svg" },
  ];