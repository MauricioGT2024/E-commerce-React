import { useEffect, useState } from "react";
import styles from "../styles/ThemeToggle.module.css"

type Theme = "light" | "dark";

export const ThemeToggle = () => {
	const [theme, setTheme] = useState<Theme>(() => {
		const Themed = localStorage.getItem("theme") as Theme | null;
		if (Themed) return Themed;
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	});

	useEffect(() => {
		const root = document.documentElement;
		if (theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}

		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	};

	return (
		<button className={styles.toggleButton} onClick={toggleTheme}>
			{theme === "dark" ? "🌙" : "☀️"}
		</button>
	);
};
