import styled from "styled-components";
import {
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  FileInput,
  FileText,
  Headset,
  LayoutList,
  MessagesSquare,
  Plus,
  User,
  Users,
} from "lucide-react";
import { v1 } from "uuid";
import Andrey from "../../assets/images/users/andrey3.jpg";
import { ReactNode, useState } from "react";
import { IconSvgSprite } from "../Icon.tsx";

type ItemsType = {
  id: string;
  title: string;
  link: null | string;
  icon: ReactNode;
  image: null | string;
  parent: null | string;
  isOpen: boolean;
  rightInfo: ReactNode;
  subItems: ItemsType[];
};
type MenuItemsType = {
  topMenu: Array<ItemsType>;
  bottomMenu: ItemsType[];
};

const menuItemsList = {
  topMenu: [
    {
      id: v1(),
      title: "My tasks",
      link: null,
      icon: <User size={20} />,
      image: null,
      parent: null,
      isOpen: false,
      rightInfo: 5,
      subItems: [],
    },
    {
      id: v1(),
      title: "Other tasks",
      link: null,
      icon: <Users size={20} />,
      image: null,
      parent: null,
      isOpen: false,
      rightInfo: null,
      subItems: [],
    },
    {
      id: v1(),
      title: "Boards",
      link: null,
      icon: <BriefcaseBusiness size={20} />,
      image: null,
      parent: null,
      isOpen: false,
      rightInfo: <ChevronDown size={20} />,
      subItems: [
        {
          id: v1(),
          title: "Daily tasks",
          link: null,
          icon: null,
          image: null,
          parent: "Boards",
          isOpen: false,
          rightInfo: null,
          subItems: [],
        },
        {
          id: v1(),
          title: "Armoglaze",
          link: null,
          icon: null,
          image: null,
          parent: "Boards",
          isOpen: false,
          rightInfo: null,
          subItems: [],
        },
        {
          id: v1(),
          title: "Rocketweb",
          link: null,
          icon: null,
          image: null,
          parent: "Boards",
          isOpen: false,
          rightInfo: null,
          subItems: [],
        },
      ],
    },
    {
      id: v1(),
      title: "Team chats",
      link: null,
      icon: <MessagesSquare size={20} />,
      image: null,
      parent: null,
      isOpen: true,
      rightInfo: <ChevronDown size={20} />,
      subItems: [
        {
          id: v1(),
          title: "Create group chat",
          link: null,
          icon: <Plus size={20} />,
          image: null,
          parent: "Chats",
          isOpen: false,
          rightInfo: null,
          subItems: [],
        },
        {
          id: v1(),
          title: "Mike",
          link: null,
          icon: null,
          image: null,
          parent: "Chats",
          isOpen: false,
          rightInfo: 5,
          subItems: [],
        },
        {
          id: v1(),
          title: "Andrey",
          link: null,
          icon: null,
          image: Andrey,
          parent: "Chats",
          isOpen: false,
          rightInfo: 10,
          subItems: [],
        },
        {
          id: v1(),
          title: "Marta",
          link: null,
          icon: null,
          image: null,
          parent: "Chats",
          isOpen: false,
          rightInfo: 7,
          subItems: [],
        },
        {
          id: v1(),
          title: "Diana",
          link: null,
          icon: null,
          image: null,
          parent: "Chats",
          isOpen: false,
          rightInfo: 3,
          subItems: [],
        },
      ],
    },
  ],
  bottomMenu: [
    {
      id: v1(),
      title: "My company",
      link: null,
      icon: <Building2 size={20} />,
      image: null,
      parent: null,
      isOpen: false,
      rightInfo: null,
      subItems: [],
    },
    {
      id: v1(),
      title: "News",
      link: null,
      icon: <LayoutList size={20} />,
      image: null,
      parent: null,
      isOpen: false,
      rightInfo: "+5",
      subItems: [],
    },
    {
      id: v1(),
      title: "Reports",
      link: null,
      icon: <FileInput size={20} />,
      image: null,
      parent: null,
      isOpen: false,
      rightInfo: null,
      subItems: [],
    },
    {
      id: v1(),
      title: "License",
      link: null,
      icon: <FileText size={20} />,
      image: null,
      parent: null,
      isOpen: false,
      rightInfo: null,
      subItems: [],
    },
    {
      id: v1(),
      title: "Support",
      link: null,
      icon: <Headset size={20} />,
      image: null,
      parent: null,
      isOpen: false,
      rightInfo: null,
      subItems: [],
    },
  ],
};

export const MainMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItemsType>(menuItemsList);

  const toggleOpen = (id: string) => {
    setMenuItems({
      topMenu: [
        ...menuItems.topMenu.map((item) => {
          return item.id === id ? { ...item, isOpen: !item.isOpen } : item;
        }),
      ],
      bottomMenu: [...menuItems.bottomMenu],
    });
  };

  const colors = ["#f5ae10", "#1363da", "#ff3737", "#1ac517", "#b210f5"];

  // const randomColor = () => {
  //   return Math.floor(Math.random() * colors.length);
  // };

  return (
    <MenuWrapper>
      <TopPanel>
        <Logo>
          <IconSvgSprite
            iconId="rocketWebFull"
            width={"auto"}
            height={"45px"}
            viewBox={"0 0 1830 470"}
          />
        </Logo>
        <ul>
          {menuItems.topMenu.map((item) => {
            return (
              <>
                <ListItem key={item.id} onClick={() => toggleOpen(item.id)}>
                  <ListItemRow>
                    <Title>
                      <Icon>{item.icon}</Icon>
                      {item.title}
                    </Title>
                    {item.rightInfo && <RightInfo>{item.rightInfo}</RightInfo>}
                  </ListItemRow>
                </ListItem>
                {item.subItems.length !== 0 &&
                  item.isOpen &&
                  item.subItems.map((sub, index) => {
                    return (
                      <ListItem>
                        <ListItemRow>
                          <Title>
                            <Icon>
                              {sub.image ? (
                                <img src={sub.image} alt={sub.title} />
                              ) : sub.icon ? (
                                <Icon>{sub.icon}</Icon>
                              ) : sub.parent === "Boards" ? (
                                ""
                              ) : (
                                <WithoutImg
                                  style={{
                                    background: colors[index],
                                  }}
                                >
                                  {sub.title.slice(0, 2)}
                                </WithoutImg>
                              )}
                            </Icon>
                            {sub.title}
                          </Title>
                          <RightInfo>{sub.rightInfo}</RightInfo>
                        </ListItemRow>
                      </ListItem>
                    );
                  })}
              </>
            );
          })}
        </ul>
      </TopPanel>
      <ul>
        {menuItems.bottomMenu.map((item) => {
          return (
            <ListItem key={item.id}>
              <ListItemRow>
                <Title>
                  <Icon>{item.icon}</Icon>
                  {item.title}
                </Title>
                {item.rightInfo && <RightInfo>{item.rightInfo}</RightInfo>}
              </ListItemRow>
            </ListItem>
          );
        })}
      </ul>
    </MenuWrapper>
  );
};
const Logo = styled.a`
  display: block;
  padding: 0 10px;
  height: 45px;
  width: 200px;
  margin-bottom: 35px;
`;

const ListItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 5px 10px;
`;

const ListItem = styled.li`
  position: relative;
  color: #fff;
  line-height: 1;
  margin-bottom: 2px;
  border-radius: 4px;
  &.active {
    background: #868885;
  }
  &:hover {
    cursor: pointer;
    background: #616462;
  }
`;

const TopPanel = styled.div`
  ul + ul {
    margin-top: 20px;
  }
`;

const WithoutImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const Icon = styled.span`
  margin-right: 5px;
  width: 24px;
  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
`;

const Title = styled.span`
  display: flex;
  align-items: center;
  width: 100%;
`;
const RightInfo = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 300px;
  padding: 15px 10px;
  background-color: rgba(31, 31, 31, 0.8);
`;
