import { useEffect, useState } from "react";

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
		<button
			onClick={toggleTheme}
			className="fixed p-2 rounded-full border  right-4 top-4 z-50  border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm hover:shadow-md transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
		>
			{theme === "dark" ? "🌙" : "☀️"}
		</button>
	);
};
