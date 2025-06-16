import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

export default function NavLight(){
    const [toggleMenu, setToggleMenu] = useState(false)
    const [scroll, setScroll] = useState(false);

    const activateMenu = useCallback(() => {
        var menuItems = document.getElementsByClassName("sub-menu-item");
        if (menuItems) {
            var matchingMenuItem = null;
            for (var idx = 0; idx < menuItems.length; idx++) {
                if (menuItems[idx].href === window.location.href) {
                    matchingMenuItem = menuItems[idx];
                }
            }

            if (matchingMenuItem) {
                matchingMenuItem.classList.add('active');
             
                var immediateParent = getClosest(matchingMenuItem, 'li');
          
                if (immediateParent) {
                    immediateParent.classList.add('active');
                }
                
                var childParent = getClosest(immediateParent, '.child-menu-item');
                if(childParent){
                    childParent.classList.add('active');
                }

                var menuParent = getClosest(childParent || immediateParent , '.parent-menu-item');
            
                if (menuParent) {
                    menuParent.classList.add('active');

                    var parentMenuitem = menuParent.querySelector('.menu-item');
                    if (parentMenuitem) {
                        parentMenuitem.classList.add('active');
                    }

                    var grandParent = getClosest(menuParent, '.parent-parent-menu-item');
                    if (grandParent) {
                        grandParent.classList.add('active');
                    }
                } else {
                    var topLevelParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
                    if (topLevelParent) {
                        topLevelParent.classList.add('active');
                    }
                }
            }
        }
    }, []); // Empty dependency array since it doesn't depend on any props or state

    useEffect(()=>{
        activateMenu()
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
          });
    },[activateMenu])

     /*********************/
 /*    Menu Active    */
 /*********************/
 function getClosest(elem, selector) {
 
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {
                    // Loop until we find a match or reach the end
                }
                return i > -1;
            };
    }

    // Get the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }
    return null;

};

/*********************/
/*  Clickable manu   */
/*********************/
if (document.getElementById("navigation")) {
    var elements = document.getElementById("navigation").getElementsByTagName("a");
    for (var i = 0, len = elements.length; i < len; i++) {
        elements[i].onclick = function (elem) {
            if (elem.target.getAttribute("href") === "#") {
                var submenu = elem.target.nextElementSibling.nextElementSibling;
                submenu.classList.toggle('open');
            }
        }
    }
}

    return(
        <>
        <nav id="topnav" className={`${scroll ? "nav-sticky" : "" } defaultscroll is-sticky`}>
            <div className="container">
                <Link className="logo" to="/">
                    <span className="text-[22px] font-bold text-slate-900 dark:text-white">Better Teaching Solutions</span>
                </Link>
               
                <div className="menu-extras">
                    <div className="menu-item">
                        <Link className={`${toggleMenu ? 'open' : ''} navbar-toggle`}  onClick={()=>setToggleMenu(!toggleMenu)}>
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
                            <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">Login</span>
                            <span className="py-[6px] px-4 hidden md:hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold">Login</span>
                        </Link>
                    </li>
            
                    <li className="md:inline hidden ps-1 mb-0 ">
                        <Link to="/signup" target="_blank" className="py-[6px] px-4 inline-block items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold">Signup</Link>
                    </li>
                </ul>
                <div id="navigation" className={`${toggleMenu ? 'block' : ''}`}>
                    <ul className="navigation-menu nav-light">
                        <li>
                            <Link to="/" className="sub-menu-item">Home</Link>
                        </li>

                        <li><Link to="/pricing" className="sub-menu-item">Pricing </Link></li>
                
                        <li><Link to="/contact" className="sub-menu-item">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    )
}