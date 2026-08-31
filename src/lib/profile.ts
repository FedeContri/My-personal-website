export const profile = {
  name: "Federico Contrino",
  role: "DevOps Intern & Cybersecurity Enthusiast",
  intro:
    "I'm a DevOps Intern interested in Linux, infrastructure, containers, Kubernetes and networking, with a strong passion for cybersecurity.",
  intro2:
    "I learn by building, experimenting and troubleshooting real systems, from personal infrastructure and Kubernetes environments to Android and wireless security labs.",
  github: "https://github.com/FedeContri",
  linkedin: "https://www.linkedin.com/in/federico-contrino-78a647395",
  email: "fd_cybernet@proton.me",
  /** Put the CV file in /public and set the path here (e.g. "/federico-contrino-cv.pdf"). Empty = button hidden. */
  cvUrl: "",
};

export const currently = {
  workingAs: "DevOps / IT Intern",
  learning: ["Kubernetes", "Helm", "Linux", "Infrastructure"],
  exploring: ["Cybersecurity", "Networking", "Personal Labs"],
};

export const journey = [
  "Linux",
  "Git / GitHub",
  "Docker",
  "Networking",
  "Kubernetes",
  "Helm",
  "Infrastructure",
];

export const timeline = [
  "Informatics",
  "Programming / Linux",
  "Cybersecurity",
  "Docker / Git / Virtualization",
  "IT Internship",
  "Kubernetes / Helm",
  "DevOps",
];

export type Entry = {
  id: string;
  kind: "Project" | "Lab";
  label: string;
  title: string;
  summary: string;
  stack: string[];
  detail: {
    heading: string;
    items: string[];
  }[];
  notes?: string[];
  links?: { label: string; href: string }[];
  diagram?: string;
};

export const work: Entry[] = [
  {
    id: "k8s-nextcloud",
    kind: "Project",
    label: "Hands-on Kubernetes project",
    title: "Kubernetes / Nextcloud",
    summary:
      "A hands-on Kubernetes environment built while learning workloads, networking, storage and Helm.",
    stack: ["Kubernetes", "Helm", "PostgreSQL", "Valkey", "NGINX Ingress"],
    diagram: `        ┌──────────────────────────┐
  ──▶   │  NGINX Ingress           │
        └────────────┬─────────────┘
                     │  Service (NodePort)
        ┌────────────▼─────────────┐
        │  Nextcloud               │
        └───┬───────────────┬──────┘
            │               │
   ┌────────▼──────┐  ┌─────▼───────┐
   │  PostgreSQL   │  │   Valkey    │
   └───────┬───────┘  └─────────────┘
           │  PVC ──▶ PersistentVolume`,
    detail: [
      {
        heading: "Worked with",
        items: [
          "Kubernetes",
          "Helm",
          "Services",
          "NodePort",
          "Ingress",
          "PersistentVolume",
          "PersistentVolumeClaim",
          "Secrets",
          "values.yaml",
        ],
      },
      {
        heading: "Concepts covered",
        items: [
          "Pods",
          "Deployments",
          "ReplicaSets",
          "StatefulSets",
          "DaemonSets",
          "Services",
          "Networking",
          "Persistent storage",
          "Secrets",
          "Ingress",
          "Helm",
          "Troubleshooting",
        ],
      },
    ],
    notes: [
      "Configured and connected Nextcloud with PostgreSQL and Valkey.",
      "Built as a learning project, not as enterprise infrastructure.",
    ],
  },
  {
    id: "homelab",
    kind: "Project",
    label: "Personal infrastructure",
    title: "Personal Homelab",
    summary:
      "A personal infrastructure used to experiment with storage, services, containers and networking.",
    stack: ["TrueNAS", "Docker", "Nextcloud", "Jellyfin", "Tailscale"],
    diagram: `  Fujitsu Esprimo — Xeon E3-1245 v5 · 12 GB RAM · SSD + HDD
  ────────────────────────────────────────────────────────
   TrueNAS ─┬─ Samba share
            ├─ Docker ─┬─ Nextcloud
            │          ├─ Jellyfin
            │          └─ Sonarr / Radarr / Prowlarr
            └─ Tailscale (remote access)`,
    detail: [
      {
        heading: "Hardware",
        items: ["Fujitsu Esprimo", "Intel Xeon E3-1245 v5", "12 GB RAM", "SSD", "HDD"],
      },
      {
        heading: "Configured / used",
        items: [
          "TrueNAS",
          "Nextcloud",
          "Jellyfin",
          "Docker",
          "Samba",
          "Sonarr",
          "Radarr",
          "Prowlarr",
          "Tailscale",
        ],
      },
    ],
    notes: ["Personal homelab — hands-on practice with servers, storage, services and networking."],
  },
  {
    id: "t1d",
    kind: "Project",
    label: "Personal project",
    title: "T1D Investigator",
    summary:
      "A personal project to work with diabetes monitoring and management data, importing CSV files and organising them in a personal control center for analysis.",
    stack: ["CSV data", "Personal project"],
    detail: [
      {
        heading: "Scope",
        items: [
          "CSV data import",
          "Data organisation",
          "Personal control center",
          "Analysis of monitoring data",
        ],
      },
    ],
  },
];

export const labs: Entry[] = [
  {
    id: "nethunter",
    kind: "Lab",
    label: "Security lab / Android experiment",
    title: "Nexus 5 / Kali NetHunter",
    summary:
      "Android and wireless security experimentation on a Google Nexus 5 running Kali NetHunter.",
    stack: ["Kali NetHunter", "Android", "Linux", "Custom kernel", "Wireless"],
    detail: [
      {
        heading: "Experimented with",
        items: [
          "Monitor mode",
          "Nexmon",
          "Wireless drivers",
          "Wi-Fi configuration",
          "Kernel",
          "Troubleshooting",
        ],
      },
      {
        heading: "Issues encountered",
        items: [
          "Nexmon",
          "wpa_supplicant",
          "Wireless drivers",
          "Kernel configuration",
          "Component compatibility",
        ],
      },
    ],
    notes: [
      "Not everything worked: part of the value of this lab is the experimentation and troubleshooting process.",
    ],
  },
  {
    id: "s4-root",
    kind: "Lab",
    label: "Android security / rooting experiment",
    title: "Samsung Galaxy S4 GT-I9505",
    summary: "Personal experiment with Android rooting and custom recovery.",
    stack: ["Android", "TWRP", "Magisk"],
    detail: [
      { heading: "Worked with", items: ["Android", "TWRP", "Magisk", "Root", "Custom recovery"] },
    ],
    notes: [
      "Hit a compatibility issue between Magisk and the Android version of the device — root was not completed.",
    ],
  },
  {
    id: "esp32",
    kind: "Lab",
    label: "Wireless / hardware security lab",
    title: "ESP32 with touch display",
    summary:
      "An ESP32 device with a touch display used to experiment with wireless/security-oriented firmware.",
    stack: ["Bruce V1.16", "Marauder"],
    detail: [{ heading: "Firmware used", items: ["Bruce V1.16", "Marauder"] }],
  },
  {
    id: "rpi",
    kind: "Lab",
    label: "Hardware / ARM lab",
    title: "Raspberry Pi",
    summary: "Experiments with ARM Linux environments and Kali Linux.",
    stack: ["Raspberry Pi Zero 2 W", "Raspberry Pi 3", "Kali Linux"],
    detail: [{ heading: "Explored", items: ["Kali Linux", "ARM Linux environments"] }],
  },
  {
    id: "seclab",
    kind: "Lab",
    label: "Personal security lab",
    title: "Security Lab",
    summary:
      "Personal cybersecurity experimentation and study — tools used in a personal lab context, not professional penetration testing.",
    stack: ["Nmap", "Wireshark", "Aircrack-ng", "Bettercap"],
    detail: [
      {
        heading: "Tools used / experimented with",
        items: [
          "Nmap",
          "Wireshark",
          "Aircrack-ng",
          "Bettercap",
          "Ettercap",
          "Hashcat",
          "Hydra",
          "Metasploit",
        ],
      },
    ],
  },
];

export const skills: { group: string; items: string[]; note?: string }[] = [
  {
    group: "DevOps / Infrastructure",
    items: [
      "Linux",
      "Docker",
      "Kubernetes",
      "Helm",
      "Git",
      "GitHub",
      "Networking",
      "Virtualization",
    ],
  },
  {
    group: "Kubernetes",
    items: [
      "Pods",
      "Deployments",
      "ReplicaSets",
      "StatefulSets",
      "DaemonSets",
      "Services",
      "NodePort",
      "Ingress",
      "PV",
      "PVC",
      "Secrets",
      "Helm",
      "values.yaml",
    ],
    note: "Currently learning",
  },
  {
    group: "Cybersecurity",
    items: [
      "Nmap",
      "Wireshark",
      "Aircrack-ng",
      "Bettercap",
      "Ettercap",
      "Hashcat",
      "Hydra",
      "Metasploit",
    ],
    note: "Personal lab",
  },
  {
    group: "Programming",
    items: ["Python", "JavaScript", "C#", "Bash", "SQL"],
  },
];

export const hardware = [
  {
    group: "Server",
    items: ["Fujitsu Esprimo", "Intel Xeon E3-1245 v5", "12 GB RAM"],
  },
  {
    group: "Android",
    items: ["Google Nexus 5", "Samsung Galaxy S4 GT-I9505"],
  },
  {
    group: "Embedded",
    items: ["ESP32", "Raspberry Pi Zero 2 W", "Raspberry Pi 3"],
  },
];

export const experience = {
  role: "DevOps / IT Intern",
  period: "2026",
  body: "Internship focused on infrastructure and systems. During this path I worked and studied with containers, version control, virtualization and networking, alongside a first hands-on approach to Kubernetes and Helm.",
  items: [
    "Docker",
    "Git",
    "GitHub",
    "Virtualization",
    "Networking",
    "Firewall",
    "VPN",
    "Kubernetes",
    "Helm",
  ],
};
