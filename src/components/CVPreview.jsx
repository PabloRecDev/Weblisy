import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

const CVPreview = ({ cvData, templateStyle = 'modern' }) => {
  if (!cvData) return null;

  const { cv, personal_info, work_experience, education, skills, projects, languages, certifications } = cvData;

  const renderModernTemplate = () => (
    <div className="max-w-4xl mx-auto bg-white shadow-lg" style={{ minHeight: '1123px' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5e17eb] to-[#8b5cf6] text-white p-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">
              {personal_info?.first_name} {personal_info?.last_name}
            </h1>
            {personal_info?.profession && (
              <p className="text-xl opacity-90 mb-4">{personal_info.profession}</p>
            )}
            {personal_info?.professional_summary && (
              <p className="text-lg opacity-80 leading-relaxed max-w-2xl">
                {personal_info.professional_summary}
              </p>
            )}
          </div>
          {personal_info?.photo_url && (
            <div className="ml-8">
              <img 
                src={personal_info.photo_url} 
                alt="Foto de perfil"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/3 bg-gray-50 p-6">
          {/* Información de Contacto */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-[#5e17eb] pb-2">
              CONTACTO
            </h3>
            <div className="space-y-3">
              {personal_info?.email && (
                <div className="flex items-center text-gray-700">
                  <Mail size={16} className="mr-3 text-[#5e17eb]" />
                  <span className="text-sm">{personal_info.email}</span>
                </div>
              )}
              {personal_info?.phone && (
                <div className="flex items-center text-gray-700">
                  <Phone size={16} className="mr-3 text-[#5e17eb]" />
                  <span className="text-sm">{personal_info.phone}</span>
                </div>
              )}
              {personal_info?.address && (
                <div className="flex items-center text-gray-700">
                  <MapPin size={16} className="mr-3 text-[#5e17eb]" />
                  <span className="text-sm">{personal_info.address}</span>
                </div>
              )}
              {personal_info?.website_url && (
                <div className="flex items-center text-gray-700">
                  <Globe size={16} className="mr-3 text-[#5e17eb]" />
                  <span className="text-sm">{personal_info.website_url}</span>
                </div>
              )}
              {personal_info?.linkedin_url && (
                <div className="flex items-center text-gray-700">
                  <Linkedin size={16} className="mr-3 text-[#5e17eb]" />
                  <span className="text-sm">LinkedIn</span>
                </div>
              )}
              {personal_info?.github_url && (
                <div className="flex items-center text-gray-700">
                  <Github size={16} className="mr-3 text-[#5e17eb]" />
                  <span className="text-sm">GitHub</span>
                </div>
              )}
            </div>
          </div>

          {/* Habilidades */}
          {skills && skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-[#5e17eb] pb-2">
                HABILIDADES
              </h3>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{skill.skill_name}</span>
                      <span className="text-xs text-gray-500">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#5e17eb] h-2 rounded-full" 
                        style={{ 
                          width: skill.level === 'expert' ? '100%' : 
                                skill.level === 'advanced' ? '80%' :
                                skill.level === 'intermediate' ? '60%' : '40%' 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Idiomas */}
          {languages && languages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-[#5e17eb] pb-2">
                IDIOMAS
              </h3>
              <div className="space-y-2">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">{lang.language}</span>
                    <span className="text-xs text-gray-500">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contenido Principal */}
        <div className="flex-1 p-6">
          {/* Experiencia Laboral */}
          {work_experience && work_experience.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-[#5e17eb] pb-2">
                EXPERIENCIA LABORAL
              </h3>
              <div className="space-y-6">
                {work_experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-[#5e17eb] pl-4">
                    <h4 className="text-lg font-semibold text-gray-800">{exp.position}</h4>
                    <p className="text-[#5e17eb] font-medium mb-2">{exp.company_name}</p>
                    <p className="text-gray-600 text-sm mb-3">
                      {exp.start_date} - {exp.end_date || 'Presente'}
                      {exp.location && ` | ${exp.location}`}
                    </p>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    )}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-sm">{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Educación */}
          {education && education.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-[#5e17eb] pb-2">
                EDUCACIÓN
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-[#5e17eb] pl-4">
                    <h4 className="text-lg font-semibold text-gray-800">{edu.degree}</h4>
                    <p className="text-[#5e17eb] font-medium mb-2">{edu.institution}</p>
                    <p className="text-gray-600 text-sm mb-3">
                      {edu.start_date} - {edu.end_date || 'Presente'}
                      {edu.location && ` | ${edu.location}`}
                    </p>
                    {edu.field_of_study && (
                      <p className="text-gray-700 mb-2">Especialidad: {edu.field_of_study}</p>
                    )}
                    {edu.gpa && (
                      <p className="text-gray-700 mb-2">GPA: {edu.gpa}</p>
                    )}
                    {edu.description && (
                      <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Proyectos */}
          {projects && projects.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-[#5e17eb] pb-2">
                PROYECTOS
              </h3>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index} className="border-l-4 border-[#5e17eb] pl-4">
                    <h4 className="text-lg font-semibold text-gray-800">{project.title}</h4>
                    {project.role && (
                      <p className="text-[#5e17eb] font-medium mb-2">{project.role}</p>
                    )}
                    <p className="text-gray-600 text-sm mb-3">
                      {project.start_date} - {project.end_date || 'En curso'}
                    </p>
                    {project.description && (
                      <p className="text-gray-700 leading-relaxed mb-3">{project.description}</p>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-600 mb-1">Tecnologías:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-2 py-1 bg-[#5e17eb] text-white text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificaciones */}
          {certifications && certifications.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-[#5e17eb] pb-2">
                CERTIFICACIONES
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="border-l-4 border-[#5e17eb] pl-4">
                    <h4 className="text-lg font-semibold text-gray-800">{cert.name}</h4>
                    <p className="text-[#5e17eb] font-medium mb-2">{cert.issuing_organization}</p>
                    <p className="text-gray-600 text-sm">
                      {cert.issue_date} {cert.expiration_date && ` - ${cert.expiration_date}`}
                    </p>
                    {cert.credential_id && (
                      <p className="text-gray-600 text-sm">ID: {cert.credential_id}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 p-4 text-center">
        <p className="text-xs text-gray-500">Generado con CV Master</p>
      </div>
    </div>
  );

  const renderClassicTemplate = () => (
    <div className="max-w-4xl mx-auto bg-white shadow-lg p-8" style={{ minHeight: '1123px' }}>
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {personal_info?.first_name} {personal_info?.last_name}
        </h1>
        {personal_info?.profession && (
          <p className="text-xl text-gray-600 mb-4">{personal_info.profession}</p>
        )}
        
        {/* Información de contacto en línea */}
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
          {personal_info?.email && (
            <span className="flex items-center">
              <Mail size={14} className="mr-1" />
              {personal_info.email}
            </span>
          )}
          {personal_info?.phone && (
            <span className="flex items-center">
              <Phone size={14} className="mr-1" />
              {personal_info.phone}
            </span>
          )}
          {personal_info?.address && (
            <span className="flex items-center">
              <MapPin size={14} className="mr-1" />
              {personal_info.address}
            </span>
          )}
        </div>
      </div>

      {/* Resumen profesional */}
      {personal_info?.professional_summary && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide">
            Perfil Profesional
          </h3>
          <p className="text-gray-700 leading-relaxed">{personal_info.professional_summary}</p>
        </div>
      )}

      {/* Resto del contenido similar al template moderno pero con estilos clásicos */}
      {/* ... (implementar según necesidades específicas) */}
    </div>
  );

  // Renderizar según el template seleccionado
  switch (templateStyle) {
    case 'classic':
      return renderClassicTemplate();
    case 'modern':
    default:
      return renderModernTemplate();
  }
};

export default CVPreview; 