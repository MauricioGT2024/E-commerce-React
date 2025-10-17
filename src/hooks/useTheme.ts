import { useLayoutEffect, useState } from "react";
type Theme = "light" | "dark";

export const useTheme = () => {
	const [theme, setTheme] = useState<Theme>(() => {
		const Themed = localStorage.getItem("theme") as Theme | null;
		if (Themed) return Themed;
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	});

	useLayoutEffect(() => {
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


  return{
    theme,
    toggleTheme
  }
};
