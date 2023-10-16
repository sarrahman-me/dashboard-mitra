"use client";
import { ToggleDarkMode } from "@/components/atoms";
import { AppBar } from "@/layouts";
import {
  Button,
  Checkbox,
  IconButton,
  Logo,
  Radio,
  SwitchToggle,
  Textfield,
  Typography,
} from "@/src/components/atoms";
import { FooterText, NavGroup } from "@/src/components/molecules";
import { NavBar } from "@/src/components/organisms";
import { useState } from "react";
import { AiOutlineCloudDownload, AiOutlineSearch } from "react-icons/ai";
import { FiLoader } from "react-icons/fi";

const pages = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Test",
    href: "/test",
  },
  {
    label: "Service",
    href: "/service",
  },
];

export default function Test() {
  const [checkbox, setCheckbox] = useState(false);
  const [promo, setPromo] = useState(false);

  return (
    <div>
      <NavBar pages={pages} />
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
      <Textfield
        name="oke"
        onChange={(e) => console.log(e)}
        placeholder="isi sesuatu..."
        icon={<AiOutlineSearch />}
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
      <Textfield
        name="oke"
        onChange={(e) => console.log(e)}
        label="Nama"
        placeholder="isi sesuatu..."
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
      <FooterText />
    </div>
  );
}