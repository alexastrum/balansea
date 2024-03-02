"use client";

// import Link from "next/link";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";

const Action = ({ data, next }: { data?: string; next: (data: string) => unknown }) => {
  if (data === "?")
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
  if (data === "VIDEO")
    return <iframe src="https://lvpr.tv/?v=d130efwxgnyrgwj9" frameBorder="0" height={700} width={380}></iframe>;
  return <Button onClick={() => next(data || "")}>{data}</Button>;
};

export default Action;
