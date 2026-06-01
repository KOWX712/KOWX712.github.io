import type { ComponentType } from "react";
import { Antigravity, Codex, Cursor, HermesAgent, OpenClaw, OpenCode } from "@lobehub/icons";
import androidSvg from "devicon/icons/android/android-plain.svg";
import linuxSvg from "devicon/icons/linux/linux-original.svg";
import windowsSvg from "devicon/icons/windows11/windows11-original.svg";
import htmlSvg from "devicon/icons/html5/html5-original.svg";
import javascriptSvg from "devicon/icons/javascript/javascript-original.svg";
import cssSvg from "devicon/icons/css3/css3-original.svg";
import typescriptSvg from "devicon/icons/typescript/typescript-original.svg";
import kotlinSvg from "devicon/icons/kotlin/kotlin-original.svg";
import cppSvg from "devicon/icons/cplusplus/cplusplus-original.svg";
import type { LocalizedText } from "./i18n";

export type Skill = {
  name: string;
  iconPath?: string;
  Icon?: ComponentType<{ size: number }>;
};

export type SkillGroup = {
  id: string;
  title: LocalizedText;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "os",
    title: { en: "Operating Systems", zh: "操作系统" },
    skills: [
      { name: "Android", iconPath: androidSvg },
      { name: "Linux", iconPath: linuxSvg },
      { name: "Windows", iconPath: windowsSvg },
    ],
  },
  {
    id: "languages",
    title: { en: "Programming Languages", zh: "编程语言" },
    skills: [
      { name: "HTML", iconPath: htmlSvg },
      { name: "CSS", iconPath: cssSvg },
      { name: "JavaScript", iconPath: javascriptSvg },
      { name: "TypeScript", iconPath: typescriptSvg },
      { name: "Kotlin", iconPath: kotlinSvg },
      { name: "C++", iconPath: cppSvg },
    ],
  },
  {
    id: "agents",
    title: { en: "AI Agent Tools", zh: "AI Agent 工具" },
    skills: [
      { name: "Codex", Icon: Codex.Color },
      { name: "OpenCode", Icon: OpenCode.Avatar },
      { name: "OpenClaw", Icon: OpenClaw.Color },
      { name: "Hermes Agent", Icon: HermesAgent.Avatar },
      { name: "Antigravity", Icon: Antigravity.Color },
      { name: "Cursor", Icon: Cursor.Avatar },
    ],
  },
];
