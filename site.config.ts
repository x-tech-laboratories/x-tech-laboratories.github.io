// The site's settings for the X-Libs site framework: its title, languages, sidebar, look and the badge files it adds.
import { readFileSync } from 'node:fs';
import { define_site, type ExtraFile } from '@x-tech-laboratories/x-libs/site/model';

const COLOURS = ['red', 'orange', 'yellow', 'green', 'brightgreen'];

// A shields.io endpoint badge for every scored repository, at /badges/<owner>/<repo>.json.
function readiness_badges(): ExtraFile[] {
	const readiness = JSON.parse(readFileSync(new URL('./src/data/readiness.json', import.meta.url), 'utf8')) as Record<
		string,
		{ repo: string; score: number; total: number }
	>;
	return Object.values(readiness).map((r) => ({
		path: `badges/${r.repo}.json`,
		content: JSON.stringify({
			schemaVersion: 1,
			label: 'AI readiness',
			message: `${r.score}/${r.total}`,
			color: COLOURS[Math.round((r.score / r.total) * (COLOURS.length - 1))],
		}),
	}));
}

export default define_site({
	title: 'X-Tech Laboratories',
	description:
		'An open source community for extensible, interoperable software, consolidated projects, automated development and AI used in the open.',
	site: 'https://x-tech-laboratories.github.io',
	content: 'src/content/docs',
	logo: './org/branding/icon/icon.svg',
	favicon: '/favicon.svg',
	social: [
		{ icon: 'github', label: 'GitHub', href: 'https://github.com/x-tech-laboratories' },
		{ icon: 'matrix', label: 'Matrix', href: 'https://matrix.to/#/#x-tech-laboratories:matrix.org' },
	],
	edit_link: 'https://github.com/x-tech-laboratories/x-tech-laboratories.github.io/edit/main/',
	last_updated: true,
	locales: {
		root: { label: 'English', lang: 'en' },
		es: { label: 'Español', lang: 'es' },
	},
	css: [
		'@x-tech-laboratories/halon/halon-tokens.css',
		'@x-tech-laboratories/halon/halon.css',
		'@x-tech-laboratories/halon/site.css',
		'@fontsource/noto-sans/400.css',
		'@fontsource/noto-sans/500.css',
		'@fontsource/noto-sans/600.css',
		'@fontsource/noto-sans/700.css',
		'./src/styles/theme.css',
	],
	sidebar: [
		{ slug: '', label: 'Home', translations: { es: 'Inicio' } },
		{ label: 'Guidelines', translations: { es: 'Guías' }, autogenerate: { directory: 'guidelines' } },
		{ label: 'Standards', translations: { es: 'Estándares' }, autogenerate: { directory: 'standards' } },
		{ slug: 'projects' },
		{ slug: 'awesome' },
		{ slug: 'join' },
	],
	files: readiness_badges,
});
