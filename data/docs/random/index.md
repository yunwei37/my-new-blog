# 郑昱笙

- 手机：+8613372543711
- 邮箱：<yunwei356@gmail.com> / <1067852565@qq.com>
- Github：[github.com/yunwei37](https://github.com/yunwei37)
- Website: [www.yunwei37.com](https://www.yunwei37.com/)

## 教育经历

### 浙江大学

**2018年09月 - 2023年06月**  专业：地理信息科学 本科

- 主修课程：面向对象程序设计、操作系统、计算机网络、高级数据结构与算法分析、软件工程、地理空间数据库、计算机体系结构、编译原理等
- 公开课：MIT 6.828 2018 操作系统 lab、南京大学 软件分析

## 实习经历

### 中科院软件所程序语言与编译技术实验室（PLCT）

- **时间**：2022年11月 - 2023年7月
- **职位**：工具链开发实习生
  - 带领 eBPF 小队维护 `eunomia-bpf` 开源社区，并向 eBPF/Wasm 相关上游社区社区积极贡献代码。
  - 创立并维护第一个在 Wasm 上的通用 eBPF 程序运行时与工具链。
  - 重构 bcc 运行时，实现了 bcc 代码向 libbpf 转换，支持 CO-RE 特性，并促进 bcc 生态向 libbpf 转变。

### 上海那一科技有限公司

- **时间**：2021年11月 - 2022年10月
- **职位**：静态分析实习生
  - 独立设计并实现基于 clang static analyzer、infer 和 clang libtooling 的静态分析检查器，成功覆盖 MISRA C:2012、MISRA C++:2008、GJB8114 等规范的众多规则。
  - 基于 Go 的 AST 和 SSA 设计并实现 Go 静态分析检查工具，并与其他开源产品进行集成。
  - 对多个 C 语言和 Go 语言开源项目进行静态分析测试。

### repomono

- **时间**：2020年09月 - 2021年06月
- **职位**：后端开发实习生
  - 参与开发面向 monorepos 的 DevOps 工具链。
  - 利用 PEG 文法设计并实现了类似 KQL 的搜索查询语法模块和相关 API。
  - 使用 libgit2 构建权限控制系统，并通过 perf 等工具优化性能，显著提高 git repo 的处理速度。

### 项目经历

#### [eunomia-bpf 开源社区](https://eunomia.dev/)

- **简介**：专注于简化 eBPF 程序的编写、分发和动态加载流程，探索 eBPF 和 Wasm、AI 结合的技术的开源社区。
- **时间**：2022年03月 - 至今
- **角色**：创始人和主要开发者
- **成果**：
  - 社区累计获得 1700+ stars。
  - 在 eBPF application landscape 上受到关注。
  - **Github**：[eunomia-bpf](https://github.com/eunomia-bpf)
- **子项目**：
  - [**eunomia-bpf**](https://github.com/eunomia-bpf/eunomia-bpf)：CO-RE 轻量级开发框架，用于简化 eBPF 应用的开发、构建和运行。
  - [**Wasm-bpf**](https://github.com/eunomia-bpf/wasm-bpf)：第一个基于 WebAssembly 的用于通用 eBPF 程序的用户态开发库、工具链和运行时。
  - [**GPTtrace**](https://github.com/eunomia-bpf/GPTtrace)：使用 GPT 通过自然语言生成 eBPF 程序和追踪 Linux 内核。
  - [**bpf-developer-tutorial**](https://github.com/eunomia-bpf/bpf-developer-tutorial)：以实例教授的 eBPF 开发者教程。

#### 中科院开源之夏 2022 - APISIX 社区

- **项目名**：nginx-lua-ebpf-toolkit
- **简介**：一个基于 eBPF 对 lua 虚拟机进行采样和火焰图性能分析的工具。

#### OS Summer of Code 2020

- **Github**：[zCore](https://github.com/rcore-os/zCore) 在 Rust 编写的教学操作系统上进行的开发。
- **主要贡献**：
  - 实现进程间通信机制。
  - 基于 async/await 的 poll/select syscall 实现。
  - 在 zCore 上成功移植 gcc。
  - 完善单元测试框架及 libc-test 测试框架。

#### 其他个人开源项目

- **Github**：[yunwei37](https://github.com/yunwei37) 个人 Github 累计获得 2000+ stars。
- **项目列表**：
  - **tryC**：C 语言的微型解释器。
  - **blockchain-rust**：Rust 编写的区块链原型系统。
  - **COVID-19-NLP-vis**：疫情数据可视化网站。
  - **co-uring-WebServer**：基于 C++20 协程和 io_uring 的服务器。
  - **Eunomia**：基于 eBPF 的容器监控工具原型。
  - **ChatGPT-github-stat-plugin**: ChatGPT Github 数据统计与分析插件，上架 OpenAI 官方市场
- 毕业设计：基于 WebAssembly 的云原生时空数据分析技术研究：以 GPlates 为例
  - [gplates-wasm](https://github.com/yunwei37/gplates-wasm): 将基于 Qt 的复杂桌面端开源软件移植到 WebAssembly 中，作为开发库使用，并在 AWS lambda 上部署前后端系统

### 竞赛经历 & 开源贡献

- **[全国大学生系统能力大赛](https://os.educg.net/)**
  - **2022**：操作系统设计赛决赛一等奖 - 参赛队长，项目：“[基于 eBPF 的容器监控工具](https://gitlab.eduxiji.net/educg-group-12099-788067/zhangdiandian-389)”。
  - **2023**：操作系统设计赛决赛一等奖 - 导师，项目：“[基于 eBPF 实现的沙盒文件系统](https://gitlab.eduxiji.net/202318123111316/project1466467-176078)”。
- 其他开源贡献
  - bcc、WasmEdge、xquic

## 技术栈关键词

- 编程语言：Rust、C/C++、Golang、Python、JavaScript/TypeScript、HTML、CSS
- 开发框架与 CI/CD：Next.js、React、Flask、OpenAPI、GraphQL、Github Actions
- 工具与云服务：Linux、Git、Docker、AWS、Cloudflare
- 运行时和工具链：WebAssembly、eBPF、LLVM、Clang
- AI 与 LLM: OpenAI GPT-4、langchain
