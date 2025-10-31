import { Mail, Phone, MapPin, Linkedin, Globe, Link2 } from "lucide-react";

const TechTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-gray-800 p-10 font-sans">
            {/* Header */}
            <header className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-2" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <p className="text-xl text-gray-700">{data.personal_info?.profession || "Profession"}</p>

                <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1"><Mail className="size-4" />{data.personal_info.email}</div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1"><Phone className="size-4" />{data.personal_info.phone}</div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1"><MapPin className="size-4" />{data.personal_info.location}</div>
                    )}
                    {data.personal_info?.linkedin && (
                        <a href={data.personal_info.linkedin} target="_blank" className="flex items-center gap-1">
                            <Linkedin className="size-4" />{data.personal_info.linkedin}
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a href={data.personal_info.website} target="_blank" className="flex items-center gap-1">
                            <Globe className="size-4" />{data.personal_info.website}
                        </a>
                    )}
                </div>
            </header>

            <div className="space-y-12">
                {/* Professional Summary */}
                {data.professional_summary && (
                    <section>
                        <h2 className="text-2xl font-semibold mb-3" style={{ color: accentColor }}>Professional Summary</h2>
                        <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
                    </section>
                )}

                {/* Experience Timeline */}
                {data.experience && data.experience.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-semibold mb-6" style={{ color: accentColor }}>Experience</h2>
                        <div className="relative border-l-2 border-gray-200 pl-8">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="mb-8 relative">
                                    <span className="absolute -left-4 top-0 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></span>
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h3 className="text-xl font-semibold">{exp.position}</h3>
                                            <p className="text-gray-700 font-medium" style={{ color: accentColor }}>{exp.company}</p>
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
                        <h2 className="text-2xl font-semibold mb-6" style={{ color: accentColor }}>Projects</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {data.project.map((proj, i) => (
                                <div key={i} className="p-4 border-l-4 border-gray-200" style={{ borderColor: accentColor }}>
                                    <h3 className="text-lg font-semibold">{proj.name}</h3>
                                    {proj.description && (
                                        <p className="text-gray-700 mt-1 leading-relaxed">{proj.description}</p>
                                    )}
                                    {proj.link && (
                                        <a href={proj.link} target="_blank" className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                                            <Link2 className="size-4" /> {proj.link}
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
                        <h2 className="text-2xl font-semibold mb-6" style={{ color: accentColor }}>Education</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {data.education.map((edu, i) => (
                                <div key={i} className="border-l-4 pl-4 border-gray-200" style={{ borderColor: accentColor }}>
                                    <h3 className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                                    <p className="text-gray-700">{edu.institution}</p>
                                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                                    <p className="text-xs text-gray-500">{formatDate(edu.graduation_date)}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-semibold mb-4" style={{ color: accentColor }}>Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">{skill}</span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default TechTemplate;
