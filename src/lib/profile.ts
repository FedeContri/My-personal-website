export const profile = {
  name: "FD",
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
    id: "wpa2-toolkit",
    kind: "Project",
    label: "Educational security project",
    title: "WPA2 Handshake Toolkit",
    summary:
      "An educational toolkit for capturing WPA/WPA2-PSK handshakes and preparing them for offline analysis with hashcat.",
    stack: ["Bash", "Aircrack-ng", "Hashcat", "Linux", "Wireless"],
    detail: [
      {
        heading: "What it does",
        items: [
          "Enables monitor mode",
          "Captures wireless traffic",
          "Converts handshakes to hashcat format",
          "Restores normal Wi-Fi operation",
        ],
      },
    ],
    notes: ["For WPA/WPA2-Personal networks only. Built for learning, on my own hardware."],
    links: [
      { label: "GitHub", href: "https://github.com/FedeContri/WPA2-Handshake-Toolkit" },
    ],
  },
  {
    id: "arch-guide",
    kind: "Project",
    label: "Written guide",
    title: "Arch Linux + GUI Guide",
    summary:
      "A practical, complete guide for installing Arch Linux with a graphical interface — step by step, from boot to the final desktop configuration.",
    stack: ["Arch Linux", "Guide", "Documentation"],
    detail: [
      {
        heading: "Covers",
        items: [
          "Arch Linux installation",
          "Graphical interface setup",
          "Step-by-step walkthrough",
          "Final desktop configuration",
        ],
      },
    ],
    links: [{ label: "Get the guide", href: "https://fdc.gumroad.com/l/arch-gui-guide" }],
  },
  {
    id: "k8s-nextcloud",
    kind: "Project",
    label: "Hands-on Kubernetes project",
    title: "Kubernetes Cluster / Nextcloud",
    summary:
      "Started on Minikube inside a VM to get comfortable with workloads, Services and Secrets, then moved to a real 3-node cluster (1 control plane, 2 workers) on VMs hosted on a Proxmox server, used to deploy services for my home network.",
    stack: ["Kubernetes", "Proxmox", "Helm", "PostgreSQL", "Valkey", "NGINX Ingress"],
    diagram: `  Proxmox host
  ├── VM: control-plane
  ├── VM: worker-01
  └── VM: worker-02
            │
        ┌───▼──────────────────────┐
  ──▶   │  NGINX Ingress           │
        └────────────┬─────────────┘
                     │  Service
        ┌────────────▼─────────────┐
        │  Nextcloud               │
        └───┬───────────────┬──────┘
   ┌────────▼──────┐  ┌─────▼───────┐
   │  PostgreSQL   │  │   Valkey    │
   └───────┬───────┘  └─────────────┘
           │  PVC ──▶ PersistentVolume`,
    detail: [
      {
        heading: "Phase 1 — Minikube",
        items: [
          "Single-node cluster in a VM",
          "Pods / Deployments / ReplicaSets",
          "Services and NodePort",
          "Secrets and values.yaml",
          "Helm chart deployment",
        ],
      },
      {
        heading: "Phase 2 — Proxmox cluster",
        items: [
          "3 VMs: 1 control plane + 2 workers",
          "Cluster bootstrap and node join",
          "Ingress and internal networking",
          "PersistentVolume / PersistentVolumeClaim",
          "Nextcloud with PostgreSQL and Valkey",
          "Troubleshooting pods and storage",
        ],
      },
    ],
    notes: [
      "The goal is to reproduce, on a small scale, an environment close to a real company setup and use it to run services for the whole home network.",
      "Built as a learning environment, not as production infrastructure.",
    ],
  },
  {
    id: "homelab",
    kind: "Project",
    label: "Personal infrastructure",
    title: "Personal Homelab",
    summary:
      "A self-hosted environment built around TrueNAS: file sharing, personal cloud and media, with remote access without exposing any port on the router. Currently being rebuilt and progressively migrated to Kubernetes.",
    stack: ["TrueNAS", "Docker", "Nextcloud", "Jellyfin", "Homepage", "Tailscale"],
    diagram: `  Fujitsu Esprimo — Xeon E3-1245 v5 · 12 GB RAM · SSD + HDD
  ────────────────────────────────────────────────────────
   TrueNAS ─┬─ Storage: backup / snapshots / downloads / data
            ├─ Docker ─┬─ Nextcloud
            │          ├─ Jellyfin
            │          └─ Homepage (dashboard)
            └─ Tailscale (remote access, no open ports)`,
    detail: [
      {
        heading: "Hardware",
        items: ["Fujitsu Esprimo", "Intel Xeon E3-1245 v5", "12 GB RAM", "SSD", "HDD"],
      },
      {
        heading: "Configured / used",
        items: ["TrueNAS", "Nextcloud", "Jellyfin", "Homepage", "Docker", "Tailscale"],
      },
      {
        heading: "Problems solved",
        items: [
          "Certificate management",
          "Snapshot creation and restore",
          "Storage layout per purpose (backup, snapshots, downloads, data)",
          "Secure remote access without port forwarding",
        ],
      },
    ],
    notes: [
      "Currently in a rebuild phase: the plan is to migrate these services to Kubernetes and use the homelab to simulate a real company environment.",
    ],
  },
  {
    id: "t1d",
    kind: "Project",
    label: "Personal project — prototype",
    title: "T1D Investigator",
    summary:
      "A Python prototype for analysing personal glucose monitoring data imported from CSV: highlighting critical trends and looking for recurring patterns over time.",
    stack: ["Python", "CSV data", "Prototype"],
    detail: [
      {
        heading: "Scope",
        items: [
          "CSV data import",
          "Trend and pattern analysis",
          "Detection of critical values",
          "Personal control center view",
        ],
      },
      {
        heading: "Planned rework",
        items: [
          "Cleaner architecture",
          "Locally-run AI model",
          "Pattern recognition and forecasting only",
        ],
      },
    ],
    notes: [
      "Deliberately left unfinished: it must never give diagnoses, therapy indications or correction suggestions — that stays with the doctor.",
      "A future version would only recognise and forecast patterns from the available data.",
    ],
  },
];


export const labs: Entry[] = [
  {
    id: "ccna",
    kind: "Lab",
    label: "Networking lab",
    title: "CCNA Labs",
    summary:
      "Practical network configurations with Cisco Packet Tracer, built while studying networking fundamentals.",
    stack: ["Cisco Packet Tracer", "Routing", "Switching", "DHCP", "DNS"],
    detail: [
      {
        heading: "Configured",
        items: [
          "Router and switch setup with hosts",
          "Routing tables",
          "Multi-network architectures with interconnected routers",
          "DHCP server for dynamic IP management",
          "Basic DNS server",
        ],
      },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/FedeContri/Cisco-Packet-Tracer_projects/" },
    ],
  },
  {
    id: "nethunter",
    kind: "Lab",
    label: "Security lab / Android experiment",
    title: "Nexus 5 / Kali NetHunter",
    summary:
      "Android and wireless security experimentation on a Google Nexus 5 running Kali NetHunter. The device had very limited internal storage and no SD card slot, which made the full NetHunter install difficult. Monitor mode could not be enabled even after compiling the kernel manually from the official NetHunter repository and building the flashable zip myself.",
    stack: ["Kali NetHunter", "Android", "Linux", "Custom kernel", "Wireless"],
    detail: [
      {
        heading: "What I tried",
        items: [
          "Manual kernel compilation from the official NetHunter repository",
          "Built the flashable zip manually",
          "Installed the custom kernel and NetHunter environment",
          "Attempted monitor mode setup",
          "Troubleshot wireless driver / firmware compatibility",
        ],
      },
      {
        heading: "Blockers",
        items: [
          "Very limited internal storage",
          "No SD card slot for expansion",
          "Monitor mode not activating despite a working kernel build",
          "Wireless chipset / firmware constraints",
          "Device-specific compatibility limits",
        ],
      },
    ],
    notes: [
      "The kernel build process itself worked, but the Nexus 5 hardware and firmware ultimately prevented monitor mode. The experiment was still valuable for learning how to compile Android kernels and build flashable packages.",
    ],
  },
  {
    id: "s4-root",
    kind: "Lab",
    label: "Android security / rooting experiment",
    title: "Samsung Galaxy S4 GT-I9505",
    summary:
      "Personal experiment with Android rooting and custom recovery. Root was completed successfully with no issues.",
    stack: ["Android", "TWRP", "Magisk"],
    detail: [
      {
        heading: "Worked with",
        items: [
          "Android",
          "TWRP custom recovery",
          "Magisk",
          "Root access",
          "Bootloader / flashing workflow",
        ],
      },
      {
        heading: "Result",
        items: [
          "Successful root",
          "Stable Magisk installation",
          "Working TWRP recovery",
          "No compatibility or boot issues",
        ],
      },
    ],
    notes: [
      "Root completed cleanly. The S4 handled the process without the compatibility problems I expected from older Android experiments.",
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
    items: ["JavaScript", "Bash", "C / C++", "Java", "SQL"],
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
  period: "2026 — present",
  body: "Currently interning in an IT / DevOps-oriented position while studying to become a DevOps engineer. I'm learning by doing — working with containers, version control, virtualization, networking and Kubernetes, and applying what I study directly on real tasks and personal labs.",
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
