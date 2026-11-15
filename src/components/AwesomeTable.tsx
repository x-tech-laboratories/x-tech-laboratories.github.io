// Renders one category of the Awesome AI-Assisted Open Source list as a table, with each project's AI Readiness Score.
import { CHECKS } from 'ai-readiness';
import { use_site_page } from '@x-tech-laboratories/x-libs/web/react/site';
import entries from '../data/awesome.json';
import readiness from '../data/readiness.json';

interface Score {
	score: number;
	total: number;
	checks: Record<string, { pass: boolean }>;
}

export function AwesomeTable({ category }: { category: string }) {
	const base = use_site_page().base;
	const rows = entries
		.filter((entry) => entry.category === category)
		.map((entry) => ({ ...entry, score: (readiness as Record<string, Score | undefined>)[entry.repo] }));

	return (
		<table className="awesome">
			<thead>
				<tr>
					<th>Project</th>
					<th>Description</th>
					<th>AI use</th>
					<th>
						<a href={`${base}guidelines/readiness/`}>Readiness</a>
					</th>
				</tr>
			</thead>
			<tbody>
				{rows.map((row) => (
					<tr key={row.repo}>
						<td>
							<a href={`https://github.com/${row.repo}`}>{row.name}</a>
							<br />
							<small>{row.licence}</small>
						</td>
						<td>{row.description}</td>
						<td>
							<a href={row.evidence.url}>{row.evidence.label}</a>: {row.evidence.text}
						</td>
						<td className="score">
							{row.score ? (
								<>
									<strong>
										{row.score.score}/{row.score.total}
									</strong>
									<ul>
										{Object.entries(CHECKS as Record<string, string>).map(([key, label]) => {
											const pass = row.score!.checks[key].pass;
											return (
												<li key={key} className={pass ? 'pass' : 'fail'}>
													<span aria-hidden="true">{pass ? '✓' : '✗'}</span>
													<span className="visually-hidden">{pass ? 'Yes:' : 'No:'}</span> {label}
												</li>
											);
										})}
									</ul>
								</>
							) : (
								'Not scored'
							)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
