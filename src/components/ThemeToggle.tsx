import { useTheme } from "../hooks/useTheme";

export const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className="absolute p-2 rounded-full border  right-4 top-4 z-50  border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm hover:shadow-md transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
		>
			{theme === "dark" ? "🌙" : "☀️"}
		</button>
	);
};
