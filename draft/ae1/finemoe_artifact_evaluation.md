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



## Support for the Paper's Claims
Do the artifacts support the paper's claims?



## Comments for Authors
Explain ratings and suggest improvements.



## Comments for AEC (hidden from authors)
Comments for AEC reviewers.



