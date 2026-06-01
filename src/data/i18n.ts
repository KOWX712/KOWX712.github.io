export type Locale = "en" | "zh";

export type LocalizedText = Record<Locale, string>;

export const copy = {
  en: {
    heroTitle: "KOWX712",
    heroSubtitle: "Building Android tools, agent workflows, and polished open-source interfaces.",
    skillsTitle: "Systems I work across",
    projectsTitle: "GitHub Projects",
    topProjects: "Top Projects",
    otherProjects: "Other Projects",
    linksTitle: "Other Links",
    footerLicense: "Released under the MIT License.",
  },
  zh: {
    heroTitle: "KOWX712",
    heroSubtitle: "构建 Android 工具、Agent 工作流，以及更精致的开源界面。",
    skillsTitle: "我掌握的技能栈",
    projectsTitle: "GitHub 项目",
    topProjects: "重点项目",
    otherProjects: "其他项目",
    linksTitle: "其他链接",
    footerLicense: "以 MIT License 开源发布。",
  },
  projectDescriptions: {
    en: {
      trickyAddonUpdateTargetList: "A WebUI addon for TrickyStore.",
      playIntegrityFix: "Fix Play Integrity verdicts.",
      kernelSU: "Participated in Material3 UI theme design.",
      ksuWebUIStandalone: "Standalone implementation of the KernelSU WebUI",
      externalUiRole: "Participated in UI design.",
    },
    zh: {
      trickyAddonUpdateTargetList: "一个 TrickyStore 的 WebUI 插件。",
      playIntegrityFix: "修复 Google Play 完整性验证。",
      kernelSU: "参与 Material3 UI 主题设计。",
      ksuWebUIStandalone: "KernelSU WebUI 的独立实现。",
      externalUiRole: "参与 UI 设计。",
    },
  },
} as const;
