"use client";
import { AppBar } from "@/layouts";
import { Button, Radio, Textfield } from "@/src/components/atoms";

export default function Test() {
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
    </div>
  );
}
