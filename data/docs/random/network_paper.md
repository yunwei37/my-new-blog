# Paper Reading List for Computer Networks

This reading list covers foundational and advanced topics in computer networks, ranging from classic distributed hash tables (DHTs) and peer-to-peer (P2P) systems to modern advancements in data center networking, wireless routing, WiFi security, quantum networks, hashing, and distributed learning. The selected papers provide a comprehensive understanding of key network protocols, architectures, and optimizations that have shaped the field over the years.

The list is organized into categories to facilitate structured reading. Whether you're exploring scalable P2P lookup mechanisms, efficient data center network designs, or quantum networking concepts, these papers will serve as essential resources for deeper insights. Additionally, emerging topics such as advanced hashing techniques and distributed federated learning are included to highlight recent research directions.

It's used in my computer network class.

DHT and P2P:

[1] I. Stoica, et al., [Chord: A Scalable Peer-to-peer Lookup Service for Internet Applications (Links to an external site.)](http://conferences.sigcomm.org/sigcomm/2001/p12-stoica.pdf), ACM SIGCOMM, 2001.

[2] Bruce M. Maggs and Ramesh K. Sitaraman, [Algorithmic Nuggets in Content Delivery (Links to an external site.)Links to an external site.](https://people.cs.umass.edu/~ramesh/Site/PUBLICATIONS_files/CCRpaper_1.pdf), SIGCOMM CCR, 2015.

[3] Frank Dabek, Russ Cox, Frans Kaashoek, Robert Morris, [Vivaldi: A Decentralized Network Coordinate System (Links to an external site.)](https://pdos.csail.mit.edu/papers/vivaldi:sigcomm/paper.pdf), in SIGCOMM, 2004.

Data center networks:

[4] M. Al-Fares, et al.,[A Scalable, Commodity Data Center Network ArchitectureLinks to an external site.](https://cseweb.ucsd.edu//~vahdat/papers/sigcomm08.pdf), ACM SIGCOMM, 2008.

[5] Xiaoqiao Meng, Vasileios Pappas, Li Zhang,  [Improving the scalability of data center networks with traffic-aware virtual machine placementLinks to an external site.](https://www.labri.fr/perso/eyraud/pmwiki/uploads/Main/Meng2010Improving.pdf), IEEE INFOCOM, 2010.

[6]  [(Links to an external site.)](https://people.inf.ethz.ch/asingla/papers/jellyfish-nsdi12.pdf)Ankit Singla, Chi-Yao Hong , Lucian Popa , P. Brighten Godfrey,[Jellyfish: Networking Data Centers Randomly  (Links to an external site.)Links to an external site.](https://www.usenix.org/system/files/conference/nsdi12/nsdi12-final82.pdf), in NSDI 2012

[7] Ye Yu and Chen Qian, [Space Shuffle: A Scalable, Flexible, and High-Bandwidth Data Center NetworkLinks to an external site.](https://users.soe.ucsc.edu/~qian/papers/SpaceShuffle.pdf), in Proceedings of 21th IEEE International Conference on Network Protocols (ICNP), 2014.

Wireless routing

[8] Karp and Kung, [GPSR: Greedy Perimeter Stateless Routing for Wireless Networks (Links to an external site.)](https://www.eecs.harvard.edu/~htk/publication/2000-mobi-karp-kung.pdf), in Proc. of ACM Mobicom 2000.

[9] Ben Leong, Barbara Liskov, and Robert Morris, [Geographic Routing without Planarization (Links to an external site.)](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.61.6307&rep=rep1&type=pdf), in NSDI 2006.

[10] Simon Lam and Chen Qian, "[Geographic Routing in d-dimensional Spaces with Guaranteed Delivery and Low StretchLinks to an external site.](https://users.soe.ucsc.edu/~qian/papers/LamQian11.pdf)," in Proceedings of ACM SIGMETRICS, 2011.

WiFi security

[11] Nikita Borisov, Ian Goldberg, David Wagner, [Intercepting Mobile Communications: The Insecurity of 802.1](https://cs.uwaterloo.ca/~iang/pubs/wep-mob01.pdf)1, in Proc. of ACM Mobicom 2001.

Quantum Networks

[12] [Quantum internet: A vision for the road ahead (Links to an external site.)](https://qutech.nl/wp-content/uploads/2018/10/Quantum-internet-A-vision.pdf), S Wehner, D Elkouss, R Hanson, Science 2018.

[13] [Concurrent Entanglement Routing for Quantum Networks: Model and DesignsLinks to an external site.](https://users.soe.ucsc.edu/~qian/papers/QuantumRouting.pdf), Shouqian Shi and Chen Qian, in *Proc. of ACM SIGCOMM* 2020.

[14] [Designing a quantum network protocolLinks to an external site.](https://dl.acm.org/doi/pdf/10.1145/3386367.3431293), W Kozlowski et al., in in *Proc. of ACM CONEXT* 2020.

Bloom Filter

[15] Andrei Broder and Michael Mitzenmacher, [Network Applications of Bloom Filters: A Survey (Links to an external site.)](https://www.eecs.harvard.edu/~michaelm/postscripts/im2005b.pdf), in Internet Mathematics, 2005.

[16] Li Fan, Pei Cao, Jussara Almeida, and Andrei Z. Broder, [Summary Cache: A Scalable Wide-Area Web Cache Sharing Protocol (Links to an external site.)](http://pages.cs.wisc.edu/~jussara/papers/00ton.pdf), in IEEE/ACM TRANSACTIONS ON NETWORKING, 2000.

Hashing

[17] [Cuckoo Hashing for Undergraduates (Links to an external site.)](http://www.itu.dk/people/pagh/papers/cuckoo-undergrad.pdf), Rasmus Pagh

[18] [Cuckoo filter: Practically better than Bloom (Links to an external site.)](http://www.cs.cmu.edu/~dga/papers/cuckoo-conext2014.pdf), Fan, Bin; Andersen, Dave G.; Kaminsky, Michael; Mitzenmacher, Michael D. , Proc. 10th ACM Int. Conf. Emerging Networking Experiments and Technologies (CoNEXT '14)

[19] M. Wang, M. Zhou, S. Shi, C. Qian, [Vacuum Filters: More Space-Efficient and Faster Replacement for Bloom and Cuckoo Filters (Links to an external site.)](http://www.vldb.org/pvldb/vol13/p197-wang.pdf), in the Proceedings of the VLDB Endowment, 2020.

[20] Ye Yu, Djamal Belazzougui, Chen Qian, and Qin Zhang [Memory-efficient and Ultra-fast Network Lookup and Forwarding using Othello HashingLinks to an external site.](https://users.soe.ucsc.edu/~qian/papers/Othello_2017.pdf), in IEEE ICNP, 2017

[21] [CRLite: a Scalable System for Pushing all TLS Revocations to All Browsers (Links to an external site.)](https://mislove.org/publications/CRLite-Oakland.pdf%C2%A0), James Larisch, David Choffnes, Dave Levin, Bruce M. Maggs, Alan Mislove, and Christo Wilson, In Proc. of IEEE Symposium on Security and Privacy (Oakland 2017).

[22] Shouqian Shi and Chen Qian, [Ludo Hashing: Compact, Fast, and Dynamic Key-value Lookups for Practical Network Systems](https://users.soe.ucsc.edu/~qian/papers/LudoHashing.pdf), (long-paper presentation) in *Proc. of ACM SIGMETRICS* 2020

[23] Y. Liu, S. Shi, M. Xie, H. Litz, C. Qian, [Smash: Flexible, Fast, and Resource-efficient Placement and Lookup of Distributed Storage](https://users.soe.ucsc.edu/~qian/papers/Smash.pdf), *Proceedings of the ACM on Measurement and Analysis of Computing Systems* and *ACM SIGMETRICS* conference, May 2023.

[24] Yi Liu, Minghao Xie, Shouqian Shi, Yuanchao Xu, Heiner Litz, Chen Qian; [Outback: Fast and Communication-efficient Index for Key-Value Store on Disaggregated Memory](https://canvas.ucsc.edu/courses/78907/files/10266390?wrap=1) [Download Outback: Fast and Communication-efficient Index for Key-Value Store on Disaggregated Memory](https://canvas.ucsc.edu/courses/78907/files/10266390/download?download_frd=1). In *Proc. of the 51st International Conference on Very Large Data Bases (VLDB)*, 2025

[Download Outback: Fast and Communication-efficient Index for Key-Value Store on Disaggregated Memory](https://canvas.ucsc.edu/courses/78907/files/10266390/download?download_frd=1)

Bitcoin

[25] Satoshi Nakamoto, [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf)

Distributed learning

[26] Yifan Hua, Jinlong Pang, Xiaoxue Zhang, Yi Liu, Xiaofeng Shi, Bao Wang, Yang Liu, and Chen Qian, [Towards Practical Overlay Networks for Decentralized Federated LearningLinks to an external site.](https://arxiv.org/pdf/2409.05331), in *Proc. of IEEE International Conference on Network Protocols (ICNP 2024)*,