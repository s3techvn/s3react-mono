import { FC } from "react";
import { Menu } from "@s3react/core/Menu";
import { MenuItem } from "@s3react/core/MenuItem";
import { MenuLabel } from "@s3react/core/MenuLabel";
import { Divider } from "@s3react/core/Divider";

export const SidebarLayout: FC = () => {
  return (
    <div className="fixed w-[220px] top-12 left-0 bottom-0">
      <nav className="h-full overflow-y-auto bg-slate-900/20 backdrop-blur border-r border-r-slate-800 shadow-white">
        <Menu border={false} shadow={false}>
          <MenuItem value="installation" className="text-white">
            Installation
          </MenuItem>
          <Divider className="px-2" />
          <MenuLabel className="text-slate-500 text-[10px] leading-8">Components</MenuLabel>
          <MenuItem value="installation" className="text-white">
            ActionIcon
          </MenuItem>
          <MenuItem value="installation" className="text-white">
            Modal
          </MenuItem>
        </Menu>
      </nav>
    </div>
  );
};