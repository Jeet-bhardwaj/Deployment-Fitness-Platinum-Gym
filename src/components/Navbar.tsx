import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import gymLogo from "../logo/gymLogo.png";
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger icons
import Registration from './Registration';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showRegistration, setShowRegistration] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollPosition(currentScrollY);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navbarClass = `${styles.navbar} 
        ${scrollPosition > 100 ? styles.scrolled : ''} 
        ${scrollPosition > lastScrollY && scrollPosition > 100 ? styles.hidden : styles.visible}`;

    return (
        <>
            <nav className={navbarClass}>
                <div className={styles.container}>
                    {/* Logo */}
                    <div className={styles.logo}>
                        <img src={gymLogo} alt="Gym Logo" />
                        <span className={styles.brandName}>Fitness Platinum</span>
                    </div>

                    {/* Hamburger Menu for Mobile */}
                    <div
                        className={styles.hamburger}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </div>

                    {/* Navigation Links */}
                    <div
                        className={`${styles.nav} ${menuOpen ? styles.active : ""}`}
                    >
                        <Link
                            className={styles.navLink}
                            to="/"
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            className={styles.navLink}
                            to="/Gallery"
                            onClick={() => setMenuOpen(false)}
                        >
                            Gallery
                        </Link>
                        <Link
                            className={styles.navLink}
                            to="/Trainers"
                            onClick={() => setMenuOpen(false)}
                        >
                            Trainers
                        </Link>
                        <div className={styles.dropdown}>
                            <Link
                                className={styles.navLink}
                                to="/Services"
                                onClick={() => setMenuOpen(false)}
                            >
                                Our Services
                            </Link>
                            <div className={styles.dropdownContent}>
                                <Link
                                    to="/services/cardio"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Cardio
                                </Link>
                                <Link
                                    to="/services/crossfit"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Crossfit
                                </Link>
                                <Link
                                    to="/services/strength-training"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Strength Training
                                </Link>
                                <Link
                                    to="/services/zumba"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Zumba
                                </Link>
                                <Link
                                    to="/services/yoga"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Yoga
                                </Link>
                                <Link
                                    to="/services/calisthenics"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Calisthenics
                                </Link>
                            </div>
                        </div>
                        <Link
                            className={styles.navLink}
                            to="/About"
                            onClick={() => setMenuOpen(false)}
                        >
                            About
                        </Link>
                        
                        {/* Add Admin Link */}
                        <Link
                            className={`${styles.navLink} ${styles.adminLink}`}
                            to="/admin"
                            onClick={() => setMenuOpen(false)}
                        >
                            Admin
                        </Link>
                    </div>

                    {/* Join Now Button */}
                    <button 
                        className={styles.joinButton}
                        onClick={() => setShowRegistration(true)}
                    >
                        Join Now
                    </button>

                    {/* Add Live Class Button */}
                    <button 
                        className={styles.liveButton}
                        onClick={() => alert('Live Class Clicked!')} // Placeholder action
                    >
                        Live Class
                    </button>
                </div>
            </nav>

            {/* Add Registration Modal */}
            <Registration 
                isOpen={showRegistration} 
                onClose={() => setShowRegistration(false)} 
            />
        </>
    );
};

export default Navbar;
