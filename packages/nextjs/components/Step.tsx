"use client";

// import Link from "next/link";
import Action from "./Action";
import Box from "@mui/joy/Box";

const Step = ({ data, next }: { data?: [string[], string[]]; next: (data: string) => unknown }) => {
  return (
    <>
      {data && data[0].map((l, i) => <Box key={i}>{l}</Box>)}
      {data && data[1].map((l, i) => <Action key={i} data={l} next={next}></Action>)}
    </>
  );
};

export default Step;
