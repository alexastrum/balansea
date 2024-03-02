"use client";

// import Link from "next/link";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Stack from "@mui/joy/Stack";

const Action = ({ data, next }: { data?: string; next: (data: string) => unknown }) => {
  if (data === "?") {
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          console.log(formJson);
          next(formJson["data"]);
        }}
      >
        <Input name="data" />
      </form>
    );
  }

  if (data === "VIDEO")
    return <iframe src="https://lvpr.tv/?v=d130efwxgnyrgwj9" frameBorder="0" height={700} width={380}></iframe>;

  if (data === "UPGRADE") {
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          console.log(formJson);
          next(JSON.stringify(formData));
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
    );
  }

  return <Button onClick={() => next(data || "")}>{data}</Button>;
};

export default Action;
