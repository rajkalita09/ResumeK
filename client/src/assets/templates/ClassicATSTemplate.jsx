const ClassicATSTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white text-black p-8 font-sans leading-snug text-[15px]">
      {/* Header */}
      <header className="text-center mb-3">
        <h1 className="text-2xl font-bold tracking-wide">
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        <p className="text-sm mt-1">
          {data.personal_info?.location && `${data.personal_info.location} | `}
          {data.personal_info?.phone && `${data.personal_info.phone} | `}
          {data.personal_info?.email && (
            <a href={`mailto:${data.personal_info.email}`}>{data.personal_info.email}</a>
          )}
          {data.personal_info?.linkedin && (
            <>
              {" | "}
              <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer">
                {data.personal_info.linkedin}
              </a>
            </>
          )}
        </p>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="mb-4">
          <h2 className="font-bold uppercase mb-1" style={{ color: accentColor }}>
            Professional Summary
          </h2>
          <p className="text-sm leading-snug whitespace-pre-line">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold uppercase mb-1" style={{ color: accentColor }}>
            Education
          </h2>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-1">
              <p className="font-semibold">{edu.institution}</p>
              <p className="text-sm italic">
                {edu.degree} {edu.field && `in ${edu.field}`}{" "}
                {edu.graduation_date && `| ${formatDate(edu.graduation_date)}`}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.project && data.project.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold uppercase mb-1" style={{ color: accentColor }}>
            Projects
          </h2>
          {data.project.map((proj, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">{proj.name}</p>
              {proj.link && (
                <p className="text-sm">
                  <a href={proj.link} target="_blank" rel="noreferrer">
                    {proj.link}
                  </a>
                </p>
              )}
              <p className="text-sm leading-snug whitespace-pre-line">{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold uppercase mb-1" style={{ color: accentColor }}>
            Technical Experience
          </h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">
                {exp.position}, {exp.company}
              </p>
              <p className="text-xs italic mb-1">
                {formatDate(exp.start_date)} -{" "}
                {exp.is_current ? "Present" : formatDate(exp.end_date)}
              </p>
              <p className="text-sm leading-snug whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold uppercase mb-1" style={{ color: accentColor }}>
            Skills
          </h2>
          <p className="text-sm">{data.skills.join(", ")}</p>
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold uppercase mb-1" style={{ color: accentColor }}>
            Certifications
          </h2>
          <ul className="list-disc ml-5 text-sm">
            {data.certifications.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Achievements */}
      {data.achievements && data.achievements.length > 0 && (
        <section>
          <h2 className="font-bold uppercase mb-1" style={{ color: accentColor }}>
            Achievements & Leadership
          </h2>
          <ul className="list-disc ml-5 text-sm">
            {data.achievements.map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ClassicATSTemplate;
