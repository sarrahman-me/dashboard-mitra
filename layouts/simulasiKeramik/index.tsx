/* eslint-disable @next/next/no-img-element */
"use client";
import { Input } from "@/components/atoms";
import { useState } from "react";

export default function SimulasiKeramik(props: { imageUrl: string }) {
  const [backgroundColor, setBackgroundColor] = useState("#dddddd");

  const gridStyles = {
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1px",
    backgroundColor: backgroundColor,
    backgroundSize: "cover",
    position: "relative",
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="md:w-1/2 w-full grid m-1" style={gridStyles}>
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <div className="absolute -bottom-8 left-1/4">
          <img
            className="w-52 h-36 sm:w-60 sm:h-52 md:w-72 md:h-56"
            src="https://ik.imagekit.io/sarrahmanme/sofa-removebg-preview.png?updatedAt=1696156084852"
            alt="sofa"
          />
        </div>
      </div>
      <div className="md:w-1/2 w-full m-1">
        <Input
          label={"Warna Nat"}
          name={"natColor"}
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </div>
    </div>
  );
}

const ImagePattern = (props: { imageUrl: string }) => {
  return (
    <img
      src={props.imageUrl}
      onClick={(e) => {
        const img = e.target as HTMLImageElement;
        const deg = img.style.transform
          ? parseInt(
              img.style.transform.replace("rotate(", "").replace("deg)", "")
            )
          : 0;
        img.style.transform = `rotate(${deg + 90}deg)`;
      }}
      alt="produk"
      width={300}
      height={300}
    />
  );
};
