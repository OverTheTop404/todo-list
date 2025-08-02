import styles from './MainMenu.module.css'
import { BriefcaseBusiness, Building2, ChevronDown, FileInput, FileText, Headset, LayoutList, MessagesSquare, Plus, User, Users } from 'lucide-react'
import Andrey from '../../../assets/images/users/andrey3.jpg'
import React, { useState } from 'react'
import { NavLink } from 'react-router'
import { IconSvgSprite } from '@/common/components/IconSvgSprite/IconSvgSprite'

const colors = ['#f5ae10', '#1363da', '#ff3737', '#1ac517', '#b210f5']

type MenuItem = {
  title: string
  link?: string
  icon?: React.ReactNode
  image?: string
  rightInfo?: React.ReactNode
  subItems?: MenuItem[]
}

const menuConfig = {
  topMenu: [
    {
      title: 'My tasks',
      link: 'my-tasks',
      icon: <User size={20} />,
      rightInfo: 5,
    },
    {
      title: 'Other tasks',
      link: 'other-tasks',
      icon: <Users size={20} />,
    },
    {
      title: 'Boards',
      icon: <BriefcaseBusiness size={20} />,
      rightInfo: <ChevronDown size={20} />,
      subItems: [
        { title: 'Create new board', icon: <Plus size={20} /> },
        { title: 'Daily tasks', link: 'daily-tasks' },
        { title: 'Armoglaze', link: 'armoglaze' },
        { title: 'Rocketweb', link: 'rocketweb' },
      ],
    },
    {
      title: 'Team chats',
      icon: <MessagesSquare size={20} />,
      rightInfo: <ChevronDown size={20} />,
      subItems: [
        { title: 'Create group chat', icon: <Plus size={20} /> },
        { title: 'Mike', rightInfo: 5 },
        { title: 'Andrey', image: Andrey, rightInfo: 10 },
        { title: 'Marta', rightInfo: 7 },
        { title: 'Diana', rightInfo: 3 },
      ],
    },
  ],
  bottomMenu: [
    { title: 'My company', link: 'my-company', icon: <Building2 size={20} /> },
    { title: 'News', link: 'news', icon: <LayoutList size={20} />, rightInfo: '+5' },
    { title: 'Reports', link: 'reports', icon: <FileInput size={20} /> },
    { title: 'License', link: 'license', icon: <FileText size={20} /> },
    { title: 'Support', link: 'support', icon: <Headset size={20} /> },
  ],
}

export const MainMenuNew = () => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    Boards: true,
    'Team chats': true,
  })

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  const renderMenuItem = (item: MenuItem, index: number, isSubItem = false) => {
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isExpanded = expandedItems[item.title]
    const listItemClass = `${styles.listItem} ${isSubItem ? styles.subItem : ''}`

    return (
      <div key={`${item.title}-${index}`}>
        {item.link ? (
          <NavLink to={item.link} state={{ pageName: item.title }}>
            <li className={listItemClass}>
              <ListItemContent item={item} index={index} />
            </li>
          </NavLink>
        ) : (
          <li className={listItemClass} onClick={() => hasSubItems && toggleExpand(item.title)}>
            <ListItemContent item={item} index={index} />
          </li>
        )}

        {hasSubItems && isExpanded && (
          <div className={styles.subMenu}>{item.subItems?.map((subItem, subIndex) => renderMenuItem(subItem, subIndex, true))}</div>
        )}
      </div>
    )
  }

  const ListItemContent = ({ item, index }: { item: MenuItem; index: number }) => (
    <div className={styles.listItemRow}>
      <span className={styles.title}>
        <span className={styles.icon}>
          {item.image ? (
            <img src={item.image} alt={item.title} />
          ) : item.icon ? (
            item.icon
          ) : (
            <span className={styles.withoutImg} style={{ background: colors[index % colors.length] }}>
              {item.title.slice(0, 2)}
            </span>
          )}
        </span>
        {item.title}
      </span>
      {item.rightInfo && <span className={styles.rightInfo}>{item.rightInfo}</span>}
    </div>
  )

  return (
    <div className={styles.menuWrapper}>
      <div className={styles.topPanel}>
        <a className={styles.logo} href="https://rocketweb.pro" target="_blank" rel="noreferrer">
          <IconSvgSprite iconId="rocketWebFull" width="100%" height="45px" viewBox="0 0 1830 470" />
        </a>

        <ul>{menuConfig.topMenu.map((item, index) => renderMenuItem(item, index))}</ul>
      </div>

      <ul>{menuConfig.bottomMenu.map((item, index) => renderMenuItem(item, index))}</ul>
    </div>
  )
}
