import { Icon } from "@iconify/react";
import { createRef, useEffect } from "react";
import styled from "styled-components";
import useTheme from "../../theme/useTheme";
import { IconButton } from "../../ui";
import Box from "../box/Box";
import Card from "../card/Card";
import Notification from "../notification/Notification";
import MenuSideNav from "./components/MenuSideNav";
import ProfileDropdown from "./components/ProfileDropdown";
import SearchIcon from "./components/SearchIcon";

const AppBar = () => {
  const {
    theme: {
      mode,
      layout: { appBarBlur },
    },
    dispatch,
  } = useTheme();
  const contentRef = createRef<HTMLHeadElement>();

  const changeBarBg = (event: any) => {
    if (event.currentTarget!.scrollY > 10) {
      contentRef.current?.classList.remove("appbar-content-hide");
    } else {
      contentRef.current?.classList.add("appbar-content-hide");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", (event: Event) => {
      changeBarBg(event);
    });
    window.removeEventListener("scroll", changeBarBg);
    return () => void window.removeEventListener("scroll", changeBarBg);
  }, [contentRef]);
  return (
    <StyledAppBar
      ref={contentRef}
      className={`appbar-content-hide`}
      theme={{ mode, appBarBlur }}
    >
      <Card className="appbar-content">
        <Box
          display="flex"
          justify="space-between"
          align="center"
          height="100%"
        >
          <Box display="flex">
            <MenuSideNav />
            <SearchIcon />
          </Box>
          <Box display="flex" align="center" space={0.6}>
            <IconButton
              varient="text"
              size={36}
              fontSize={26}
              onClick={dispatch?.handleChangeTheme}
            >
              {mode.name === "dark" ? (
                <Icon icon="mdi:weather-night" />
              ) : (
                <Icon icon="mdi:weather-sunny" />
              )}
            </IconButton>
            <Notification />
            <ProfileDropdown />
          </Box>
        </Box>
      </Card>
    </StyledAppBar>
  );
};

export default AppBar;

const StyledAppBar = styled("header")`
  position: sticky;
  min-height: 64px;
  width: 100%;
  top: 0px;
  left: auto;
  right: 0px;
  padding: 0 1.2rem;
  z-index: 900;

  & > .appbar-content {
    ${({ theme }) =>
      theme.appBarBlur
        ? `background: ${
            theme.mode.name === "dark"
              ? `rgb(37 45 58 / 80%) `
              : `rgb(255 255 253 / 57%)`
          };`
        : ""}
    width: 100%;
    height: 100%;
    flex: 0 0 auto;
    padding: 0 1rem;
    transition: padding 300ms;
    ${({ theme }) => (theme.appBarBlur ? `backdrop-filter: blur(10px);` : "")}
    z-index: 900;
  }

  &.appbar-content-hide > .appbar-content {
    background: none;
    border-width: 0;
    padding: 0 !important;
    box-shadow: none;
  }
`;
