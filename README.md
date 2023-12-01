This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## resolutio: Protection Layer for Creator Economy
Welcome to *********resolutio*********’s GitHub repository, where innovation meets protection in the dynamic world of digital creation. *resolutio* is a platform dedicated to empowering creators by providing robust solutions in the fields of blockchain, AI, and intellectual property.

## Overview
We recognise the challenges faced by creators in the $150 billion creator economy. Major platforms often lack essential protection measures, leaving creators vulnerable to scams and unpaid work. Our mission is to bridge this gap by offering a user-friendly platform fortified with anti-AI protection, blockchain stamps, legal contracts/licenses, and a transparent logbook of licensees/buyers.

## Key Features
- **Enhanced Copyright Protection:** Enjoy enhanced copyright protection with blockchain stamps, acting as verification tools for third-party platforms. These stamps, linked to smart contract licenses, govern how your work is used. Weed out illegal use and facilitate easy, legal access to art, ensuring fair compensation and proper attribution for creators.
- **Legal Contracts/Licenses:** Secure your creative assets with robust legal contracts and licenses, providing a clear framework for authorized use and attribution.
- **Log Book:** Maintain a comprehensive repository of protected work and a track record of its legal use. This log book helps distinguish between genuine and unauthorized users, promoting a secure creative environment.
- **AI Legal Bot:** Empower creators with an AI legal bot capable of deciphering complicated terms and licenses. Enhance your understanding of intellectual property and legal intricacies, making informed decisions about your creations.
- **Dispute Resolution Mechanism:** Engage with our creator community-driven dispute resolution mechanism. Community members serving as jurors are rewarded for contributing to the fair resolution of internal and external disputes, fostering a sense of shared responsibility and justice in the creative ecosystem.

## Components

**[Creator Armour]**
In a landscape where many creator platforms fall short in providing robust copyright protection, Resolutio introduces "Creator Armour" to empower creators and safeguard their intellectual property.

The primary features of Creator Armour is

A. User Focused Authentication
B. Blockchain Stamps
C. Versatile Support
D. Chain Flexibility
E. License Integration
F. User-Friendly Transactions

A. User-Focused Authentication: Seamlessly create an account using a wallet address or email, with a hassle-free magic link login option.

B. Blockchain Stamps: Upon creating any form of work, Resolutio automatically generates blockchain stamps on the FVM Chain. However, users have the flexibility to choose their preferred blockchain or even convert stamps into NFTs.

C. Versatile Support: resolutio supports a wide array of creative works, including literary pieces, videos, and evidence of physical creations. For added privacy, creators can encrypt their work using Lighthouse, presenting it on their profile as a secure, locked image.

D. Chain Flexibility: FIL tokens, created on resolutio, can seamlessly transition to other blockchain networks through Axelar, offering creators unparalleled flexibility and control.

F. License Integration: Each work stamped on-chain can be linked to licenses, dictating its usage. resolutio provides built-in options, including Creative Commons licenses and resolutio's own license. Additionally, users can incorporate custom licenses to tailor the terms according to their preferences.

G. User-Friendly Transactions: Facilitating easy transactions, interested parties can directly visit the creator's profile to buy or license their work, streamlining the process for both creators and consumers. All transactions are recorded on our respository. 

In essence, "Creator Armour" not only addresses the existing gaps in copyright protection but also empowers creators with choices, control, and seamless transactions within the Resolutio ecosystem.

**[res bot](https://github.com/resolutio-ai/resolutio-chatbot-api)**

In the vast digital landscape, creators struggle to find relevant and accessible information on protecting their artistic creations. The sheer volume of resources, coupled with the challenge of identifying essential details, creates a barrier for creators seeking to safeguard their intellectual property (IP). Res Chat Bot emerges as a solution to address this problem, offering a user-centric platform that cuts through the noise and provides clear, actionable insights for artists navigating the complexities of art protection.


The primary features of res bot is:
A. Anonymous Usage
B. User Centric Engagement
C. Privacy First
D. Actionable Message Handling

A. Anonymous Usage: Allowing users to access services anonymously and without data storage.

B. User-Centric Engagement & Intuitive Conversation Management: Effortlessly create, view, and manage conversations for a smooth user experience, where users are rewarded for sharing conversational data, fostering a collaborative community approach.

C. Privacy First: Even users who chose to log in and share their data are protected. Their conversations are encrypted using Lighhouse and storage on web3.storage.

Actionable Message Handling: Send, receive, delete, edit, and resend messages with ease, ensuring effective communication.
Platform


Our team is dedicated to programming the app, crafting an intuitive user interface, and conducting thorough testing to ensure quality. Built on React, ResChatBot ensures compatibility with the current platform, supported by a robust REST API created with Node.js. The integration of a secure database enhances data storage and retrieval capabilities.

**[Dispute Resolution]**

We rely on a decentralised dispute resolution mechanism to resolve creator disputes. Currently, victims rely on centralised decisions of marketplaces or creator platforms to take down fake art/NFTs. Even then, many marketplaces are struggling to make timely take down decisions because of the volume of cases and lack of resources.

To resolve this, resolutio has build the tools to invalidate duplicate art in a decentralised and speedy manner. We have build a dispute resolution mechanism which pempowers creator Community to identify whether an NFT is fake and then communicate this decentralised decision to marketplaces, who can then flag stolen/duplicated. The members of the community who participate in the decision making process are rewarded for their role in helping the victims and protecting the ecosystem.

The primary features of the dispute resolution process is

A. Initiate dispute resolution

B. Storage of facts and evidence on IPFS

C. Selection of arbiters from the community

D. Evaluation of the case by arbiters using Covalent API

E. Voting

F. Decision NFT and Rewards

G. Marketplace notification

A. **Initiate Dispute Resolution**

The victim shall initiate dispute resolution by providing a fee and submitting the relavant case details and evidence.

**B. Storage of facts and evidence on IPFS**

The case details and evidence are then stored in IPFS.

**C. Selection of arbiters from NFT Community**

A summary of the dispute is then provided to the arbiter community in the platform. The arbiter community is a group of persons from the NFT Community who will be entrusted with the role of adjudicating disputes and validating/invalidating the artwork. Only those persons who have been provided **arbiter tokens** will have access to the cases and only they may be permitted to take part in the process.

1. **staking**
   If an arbiter is interested to take part in adjudication, they shall go to the Arbiter Disputes page which has the open dispute and chose the requisite dispute. Only those persons with arbiter tokens shall have access to this page. There, on reading the case summary, if they are interested to arbiter a case, they shall choose the stake option and stake crypto. Staking is equivalent to applying to arbiter.
2. **randomised selection**

   Three arbiter’s from the pool is randomly selected to arbiter the dispute. Their likelihood of selection will depend on their experience with the subject matter of the case. For eg. if it is a music  dispute, experience resolving music  disputes will give them a better chance of being selected.

   This is determined by the decision NFTs in their wallet. After each dispute, the final decision is minted as NFTs and transferred to the (majority) arbiters in the case . Each NFT is tagged depending on the subject matter of the dispute. This tag helps the randomisation smart contract identify the subject matter expertise of the applicants

**D. Evaluation of case by arbiters using Covalent API**

The selected arbiters are then provided the case details and evidence, via the IPFS link. The arbiters are also provided arbiter tools. They are provided **Covalent API plug-in** to identify with ease, transactions and wallets related to the relevant NFT(s). [The codebase is available here.](https://github.com/znreza/blockchain-transaction-search)

**E. Voting**

On adjudicating, the arbiters must vote to either validate or invalidate the relevant NFT. This must be made within the time specified in the page.

**F. Decision NFT and Rewards**

The decision made by the majority of arbiters shall determine whether the artwork is valid or invalid. If the majority [3 or more] vote to invalidate it, then on the basis of this vote, final decision NFTs stating that the relevant work is invalid, will be generated and sent to the majority arbiters and the parties to the dispute. These NFTs shall be tagged based on the subject matter of the dispute.

The majority arbiters shall receive a reward for their role and also the crypto they had staked initially. The minority arbiter shall lose their stake amount. The loss of stake is intended to disincentivise arbiters who adjudicate dishonestly. Assumption of honest adjudication is ensured by relying on game theory and rational choice theory.

**G. Marketplace Notification**

Marketplaces and creator platforms are then notified of the decision of the Community to invalidate/validate the artwork. The platform shall encourage marketplaces to flag invalid work as opposed to taking them down, so that the Community has the liberty to decide to buy or refrain from buying it. Flagging the work provides patrons the information necessary to filter bad work. Details about the work is also updated on resolutio's own repository, which consumers of the work may refer to for guidance.

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
