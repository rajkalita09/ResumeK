import { Mail, Phone, MapPin, Linkedin, Globe, Link2 } from "lucide-react";

const ElegantTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	};

	return (
		<div className="max-w-5xl mx-auto bg-white text-gray-800 font-sans shadow-lg rounded-lg overflow-hidden">
			<div className="grid grid-cols-1 md:grid-cols-3">
				{/* LEFT SIDEBAR */}
				<aside
					className="md:col-span-1 p-6 text-white flex flex-col items-center"
					style={{ backgroundColor: accentColor }}
				>
					{/* Profile Image */}
					{data.personal_info?.image && (
						<img
							src={
								typeof data.personal_info.image === "string"
									? data.personal_info.image
									: URL.createObjectURL(data.personal_info.image)
							}
							alt="Profile"
							className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md "
						/>
					)}

					{/* Contact Info */}
					<div className="w-full mt-6">
						<h2 className="text-lg font-semibold mb-2 border-b border-white/30 pb-1">
							
						</h2>
						<ul className="space-y-2 text-sm">
							{data.personal_info?.email && (
								<li className="flex items-center gap-2">
									<Mail className="size-4" /> {data.personal_info.email}
								</li>
							)}
							{data.personal_info?.phone && (
								<li className="flex items-center gap-2">
									<Phone className="size-4" /> {data.personal_info.phone}
								</li>
							)}
							{data.personal_info?.location && (
								<li className="flex items-center gap-2">
									<MapPin className="size-4" /> {data.personal_info.location}
								</li>
							)}
							{data.personal_info?.linkedin && (
								<li className="flex items-center gap-2 break-all">
									<Linkedin className="size-4" /> {data.personal_info.linkedin}
								</li>
							)}
							{data.personal_info?.website && (
								<li className="flex items-center gap-2 break-all">
									<Globe className="size-4" /> {data.personal_info.website}
								</li>
							)}
						</ul>
					</div>

					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section className="w-full mt-6">
							<h2 className="text-lg font-semibold mb-2 border-b border-white/30 pb-1">
								EDUCATION
							</h2>
							<div className="space-y-3">
								{data.education.map((edu, i) => (
									<div key={i}>
										<h3 className="font-semibold text-base">{edu.degree}</h3>
										<p className="text-sm opacity-90">{edu.institution}</p>
										{edu.gpa && (
											<p className="text-xs opacity-80">GPA: {edu.gpa}</p>
										)}
										<p className="text-xs opacity-70">
											{formatDate(edu.graduation_date)}
										</p>
									</div>
								))}
							</div>
						</section>
					)}
					{/* Skills */}
					{data.skills && data.skills.length > 0 && (
						<section className="w-full mt-6">
							<h2 className="text-lg font-semibold mb-2 border-b border-white/30 pb-1">
								SKILLS
							</h2>

							<div className="flex flex-wrap ">
								{data.skills.map((skill, index) => (
									<span
										key={index}
										className="px-3 py-1 text-sm text-white rounded-full"
										style={{ backgroundColor: "" }}
									>
										• {skill}
									</span>
								))}
							</div>
						</section>
					)}
					
				</aside>

				{/* RIGHT MAIN SECTION */}
				<main className="md:col-span-2 p-8 space-y-8">
                    {/* Name + Profession */}
                    <div
                        className="space-6"
                        style={{ color: accentColor }}
                        >
                        <h1 className="text-3xl font-bold">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        <p className="text-sm opacity-90 mb-6">
                            {data.personal_info?.profession || "Your Title"}
                        </p>
                    </div>

                    
					{/* Profile Summary */}
					{data.professional_summary?.length > 0 && (
						<section>
							<h2
								className="text-xl font-semibold border-b-2 pb-1 mb-3"
								style={{ borderColor: accentColor,  }}
							>
								PROFESSIONAL SUMMARY
							</h2>
							<p className="text-gray-700 text-sm leading-relaxed">
								{data.professional_summary}
							</p>
						</section>
					)}

					{/* Experience */}
					{data.experience && data.experience.length > 0 && (
						<section>
							<h2
								className="text-xl font-semibold border-b-2 pb-1 mb-3"
								style={{ borderColor: accentColor,  }}
							>
								PROFESSIONAL EXPERIENCE
							</h2>
							<div className="space-y-6">
								{data.experience.map((exp, i) => (
									<div key={i}>
										<div className="flex justify-between items-center">
											<div>
												<h3 className="font-semibold text-lg">{exp.position}</h3>
												<p className="text-gray-600">{exp.company}</p>
											</div>
											<span className="text-xs text-zinc-500">
                                                {formatDate(exp.start_date)} -{" "}
                                                {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
										</div>
										{exp.description && (
											<p className="text-gray-700 text-sm leading-relaxed mt-2 whitespace-pre-line">
												{exp.description}
											</p>
										)}
									</div>
								))}
							</div>
						</section>
					)}

					{/* Projects */}
					{data.project && data.project.length > 0 && (
						<section>
							<h2
								className="text-xl font-semibold border-b-2 pb-1 mb-3"
								style={{ borderColor: accentColor, }}
							>
								PROJECTS
							</h2>
							<div className="space-y-4">
								{data.project.map((proj, i) => (
									<div key={i}>
										<h3 className="font-semibold text-lg">{proj.name}</h3>
										{proj.description && (
											<p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
												{proj.description}
											</p>
										)}
										{proj.link && (
											<a
												href={proj.link}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-1 text-sm text-blue-600 hover:underline mt-1"
											>
												<Link2 className="size-4" /> {proj.link}
											</a>
										)}
									</div>
								))}
							</div>
						</section>
					)}

					
				</main>
			</div>
		</div>
	);
};

export default ElegantTemplate;
