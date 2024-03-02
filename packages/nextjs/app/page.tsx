"use client";

// import Link from "next/link";
import { useState } from "react";
import Step from "../components/Step";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Stack from "@mui/joy/Stack";
import { NextPage } from "next";
import { useAccount } from "wagmi";

// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const [prevActions, setPrevActions] = useState(["Balansea welcomes you"]);

  const [nextActions, setActions] = useState<Array<[string[], string[]]>>([
    [
      ["What would you like to achieve today?"],
      ["Develop gratitude", "Increase happiness", "Relief the stress", "Sleep better", "?"],
    ],
    [
      [
        "Taking a minute to reflect on your emotions will help you build mindful reflection into your life.",
        "How are you feeling?",
      ],
      "Happy|Excited|Calm|Sad".split("|"),
    ],
    [["Let’s capture this with a note, so we can remember it later."], ["?", "Next time, I’m in a rush"]],
    [
      [
        "Here’s a meditation that I think you will enjoy.",
        "Please find a quiet place, and make sure you have 10 minutes of uninterrupted time.",
        "Listen to the end, without interruption and I’ll give you a small gift of appreciation.",
        "Press play when you are ready to start.",
      ],
      ["VIDEO", "Pause"],
    ],
    [
      [
        "Looks like you got distracted, or maybe there’s something important you want to do. No worries, I’ll be here when you’re back.",
      ],
      [
        "I’m back, let’s start from the beginning",
        "I won’t get the full reward today, but let’s just resume from what we left off.",
      ],
    ],
    [[], ["VIDEO", "Done"]],
    [
      [
        "Thanks for staying with me!",
        "As a sign of my gratitude for your commitment, here’s 1 $BSEA",
        "Would you consider entring our Premium club? Daily active Premium members receive over 50% of the entire reward pool.",
      ],
      [],
    ],
  ]);

  const next = (data: string) => {
    const lastAction = nextActions.shift();
    if (!lastAction) return;
    setPrevActions([...prevActions, ...lastAction[0], "> " + data]);
    setActions([...nextActions]);
  };

  return (
    <>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} margin={2}>
        {!connectedAddress && (
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} margin={2}>
            {/* <Image alt={""}></Image> */}
          </Stack>
        )}
        <Stack direction="column" alignItems="stretch" spacing={2} width={380}>
          {prevActions.map((p, i) => (
            <Box key={i}>{p}</Box>
          ))}
          <Step data={nextActions[0]} next={next}></Step>
          {/* // <Box sx={{ color: "green" }}>Balansea welcomes you</Box>
          // <Box sx={{ color: "green" }}>Balansea welcomes you</Box>
          // <Box sx={{ color: "green" }}>Balansea welcomes you</Box>
          // <Box sx={{ color: "green" }}>Balansea welcomes you</Box>
          // <Box sx={{ color: "green" }}>Balansea welcomes you</Box>
          // <Box sx={{ color: "green" }}>Balansea welcomes you</Box> */}
        </Stack>
        {connectedAddress && (
          <Stack direction="column" alignItems="stretch" spacing={2} width={380}>
            <form
              onSubmit={event => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries((formData as any).entries());
                console.log(formJson);
              }}
            >
              <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2}>
                <Box fontSize={20} fontFamily={"fantasy"}>
                  Get Balansea Premium
                </Box>
                <Select placeholder="Payment network">
                  <Option value="1">Ethereum</Option>
                  <Option value="x">Base</Option>
                </Select>
                <Select placeholder="Payment token">
                  <Option value="ETH">ETH</Option>
                  <Option value="USDC">USDC</Option>
                  <Option value="DAI">DAI</Option>
                </Select>
                <Select defaultValue="month">
                  <Option value="month">1 Month - 0.01 ETH</Option>
                  <Option value="year">1 Year (25% off) - 0.09 ETH</Option>
                  <Option value="5year">5 Years (50% off) - 0.3 ETH</Option>
                </Select>
                <Box>0x network fee: 0%</Box>
                <Button type="submit">Buy</Button>
              </Stack>
            </form>

            <iframe src="https://lvpr.tv/?v=d130efwxgnyrgwj9" frameBorder="0" height={700} width={380}></iframe>
          </Stack>
        )}
      </Stack>
    </>
    // <>
    //   <div className="flex items-center flex-col flex-grow pt-10">
    //     <div className="px-5">
    //       <h1 className="text-center">
    //         <span className="block text-2xl mb-2">Welcome to</span>
    //         <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
    //       </h1>
    //       <div className="flex justify-center items-center space-x-2">
    //         <p className="my-2 font-medium">Connected Address:</p>
    //         <Address address={connectedAddress} />
    //       </div>
    //       <p className="text-center text-lg">
    //         Get started by editing{" "}
    //         <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
    //           packages/nextjs/app/page.tsx
    //         </code>
    //       </p>
    //       <p className="text-center text-lg">
    //         Edit your smart contract{" "}
    //         <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
    //           YourContract.sol
    //         </code>{" "}
    //         in{" "}
    //         <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
    //           packages/hardhat/contracts
    //         </code>
    //       </p>
    //     </div>

    //     <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
    //       <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
    //         <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
    //           <BugAntIcon className="h-8 w-8 fill-secondary" />
    //           <p>
    //             Tinker with your smart contract using the{" "}
    //             <Link href="/debug" passHref className="link">
    //               Debug Contracts
    //             </Link>{" "}
    //             tab.
    //           </p>
    //         </div>
    //         <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
    //           <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
    //           <p>
    //             Explore your local transactions with the{" "}
    //             <Link href="/blockexplorer" passHref className="link">
    //               Block Explorer
    //             </Link>{" "}
    //             tab.
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default Home;
