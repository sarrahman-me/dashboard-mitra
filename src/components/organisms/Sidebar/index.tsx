"use client";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconButton, ItemSidebar, Logo } from "@/src/components";
import { menuItems, personalMenu } from "@/src/data/menu";

interface SidebarProps {
  expand: boolean;
  setExpand: (v: boolean) => void;
}

const Sidebar = ({ expand, setExpand }: SidebarProps) => {
  const icon = expand ? <IoIosArrowDropleft /> : <IoIosArrowDropright />;

  const classWidth = expand ? "w-64" : "max-w-fit";

  const classNameSidebar = `bg-white dark:bg-gray-900 fixed top-0 left-0 z-40 h-screen ease-linear select-none overflow-y-scroll transition-transform -translate-x-full sm:translate-x-0 ${classWidth}`;

  return (
    <aside className={classNameSidebar}>
      <div
        className={`flex ${
          expand ? "justify-between" : "justify-center"
        } items-center m-2`}
      >
        {expand && <Logo />}
        <IconButton onClick={() => setExpand(!expand)} icon={icon} />
      </div>

      <div className="my-10 mx-3 border-b-2">
        {menuItems.map((item, i) => (
          <div key={i}>
            <ItemSidebar
              expand={expand}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          </div>
        ))}
      </div>

      <div className="my-5 mx-3">
        {personalMenu.map((item, i) => (
          <div key={i}>
            <ItemSidebar
              expand={expand}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
