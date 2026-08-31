export const profile = {
  name: "FD",
  role: "DevOps Intern & Cybersecurity Enthusiast",
  /** Short mono kicker shown above the h1 */
  kicker: "Linux · Kubernetes · Homelab",
  /** Direction, not status */
  tagline: "Building infrastructure to learn how it breaks.",
  /** Set to a city / country / timezone when you want it public. Empty = hidden. */
  location: "",
  intro:
    "I run a 3-node Kubernetes cluster on Proxmox that serves my home network, and I'm learning DevOps by operating it.",
  intro2:
    "Linux, containers, networking and infrastructure during the day; wireless, Android and network security labs on my own hardware the rest of the time.",
  github: "https://github.com/FedeContri",
  linkedin: "https://www.linkedin.com/in/federico-contrino-78a647395",
  email: "fd_cybernet@proton.me",
  /** Put the CV file in /public and set the path here (e.g. "/fd-cv.pdf"). Empty = button hidden. */
  cvUrl: "",
};

/** Fake-but-coherent terminal shown once in the hero */
export const heroTerminal = `$ kubectl get nodes
NAME             STATUS   ROLES           AGE   VERSION
control-plane    Ready    control-plane   —     v1.30
worker-01        Ready    <none>          —     v1.30
worker-02        Ready    <none>          —     v1.30

$ whoami
fd — devops intern, breaking things on purpose`;

export const currently = {
  workingAs: "DevOps / IT Intern",
  learning: ["Kubernetes", "Helm", "Terraform", "Prometheus", "GitHub Actions"],
  exploring: ["Cybersecurity", "Networking", "Personal Labs"],
};

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
  kind: "Project" | "Lab" | "Writing";
  label: string;
  title: string;
  /** Optional period, e.g. "2025 — present" */
  period?: string;
  summary: string;
  stack: string[];
  /** Prose blocks: Context → Problem → Decisions → What broke → Result → What I'd change */
  narrative?: { heading: string; body: string }[];
  detail?: {
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
    label: "Infrastructure",
    title: "Kubernetes Cluster / Nextcloud",
    summary:
      "A real 3-node Kubernetes cluster (1 control plane, 2 workers) running on Proxmox VMs, used to serve Nextcloud to my home network — started on Minikube, then rebuilt as a multi-node cluster.",
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
    narrative: [
      {
        heading: "Context",
        body: "I wanted to stop reading about Kubernetes and actually operate one. I started with Minikube inside a VM to get comfortable with workloads, Services and Secrets, then rebuilt everything as a real multi-node cluster on Proxmox so networking, scheduling and storage behave like they do outside a laptop.",
      },
      {
        heading: "Problem",
        body: "A single-node cluster hides the parts that matter: scheduling across nodes, ingress from outside the cluster, and storage that survives a pod being rescheduled. Nextcloud was chosen precisely because it is stateful: it needs a database, a cache and real persistent volumes.",
      },
      {
        heading: "Decisions",
        body: "Three Proxmox VMs (one control plane, two workers) instead of bare metal, so a broken node can be snapshotted and rebuilt in minutes. Helm instead of raw manifests, so configuration lives in values.yaml and is reproducible. NGINX Ingress as the single entry point, PostgreSQL as the database, Valkey as the cache, each with its own PVC.",
      },
      {
        heading: "What broke",
        body: "Most of the learning came from failures: pods stuck in Pending because no PersistentVolume matched the claim, Nextcloud restarting until the credentials in the Secret matched what the chart expected, ingress returning errors until service and host lined up. Every fix started the same way — describe the object, read the events, then the logs.",
      },
      {
        heading: "Result",
        body: "Nextcloud runs on the cluster and serves my home network. The point is not the app: it is having a small environment close to a real company setup where I can break things, recover them and understand why.",
      },
      {
        heading: "What I'd change",
        body: "The gaps I already know about: TLS on the Ingress with automated certificates, proper secrets management instead of plain Kubernetes Secrets, NetworkPolicies between app and database, scheduled PostgreSQL backups, and publishing the sanitised manifests and values.yaml as a public repository so the setup is verifiable and not just described.",
      },
    ],
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
          "Debugged pod scheduling and storage",
        ],
      },
    ],
    notes: ["Built as a learning environment, not as production infrastructure."],
  },
  {
    id: "homelab",
    kind: "Project",
    label: "Infrastructure",
    title: "Personal Homelab",
    summary:
      "A self-hosted environment built around TrueNAS — file sharing, personal cloud and media — reachable remotely without a single port open on the router.",
    stack: ["TrueNAS", "Docker", "Nextcloud", "Jellyfin", "Homepage", "Tailscale"],
    diagram: `  x86 server — ~12 GB RAM · SSD + HDD
  ────────────────────────────────────────────────────────
   TrueNAS ─┬─ Storage: backup / snapshots / downloads / data
            ├─ Docker ─┬─ Nextcloud
            │          ├─ Jellyfin
            │          └─ Homepage (dashboard)
            └─ Tailscale (remote access, no open ports)`,
    narrative: [
      {
        heading: "Context",
        body: "An x86 server turned into the place where I keep my own data instead of renting it: backups, personal cloud and media, all self-hosted and administered by me.",
      },
      {
        heading: "Problem",
        body: "Reaching those services from outside the house normally means port forwarding and a permanently exposed attack surface on a machine that holds personal files.",
      },
      {
        heading: "Decision — mesh VPN, not a public reverse proxy",
        body: "I chose Tailscale over a reverse proxy with public DNS or a tunnel provider: the router keeps zero inbound ports open, authentication happens at the identity layer before any service is reachable, and no third party terminates traffic to my private data. The trade-off is explicit — nothing is shareable outside my tailnet, which is exactly what I wanted.",
      },
      {
        heading: "What broke",
        body: "Certificates for the internal services and the storage layout took the most time: deciding which datasets deserve snapshots, how often, and actually restoring one to verify the backup was real rather than theoretical.",
      },
      {
        heading: "Roadmap",
        body: "The homelab is being rebuilt: the Docker services are progressively moving onto the Kubernetes cluster, so the same workloads run in an environment closer to a real company setup.",
      },
    ],
    detail: [
      {
        heading: "Configured / used",
        items: ["TrueNAS", "Nextcloud", "Jellyfin", "Homepage", "Docker", "Tailscale"],
      },
      {
        heading: "Problems solved",
        items: [
          "Certificate management",
          "Snapshot creation and verified restore",
          "Storage layout per purpose (backup, snapshots, downloads, data)",
          "Secure remote access without port forwarding",
        ],
      },
    ],
  },
  {
    id: "wpa2-toolkit",
    kind: "Project",
    label: "Security tooling",
    title: "WPA2 Handshake Toolkit",
    summary:
      "A Bash toolkit that automates capturing WPA/WPA2-PSK handshakes on my own hardware and preparing them for offline analysis with hashcat.",
    stack: ["Bash", "Aircrack-ng", "Hashcat", "Linux", "Wireless"],
    narrative: [
      {
        heading: "Context",
        body: "I wanted to understand what a WPA2-PSK handshake actually is instead of trusting a tool to do it for me, so I scripted the whole workflow against my own access point: monitor mode, capture, conversion, cleanup.",
      },
      {
        heading: "What I learned",
        body: "That the security of WPA2-Personal collapses to one thing — the passphrase. The capture only needs the EAPOL frames of the 4-way handshake; everything after that is offline guessing, so a long random PSK makes the attack pointless while a dictionary word makes it trivial. I also learned the difference between capturing a full EAPOL handshake, which needs a client to associate, and the PMKID path, which can be requested straight from the access point.",
      },
      {
        heading: "Limits",
        body: "It only applies to WPA/WPA2-Personal. WPA3-SAE removes the offline-guessing step entirely, which is the real conclusion of the project: the fix is not a better wordlist, it is a better protocol.",
      },
      {
        heading: "Next step",
        body: "Rewrite the conversion step on the modern hcx toolchain, which is now the standard way to feed hashcat.",
      },
    ],
    notes: ["For WPA/WPA2-Personal networks only. Built for learning, on my own hardware."],
    links: [{ label: "GitHub", href: "https://github.com/FedeContri/WPA2-Handshake-Toolkit" }],
  },
  {
    id: "t1d",
    kind: "Project",
    label: "Data / Python",
    title: "T1D Investigator",
    summary:
      "A Python tool that analyses personal glucose monitoring data exported as CSV, scoped intentionally to pattern analysis only.",
    stack: ["Python", "CSV data"],
    narrative: [
      {
        heading: "Context",
        body: "Continuous glucose monitors export months of readings as CSV. The data is there, but the useful part — recurring patterns over days and weeks — is not something the vendor app surfaces well.",
      },
      {
        heading: "Scope, deliberately narrow",
        body: "The tool imports the CSV, highlights trends and flags critical values. It does not, and will never, give a diagnosis, a therapy indication or a correction suggestion: that belongs to the doctor. This boundary is a design decision, not an unfinished feature.",
      },
      {
        heading: "What I'd change",
        body: "A cleaner architecture and a locally-run model for pattern recognition and forecasting only, so that no personal health data ever leaves the machine.",
      },
    ],
    detail: [
      {
        heading: "Scope",
        items: [
          "CSV data import",
          "Trend and pattern analysis",
          "Detection of critical values",
          "Local-only processing",
        ],
      },
    ],
    notes: [
      "No diagnosis, no therapy indication, no correction suggestion — by design.",
    ],
  },
];

export const labs: Entry[] = [
  {
    id: "nethunter",
    kind: "Lab",
    label: "Android / kernel",
    title: "Nexus 5 — NetHunter kernel build",
    summary:
      "Compiled a Kali NetHunter kernel by hand from the official repository for a Google Nexus 5, built the flashable zip myself, and still could not get monitor mode working — for reasons that turned out to be structural.",
    stack: ["Kali NetHunter", "Android", "Linux", "Custom kernel", "TWRP", "Magisk"],
    narrative: [
      {
        heading: "Context",
        body: "I wanted a pocket-sized Linux machine with a real wireless stack, so I installed Kali NetHunter on an old Nexus 5.",
      },
      {
        heading: "Problem",
        body: "The prebuilt images did not fit: the device has very limited internal storage and no SD card slot, so the full NetHunter installation had to be trimmed and adapted.",
      },
      {
        heading: "What I did",
        body: "Compiled the kernel manually from the official NetHunter repository, packaged the flashable zip myself, flashed it through a custom recovery and brought up the NetHunter environment on top of it. The build worked and the device booted on my own kernel.",
      },
      {
        heading: "Why monitor mode never worked",
        body: "The Nexus 5 uses a Broadcom BCM4339 chipset driven by the closed-source bcmdhd driver, which simply does not expose monitor mode. Enabling it requires the nexmon firmware patches for that exact chipset and firmware revision, not just a NetHunter kernel — so no amount of rebuilding the kernel was ever going to fix it.",
      },
      {
        heading: "Result",
        body: "The goal failed, the learning did not: compiling an Android kernel, producing a flashable package and reading driver/firmware constraints instead of guessing is the part I actually kept. The same Android tinkering track also includes a Samsung Galaxy S4 rooted with TWRP and Magisk, which went through cleanly.",
      },
    ],
    detail: [
      {
        heading: "Worked with",
        items: [
          "Manual kernel compilation (official NetHunter repo)",
          "Flashable zip built by hand",
          "Custom recovery / bootloader flashing",
          "Wireless driver and firmware troubleshooting",
          "TWRP + Magisk root (Galaxy S4)",
        ],
      },
    ],
  },
  {
    id: "ccna",
    kind: "Lab",
    label: "Networking",
    title: "CCNA Labs",
    summary:
      "Network topologies built in Cisco Packet Tracer while studying networking fundamentals: routing, switching, DHCP and DNS.",
    stack: ["Cisco Packet Tracer", "Routing", "Switching", "DHCP", "DNS"],
    narrative: [
      {
        heading: "What I built",
        body: "Multi-network topologies with interconnected routers, static and dynamic routing tables, a DHCP server for dynamic addressing and a basic DNS server, each lab saved in the repository so the configuration can be opened and inspected.",
      },
      {
        heading: "Next step",
        body: "Extend the labs beyond the fundamentals: VLANs with trunking and inter-VLAN routing, ACLs, and a dynamic routing lab with OSPF.",
      },
    ],
    detail: [
      {
        heading: "Configured",
        items: [
          "Router and switch setup with hosts",
          "Routing tables",
          "Multi-network architectures",
          "DHCP server",
          "Basic DNS server",
        ],
      },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/FedeContri/Cisco-Packet-Tracer_projects/" },
    ],
  },
  {
    id: "wireless-embedded",
    kind: "Lab",
    label: "Wireless & embedded",
    title: "Wireless & Embedded Security",
    summary:
      "A small bench of cheap hardware — an ESP32 with a touch display, a Raspberry Pi Zero 2 W and a Raspberry Pi 3 — used to observe how my own wireless network behaves from the outside.",
    stack: ["ESP32", "Raspberry Pi", "Kali Linux", "Nmap", "Wireshark", "Aircrack-ng"],
    narrative: [
      {
        heading: "Why",
        body: "Reading about 802.11 is not the same as watching your own devices leak information. The bench exists to turn protocol theory into something observable on hardware I own.",
      },
      {
        heading: "ESP32 — what the air looks like",
        body: "Running Bruce and Marauder on an ESP32 with a touch display to enumerate the access points and beacon traffic around my flat, and to see how much a 10-euro board can tell you about a wireless environment without ever associating to it.",
      },
      {
        heading: "Raspberry Pi — ARM Linux and traffic",
        body: "A Pi Zero 2 W and a Pi 3 running ARM Linux and Kali, used as always-on capture points on my own network: watching probe requests and broadcast traffic in Wireshark to understand what devices announce about themselves when nobody is listening.",
      },
      {
        heading: "Host discovery on my own segment",
        body: "Nmap scans of my own LAN to compare what I think is connected with what actually answers — the exercise that made me tighten segmentation at home more than any article did.",
      },
      {
        heading: "Boundaries",
        body: "Everything here happens on hardware and networks I own, in a lab context. It is study, not penetration testing work, and I describe it as such.",
      },
    ],
    detail: [
      {
        heading: "Hardware",
        items: ["ESP32 with touch display", "Raspberry Pi Zero 2 W", "Raspberry Pi 3"],
      },
      {
        heading: "Tools used",
        items: [
          "Bruce / Marauder firmware",
          "Kali Linux (ARM)",
          "Nmap",
          "Wireshark",
          "Aircrack-ng",
          "Hashcat",
        ],
      },
    ],
  },
  {
    id: "arch-guide",
    kind: "Writing",
    label: "Written guide",
    title: "Arch Linux + GUI — installation guide",
    summary:
      "A complete, step-by-step written guide to installing Arch Linux with a graphical desktop, from first boot to the final configuration.",
    stack: ["Arch Linux", "Documentation"],
    narrative: [
      {
        heading: "Why I wrote it",
        body: "Installing Arch teaches you what a Linux system is made of — partitions, bootloader, init, display server, desktop — because nothing is done for you. I wrote down the path I follow so it can be repeated without twenty browser tabs open.",
      },
    ],
    detail: [
      {
        heading: "Covers",
        items: [
          "Base Arch Linux installation",
          "Disk layout and bootloader",
          "Graphical interface setup",
          "Final desktop configuration",
        ],
      },
    ],
    links: [{ label: "Get the guide", href: "https://fdc.gumroad.com/l/arch-gui-guide" }],
  },
];

export const skills: { group: string; items: string[]; note?: string }[] = [
  {
    group: "Infrastructure",
    items: ["Linux", "Docker", "Kubernetes", "Helm", "Proxmox / virtualization", "Networking"],
  },
  {
    group: "Tooling",
    items: ["Git", "GitHub", "Bash", "Python", "SQL"],
  },
  {
    group: "Security",
    items: ["Nmap", "Wireshark", "Aircrack-ng", "Hashcat", "Firewalling", "VPN / mesh networking"],
    note: "Personal lab",
  },
  {
    group: "Learning now",
    items: ["Terraform", "Prometheus", "GitHub Actions", "TLS / cert automation"],
  },
];

export const experience = {
  role: "DevOps / IT Intern",
  period: "2026 — present",
  body: "Interning in an IT / DevOps role while studying to become a DevOps engineer. I learn by doing: containers, version control, virtualization, networking and Kubernetes applied to real tasks during the day and to my own infrastructure the rest of the time.",
  items: [
    "Docker",
    "Git / GitHub",
    "Virtualization",
    "Networking",
    "Firewall / VPN",
    "Kubernetes",
    "Helm",
  ],
};
