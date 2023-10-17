"use client";
import { ToggleDarkMode } from "@/components/atoms";
import {
  Autocomplete,
  Button,
  Checkbox,
  IconButton,
  Logo,
  Radio,
  Select,
  SwitchToggle,
  Textfield,
  Typography,
} from "@/src/components/atoms";
import { NavGroup } from "@/src/components/molecules";
import { Footer, NavBar } from "@/src/components/organisms";
import { mainPages } from "@/src/data/pages";
import { useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { FiLoader } from "react-icons/fi";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
  { id: 6, name: "urward Reynolds" },
  { id: 7, name: "enton Towne" },
  { id: 8, name: "herese Wunsch" },
  { id: 9, name: "enedict Kessler" },
  { id: 10, name: "atelyn Rohan" },
  { id: 11, name: "rward Reynolds" },
  { id: 12, name: "nton Towne" },
  { id: 13, name: "erese Wunsch" },
  { id: 14, name: "nedict Kessler" },
  { id: 15, name: "telyn Rohan" },
  { id: 16, name: "ward Reynolds" },
  { id: 17, name: "ton Towne" },
  { id: 18, name: "rese Wunsch" },
  { id: 19, name: "edict Kessler" },
  { id: 20, name: "elyn Rohan" },
  { id: 21, name: "Durward Reynolds" },
  { id: 22, name: "Kenton Towne" },
  { id: 23, name: "Therese Wunsch" },
  { id: 24, name: "Benedict Kessler" },
  { id: 25, name: "Katelyn Rohan" },
  { id: 26, name: "urward Reynolds" },
  { id: 27, name: "enton Towne" },
  { id: 28, name: "herese Wunsch" },
  { id: 29, name: "enedict Kessler" },
  { id: 30, name: "atelyn Rohan" },
  { id: 31, name: "rward Reynolds" },
  { id: 32, name: "nton Towne" },
  { id: 33, name: "erese Wunsch" },
  { id: 34, name: "nedict Kessler" },
  { id: 35, name: "telyn Rohan" },
  { id: 36, name: "ward Reynolds" },
  { id: 37, name: "ton Towne" },
  { id: 38, name: "rese Wunsch" },
  { id: 39, name: "edict Kessler" },
  { id: 40, name: "elyn Rohan" },
];

const a = people.map((p) => p.name);

export default function Test() {
  const [checkbox, setCheckbox] = useState(false);
  const [promo, setPromo] = useState(false);
  const [person, setPerson] = useState("");
  const [data, setData] = useState(null);

  const setData2 = (e: any) => {
    setData(e);
    console.log(e);
  };

  return (
    <div>
      <NavBar pages={mainPages} />
      <br />
      <br />
      <ToggleDarkMode />
      <Button variant="contained">Tombol</Button>
      <Button onClick={() => alert("oke")} variant="outlined">
        Tombol
      </Button>
      <Button variant="text">Tombol</Button>
      <Button disabled variant="contained">
        Tombol
      </Button>
      <Button icon={<FiLoader />} variant="contained">
        Tombol Baru
      </Button>
      <Button loading icon={<AiOutlineCloudDownload />} variant="outlined">
        Tombol Baru
      </Button>
      <Button
        loading
        onClick={() => alert("hell0")}
        size="full"
        icon={<FiLoader />}
      >
        Tombol Baru
      </Button>
      <br />
      <br />
      <Autocomplete
        placeholder="Cari Nama"
        value={data}
        setValue={setData2}
        lists={people}
        keyValue={{
          key: "id",
          value: "name",
        }}
      />
      <br />
      <br />
      <Textfield
        name="oke"
        onChange={(e) => console.log(e)}
        placeholder="isi sesuatu..."
        fullWidth
      />
      <br />
      <Textfield
        name="oke"
        onChange={(e) => console.log(e)}
        variant="standard"
        placeholder="isi sesuatu..."
      />
      <br />
      <Select
        placeholder="Pilih Nama"
        setValue={setPerson}
        value={person}
        lists={a}
      />
      <Textfield
        name="oke"
        onChange={(e) => console.log(e)}
        label="Nama"
        disabled
        placeholder="isi sesuatu..."
      />
      <br />
      <Textfield
        name="oke"
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
      <Typography color="secondary" variant="subtitle">
        Hello World
      </Typography>
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
      <Checkbox
        label={"check"}
        name={"check"}
        value={checkbox}
        onChange={(value) => {
          setCheckbox(value);
          console.log(value);
        }}
      />
      <br />
      <br />
      <Logo />
      <br />
      <br />
      <NavGroup
        pages={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Test",
            href: "/test",
          },
        ]}
        direction={"horizontal"}
      />
      <br />
      <br />
      <NavGroup
        pages={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Test",
            href: "/test",
          },
        ]}
        direction={"vertical"}
      />
      <br />
      <br />
      <IconButton
        color="danger"
        size="large"
        onClick={() => alert("button click")}
        icon={<AiOutlineCloudDownload />}
      />
      <IconButton
        onClick={() => alert("button click")}
        icon={<AiOutlineCloudDownload />}
      />
      <IconButton
        color="warning"
        size="small"
        onClick={() => alert("button click")}
        icon={<AiOutlineCloudDownload />}
      />
      <br />
      <br />
      <SwitchToggle value={promo} setValue={setPromo} label="Promo" />
      <br />

      {promo ? "promo" : "tidak"}
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}
