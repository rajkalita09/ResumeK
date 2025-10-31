import { Mail, Phone, MapPin, Linkedin, Globe, Link2 } from "lucide-react";

const SleekImageTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	};

	return (
		<div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
			{/* Header Section */}
			<header
				className="flex flex-col items-center text-center px-4 py-6"
				style={{ backgroundColor: `${accentColor}15` }}
			>
				{/* Image */}
				{data.personal_info?.image && (
					<div
						className="w-32 h-32 rounded-full overflow-hidden border-4 mb-3 shadow-sm"
						style={{ borderColor: accentColor }}
					>
						<img
							src={
								typeof data.personal_info.image === "string"
									? data.personal_info.image
									: URL.createObjectURL(data.personal_info.image)
							}
							alt="Profile"
							className="w-full h-full object-cover"
						/>
					</div>
				)}

				<h1 className="text-3xl font-bold text-gray-800">
					{data.personal_info?.full_name || "Your Name"}
				</h1>
				<p
					className="text-base font-medium mt-1"
					style={{ color: accentColor }}
				>
					{data.personal_info?.profession || "Profession"}
				</p>

				{/* Contact */}
				<div className="mt-3 flex flex-wrap justify-center gap-3 text-xs text-gray-700">
					{data.personal_info?.email && (
						<div className="flex items-center gap-1">
							<Mail className="size-3" /> {data.personal_info.email}
						</div>
					)}
					{data.personal_info?.phone && (
						<div className="flex items-center gap-1">
							<Phone className="size-3" /> {data.personal_info.phone}
						</div>
					)}
					{data.personal_info?.location && (
						<div className="flex items-center gap-1">
							<MapPin className="size-3" /> {data.personal_info.location}
						</div>
					)}
					{data.personal_info?.linkedin && (
						<a
							href={data.personal_info.linkedin}
							target="_blank"
							className="flex items-center gap-1 hover:underline"
						>
							<Linkedin className="size-3" /> LinkedIn
						</a>
					)}
					{data.personal_info?.website && (
						<a
							href={data.personal_info.website}
							target="_blank"
							className="flex items-center gap-1 hover:underline"
						>
							<Globe className="size-3" /> Website
						</a>
					)}
				</div>
			</header>

			{/* Body Section */}
			<main className="px-8 py-6 space-y-6">
				{/* Summary */}
				{data.professional_summary && (
					<section>
						<h2
							className="text-xl font-bold mb-1 border-b-2 inline-block pb-0.5"
							style={{ borderColor: accentColor, color: accentColor }}
						>
							Profile Summary
						</h2>
						<p className="text-gray-700 text-sm leading-relaxed mt-1">
							{data.professional_summary}
						</p>
					</section>
				)}

				{/* Experience */}
				{data.experience && data.experience.length > 0 && (
					<section>
						<h2
							className="text-xl font-bold mb-1 border-b-2 inline-block pb-0.5"
							style={{ borderColor: accentColor, color: accentColor }}
						>
							Experience
						</h2>
						<div className="space-y-3 mt-2">
							{data.experience.map((exp, i) => (
								<div key={i} className="border-l-4 pl-3" style={{ borderColor: accentColor }}>
									<h3 className="text-base font-semibold">{exp.position}</h3>
									<p className="text-sm font-medium text-gray-700">{exp.company}</p>
									<p className="text-xs text-gray-500 mb-0.5">
										{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
									</p>
									<p className="text-gray-700 text-sm whitespace-pre-line">{exp.description}</p>
								</div>
							))}
						</div>
					</section>
				)}

				{/* Projects */}
				{data.project && data.project.length > 0 && (
					<section>
						<h2
							className="text-xl font-bold mb-1 border-b-2 inline-block pb-0.5"
							style={{ borderColor: accentColor, color: accentColor }}
						>
							Projects
						</h2>
						<div className="space-y-3 mt-2">
							{data.project.map((proj, i) => (
								<div key={i}>
									<h3 className="text-base font-semibold">{proj.name}</h3>
									<p className="text-gray-700 text-sm">{proj.description}</p>
									{proj.link && (
										<a
											href={proj.link}
											target="_blank"
											className="flex items-center gap-1 text-xs text-gray-600 mt-1 hover:underline"
										>
											<Link2 className="size-3" /> {proj.link}
										</a>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				{/* Education */}
				{data.education && data.education.length > 0 && (
					<section>
						<h2
							className="text-xl font-bold mb-1 border-b-2 inline-block pb-0.5"
							style={{ borderColor: accentColor, color: accentColor }}
						>
							Education
						</h2>
						<div className="space-y-2 mt-2">
							{data.education.map((edu, i) => (
								<div key={i}>
									<p className="font-medium text-sm">
										{edu.degree} {edu.field && `in ${edu.field}`}
									</p>
									<p className="text-gray-700 text-sm">{edu.institution}</p>
									<p className="text-xs text-gray-500">
										{formatDate(edu.graduation_date)}
									</p>
								</div>
							))}
						</div>
					</section>
				)}

				{/* Skills */}
				{data.skills && data.skills.length > 0 && (
					<section>
						<h2
							className="text-xl font-bold mb-1 border-b-2 inline-block pb-0.5"
							style={{ borderColor: accentColor, color: accentColor }}
						>
							Skills
						</h2>
						<div className="flex flex-wrap gap-1.5 mt-2">
							{data.skills.map((skill, i) => (
								<span
									key={i}
									className="px-2.5 py-0.5 rounded-full text-xs font-medium border"
									style={{
										color: accentColor,
										borderColor: accentColor,
									}}
								>
									{skill}
								</span>
							))}
						</div>
					</section>
				)}
			</main>
		</div>
	);
};

export default SleekImageTemplate;
