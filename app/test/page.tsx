"use client";
import { AppBar } from "@/layouts";
import {
  Button,
  Checkbox,
  Radio,
  Textfield,
  Typography,
} from "@/src/components/atoms";
import { useState } from "react";

export default function Test() {
  const [checkbox, setCheckbox] = useState(false);
  return (
    <div>
      <AppBar />
      <Button variant="contained">Tombol</Button>
      <Button onClick={() => alert("oke")} variant="outlined">
        Tombol
      </Button>
      <Button variant="text">Tombol</Button>
      <Button disabled variant="contained">
        Tombol
      </Button>
      <Button variant="outlined">Tombol Baru</Button>

      <br />
      <br />
      <Textfield
        onChange={(e) => console.log(e)}
        placeholder="isi sesuatu..."
      />
      <br />
      <Textfield
        onChange={(e) => console.log(e)}
        variant="standard"
        placeholder="isi sesuatu..."
      />

      <br />
      <Textfield
        onChange={(e) => console.log(e)}
        label="Nama"
        placeholder="isi sesuatu..."
      />
      <br />
      <Textfield
        onChange={(e) => console.log(e)}
        error="salah password"
        type="password"
        label="Nama"
        variant="standard"
        placeholder="isi sesuatu..."
      />
      <br />
      <Radio
        label="hewan laut"
        name={"hewan"}
        options={["ikan", "gajah"]}
        selectedValue={"gajah"}
        onRadioChange={(item) => console.log(item)}
      />

      <br />
      <br />
      <Typography variant="h1">Hello World</Typography>
      <Typography variant="h2">Hello World</Typography>
      <Typography variant="h3">Hello World</Typography>
      <Typography variant="h4">Hello World</Typography>
      <Typography variant="subtitle">Hello World</Typography>
      <Typography>Hello World</Typography>

      <br />
      <br />
      <Checkbox
        label={"check"}
        name={"check"}
        disabled
        value={checkbox}
        onChange={(value) => {
          setCheckbox(value);
          console.log(value);
        }}
      />
      <br /><br />
    </div>
  );
}
