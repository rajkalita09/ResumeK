import React from "react";

const ModernATSTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	};

	return (
		<div className="max-w-5xl mx-auto bg-white text-gray-900 font-sans p-10 leading-relaxed">
			{/* Header */}
			<header className="border-b pb-4 mb-6">
				<h1 className="text-4xl font-bold" style={{ color: accentColor }}>
					{data.personal_info?.full_name || "Your Name"}
				</h1>
				<p className="text-lg">{data.personal_info?.profession || "Your Title"}</p>
				<div className="text-sm mt-2 space-x-4 text-gray-700">
					{data.personal_info?.email && <span>{data.personal_info.email}</span>}
					{data.personal_info?.phone && <span>• {data.personal_info.phone}</span>}
					{data.personal_info?.location && <span>• {data.personal_info.location}</span>}
				</div>
			</header>

			{/* Two-column layout */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Left Sidebar */}
				<aside className="space-y-6 md:col-span-1">
					{/* Skills */}
					{data.skills?.length > 0 && (
						<section>
							<h2 className="text-lg font-semibold mb-2" style={{ color: accentColor }}>
								Skills
							</h2>
							<ul className="list-disc list-inside text-sm space-y-1">
								{data.skills.map((skill, i) => (
									<li key={i}>{skill}</li>
								))}
							</ul>
						</section>
					)}

					{/* Education */}
					{data.education?.length > 0 && (
						<section>
							<h2 className="text-lg font-semibold mb-2" style={{ color: accentColor }}>
								Education
							</h2>
							{data.education.map((edu, i) => (
								<div key={i} className="mb-3">
									<p className="font-medium">{edu.degree} {edu.field && `in ${edu.field}`}</p>
									<p className="text-sm text-gray-700">{edu.institution}</p>
									<p className="text-xs text-gray-500">{formatDate(edu.graduation_date)}</p>
								</div>
							))}
						</section>
					)}

					{/* Certifications */}
					{data.certifications?.length > 0 && (
						<section>
							<h2 className="text-lg font-semibold mb-2" style={{ color: accentColor }}>
								Certifications
							</h2>
							<ul className="list-disc list-inside text-sm space-y-1">
								{data.certifications.map((cert, i) => (
									<li key={i}>{cert}</li>
								))}
							</ul>
						</section>
					)}

					{/* Achievements */}
					{data.achievements?.length > 0 && (
						<section>
							<h2 className="text-lg font-semibold mb-2" style={{ color: accentColor }}>
								Achievements
							</h2>
							<ul className="list-disc list-inside text-sm space-y-1">
								{data.achievements.map((ach, i) => (
									<li key={i}>{ach}</li>
								))}
							</ul>
						</section>
					)}
				</aside>

				{/* Main Section */}
				<main className="md:col-span-2 space-y-6">
					{/* Professional Summary */}
					{data.professional_summary && (
						<section>
							<h2 className="text-xl font-bold mb-2" style={{ color: accentColor }}>
								Professional Summary
							</h2>
							<p className="text-gray-800 text-sm leading-relaxed">
								{data.professional_summary}
							</p>
						</section>
					)}

					{/* Experience */}
					{data.experience?.length > 0 && (
						<section>
							<h2 className="text-xl font-bold mb-2" style={{ color: accentColor }}>
								Experience
							</h2>
							{data.experience.map((exp, i) => (
								<div key={i} className="mb-4">
									<p className="font-semibold text-base">{exp.position}</p>
									<p className="text-sm text-gray-700">
										{exp.company} • {formatDate(exp.start_date)} -{" "}
										{exp.is_current ? "Present" : formatDate(exp.end_date)}
									</p>
									<p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p>
								</div>
							))}
						</section>
					)}

					{/* Projects */}
					{data.project?.length > 0 && (
						<section>
							<h2 className="text-xl font-bold mb-2" style={{ color: accentColor }}>
								Projects
							</h2>
							{data.project.map((proj, i) => (
								<div key={i} className="mb-4">
									<p className="font-medium">{proj.name}</p>
									<p className="text-sm text-gray-700 whitespace-pre-line">{proj.description}</p>
									{proj.link && <a href={proj.link} className="text-xs text-blue-600">{proj.link}</a>}
								</div>
							))}
						</section>
					)}
				</main>
			</div>
		</div>
	);
};

export default ModernATSTemplate;
