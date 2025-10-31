import { Mail, Phone, MapPin, Linkedin, Globe, Link2 } from "lucide-react";

const VisualImageTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	};

	return (
		<div className="max-w-5xl mx-auto bg-white shadow-lg text-gray-800 flex flex-col md:flex-row overflow-hidden rounded-lg">
			{/* Left Panel */}
{/* Left Panel */}
<aside className="md:w-1/3 bg-gray-50 border-r px-5 py-6 flex flex-col items-center">
  {/* Image */}
  {data.personal_info?.image && (
    <div
      className="w-36 h-36 rounded-full overflow-hidden border-4 shadow-sm mb-5"
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

  {/* Contact */}
  <section className="w-full mb-6">
    <h2
      className="text-lg font-semibold uppercase mb-2 text-center"
      style={{ color: accentColor }}
    >
      Contact
    </h2>
    <ul className="space-y-1.5 text-sm text-center">
      {data.personal_info?.email && (
        <li className="flex items-center justify-center gap-2">
          <Mail className="size-4" /> {data.personal_info.email}
        </li>
      )}
      {data.personal_info?.phone && (
        <li className="flex items-center justify-center gap-2">
          <Phone className="size-4" /> {data.personal_info.phone}
        </li>
      )}
      {data.personal_info?.location && (
        <li className="flex items-center justify-center gap-2">
          <MapPin className="size-4" /> {data.personal_info.location}
        </li>
      )}
      {data.personal_info?.linkedin && (
        <li className="flex items-center justify-center gap-2">
          <Linkedin className="size-4" />
          <a
            href={data.personal_info.linkedin}
            target="_blank"
            className="hover:underline"
          >
            {data.personal_info.linkedin}
          </a>
        </li>
      )}
      {data.personal_info?.website && (
        <li className="flex items-center justify-center gap-2">
          <Globe className="size-4" />
          <a
            href={data.personal_info.website}
            target="_blank"
            className="hover:underline"
          >
            {data.personal_info.website}
          </a>
        </li>
      )}
    </ul>
  </section>

  {/* Skills */}
  {data.skills && data.skills.length > 0 && (
    <section className="w-full">
      <h2
        className="text-lg font-semibold uppercase mb-2 text-center"
        style={{ color: accentColor }}
      >
        Skills
      </h2>
      <ul className="space-y-1 text-sm text-center">
        {data.skills.map((skill, i) => (
          <li key={i} className="border-b pb-1 border-dotted">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  )}
</aside>



			{/* Right Panel */}
			<main className="md:w-2/3 p-6 md:p-8 space-y-8">
				{/* Header */}
				<header className="border-b pb-4">
					<h1 className="text-4xl font-bold leading-tight" style={{ color: accentColor }}>
						{data.personal_info?.full_name || "Your Name"}
					</h1>
					<p className="text-lg text-gray-700">{data.personal_info?.profession || "Profession"}</p>
				</header>

				{/* Summary */}
				{data.professional_summary && (
					<section>
						<h2 className="text-2xl font-semibold mb-2" style={{ color: accentColor }}>Profile Summary</h2>
						<p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
					</section>
				)}

				{/* Experience */}
				{data.experience && data.experience.length > 0 && (
					<section>
						<h2 className="text-2xl font-semibold mb-3" style={{ color: accentColor }}>Experience</h2>
						{data.experience.map((exp, i) => (
							<div key={i} className="mb-4">
								<h3 className="text-lg font-medium">{exp.position}</h3>
								<p className="text-sm font-semibold" style={{ color: accentColor }}>{exp.company}</p>
								<p className="text-xs text-gray-500">
									{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
								</p>
								<p className="text-gray-700 leading-relaxed whitespace-pre-line mt-1">{exp.description}</p>
							</div>
						))}
					</section>
				)}

				{/* Education */}
				{data.education && data.education.length > 0 && (
					<section>
						<h2 className="text-2xl font-semibold mb-3" style={{ color: accentColor }}>Education</h2>
						{data.education.map((edu, i) => (
							<div key={i} className="mb-2">
								<p className="font-medium">{edu.degree} {edu.field && `in ${edu.field}`}</p>
								<p className="text-gray-700">{edu.institution}</p>
								<p className="text-xs text-gray-500">{formatDate(edu.graduation_date)}</p>
							</div>
						))}
					</section>
				)}

				{/* Projects */}
				{data.project && data.project.length > 0 && (
					<section>
						<h2 className="text-2xl font-semibold mb-3" style={{ color: accentColor }}>Projects</h2>
						{data.project.map((proj, i) => (
							<div key={i} className="mb-3">
								<h3 className="text-lg font-medium">{proj.name}</h3>
								<p className="text-gray-700">{proj.description}</p>
								{proj.link && (
									<a href={proj.link} target="_blank" className="flex items-center gap-1 text-sm text-gray-600 mt-1">
										<Link2 className="size-4" /> {proj.link}
									</a>
								)}
							</div>
						))}
					</section>
				)}
			</main>
		</div>
	);
};

export default VisualImageTemplate;
