import { useState } from 'react';

export const ThemeSelection = ({
	setTheme,
}: {
	setTheme: (x: string) => void;
}): JSX.Element => {
	const [newThemeInput, setNewThemeInput] = useState<string>('');

	return (
		<div className="selectionScreen">
			<h1>Welche Bilder wollen wir?</h1>
			<div className="suggestions">
				{' '}
				<button onClick={() => setTheme('cat')}>Katzen</button>
				<button onClick={() => setTheme('dog')}>Hunde</button>
				<button onClick={() => setTheme('monkey')}>Affen</button>
				<button onClick={() => setTheme('cake')}>Kuchen</button>
				<button onClick={() => setTheme('bear')}>Baeren</button>
			</div>

			<div className="inputAndConfirm">
				{' '}
				<input
					value={newThemeInput}
					onChange={(e) => setNewThemeInput(e.target.value)}
				/>
				<button
					disabled={!newThemeInput}
					onClick={() => setTheme(newThemeInput)}
				>
					Eigenes Thema
				</button>
			</div>
		</div>
	);
};
