import React from 'react'
import { GiCook } from "react-icons/gi";
import Image from 'next/image';
import Link from 'next/link';
import { FaPaperclip } from "react-icons/fa6";
import { MdCreate } from "react-icons/md";

const sidebarItems = [
  {
    name: "My Recipes",
    href: "/recipes",
    icon: GiCook,
  },
  {
    name: "Manage Labels",
    href: "/labels",
    icon: FaPaperclip,
  },
  {
    name: "Create a Recipe!",
    href: "/create",
    icon: MdCreate,
  },

    ]

    const Sidebar = () => {
      return (
        <div className ="sidebar__wrapper">
          <button className = "btn" ></button>
          <aside className="sidebar">
            <div className="sidebar__top">
              <Image src="/logo.png"
                     width={80} 
                     height={80}
                     className="sidebar__logo" 
                     alt="logo" />
                     < p className= "sidebar__logo-name">
                      RECIPE DROP
                     </p>
            </div>
            <ul className="sidebar__list">
              {sidebarItems.map(({ name, href, icon: Icon }) => (
                <li className="sidebar__item" key={name}>
                  <Link href={href} className="sidebar__link">
                    <span className="sidebar__icon">
                      <Icon />
                    </span>
                    <span className="sidebar__name">{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      );
    }

export default Sidebar