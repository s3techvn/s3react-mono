import { FC } from "react";
import { Menu } from "@s3react/core/Menu";
import { MenuItem } from "@s3react/core/MenuItem";
import { MenuLabel } from "@s3react/core/MenuLabel";
import { Divider } from "@s3react/core/Divider";

export const SidebarLayout: FC = () => {
  return (
    <div className="fixed w-[280px] top-12 left-0 bottom-0">
      <nav>
        <Menu border={false} shadow={false}>
          <MenuItem value="installation" className="text-white">
            Installation
          </MenuItem>
          <Divider className="mx-2" />
          <MenuLabel className="text-slate-500">Components</MenuLabel>
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