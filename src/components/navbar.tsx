import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import logoDark from '../assets/images/logo-dark.png';
import logoLight from '../assets/images/logo-light.png';

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
          <img src={logoDark} className="h-6 inline-block dark:hidden" alt="Logo Dark" />
          <img src={logoLight} className="h-6 hidden dark:inline-block" alt="Logo Light" />
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
            <Link to="/login">
              <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">
                Login
              </span>
              <span className="py-[6px] px-4 hidden md:hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold">
                Login
              </span>
            </Link>
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
            <li className="has-submenu parent-menu-item">
              <Link to="#">Home</Link>
              <span className="menu-arrow"></span>
              <ul className="submenu">
                <li><Link to="/" className="sub-menu-item">Hero One</Link></li>
                <li><Link to="/index-two" className="sub-menu-item">Hero Two</Link></li>
                <li><Link to="/index-three" className="sub-menu-item">Hero Three</Link></li>
                <li>
                  <Link to="/index-light" className="sub-menu-item">
                    Hero Light 
                    <span className="bg-gray-50 dark:bg-slate-800 text-[10px] shadow shadow-gray-300 dark:shadow-gray-700 font-bold px-2.5 py-0.5 rounded h-5 ms-1">
                      Light
                    </span>
                  </Link>
                </li>
              </ul>
            </li>

            <li><Link to="/aboutus" className="sub-menu-item">About Us</Link></li>
            <li><Link to="/pricing" className="sub-menu-item">Pricing</Link></li>
      
            <li className="has-submenu parent-parent-menu-item">
              <Link to="#">Pages</Link>
              <span className="menu-arrow"></span>
              <ul className="submenu">
                <li><Link to="/services" className="sub-menu-item">Services</Link></li>
                
                <li className="has-submenu parent-menu-item">
                  <Link to="#">Blog</Link>
                  <span className="submenu-arrow"></span>
                  <ul className="submenu">
                    <li><Link to="/blog" className="sub-menu-item">Blogs</Link></li>
                    <li><Link to="/blog-detail" className="sub-menu-item">Blog Detail</Link></li>
                  </ul>
                </li>
                
                <li><Link to="/helpcenter" className="sub-menu-item">Helpcenter</Link></li>

                <li className="has-submenu parent-menu-item">
                  <Link to="#">Auth Pages</Link>
                  <span className="submenu-arrow"></span>
                  <ul className="submenu">
                    <li><Link to="/login" className="sub-menu-item">Login</Link></li>
                    <li><Link to="/signup" className="sub-menu-item">Signup</Link></li>
                    <li><Link to="/reset-password" className="sub-menu-item">Forgot Password</Link></li>
                  </ul>
                </li>

                <li className="has-submenu parent-menu-item">
                  <Link to="#">Utility</Link>
                  <span className="submenu-arrow"></span>
                  <ul className="submenu">
                    <li><Link to="/terms" className="sub-menu-item">Terms of Services</Link></li>
                    <li><Link to="/privacy" className="sub-menu-item">Privacy Policy</Link></li>
                  </ul>
                </li>
                
                <li><Link to="/error" className="sub-menu-item">404!</Link></li>
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