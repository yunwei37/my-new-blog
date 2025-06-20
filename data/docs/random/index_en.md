# Zheng Yusheng

- **Phone**: +8613372543711
- **Email**: <yunwei356@gmail.com> / <1067852565@qq.com>
- **Github**: [github.com/yunwei37](https://github.com/yunwei37)
- **Website**: [www.yunwei37.com](https://www.yunwei37.com/)

## Education

### Zhejiang University

**September 2018 - June 2023**  Major: Geographic Information Science (Bachelor)

- Main Courses: Object-Oriented Programming, Operating Systems, Computer Networks, Advanced Data Structures & Algorithm Analysis, Software Engineering, Spatial Databases, Computer System Architecture, Compiler Principles, etc.
- Open Courses: MIT 6.828 2018 Operating System lab, Nanjing University Software Analysis.

## Internship Experience

### Institute of Software, Chinese Academy of Sciences, Programming Languages and Compiling Technology Lab (PLCT)

- **Duration**: November 2022 - Present
- **Position**: Toolchain Development Intern
  - Led the eBPF team in maintaining the `eunomia-bpf` open-source community and actively contributed to the upstream eBPF/Wasm community.
  - Founded and maintained the first generic eBPF runtime and toolchain on Wasm.
  - Refactored bcc runtime, implemented bcc to libbpf conversion, supported CO-RE features, and promoted the transition of the bcc ecosystem to libbpf.

### Shanghai Nayi Technology Co., Ltd

- **Duration**: November 2021 - October 2022
- **Position**: Static Analysis Intern
  - Independently designed and implemented static analysis checkers based on clang static analyzer, infer, and clang libtooling, successfully covering many rules from standards like MISRA C:2012, MISRA C++:2008, and GJB8114.
  - Designed and implemented Go static analysis check tool based on Go's AST and SSA and integrated with other open-source products.
  - Conducted static analysis tests on multiple open-source projects in C and Go languages.

### repomono

- **Duration**: September 2020 - June 2021
- **Position**: Backend Development Intern
  - Participated in the development of DevOps toolchains for monorepos.
  - Designed and implemented a search query syntax module and related APIs similar to KQL using PEG grammar.
  - Built an access control system using libgit2 and optimized performance with tools like perf, significantly improving the processing speed of git repos.

## Projects

### [eunomia-bpf Open Source Organization](https://eunomia.dev/)

- **Description**: Focused on simplifying the writing, distribution, and dynamic loading process of eBPF programs, exploring the open-source community technology combining eBPF with Wasm and AI.
- **Duration**: March 2022 - Present
- **Role**: Founder and Main Developer
- **Achievements**:
  - The community has accumulated 1700+ stars.
  - Noted on the eBPF application landscape.
  - **Github**: [eunomia-bpf](https://github.com/eunomia-bpf)
- **Sub-projects**:
  - [**eunomia-bpf**](https://github.com/eunomia-bpf/eunomia-bpf): A lightweight CO-RE development framework for simplifying the development, build, and runtime of eBPF applications.
  - [**Wasm-bpf**](https://github.com/eunomia-bpf/wasm-bpf): The first user-space development library, toolchain, and runtime for general eBPF programs based on WebAssembly.
  - [**GPTtrace**](https://github.com/eunomia-bpf/GPTtrace): Generates eBPF programs and traces the Linux kernel through natural language using GPT.
  - [**bpf-developer-tutorial**](https://github.com/eunomia-bpf/bpf-developer-tutorial): An instance-based eBPF developer tutorial.

### Open Source Promotion Plan 2022 - APISIX Community

- **Project Name**: nginx-lua-ebpf-toolkit
- **Description**: A tool for sampling and flame graph performance analysis of the lua virtual machine based on eBPF.

#### OS Summer of Code 2020

- **Github**: [zCore](https://github.com/rcore-os/zCore) Development on an educational operating system written in Rust.
- **Main Contributions**:
  - Implemented inter-process communication.
  - Implemented poll/select syscall based on async/await.
  - Successfully ported gcc on zCore.
  - Enhanced the unit testing framework and libc-test testing framework.

#### Other Personal Open Source Projects

- **Github**: [yunwei37](https://github.com/yunwei37) Personal Github accumulated 2000+ stars.
- **Project List**:
  - **tryC**: A miniature C language interpreter.
  - **blockchain-rust**: A blockchain prototype system written in Rust.
  - **COVID-19-NLP-vis**: COVID-19 data visualization website.
  - **co-uring-WebServer**: A server based on C++20 coroutines and io_uring.
  - **Eunomia**: A prototype container monitoring tool based on eBPF.
  - **ChatGPT-github-stat-plugin**: A ChatGPT Github data statistics and analysis plugin, listed on the official OpenAI marketplace.
- Final Year Project: Cloud-native spatiotemporal data analysis technology based on WebAssembly: A case study of GPlates
  - [gplates-wasm](https://github.com/yunwei37/gplates-wasm): Porting a complex Qt-based open-source desktop software to WebAssembly as a development library and deploying a front and back end system on AWS lambda.

### Competitions & Open Source Contributions

- **[National College Student System Capability Competition](https://os.educg.net/)**
  - **2022**: OS Design Competition Final First Prize - Team Leader, Project: "[Container Monitoring Tool Based on eBPF](https://gitlab.eduxiji.net/educg-group-12099-788067/zhangdiandian-389)".
  - **2023**: OS Design Competition Final First Prize - Mentor, Project: "[Sandbox File System Based on eBPF](https://gitlab.eduxiji.net/202318123111316/project1466467-176078)".
- Other Open Source Contributions:
  - bcc, WasmEdge, xquic

## Technical Stack Keywords

- Programming Languages: Rust, C/C++, Golang, Python, JavaScript/TypeScript, HTML, CSS
- Development Frameworks & CI/CD: Next.js, React, Flask, OpenAPI, GraphQL, Github Actions
- Tools & Cloud Services: Linux, Git, Docker, AWS, Cloudflare
- Runtime & Toolchain: WebAssembly, eBPF, LLVM, Clang
- AI & LLM: OpenAI GPT-4, langchain
