"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { User, LogOut } from "lucide-react";
import { redirect } from "next/navigation";

interface ComponentProps {
  id: number | undefined;
  image: string | undefined;
  name: string;
  email: string;
  department: string;
}

const Profile: React.FC<ComponentProps> = ({
  id,
  image,
  name,
  email,
  department,
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{ minWidth: 'auto', padding: 0 }}
        >
          <Image
            src={image ? image : "/images/profile_photo.jpeg"}
            width={40}
            height={40}
            alt="profile photo"
            className="rounded-full object-cover border-2 border-gray-300"
          />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-end" ? "right top" : "right bottom",
              }}
            >
              <Paper sx={{ minWidth: 200 }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem disabled>
                      <div className="flex flex-col items-start py-2">
                        <p className="font-semibold text-gray-800">{name}</p>
                        <p className="text-sm text-gray-600">{email}</p>
                        <p className="text-sm text-gray-500">{department}</p>
                      </div>
                    </MenuItem>

                    <MenuItem
                      onClick={(e) => {
                        handleClose(e);
                        redirect(`/profile`);
                      }}
                      className="flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </MenuItem>

                    <MenuItem
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="flex items-center gap-2 text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
};

export default Profile;