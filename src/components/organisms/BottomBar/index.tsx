import React from "react";
import { menuItemsMobile } from "@/src/data/menu";
import { ItemBottomBar } from "../../atoms";

const BottomBar = () => {
  return (
    <div className="z-50 w-full h-16 sm:hidden border-b border-gray-200 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {menuItemsMobile.map((item, i) => (
          <ItemBottomBar
            label={item.label}
            key={i}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomBar;
