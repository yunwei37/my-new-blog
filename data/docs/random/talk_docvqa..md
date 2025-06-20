# docvqa talk

## Slide 1

Hello everyone, my name is Yusheng Zheng, and I am here to present a work titled “DocMIA: Document-Level Membership Inference Attacks against DocVQA Models.” This is a arxiv paper in this Febuary. They investigated how Document Visual Question Answering systems, or DocVQA systems, can leak private information about the training data. Now, I would like to give an overview of what I will cover.

---

## Slide 2

Here is the outline of the presentation. I will begin by introducing what DocVQA is and why it is important, as well as the motivation behind studying membership inference in this area. Then I will move on to some background about how DocVQA typically works and how membership inference attacks operate in machine learning. After that, I will explain the threat model and the specific problem the authors are tackling, followed by a detailed look at DocMIA in both white-box and black-box scenarios. I will present the results from their experiments, showing how effective these attacks can be, and finally, I will conclude with key takeaways and discuss possible directions for future work.

---

## Slide 3 

DocVQA is a type of system that uses large language models capable of handling both text and images. These models can answer questions about documents like invoices or forms, making them extremely valuable in fields such as finance, insurance, and government services. However, the authors warn that these documents can be very private, containing personal or sensitive data. The fact that a single document can appear many times with different question-answer pairs makes it more likely for the system to memorize and potentially reveal certain parts of that document. This leads to a privacy threat known as a membership inference attack, or MIA, where an attacker figures out if a specific document was used for training the model. Because DocVQA models sometimes see the same document multiple times, the chance of memorizing it and leaking membership is higher. Now, I will move on to a bit of background that explains how DocVQA works in more detail, and how membership inference attacks have typically been done in other contexts.

---

## Slide 4
 
On this slide, we see the general idea of how a DocVQA model operates. Typically, you have a scanned document image—possibly a PDF or a photo of a form—and you also have a question like “What is the total invoice amount?” The model combines the visual representation of the page with the textual question to generate an answer in a step-by-step fashion. Some DocVQA models rely on optical character recognition, while others process the raw pixels to extract text content. This shift toward fully end-to-end solutions is helpful for automating tasks, but it can also raise privacy concerns because these models learn from the text and layout that might contain confidential details. With that in mind, I will now describe a bit more about membership inference and why it poses a threat to these DocVQA systems.

---

## Slide 5 

DocVQA takes a document image together with a text-based query and generates an answer token by token. This makes it different from traditional classification tasks where we simply get a probability over a set of classes. In classical membership inference, an attacker often relies on those probability scores or the final loss to guess if a sample was in the training set. But DocVQA is multi-modal and produces an entire sequence of tokens, which means the usual single-step methods do not directly apply here. 

Another important point is that membership inference techniques often train what are called shadow models on large auxiliary datasets. But according to the authors, it is impractical to get big collections of real documents for shadow training because real documents are private and not as openly available. 

Therefore, we need membership inference methods that can work with multi-modal data and do not require large external datasets. Now, I will move on to the authors’ threat model and see exactly how they set up the problem.

---

## Slide 6

The authors define two main scenarios in which an attacker might attempt a membership inference attack. The first is white-box, where the attacker can see and manipulate all the model’s internal parameters and gradients. The second is black-box, where the attacker can only query the model with questions about a document and receive the generated answers, with no insight into the internal weights. In both scenarios, the objective is the same: figure out whether a particular document was in the training set. 

Because each document can appear multiple times in training with different questions, an attacker can potentially gather many signals from multiple queries. A big hurdle is that the attacker cannot rely on training a bunch of shadow models, because they lack access to a large public dataset of private documents. The authors instead create an unsupervised approach, meaning they do not rely on external labels or shadow training. Next, I will move on to how they tackle this problem in the white-box setting, where the attacker has the most information about the model’s internals.

---

## Slide 7
 
In the white-box scenario, the authors propose an gradient-based optimization method to detect membership. The idea is that if the model already saw a certain document during training, then the parameters are likely close to the optimized for that document’s question-answer pairs. 

Specifically, they fine-tune the target DocVQA model on an individual document/question-answer pair and compute the distance required to reach the optimal answer. A small average distance means the document is likely part of the training set, while a larger distance means it's likely a non-training document. In addition, the number of optimization steps is an main feature that reflects the efficiency of the optimization process. If you have a good starting point from the target model and the learning rate is set well, training documents usually reach optimal results faster than non-training documents.

Consequently, they include both the distance and the number of optimization steps in their feature set for white-box attacks.
Next, I will show how they reduced the computation by only fine-tuning certain parts of the model or even the document image itself.

---

## Slide 8 

Because these DocVQA models are usually large, the authors introduced three variants to keep things efficient. The first is FL, where they only allow one layer in the model—like the last layer—to be updated, and everything else is frozen. The second is FLLoRA, where they insert low-rank adaptation modules into that same layer, which further reduces the number of parameters that need updating. The third is IG, or Image Gradient, in which they keep the model weights completely fixed and instead adjust the pixels of the input image until the model’s answer matches the ground truth. In all three approaches, the core principle is that the training documents are closer to the optimum, so fewer updates or smaller updates are required to fine-tune. After collecting these signals for the various question-answer pairs of one document, they aggregate them to decide if the document is likely a training member. Now, I will explain how they handle the black-box setting, where the attacker cannot see any parameters or gradients.

---

## Slide 9 

In the black-box setting, the attacker only sees the final outputs for each query. The authors solve this by training a “proxy” model to mimic the black-box’s behavior. First, they query the black-box with the documents in question and collect its generated answers. Then they train a separate DocVQA model, called a proxy, to replicate those answers. Once that proxy model learns to produce the same outputs, it should inherit some of the membership signals from the black-box, because any memorization in the original model is reflected in its answers. Now that the attacker controls the proxy fully, they can perform the same white-box fine-tuning tricks—FL, FLLoRA, IG—on that proxy. The authors show that even if the proxy has a different architecture, this still works quite well. Next, I will move on to the experimental setup where they tested these methods, and then I will share some results that demonstrate the effectiveness of DocMIA attacks.

---

## Slide 10 
 
The authors tested their approach on two well-known DocVQA datasets. One is PFL-DocVQA, often dealing with invoices and providers, and the other is simply called DocVQA or DVQA, which is a general-purpose benchmark. They used three types of state-of-the-art models as targets: Visual T5, Donut, and Pix2Struct, and Pix2Struct even has a Base and a Large variant. For their evaluations, they collected 600 documents for each test—300 that were actually in the training set and 300 that were not. They then measured how well they could distinguish those “members” from “non-members.” They reported metrics like Balanced Accuracy, F1 score, and also how many true members they catch at a very low false positive rate. That last one is important because in real scenarios, you do not want to mistakenly accuse too many non-members of being in the training set. I will now highlight some of the results they achieved in white-box and black-box scenarios.

---

## Slide 11

In the white-box setting, the authors’ optimization-based attacks perform very well. One highlight is that on the Donut model trained for the PFL-DocVQA dataset, they got an F1 score up to about 82.5 percent. For the other models, such as VT5 or Pix2Struct, the F1 scores generally hovered around the 70s. They also looked at low false positive regimes, like 3 percent, and found that they could still capture around 23 percent of true training members, which is a strong result for membership inference. The authors also compared their approach to older or simpler attacks that rely solely on final losses or single-step gradient checks. Their approach, which involves actually doing small fine-tunes and seeing how easy it is to re-optimize, consistently outperforms those baselines. Now I will show how they adapted it to the black-box scenario and how well it worked there.

---

## Slide 12

Moving on to the black-box scenario, they used the distillation approach described earlier. By collecting answers from the black-box and training a proxy model, they saw consistent improvements over naive methods that just rely on how confident the black-box is or how good the final answers look. For example, against the Pix2Struct-B model, they saw a jump of around 3 percent in accuracy and nearly 5 percent in F1 compared to the strongest baseline they tested. The authors also mention that even if the black-box and the proxy model have different architectures, the membership signals still get transferred. This is because the black-box outputs contain traces of memorized information that the proxy can learn to replicate. The main takeaway is that if a model has memorized training examples, an attacker only needs the outputs to unlock that memorization, making membership inference feasible without full internal access. Finally, I’ll wrap up with their conclusions and possible directions for future development or defenses.

---

## Slide 13 

In summary, the authors introduced DocMIA, the first method that specifically tackles document-level membership inference in DocVQA tasks. Their contributions include developing novel attacks that do not need extra auxiliary data in both white-box and black-box environments, and they achieve strong performance across different models, surpassing existing baseline approaches. This work highlights that repeated question-answer pairs can intensify the memorization of certain documents, so sensitive data is definitely at risk.

One limitation of this paper is that while the authors highlight a serious privacy risk, they don’t actually propose or test any specific defenses against it.

Another challenge is the computational cost of their approach. Their attack method involves fine-tuning the model or modifying document images to test for membership, which can be expensive—especially for large models. They do try to reduce this cost by introducing three optimization strategies, FL, FLLoRA, and IG, but even with these improvements, their method could still be difficult to scale in real-world applications where you might want to test a large number of documents.

Finally, their attack assumes that the adversary knows, or can reasonably guess, the types of questions used during training. The authors argue that this is a reasonable assumption because documents often follow predictable formats—for example, invoices will have questions about totals or dates. However, in some cases, an attacker may not have this knowledge, which could reduce the success of the attack. If the actual training questions were very different from what the attacker expects, the attack might not work as well as reported in this paper.

For future research, they suggest exploring defenses, such as differential privacy or specialized ways to edit or prune models to remove memorized content. 

They also think this line of research might extend to other multimodal tasks, for instance, large vision–language models that generate paragraphs based on images, since the same membership-leakage principle might apply. Now, I will end with a brief thanks and see if you have any questions.

---

## Slide 14

Thank you very much for your time. I hope the presentation has clarified how DocVQA models can be vulnerable to membership inference attacks, and how the authors’ optimization-based strategies reveal these privacy risks in both white-box and black-box settings. If you have any questions, I’d be happy to discuss them now or speak with you afterward.

