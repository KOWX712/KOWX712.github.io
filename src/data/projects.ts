import bindhostsIcon from "../assets/bindhosts.png";
import kernelSUIcon from "../assets/kernelsu.png";
import kpatchNextIcon from "../assets/kpatch-next.png";
import ksuWebUIStandaloneIcon from "../assets/ksuwebuistandalone.png";
import reMalwackIcon from "../assets/re-malwack.png";
import { copy, type LocalizedText } from "./i18n";

export type Project = {
  name: string;
  owner: string;
  repo: string;
  description: LocalizedText;
  icon?: string;
};

export function getProjectUrl(project: Project) {
  return `https://github.com/${project.owner}/${project.repo}`;
}

function desc(key: keyof typeof copy.projectDescriptions.en): LocalizedText {
  return {
    en: copy.projectDescriptions.en[key],
    zh: copy.projectDescriptions.zh[key],
  };
}

export const topProjects: Project[] = [
  {
    name: "Tricky Addon",
    owner: "KOWX712",
    repo: "Tricky-Addon-Update-Target-List",
    description: desc("trickyAddonUpdateTargetList"),
  },
  {
    name: "Play Integrity Fix (fork)",
    owner: "KOWX712",
    repo: "PlayIntegrityFix",
    description: desc("playIntegrityFix"),
  },
  {
    name: "Bindhosts",
    owner: "bindhosts",
    repo: "bindhosts",
    description: desc("externalUiRole"),
    icon: bindhostsIcon,
  },
];

export const otherProjects: Project[] = [
  {
    name: "KernelSU",
    owner: "tiann",
    repo: "KernelSU",
    description: desc("kernelSU"),
    icon: kernelSUIcon,
  },
  {
    name: "KSU WebUI Standalone (fork)",
    owner: "KOWX712",
    repo: "KsuWebUIStandalone",
    description: desc("ksuWebUIStandalone"),
    icon: ksuWebUIStandaloneIcon,
  },
  {
    name: "Re-Malwack",
    owner: "ZG089",
    repo: "Re-Malwack",
    description: desc("externalUiRole"),
    icon: reMalwackIcon,
  },
  {
    name: "KPatch Next",
    owner: "KernelSU-Next",
    repo: "KPatch-Next-Module",
    description: desc("externalUiRole"),
    icon: kpatchNextIcon,
  },
  {
    name: "Mountify",
    owner: "backslashxx",
    repo: "mountify",
    description: desc("externalUiRole"),
  },
  {
    name: "KernelSU Toolkit",
    owner: "backslashxx",
    repo: "ksu_toolkit",
    description: desc("externalUiRole"),
  },
  {
    name: "SystemApp Nuker",
    owner: "chisewaguri",
    repo: "systemapp_nuker",
    description: desc("externalUiRole"),
  },
];
