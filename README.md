This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Components

**[Image Verification](https://github.com/resolutio-ai/resolutio-ai/tree/main/components/imageVerification)**

Millions of art gets minted as NFTs without artist consent or gets duplicated into fake NFTs. Sheer volume of such cases make it difficult for people to keep track of stolen art/NFTs. By using the **AI-powered Image** Verification solution on our platform, you can verify whether your art has been stolen/duplicated.

If you find duplicate or unauthorised NFTs, you may choose to invalidate it through our decentralised dispute resolution mechanism. First you must identify the fake NFT Asset IDs. Thereafter, on clicking the fake ID’s, you will be taken to the dispute resolution page, where you will be asked to ‘initiate’ our NFT Community based dispute resolution process.

**[Dispute Resolution](https://github.com/resolutio-ai/resolutio-ai/tree/main/components/disputeResolution)**

We rely on a decentralised dispute resolution mechanism to invalidate fake NFTs. Currently, victims rely on centralised decisions of marketplaces to take down fake art/NFTs. Even then, many marketplaces are struggling to make timely take down decisions because of the volume of cases and lack of resources.

To resolve this, resolutio has build the tools to invalidate NFTs in a decentralised and speedy manner. We have build a dispute resolution mechanism which provides the power to the NFT Community to identify whether an NFT is fake and then communicate this decentralised decision to marketplaces, who can then flag stolen NFTs. The members of the community who participate in the decision making process are rewarded for their role in helping the victims and protecting the NFT ecosystem.

The primary features of the dispute resolution process is

A. Initiate dispute resolution

B. Storage of facts and evidence on IPFS

C. Selection of arbiters from the NFT community

D. Evaluation of the case by arbiters using Covalent API

E. Voting

F. Decision NFT and Rewards

G. Marketplace notification

A. **Initiate Dispute Resolution**

The victim shall initiate dispute resolution by providing a fee and submitting the relavant case details and evidence.

**B. Storage of facts and evidence on IPFS**

The case details and evidence are then stored in IPFS.

**C. Selection of arbiters from NFT Community**

A summary of the dispute is then provided to the arbiter community in the platform. The arbiter community is a group of persons from the NFT Community who will be entrusted with the role of adjudicating NFT disputes and validating/invalidating NFTs. Only those persons who have been provided **arbiter tokens** will have access to the cases and only they may be permitted to take part in the process.

1. **staking**
   If an arbiter is interested to take part in adjudication, they shall go to the Arbiter Disputes page which has the open dispute and chose the requisite dispute. Only those persons with arbiter tokens shall have access to this page. There, on reading the case summary, if they are interested to arbiter a case, they shall choose the stake option and stake crypto. Staking is equivalent to applying to arbiter.
2. **randomised selection**

   Three arbiter’s from the pool is randomly selected to arbiter the dispute. Their likelihood of selection will depend on their experience with the subject matter of the case. For eg. if it is a music NFT dispute, experience resolving music NFT disputes will give them a better chance of being selected.

   This is determined by the decision NFTs in their wallet. After each dispute, the final decision is minted as NFTs and transferred to the (majority) arbiters in the case . Each NFT is tagged depending on the subject matter of the dispute. This tag helps the randomisation smart contract identify the subject matter expertise of the applicants

**D. Evaluation of case by arbiters using Covalent API**

The selected arbiters are then provided the case details and evidence, via the IPFS link. The arbiters are also provided arbiter tools. They are provided **Covalent API plug-in** to identify with ease, transactions and wallets related to the relevant NFT(s). [The codebase is available here.](https://github.com/znreza/blockchain-transaction-search)

**E. Voting**

On adjudicating, the arbiters must vote to either validate or invalidate the relevant NFT. This must be made within the time specified in the page.

**F. Decision NFT and Rewards**

The decision made by the majority of arbiters shall determine whether the NFT is valid or invalid. If the majority [3 or more] vote to invalidate it, then on the basis of this vote, final decision NFTs stating that the relevant NFT is invalid, will be generated and sent to the majority arbiters and the parties to the dispute. These NFTs shall be tagged based on the subject matter of the dispute.

The majority arbiters shall receive a reward for their role and also the crypto they had staked initially. The minority arbiter shall lose their stake amount. The loss of stake is intended to disincentivise arbiters who adjudicate dishonestly. Assumption of honest adjudication is ensured by relying on game theory and rational choice theory.

**G. Marketplace Notification**

Marketplaces are then notified of the decision of the NFT Community to invalidate/validate the NFTs. The platform shall encourage marketplaces to flag invalid NFTs as opposed to taking them down, so that the Community has the liberty to decide to buy or refrain from buying it. Flagging the NFT provides patrons the information necessary to filter bad NFTs.

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
