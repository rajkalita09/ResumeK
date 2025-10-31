import React from "react";

const CompactATSTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	};

	return (
		<div className="max-w-4xl mx-auto bg-white text-gray-900 font-sans p-8 leading-relaxed">
			{/* Header */}
			<header className="border-b pb-3 mb-4 text-center">
				<h1 className="text-3xl font-bold" style={{ color: accentColor }}>
					{data.personal_info?.full_name || "Your Name"}
				</h1>
				<p className="text-base">{data.personal_info?.profession || "Your Title"}</p>
				<div className="text-xs mt-1 text-gray-700">
					{data.personal_info?.email && <span>{data.personal_info.email}</span>}
					{data.personal_info?.phone && <span> • {data.personal_info.phone}</span>}
					{data.personal_info?.location && <span> • {data.personal_info.location}</span>}
				</div>
			</header>

			{/* Professional Summary */}
			{data.professional_summary && (
				<section className="mb-4">
					<h2 className="text-lg font-semibold" style={{ color: accentColor }}>Professional Summary</h2>
					<p className="text-sm mt-1 text-gray-800">{data.professional_summary}</p>
				</section>
			)}

			{/* Experience */}
			{data.experience?.length > 0 && (
				<section className="mb-4">
					<h2 className="text-lg font-semibold" style={{ color: accentColor }}>Experience</h2>
					{data.experience.map((exp, i) => (
						<div key={i} className="mt-1">
							<p className="font-medium text-sm">{exp.position}</p>
							<p className="text-xs text-gray-700">
								{exp.company} • {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
							</p>
							<p className="text-xs text-gray-800 whitespace-pre-line mt-1">{exp.description}</p>
						</div>
					))}
				</section>
			)}

			{/* Education */}
			{data.education?.length > 0 && (
				<section className="mb-4">
					<h2 className="text-lg font-semibold" style={{ color: accentColor }}>Education</h2>
					{data.education.map((edu, i) => (
						<div key={i} className="mt-1 text-sm">
							<p className="font-medium">{edu.degree} {edu.field && `in ${edu.field}`}</p>
							<p>{edu.institution}</p>
							<p className="text-xs text-gray-500">{formatDate(edu.graduation_date)}</p>
						</div>
					))}
				</section>
			)}

			{/* Projects */}
			{data.project?.length > 0 && (
				<section className="mb-4">
					<h2 className="text-lg font-semibold" style={{ color: accentColor }}>Projects</h2>
					{data.project.map((proj, i) => (
						<div key={i} className="mt-1 text-sm">
							<p className="font-medium">{proj.name}</p>
							<p className="text-xs text-gray-800 whitespace-pre-line">{proj.description}</p>
						</div>
					))}
				</section>
			)}

			{/* Skills */}
			{data.skills?.length > 0 && (
				<section className="mb-4">
					<h2 className="text-lg font-semibold" style={{ color: accentColor }}>Skills</h2>
					<p className="text-sm">{data.skills.join(", ")}</p>
				</section>
			)}

			{/* Certifications */}
			{data.certifications?.length > 0 && (
				<section className="mb-4">
					<h2 className="text-lg font-semibold" style={{ color: accentColor }}>Certifications</h2>
					<ul className="list-disc list-inside text-sm">
						{data.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
					</ul>
				</section>
			)}

			{/* Achievements */}
			{data.achievements?.length > 0 && (
				<section>
					<h2 className="text-lg font-semibold" style={{ color: accentColor }}>Achievements</h2>
					<ul className="list-disc list-inside text-sm">
						{data.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
					</ul>
				</section>
			)}
		</div>
	);
};

export default CompactATSTemplate;
