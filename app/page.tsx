"use client";

import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const DEFAULT_WIDTH = 320;

export default function Home() {
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [width, setWidth] = useState<number | undefined>(DEFAULT_WIDTH);
  const [margin, setMargin] = useState<number | undefined>(0);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [codeColor, setCodeColor] = useState("");
  const [transparent, setTransparent] = useState(false);

  const handleSubmit = async () => {
    if (!url) {
      return alert("You have to set URL!!!");
    }

    if (!width || width === 0) {
      return alert("You have to pass valid width!!!");
    }

    let params = "";

    if (!!backgroundColor || transparent) {
      if (transparent) {
        params += `&bgColor=0000`;
      } else {
        params += `&bgColor=${backgroundColor.replace("#", "")}`;
      }
    }

    if (!!codeColor) {
      params += `&codeColor=${codeColor.replace("#", "")}`;
    }

    if (!!margin) {
      params += `&margin=${margin}`;
    }

    router.push(`/api/qr?url=${url}&width=${width}${params}`);

    setUrl("");
    setWidth(DEFAULT_WIDTH);
    setMargin(0);
    setBackgroundColor("");
    setCodeColor("");
    setTransparent(false);
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="border w-full max-w-2xl p-8 flex flex-col gap-4 rounded">
        <div className="flex justify-center">
          <Image src={"/logo.jpeg"} alt="logo" width={200} height={200} />
        </div>

        <TextField
          label="URL"
          variant="outlined"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <TextField
          label="Width"
          variant="outlined"
          type="number"
          value={width}
          onChange={(event) =>
            setWidth(
              event.target.value ? parseInt(event.target.value) : undefined
            )
          }
        />
        <TextField
          label="Margin"
          variant="outlined"
          type="number"
          value={margin}
          onChange={(event) =>
            setMargin(
              event.target.value ? parseInt(event.target.value) : undefined
            )
          }
        />
        <MuiColorInput
          format="hex"
          value={codeColor}
          onChange={setCodeColor}
          label="Code color"
        />
        <MuiColorInput
          format="hex"
          value={backgroundColor}
          onChange={setBackgroundColor}
          label="Background color"
          disabled={transparent}
        />
        <FormControlLabel
          control={
            <Checkbox
              value={transparent}
              onChange={(event) => setTransparent(event.target.checked)}
            />
          }
          label="Transparent background"
        />

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </main>
  );
}
