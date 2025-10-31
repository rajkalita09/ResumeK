import { Mail, Phone, MapPin, Linkedin, Globe, Link2 } from "lucide-react";

const CreativeTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-gray-800 shadow-lg">
            <div className="flex flex-col md:flex-row">
                {/* Sidebar */}
                    <aside
                    className="md:w-1/3 text-white p-8 flex flex-col justify-between"
                    style={{ backgroundColor: accentColor }}
                    >
                    <div className="space-y-6">
                        {/* Name & Profession */}
                        <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        <p className="text-md font-medium mt-2">
                            {data.personal_info?.profession || "Profession"}
                        </p>
                        </div>

                        {/* Contact */}
                        <section className="space-y-2">
                        <h2 className="text-lg font-semibold uppercase">Contact</h2>
                        {data.personal_info?.email && (
                            <div className="flex items-center gap-2 text-sm">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                            </div>
                        )}
                        {data.personal_info?.phone && (
                            <div className="flex items-center gap-2 text-sm">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                            </div>
                        )}
                        {data.personal_info?.location && (
                            <div className="flex items-center gap-2 text-sm">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                            </div>
                        )}
                        {data.personal_info?.linkedin && (
                            <a
                            href={data.personal_info.linkedin}
                            target="_blank"
                            className="flex items-center gap-2 text-sm"
                            >
                            <Linkedin className="size-4" />
                            {data.personal_info.linkedin}
                            </a>
                        )}
                        {data.personal_info?.website && (
                            <a
                            href={data.personal_info.website}
                            target="_blank"
                            className="flex items-center gap-2 text-sm"
                            >
                            <Globe className="size-4" />
                            {data.personal_info.website}
                            </a>
                        )}
                        </section>

                        {/* Skills */}
                        {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold uppercase mb-2">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span
                                key={i}
                                className="bg-white px-3 py-1 rounded-full text-sm font-medium"
                                style={{ color: accentColor }}
                                >
                                {skill}
                                </span>
                            ))}
                            </div>
                        </section>
                        )}

                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                        <section className="mt-6">
                            <h2 className="text-lg font-semibold uppercase mb-2">Education</h2>
                            <div className="space-y-3 text-sm">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                <p className="font-medium">
                                    {edu.degree} {edu.field && `in ${edu.field}`}
                                </p>
                                <p>{edu.institution}</p>
                                {edu.gpa && <p>GPA: {edu.gpa}</p>}
                                <p className="text-xs">{formatDate(edu.graduation_date)}</p>
                                </div>
                            ))}
                            </div>
                        </section>
                        )}
                    </div>
                    </aside>


                {/* Main Content */}
                <main className="md:w-2/3 p-10 space-y-10">
                    {/* Summary */}
                    {data.professional_summary && (
                        <section>
                            <h2 className="text-2xl font-bold mb-3" style={{ color: accentColor }}>Professional Summary</h2>
                            <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-4" style={{ color: accentColor }}>Experience</h2>
                            <div className="space-y-6">
                                {data.experience.map((exp, i) => (
                                    <div key={i} className="space-y-1 border-l-4 pl-4" style={{ borderColor: accentColor }}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-semibold">{exp.position}</h3>
                                                <p className="font-medium" style={{ color: accentColor }}>{exp.company}</p>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        {exp.description && (
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.project && data.project.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-4" style={{ color: accentColor }}>Projects</h2>
                            <div className="space-y-4">
                                {data.project.map((proj, i) => (
                                    <div key={i} className="border-l-4 pl-4" style={{ borderColor: accentColor }}>
                                        <h3 className="text-lg font-semibold">{proj.name}</h3>
                                        {proj.description && (
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{proj.description}</p>
                                        )}
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" className="flex items-center gap-1 text-sm text-gray-600">
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

export default CreativeTemplate;
