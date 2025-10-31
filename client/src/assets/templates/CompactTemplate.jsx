import { Mail, Phone, MapPin, Linkedin, Globe, Link2 } from "lucide-react";

const CompactTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white text-gray-800 p-8 leading-relaxed">
            {/* Header */}
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-1" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <p className="text-md text-gray-700 mb-3">{data.personal_info?.profession || "Profession"}</p>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {data.personal_info?.email && <div className="flex items-center gap-1"><Mail className="size-4" />{data.personal_info.email}</div>}
                    {data.personal_info?.phone && <div className="flex items-center gap-1"><Phone className="size-4" />{data.personal_info.phone}</div>}
                    {data.personal_info?.location && <div className="flex items-center gap-1"><MapPin className="size-4" />{data.personal_info.location}</div>}
                    {data.personal_info?.linkedin && <a href={data.personal_info.linkedin} target="_blank" className="flex items-center gap-1"><Linkedin className="size-4" />{data.personal_info.linkedin}</a>}
                    {data.personal_info?.website && <a href={data.personal_info.website} target="_blank" className="flex items-center gap-1"><Globe className="size-4" />{data.personal_info.website}</a>}
                </div>
            </header>

            <div className="space-y-8">
                {/* Summary */}
                {data.professional_summary && (
                    <section>
                        <h2 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>Professional Summary</h2>
                        <p>{data.professional_summary}</p>
                    </section>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>Experience</h2>
                        <div className="space-y-4">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="pl-3 border-l-2" style={{ borderColor: accentColor }}>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-semibold">{exp.position}</h3>
                                        <span className="text-sm text-gray-500">
                                            {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 font-medium" style={{ color: accentColor }}>{exp.company}</p>
                                    {exp.description && <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.project && data.project.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>Projects</h2>
                        <div className="space-y-4">
                            {data.project.map((proj, i) => (
                                <div key={i} className="pl-3 border-l-2" style={{ borderColor: accentColor }}>
                                    <h3 className="font-semibold">{proj.name}</h3>
                                    {proj.description && <p className="text-gray-700 whitespace-pre-line">{proj.description}</p>}
                                    {proj.link && <a href={proj.link} target="_blank" className="flex items-center gap-1 text-sm text-gray-600"><Link2 className="size-4" />{proj.link}</a>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>Education</h2>
                        <div className="space-y-3">
                            {data.education.map((edu, i) => (
                                <div key={i} className="pl-3 border-l-2" style={{ borderColor: accentColor }}>
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
                        <h2 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">{skill}</span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default CompactTemplate;
