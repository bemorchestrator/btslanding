import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import ArticlesDropdown from "./ArticlesDropdown";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);

  const getClosest = useCallback((elem: Element | null, selector: string): Element | null => {
    if (!elem) return null;

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches = function(s: string): boolean {
        const doc = this.ownerDocument || document;
        const matches = doc.querySelectorAll(s);
        let i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {
          // Loop until we find a match or reach the end
        }
        return i > -1;
      };
    }

    // Get the closest matching element
    let current: Element | null = elem;
    while (current && current !== document.documentElement) {
      if (current.matches(selector)) return current;
      current = current.parentElement;
    }
    return null;
  }, []);

  const activateMenu = useCallback(() => {
    const menuItems = document.getElementsByClassName("sub-menu-item");
    if (!menuItems.length) return;

    let matchingMenuItem: Element | null = null;
    for (let idx = 0; idx < menuItems.length; idx++) {
      if (menuItems[idx].getAttribute('href') === window.location.pathname) {
        matchingMenuItem = menuItems[idx];
        break;
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add('active');
      
      const immediateParent = getClosest(matchingMenuItem, 'li');
      if (immediateParent) {
        immediateParent.classList.add('active');
      }
      
      const childParent = getClosest(immediateParent, '.child-menu-item');
      if (childParent) {
        childParent.classList.add('active');
      }

      const menuParent = getClosest(childParent || immediateParent, '.parent-menu-item');
      if (menuParent) {
        menuParent.classList.add('active');

        const parentMenuitem = menuParent.querySelector('.menu-item');
        if (parentMenuitem) {
          parentMenuitem.classList.add('active');
        }

        const grandParent = getClosest(menuParent, '.parent-parent-menu-item');
        if (grandParent) {
          grandParent.classList.add('active');
        }
      } else {
        const topLevelParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
        if (topLevelParent) {
          topLevelParent.classList.add('active');
        }
      }
    }
  }, [getClosest]);

  useEffect(() => {
    activateMenu();
    
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activateMenu]);

  useEffect(() => {
    const navigation = document.getElementById("navigation");
    if (!navigation) return;

    const elements = navigation.getElementsByTagName("a");
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;
      if (target.getAttribute("href") === "#") {
        const submenu = target.nextElementSibling?.nextElementSibling;
        if (submenu) {
          submenu.classList.toggle('open');
        }
      }
    };

    Array.from(elements).forEach(element => {
      element.addEventListener('click', handleClick);
    });

    return () => {
      Array.from(elements).forEach(element => {
        element.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <nav id="topnav" className={`${scroll ? "nav-sticky" : ""} defaultscroll is-sticky ${className || ''}`}>
      <div className="container">
        <Link className="logo" to="/">
          <img src="/btsolutions.png" className="h-16 py-2" alt="Better Teaching Solutions" />
        </Link>
        
        <div className="menu-extras">
          <div className="menu-item">
            <Link 
              to="#"
              className={`${toggleMenu ? 'open' : ''} navbar-toggle`}  
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <div className="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Link>
          </div>
        </div>

        <ul className="buy-button list-none mb-0">
          <li className="inline mb-0">
            <a href="https://app.betterteachingsolutions.com" target="_blank" rel="noopener noreferrer">
              <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">
                Login
              </span>
              <span className="py-[6px] px-4 hidden md:hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold">
                Login
              </span>
            </a>
          </li>
      
          <li className="md:inline hidden ps-1 mb-0">
            <Link 
              to="/signup" 
              target="_blank" 
              className="py-[6px] px-4 inline-block items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold"
            >
              Signup
            </Link>
          </li>
        </ul>

        <div id="navigation" className={`${toggleMenu ? 'block' : ''}`}>
          <ul className="navigation-menu">
            <li><Link to="/" className="sub-menu-item">Home</Link></li>
            <li><Link to="/aboutus" className="sub-menu-item">About Us</Link></li>
            <li><Link to="/pricing" className="sub-menu-item">Pricing</Link></li>

            <li className="has-submenu parent-parent-menu-item">
              <Link to="#">Pages</Link>
              <span className="menu-arrow"></span>
              <ul className="submenu">
                <li><Link to="/services" className="sub-menu-item">Services</Link></li>

                <li className="has-submenu parent-menu-item">
                  <Link to="#">Articles</Link>
                  <span className="submenu-arrow"></span>
                  <ArticlesDropdown />
                </li>

                <li className="has-submenu parent-menu-item">
                  <Link to="#">Utility</Link>
                  <span className="submenu-arrow"></span>
                  <ul className="submenu">
                    <li><Link to="/terms" className="sub-menu-item">Terms of Services</Link></li>
                    <li><Link to="/privacy" className="sub-menu-item">Privacy Policy</Link></li>
                  </ul>
                </li>
              </ul>
            </li>

            <li><Link to="/contact" className="sub-menu-item">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 