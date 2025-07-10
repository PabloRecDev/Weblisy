-- CV Master Database Schema
-- Este esquema crea todas las tablas necesarias para la aplicación CV Master

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de usuarios (aprovecha el sistema de autenticación de Supabase)
CREATE TABLE cv_master_profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    phone TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    website_url TEXT,
    location TEXT,
    profession TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de plantillas de CV
CREATE TABLE cv_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('modern', 'classic', 'creative', 'minimal', 'executive', 'tech')),
    preview_image_url TEXT,
    template_data JSONB NOT NULL,
    is_premium BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla principal de CVs
CREATE TABLE cvs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES cv_master_profiles(id) ON DELETE CASCADE NOT NULL,
    template_id UUID REFERENCES cv_templates(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'archived')),
    is_public BOOLEAN DEFAULT FALSE,
    public_url TEXT UNIQUE,
    views_count INTEGER DEFAULT 0,
    downloads_count INTEGER DEFAULT 0,
    last_exported_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Información personal del CV
CREATE TABLE cv_personal_info (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cv_id UUID REFERENCES cvs(id) ON DELETE CASCADE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    city TEXT,
    country TEXT,
    postal_code TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    website_url TEXT,
    portfolio_url TEXT,
    photo_url TEXT,
    professional_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experiencia laboral
CREATE TABLE cv_work_experience (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cv_id UUID REFERENCES cvs(id) ON DELETE CASCADE NOT NULL,
    company_name TEXT NOT NULL,
    position TEXT NOT NULL,
    location TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    achievements TEXT[],
    technologies TEXT[],
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Educación
CREATE TABLE cv_education (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cv_id UUID REFERENCES cvs(id) ON DELETE CASCADE NOT NULL,
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    field_of_study TEXT,
    location TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    gpa TEXT,
    description TEXT,
    achievements TEXT[],
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilidades
CREATE TABLE cv_skills (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cv_id UUID REFERENCES cvs(id) ON DELETE CASCADE NOT NULL,
    category TEXT NOT NULL DEFAULT 'technical',
    skill_name TEXT NOT NULL,
    level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    years_experience INTEGER,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Proyectos
CREATE TABLE cv_projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cv_id UUID REFERENCES cvs(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    technologies TEXT[],
    start_date DATE,
    end_date DATE,
    project_url TEXT,
    github_url TEXT,
    image_url TEXT,
    role TEXT,
    achievements TEXT[],
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Idiomas
CREATE TABLE cv_languages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cv_id UUID REFERENCES cvs(id) ON DELETE CASCADE NOT NULL,
    language TEXT NOT NULL,
    level TEXT CHECK (level IN ('basic', 'intermediate', 'advanced', 'native', 'fluent')),
    certification TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificaciones
CREATE TABLE cv_certifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cv_id UUID REFERENCES cvs(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    issuing_organization TEXT NOT NULL,
    issue_date DATE,
    expiration_date DATE,
    credential_id TEXT,
    credential_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Referencias
CREATE TABLE cv_references (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cv_id UUID REFERENCES cvs(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    position TEXT,
    company TEXT,
    email TEXT,
    phone TEXT,
    relationship TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cartas de presentación
CREATE TABLE cover_letters (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES cv_master_profiles(id) ON DELETE CASCADE NOT NULL,
    cv_id UUID REFERENCES cvs(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    company_name TEXT,
    position TEXT,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Análisis de CV con IA
CREATE TABLE cv_ai_analysis (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cv_id UUID REFERENCES cvs(id) ON DELETE CASCADE NOT NULL,
    analysis_type TEXT NOT NULL CHECK (analysis_type IN ('ats_score', 'content_suggestions', 'keyword_optimization')),
    score INTEGER,
    suggestions JSONB,
    keywords TEXT[],
    improvements JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configuración de RLS (Row Level Security)
ALTER TABLE cv_master_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE cover_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_ai_analysis ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para cv_master_profiles
CREATE POLICY "Users can view own profile" ON cv_master_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON cv_master_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON cv_master_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas de seguridad para cvs
CREATE POLICY "Users can view own cvs" ON cvs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own cvs" ON cvs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cvs" ON cvs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cvs" ON cvs
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas similares para las demás tablas relacionadas con CVs
CREATE POLICY "Users can view own cv personal info" ON cv_personal_info
    FOR SELECT USING (auth.uid() = (SELECT user_id FROM cvs WHERE id = cv_id));

CREATE POLICY "Users can create own cv personal info" ON cv_personal_info
    FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM cvs WHERE id = cv_id));

CREATE POLICY "Users can update own cv personal info" ON cv_personal_info
    FOR UPDATE USING (auth.uid() = (SELECT user_id FROM cvs WHERE id = cv_id));

CREATE POLICY "Users can delete own cv personal info" ON cv_personal_info
    FOR DELETE USING (auth.uid() = (SELECT user_id FROM cvs WHERE id = cv_id));

-- Aplicar políticas similares a todas las tablas relacionadas con CV
-- cv_work_experience
CREATE POLICY "Users can manage own work experience" ON cv_work_experience
    FOR ALL USING (auth.uid() = (SELECT user_id FROM cvs WHERE id = cv_id));

-- cv_education
CREATE POLICY "Users can manage own education" ON cv_education
    FOR ALL USING (auth.uid() = (SELECT user_id FROM cvs WHERE id = cv_id));

-- cv_skills
CREATE POLICY "Users can manage own skills" ON cv_skills
    FOR ALL USING (auth.uid() = (SELECT user_id FROM cvs WHERE id = cv_id));

-- cv_projects
CREATE POLICY "Users can manage own projects" ON cv_projects
    FOR ALL USING (auth.uid() = (SELECT user_id FROM cvs WHERE id = cv_id));

-- cv_languages
CREATE POLICY "Users can manage own languages" ON cv_languages
    FOR ALL USING (auth.uid() = (SELECT user_id FROM cvs WHERE id = cv_id));

-- cv_certifications
CREATE POLICY "Users can manage own certifications" ON cv_certifications
    FOR ALL USING (auth.uid() = (SELECT user_id FROM cvs WHERE id = cv_id));

-- cv_references
CREATE POLICY "Users can manage own references" ON cv_references
    FOR ALL USING (auth.uid() = (SELECT user_id FROM cvs WHERE id = cv_id));

-- cover_letters
CREATE POLICY "Users can manage own cover letters" ON cover_letters
    FOR ALL USING (auth.uid() = user_id);

-- cv_ai_analysis
CREATE POLICY "Users can view own cv analysis" ON cv_ai_analysis
    FOR SELECT USING (auth.uid() = (SELECT user_id FROM cvs WHERE id = cv_id));

-- Políticas para plantillas (públicas para lectura)
CREATE POLICY "Anyone can view active templates" ON cv_templates
    FOR SELECT USING (is_active = true);

-- Índices para mejorar rendimiento
CREATE INDEX idx_cvs_user_id ON cvs(user_id);
CREATE INDEX idx_cvs_status ON cvs(status);
CREATE INDEX idx_cv_personal_info_cv_id ON cv_personal_info(cv_id);
CREATE INDEX idx_cv_work_experience_cv_id ON cv_work_experience(cv_id);
CREATE INDEX idx_cv_education_cv_id ON cv_education(cv_id);
CREATE INDEX idx_cv_skills_cv_id ON cv_skills(cv_id);
CREATE INDEX idx_cv_projects_cv_id ON cv_projects(cv_id);
CREATE INDEX idx_cv_languages_cv_id ON cv_languages(cv_id);
CREATE INDEX idx_cv_certifications_cv_id ON cv_certifications(cv_id);
CREATE INDEX idx_cv_references_cv_id ON cv_references(cv_id);
CREATE INDEX idx_cover_letters_user_id ON cover_letters(user_id);
CREATE INDEX idx_cv_ai_analysis_cv_id ON cv_ai_analysis(cv_id);

-- Función para generar slug único
CREATE OR REPLACE FUNCTION generate_unique_slug(title TEXT, user_id UUID)
RETURNS TEXT AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER := 0;
BEGIN
    -- Crear slug base del título
    base_slug := lower(regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g'));
    base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
    final_slug := base_slug;
    
    -- Verificar si el slug ya existe y agregar contador si es necesario
    WHILE EXISTS (SELECT 1 FROM cvs WHERE slug = final_slug AND user_id = generate_unique_slug.user_id) LOOP
        counter := counter + 1;
        final_slug := base_slug || '-' || counter;
    END LOOP;
    
    RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Trigger para generar slug automáticamente
CREATE OR REPLACE FUNCTION set_cv_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug := generate_unique_slug(NEW.title, NEW.user_id);
    END IF;
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_cv_slug
    BEFORE INSERT OR UPDATE ON cvs
    FOR EACH ROW
    EXECUTE FUNCTION set_cv_slug();

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger de updated_at a todas las tablas relevantes
CREATE TRIGGER update_cv_master_profiles_updated_at BEFORE UPDATE ON cv_master_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cvs_updated_at BEFORE UPDATE ON cvs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cv_personal_info_updated_at BEFORE UPDATE ON cv_personal_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cv_work_experience_updated_at BEFORE UPDATE ON cv_work_experience FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cv_education_updated_at BEFORE UPDATE ON cv_education FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cv_skills_updated_at BEFORE UPDATE ON cv_skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cv_projects_updated_at BEFORE UPDATE ON cv_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cv_languages_updated_at BEFORE UPDATE ON cv_languages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cv_certifications_updated_at BEFORE UPDATE ON cv_certifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cv_references_updated_at BEFORE UPDATE ON cv_references FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cover_letters_updated_at BEFORE UPDATE ON cover_letters FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar plantillas de ejemplo
INSERT INTO cv_templates (name, description, category, template_data, is_premium, preview_image_url) VALUES
('Moderno Profesional', 'Diseño limpio y moderno ideal para profesionales de tecnología', 'modern', 
 '{"layout": "single-column", "colors": {"primary": "#2563eb", "secondary": "#64748b"}, "fonts": {"heading": "Inter", "body": "Inter"}}', 
 false, '/assets/templates/modern-professional.png'),
 
('Clásico Ejecutivo', 'Diseño tradicional y elegante para posiciones ejecutivas', 'classic',
 '{"layout": "two-column", "colors": {"primary": "#1f2937", "secondary": "#6b7280"}, "fonts": {"heading": "Times New Roman", "body": "Times New Roman"}}',
 false, '/assets/templates/classic-executive.png'),
 
('Creativo Digital', 'Diseño innovador para profesionales creativos', 'creative',
 '{"layout": "grid", "colors": {"primary": "#7c3aed", "secondary": "#a78bfa"}, "fonts": {"heading": "Montserrat", "body": "Open Sans"}}',
 true, '/assets/templates/creative-digital.png'),
 
('Minimalista Clean', 'Diseño minimalista enfocado en contenido', 'minimal',
 '{"layout": "single-column", "colors": {"primary": "#000000", "secondary": "#64748b"}, "fonts": {"heading": "Helvetica", "body": "Helvetica"}}',
 false, '/assets/templates/minimal-clean.png'),
 
('Tech Developer', 'Diseño optimizado para desarrolladores y profesionales IT', 'tech',
 '{"layout": "sidebar", "colors": {"primary": "#059669", "secondary": "#10b981"}, "fonts": {"heading": "Fira Code", "body": "Source Code Pro"}}',
 false, '/assets/templates/tech-developer.png');

-- Función para crear perfil automáticamente cuando se registra un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.cv_master_profiles (id, first_name, last_name, email)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'first_name', split_part(new.email, '@', 1)),
        COALESCE(new.raw_user_meta_data->>'last_name', ''),
        new.email
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 