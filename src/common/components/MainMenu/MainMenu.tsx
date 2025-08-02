import styled from 'styled-components'
import { BriefcaseBusiness, Building2, ChevronDown, FileInput, FileText, Headset, LayoutList, MessagesSquare, Plus, User, Users } from 'lucide-react'
import Andrey from '../../../assets/images/users/andrey3.jpg'
import { ReactNode, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { NavLink } from 'react-router'
import { IconSvgSprite } from '@/common/components/IconSvgSprite/IconSvgSprite'

type ItemsType = {
  id: string
  title: string
  link: null | string
  icon: ReactNode
  image: null | string
  parent: null | string
  isOpen: boolean
  rightInfo: ReactNode
  subItems: ItemsType[]
}
type MenuItemsType = {
  topMenu: Array<ItemsType>
  bottomMenu: ItemsType[]
}

const menuItemsList = {
  topMenu: [
    {
      id: nanoid(),
      title: 'My tasks',
      link: 'my-tasks',
      icon: <User size={20} />,
      image: null,
      parent: null,
      isOpen: false,
      rightInfo: 5,
      subItems: [],
    },
    {
      id: nanoid(),
      title: 'Other tasks',
      link: 'other-tasks',
      icon: <Users size={20} />,
      image: null,
      parent: null,
      isOpen: false,
      rightInfo: null,
      subItems: [],
    },
    {
      id: nanoid(),
      title: 'Boards',
      link: null,
      icon: <BriefcaseBusiness size={20} />,
      image: null,
      parent: null,
      isOpen: true,
      rightInfo: <ChevronDown size={20} />,
      subItems: [
        {
          id: nanoid(),
          title: 'Create new board',
          link: null,
          icon: <Plus size={20} />,
          image: null,
          parent: 'Chats',
          isOpen: false,
          rightInfo: null,
          subItems: [],
        },
        {
          id: nanoid(),
          title: 'Daily tasks',
          link: 'daily-tasks',
          icon: null,
          image: null,
          parent: 'Boards',
          isOpen: false,
          rightInfo: null,
          subItems: [],
        },
        {
          id: nanoid(),
          title: 'Armoglaze',
          link: 'armoglaze',
          icon: null,
          image: null,
          parent: 'Boards',
          isOpen: false,
          rightInfo: null,
          subItems: [],
        },
        {
          id: nanoid(),
          title: 'Rocketweb',
          link: 'rocketweb',
          icon: null,
          image: null,
          parent: 'Boards',
          isOpen: false,
          rightInfo: null,
          subItems: [],
        },
      ],
    },
    {
      id: nanoid(),
      title: 'Team chats',
      link: null,
      icon: <MessagesSquare size={20} />,
      image: null,
      parent: null,
      isOpen: true,
      rightInfo: <ChevronDown size={20} />,
      subItems: [
        {
          id: nanoid(),
          title: 'Create group chat',
          link: null,
          icon: <Plus size={20} />,
          image: null,
          parent: 'Chats',
          isOpen: false,
          rightInfo: null,
          subItems: [],
        },
        {
          id: nanoid(),
          title: 'Mike',
          link: null,
          icon: null,
          image: null,
          parent: 'Chats',
          isOpen: false,
          rightInfo: 5,
          subItems: [],
        },
        {
          id: nanoid(),
          title: 'Andrey',
          link: null,
          icon: null,
          image: Andrey,
          parent: 'Chats',
          isOpen: false,
          rightInfo: 10,
          subItems: [],
        },
        {
          id: nanoid(),
          title: 'Marta',
          link: null,
          icon: null,
          image: null,
          parent: 'Chats',
          isOpen: false,
          rightInfo: 7,
          subItems: [],
        },
        {
          id: nanoid(),
          title: 'Diana',
          link: null,
          icon: null,
          image: null,
          parent: 'Chats',
          isOpen: false,
          rightInfo: 3,
          subItems: [],
        },
      ],
    },
  ],
  bottomMenu: [
    {
      id: nanoid(),
      title: 'My company',
      link: 'my-company',
      icon: <Building2 size={20} />,
      image: null,
      parent: null,
      isOpen: false,
      rightInfo: null,
      subItems: [],
    },
    {
      id: nanoid(),
      title: 'News',
      link: 'news',
      icon: <LayoutList size={20} />,
      image: null,
      parent: null,
      isOpen: false,
      rightInfo: '+5',
      subItems: [],
    },
    {
      id: nanoid(),
      title: 'Reports',
      link: 'reports',
      icon: <FileInput size={20} />,
      image: null,
      parent: null,
      isOpen: false,
      rightInfo: null,
      subItems: [],
    },
    {
      id: nanoid(),
      title: 'License',
      link: 'license',
      icon: <FileText size={20} />,
      image: null,
      parent: null,
      isOpen: false,
      rightInfo: null,
      subItems: [],
    },
    {
      id: nanoid(),
      title: 'Support',
      link: 'support',
      icon: <Headset size={20} />,
      image: null,
      parent: null,
      isOpen: false,
      rightInfo: null,
      subItems: [],
    },
  ],
}

export const MainMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItemsType>(menuItemsList)

  const toggleOpen = (id: string) => {
    setMenuItems({
      topMenu: [
        ...menuItems.topMenu.map((item) => {
          return item.id === id ? { ...item, isOpen: !item.isOpen } : item
        }),
      ],
      bottomMenu: [...menuItems.bottomMenu],
    })
  }

  const colors = ['#f5ae10', '#1363da', '#ff3737', '#1ac517', '#b210f5']

  // const randomColor = () => {
  //   return Math.floor(Math.random() * colors.length);
  // };

  return (
    <MenuWrapper>
      <TopPanel>
        <Logo href={'https://rocketweb.pro'} target={'_blank'}>
          <IconSvgSprite iconId="rocketWebFull" width={'100%'} height={'45px'} viewBox={'0 0 1830 470'} />
        </Logo>
        <ul>
          {menuItems.topMenu.map((item) => {
            return (
              <>
                <ListItem onClick={() => toggleOpen(item.id)}>
                  {item.link ? (
                    <NavLink to={item.link} state={{ pageName: item.title }}>
                      <ListItemRow>
                        <Title>
                          <Icon>{item.icon}</Icon>
                          {item.title}
                        </Title>

                        {item.rightInfo && <RightInfo>{item.rightInfo}</RightInfo>}
                      </ListItemRow>
                    </NavLink>
                  ) : (
                    <ListItemRow>
                      <Title>
                        <Icon>{item.icon}</Icon>
                        {item.title}
                      </Title>

                      {item.rightInfo && <RightInfo>{item.rightInfo}</RightInfo>}
                    </ListItemRow>
                  )}
                </ListItem>
                {item.subItems.length !== 0 &&
                  item.isOpen &&
                  item.subItems.map((sub, index) => {
                    return sub.link ? (
                      <NavLink to={sub.link} state={{ pageName: sub.title }}>
                        <ListItem>
                          <ListItemRow>
                            <Title>
                              <Icon>
                                {sub.image ? (
                                  <img src={sub.image} alt={sub.title} />
                                ) : sub.icon ? (
                                  <Icon>{sub.icon}</Icon>
                                ) : sub.parent === 'Boards' ? (
                                  ''
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
                      </NavLink>
                    ) : (
                      <ListItem>
                        <ListItemRow>
                          <Title>
                            <Icon>
                              {sub.image ? (
                                <img src={sub.image} alt={sub.title} />
                              ) : sub.icon ? (
                                <Icon>{sub.icon}</Icon>
                              ) : sub.parent === 'Boards' ? (
                                ''
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
                    )
                  })}
              </>
            )
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
          )
        })}
      </ul>
    </MenuWrapper>
  )
}

const Logo = styled.a`
  display: block;
  padding: 0 10px;
  height: 45px;
  width: 200px;
  margin-bottom: 35px;
  &:hover {
    cursor: pointer;
  }
`
const ListItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 5px 10px;
`
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
`
const TopPanel = styled.div`
  ul + ul {
    margin-top: 5px;
  }
  a {
    color: #fff;
    text-decoration: none;
    &.active li {
      background: #616462;
    }
  }
`
const WithoutImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`
const Icon = styled.span`
  margin-right: 5px;
  width: 24px;
  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
`
const Title = styled.span`
  display: flex;
  align-items: center;
  width: 100%;
  color: #fff;
  text-decoration: none;
`
const RightInfo = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  color: #fff;
  text-decoration: none;
`
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 300px;
  padding: 15px 10px;
  background-color: rgba(31, 31, 31, 0.8);
`
