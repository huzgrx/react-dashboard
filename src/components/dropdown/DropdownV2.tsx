import React, {
  FC,
  memo,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import Box from "../box/Box";
import Card from "../card/Card";
import DropdownItem from "./DropdownItem";

const DropdownV2: FC<DropdownV2Props> = (props) => {
  const { labelContent, dropdownList, width } = props;
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (shouldShow) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflowY = "auto";
      document.body.style.paddingRight = "0";
    }
  }, [shouldShow]);

  const toggleDropdown = () => setShouldShow((prevState) => !prevState);

  return (
    <StyledDropdownWrapper>
      <div onClick={toggleDropdown} className="dropdown-button" role="button">
        {labelContent}
      </div>
      {shouldShow ? (
        <>
          <Card position="absolute" className={`dropdown`} width={width}>
            <ul>
              {dropdownList.map((item, idx) => {
                if (item.type === "component") {
                  return (
                    <Box key={idx} my={4}>
                      {item.content}
                    </Box>
                  );
                } else if (item.type === "children" && item.children) {
                  return React.cloneElement(item.children as ReactElement, {
                    onClick: () => {
                      toggleDropdown();
                      item.onClickHandle && item.onClickHandle();
                    },
                  });
                } else {
                  return (
                    <DropdownItem
                      key={idx}
                      title={item.title!}
                      icon={item.icon}
                      onClickHandle={() => {
                        item.onClickHandle && item.onClickHandle();
                        toggleDropdown();
                      }}
                    />
                  );
                }
              })}
            </ul>
          </Card>
          <div className="dropdown-overlay" onClick={toggleDropdown} />
        </>
      ) : (
        ""
      )}
    </StyledDropdownWrapper>
  );
};
export default memo(DropdownV2);
export interface DropdownV2Item {
  type?: "component" | "children";
  content?: ReactNode;
  icon?: ReactNode;
  title?: string;
  onClickHandle?: () => void;
  children?: ReactNode;
}
export interface DropdownV2Props {
  labelContent: ReactNode;
  dropdownList: DropdownV2Item[];
  width: string;
}

const StyledDropdownWrapper = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;

  & > .dropdown-button {
    cursor: pointer;
  }

  & > .dropdown {
    top: 120%;
    right: 0px;
    z-index: 1200;
    transition: 300ms;
    overflow: hidden;
  }

  & > .dropdown-overlay {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1100;
  }
`;
