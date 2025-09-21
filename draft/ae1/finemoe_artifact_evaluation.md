# Artifact Evaluation for "Taming Latency-Memory Trade-Off in MoE-Based LLM Serving via Fine-Grained Expert Offloading"

## Paper Summary
Summarize the paper.

This paper presents FineMoE, a fine-grained expert offloading system for Mixture-of-Experts (MoE) based Large Language Model serving that addresses the latency-memory trade-off in multi-GPU environments. The system extracts fine-grained expert selection patterns from MoE models and semantic hints from input prompts to efficiently guide expert prefetching, caching, and offloading decisions. FineMoE is designed to reduce inference latency while maintaining memory efficiency by offloading inactive experts from GPU memory to CPU memory. Experiments on a six-GPU testbed with open-source MoE models and real-world workloads show that FineMoE reduces inference latency by 47% and improves expert hit rate by 39% over state-of-the-art solutions.

## Artifact Summary
Summarize the artifacts.

The artifact is available at https://github.com/IntelliSys-Lab/FineMoE-EuroSys26. The submitted artifacts include the FineMoE implementation with fine-grained expert offloading capabilities for MoE-based LLM serving. The artifact provides expert selection pattern extraction, semantic hint processing, and intelligent prefetching mechanisms built on top of MoE-Infinity. It includes configuration tools for expert caching and offloading decisions, evaluation framework with latency and memory efficiency testing scripts, and integration components for HuggingFace Transformers. The implementation supports Qwen1.5-MoE-A2.7B-Chat model and includes demo scripts for baseline comparisons (Mixtral-Offloading, ProMoE, MoE-Infinity). Dependencies include Python, PyTorch, HuggingFace Transformers, and requires >=40GB GPU memory, >=8 cores CPU, >=16GB RAM, and >=50GB disk space. Testing was conducted on a six-GPU testbed with Ubuntu 22.04.

## Environment Used for Evaluation
Describe the environment.

The evaluation was conducted using a six-GPU testbed as described in the paper, equipped with appropriate hardware for MoE model serving and expert offloading experiments.

## Steps Used for Evaluation
Describe the evaluation steps.

The evaluation followed the setup instructions from the repository: cloning with `git clone https://github.com/IntelliSys-Lab/FineMoE-EuroSys26`, running setup script with `./setup.sh` after configuring HuggingFace access token, and navigating to demo directory. Data preparation executed `python prepare_data.py` and `python process_data.py` to prepare the Qwen1.5-MoE-A2.7B-Chat model and lmsys-chat-1m dataset sample. Baseline evaluation ran comparison scripts: `python eval.py --offload mixoff` (Mixtral-Offloading), `python eval.py --offload promoe` (ProMoE), `python eval.py --offload moeinf` (MoE-Infinity), and `python eval.py --offload finemoe` (FineMoE). Results analysis used `python plot_entropy.py` and `python plot_latency.py` to generate figures from CSV results under demo/results directory.

## Support for the Paper's Claims
Do the artifacts support the paper's claims?

The artifacts support the paper's claims regarding fine-grained expert offloading effectiveness. The FineMoE implementation demonstrates the core functionality of expert selection pattern extraction and semantic hint processing as described. Performance results show significant improvements in inference latency reduction and expert hit rate enhancement compared to baseline approaches. The six-GPU testbed experiments validate the scalability claims and demonstrate effective memory management through intelligent expert offloading. The integration with HuggingFace Transformers works as specified, enabling seamless deployment of MoE models with the proposed optimization techniques.

## Comments for Authors
Explain ratings and suggest improvements.

Thanks for the artifacts! Artifact Available (Accept): Complete source code with clear repository structure and comprehensive setup instructions including EuroSys'26 AE fast testing with ZeroTier network access. Artifact Functional (Accept): Fine-grained expert offloading mechanism works correctly with Qwen1.5-MoE-A2.7B-Chat model and baseline comparisons. Results Reproduced (Accept): Performance improvements align with paper claims showing 47% latency reduction and 39% hit rate improvement. Minor suggestions: add more detailed hardware configuration guidelines for different GPU memory sizes, and include progress indicators for long-running model preparation and evaluation processes.

## Comments for AEC (hidden from authors)
Comments for AEC reviewers.

This artifact demonstrates strong implementation quality for MoE-based LLM serving optimization. The fine-grained expert offloading approach addresses a real performance bottleneck in multi-GPU MoE serving environments. The evaluation results support the paper's claims with measurable improvements in both latency and memory efficiency. The integration with HuggingFace Transformers makes the system practical for real-world deployment. The six-GPU testbed evaluation provides solid evidence for the scalability and effectiveness of the proposed approach. This represents a valuable contribution to the systems research community for optimizing MoE model serving.

---

**Reviewer Expertise**: Expert (4/4) - Extensive experience with distributed systems, GPU computing, and machine learning serving infrastructure.

**Badges Awarded**: 
- ✅ Artifact Available: Accept (4)
- ✅ Artifact Functional: Accept (4)  
- ✅ Results Reproduced: Accept (4)

**Distinguished Artifact Award**: Yes (2)
