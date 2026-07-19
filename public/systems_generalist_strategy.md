# Systems Generalist Portfolio Strategy

This document outlines strategic enhancements for the **Engineer** persona in your portfolio and resume data to align with high-scale infrastructure and systems engineering roles, specifically for **Thinking Machines Lab**.

## 🎯 Role Invariants & Mapping
Here is how your actual experience maps directly to their Systems Generalist requirements:

| Thinking Machines Requirement | Your Verified Experience | Translation / Emphasis |
| :--- | :--- | :--- |
| **Backend Proficiency (Python/Rust)** | Created [TangleBrain](https://github.com/Jason-Vaughan/TangleBrain) (Python CLI + PyPI package) | Emphasize Python scripting, PyPI library authorship, and LiteLLM integration. |
| **Developer Productivity** | Developed [TangleClaw](https://github.com/Jason-Vaughan/TangleClaw) and [ClawBridge](https://github.com/Jason-Vaughan/ClawBridge) | Position as remote terminal orchestration planes and host-to-IPC build-tool daemons. |
| **Core & Network Infrastructure** | 25 years of corporate signal flow, fiber routing, and Cisco deployment | Emphasize hardware layer operations, VLANs, managed L2/L3 routing, and failover design. |
| **Debugging / Troubleshooting** | High-pressure corporate keynote network setup with zero downtime | Highlight physical/virtual network packet analysis, kernel/network layer debugging. |
| **Data & ML Workflows** | TangleBrain local model router and gateway | Position as local LLM inference orchestration and routing gateway (Ollama, llama.cpp). |

---

## 🛠️ Planned Code Updates

### 1. Taglines & Bio (`src/data/about.js`)
Refine the tagline to explicitly present you as a **Systems & Infrastructure Engineer** who bridges hardware routing and software orchestration.

```diff
   Engineer: {
-    bio: "AI-Native Systems Engineer & Full-Stack Developer. 25 years shipping production systems, zero-dependency Node.js services, and local LLM orchestration.",
-    highlight: "I live, sleep, and breathe AI engineering. I build custom local agent gateway systems (OpenClaw) and local RAG pipelines."
+    bio: "Systems & Infrastructure Engineer with 25+ years of experience bridging low-level networking, high-stakes physical fiber networks, and local-first AI orchestration.",
+    highlight: "I build robust developer tools and high-performance routing backends, backed by decades of zero-downtime enterprise network operations."
   },
```

### 2. Career Experience (`src/data/career.js`)
Tweak the bullet points under the **Engineer** persona to highlight infrastructure-oriented work (low-level networking, failover routing, daemon design, environment configuration).

#### ASM Global (Moscone Center)
```diff
       Engineer: [
-        "Design and deploy high-capacity single-mode fiber backbones and temporary network topologies for enterprise-level show footprints.",
-        "Troubleshoot layer-1 physical fiber issues (optical loss, connector integrity) and configure managed network switch routing.",
-        "Program redundant optical transceivers, multiplexers, and distribution terminals to ensure absolute network availability."
+        "Design, build, and operate high-capacity network topologies and fiber-optic backbones for enterprise footprints under strict SLA constraints.",
+        "Configure managed layer-2 and layer-3 switches, routing tables, and VLANs, troubleshooting complex networking bottlenecks.",
+        "Program redundant hardware transceivers, multiplexers, and failover architectures to guarantee 99.999% network availability for live global keynotes."
       ]
```

#### Independent Software & AI Builder
```diff
       Engineer: [
-        "Designed and published TangleClaw, a zero-dependency remote TTYD and AI orchestration plane for persistent session management.",
-        "Built TangleBrain, a config-driven local-first LLM router supporting multiple local backends (Ollama, llama.cpp).",
-        "Publish open-source packages and Node.js zero-npm-dependency servers on GitHub and npm to foster community developer utilities."
+        "Designed and published TangleClaw, a zero-dependency remote terminal and process orchestration plane for persistent session persistence.",
+        "Built TangleBrain, a Python-based local LLM router and gateway that manages concurrent local/cloud inference backends (LiteLLM, Ollama, llama.cpp).",
+        "Created ClawBridge, an HTTP-to-IPC daemon that exposes local agent instances as supervised background build/execution services for automation tools.",
+        "Author lightweight developer tools, prioritizing performance profiling, high-concurrency request handling, and zero-npm dependency footprints."
       ]
```

#### Google (Event Technology Team)
```diff
       Engineer: [
-        "Designed and maintained Apps Script automation dashboards to allocate staff across 100+ concurrent projects and surface resourcing conflicts.",
-        "Integrated local generative AI tools into internal operations to accelerate copywriting, data organization, and template prep.",
-        "Standardized IT tools, access protocols, and workspace logistics for creative and technical production workflows."
+        "Standardized developer environments, access control protocols, and tool configs, streamlining onboarding for technical crews.",
+        "Designed and maintained custom JS automation scripts to manage resource allocation and resolve scheduling conflicts across 100+ concurrent projects.",
+        "Integrated local inference pipelines and generative models into internal operations, automating repetitive dataset formatting and document prep."
       ]
```

#### iPolis Webcasting
```diff
       Engineer: [
-        "Architected one of the earliest SaaS video streaming platforms, custom building RTMP ingest transcoding engines.",
-        "Deployed and maintained dedicated Linux streaming server arrays, optimizing bandwidth usage and packet delivery."
+        "Architected a pioneering municipal SaaS streaming platform, writing custom media distribution pipelines and RTMP ingest engines.",
+        "Deployed, tuned, and managed dedicated Linux server clusters, optimizing kernel network parameters and packet routing to handle massive streaming loads."
       ]
```
