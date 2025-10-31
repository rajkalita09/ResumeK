import React from "react";

const CreativeATSTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	};

	return (
		<div className="max-w-5xl mx-auto bg-white text-gray-900 font-sans leading-relaxed border shadow-sm">
			{/* ===== Header ===== */}
			<header
				className="text-center py-6 px-4 border-b"
				style={{ borderColor: accentColor, backgroundColor: "#f9fafb" }}
			>
				<h1
					className="text-4xl font-extrabold tracking-tight"
					style={{ color: accentColor }}
				>
					{data.personal_info?.full_name || "Your Name"}
				</h1>
				<p className="text-lg font-medium">
					{data.personal_info?.profession || "Your Title"}
				</p>
				<div className="text-sm text-gray-700 mt-2">
					{data.personal_info?.email && <span>{data.personal_info.email}</span>}
					{data.personal_info?.phone && <span> • {data.personal_info.phone}</span>}
					{data.personal_info?.location && <span> • {data.personal_info.location}</span>}
				</div>
			</header>

			{/* ===== Main Layout ===== */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-0">
				{/* ==== Left Column ==== */}
				<aside className="md:col-span-1 border-r p-6 space-y-6 bg-gray-50">
					{/* Contact */}
					<section>
						<h2
							className="text-lg font-semibold uppercase mb-2 border-b pb-1"
							style={{ color: accentColor, borderColor: accentColor }}
						>
							Contact
						</h2>
						<div className="text-sm space-y-1">
							{data.personal_info?.email && <p>{data.personal_info.email}</p>}
							{data.personal_info?.phone && <p>{data.personal_info.phone}</p>}
							{data.personal_info?.location && <p>{data.personal_info.location}</p>}
							{data.personal_info?.linkedin && (
								<p>{data.personal_info.linkedin}</p>
							)}
							{data.personal_info?.website && (
								<p>{data.personal_info.website}</p>
							)}
						</div>
					</section>

					{/* Skills */}
					{data.skills?.length > 0 && (
						<section>
							<h2
								className="text-lg font-semibold uppercase mb-2 border-b pb-1"
								style={{ color: accentColor, borderColor: accentColor }}
							>
								Skills
							</h2>
							<ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
								{data.skills.map((skill, i) => (
									<li key={i}>{skill}</li>
								))}
							</ul>
						</section>
					)}

					{/* Certifications */}
					{data.certifications?.length > 0 && (
						<section>
							<h2
								className="text-lg font-semibold uppercase mb-2 border-b pb-1"
								style={{ color: accentColor, borderColor: accentColor }}
							>
								Certifications
							</h2>
							<ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
								{data.certifications.map((cert, i) => (
									<li key={i}>{cert}</li>
								))}
							</ul>
						</section>
					)}
				</aside>

				{/* ==== Right Column ==== */}
				<main className="md:col-span-2 p-8 space-y-8">
					{/* Professional Summary */}
					{data.professional_summary && (
						<section>
							<h2
								className="text-xl font-bold border-b pb-1 mb-2"
								style={{ color: accentColor, borderColor: accentColor }}
							>
								Professional Summary
							</h2>
							<p className="text-sm text-gray-800">
								{data.professional_summary}
							</p>
						</section>
					)}

					{/* Experience */}
					{data.experience?.length > 0 && (
						<section>
							<h2
								className="text-xl font-bold border-b pb-1 mb-2"
								style={{ color: accentColor, borderColor: accentColor }}
							>
								Experience
							</h2>
							{data.experience.map((exp, i) => (
								<div key={i} className="mb-4">
									<p className="font-semibold text-base">{exp.position}</p>
									<p className="text-sm text-gray-700">
										{exp.company} • {formatDate(exp.start_date)} –{" "}
										{exp.is_current ? "Present" : formatDate(exp.end_date)}
									</p>
									<p className="text-sm text-gray-800 mt-1 whitespace-pre-line">
										{exp.description}
									</p>
								</div>
							))}
						</section>
					)}

					{/* Education */}
					{data.education?.length > 0 && (
						<section>
							<h2
								className="text-xl font-bold border-b pb-1 mb-2"
								style={{ color: accentColor, borderColor: accentColor }}
							>
								Education
							</h2>
							{data.education.map((edu, i) => (
								<div key={i} className="mb-3">
									<p className="font-medium">
										{edu.degree} {edu.field && `in ${edu.field}`}
									</p>
									<p className="text-sm text-gray-700">{edu.institution}</p>
									<p className="text-xs text-gray-500">
										{formatDate(edu.graduation_date)}
									</p>
								</div>
							))}
						</section>
					)}

					{/* Projects */}
					{data.project?.length > 0 && (
						<section>
							<h2
								className="text-xl font-bold border-b pb-1 mb-2"
								style={{ color: accentColor, borderColor: accentColor }}
							>
								Projects
							</h2>
							{data.project.map((proj, i) => (
								<div key={i} className="mb-3">
									<p className="font-medium text-base">{proj.name}</p>
									<p className="text-sm text-gray-800 whitespace-pre-line">
										{proj.description}
									</p>
									{proj.link && (
										<a
											href={proj.link}
											className="text-xs text-blue-600"
											target="_blank"
										>
											{proj.link}
										</a>
									)}
								</div>
							))}
						</section>
					)}

					{/* Achievements */}
					{data.achievements?.length > 0 && (
						<section>
							<h2
								className="text-xl font-bold border-b pb-1 mb-2"
								style={{ color: accentColor, borderColor: accentColor }}
							>
								Achievements
							</h2>
							<ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
								{data.achievements.map((ach, i) => (
									<li key={i}>{ach}</li>
								))}
							</ul>
						</section>
					)}
				</main>
			</div>
		</div>
	);
};

export default CreativeATSTemplate;
