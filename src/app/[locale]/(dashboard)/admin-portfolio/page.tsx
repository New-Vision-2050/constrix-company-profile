"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { portfolioDataAtom, LocalizedString } from "@/store/portfolio";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { alpha } from "@mui/material/styles";

const LocalizedInput = ({ 
  label, 
  value, 
  onChange, 
  multiline = false 
}: { 
  label: string; 
  value: LocalizedString; 
  onChange: (v: LocalizedString) => void;
  multiline?: boolean;
}) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
    <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
    <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
      <TextField 
        fullWidth 
        label="English" 
        value={value?.en || ''} 
        onChange={(e) => onChange({ ...value, en: e.target.value })} 
        multiline={multiline}
        rows={multiline ? 3 : 1}
      />
      <TextField 
        fullWidth 
        label="Arabic" 
        value={value?.ar || ''} 
        onChange={(e) => onChange({ ...value, ar: e.target.value })} 
        multiline={multiline}
        rows={multiline ? 3 : 1}
        dir="rtl"
      />
    </Box>
  </Box>
);

export default function AdminPortfolioPage() {
  const [data, setData] = useAtom(portfolioDataAtom);
  const [localData, setLocalData] = useState(data);

  const handleChange = (section: string, field: string, value: any) => {
    setLocalData(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (field: string, value: any) => {
    setLocalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSettingsChange = (field: string, value: any) => {
    setLocalData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [field]: value
      }
    }));
  };

  const handleColorsChange = (field: string, value: any) => {
    setLocalData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        colors: {
          ...prev.settings.colors,
          [field]: value
        }
      }
    }));
  };

  const handleSave = () => {
    setData(localData);
    alert('Portfolio saved successfully!');
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Portfolio Admin Dashboard (Bilingual)
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSave} size="large">
          Save Changes
        </Button>
      </Box>

      {/* Settings Section */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Global Settings & Visibility</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch checked={localData.settings.isVisible} onChange={(e) => handleSettingsChange('isVisible', e.target.checked)} />}
              label="Portfolio is Visible"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label="Allowed URL Path (e.g. 'benjamin')" 
              value={localData.settings.allowedUrl} 
              onChange={(e) => handleSettingsChange('allowedUrl', e.target.value)}
              helperText="Only users visiting URLs containing this text will see the portfolio."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label="Primary Color (Hex)" 
              value={localData.settings.colors.primary} 
              onChange={(e) => handleColorsChange('primary', e.target.value)}
              InputProps={{
                startAdornment: (
                  <Box sx={{ width: 24, height: 24, bgcolor: localData.settings.colors.primary, mr: 1, borderRadius: 1, border: '1px solid #ccc' }} />
                )
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Home Section */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Home Section</Typography>
        <LocalizedInput label="Greeting" value={localData.home.greeting} onChange={(v) => handleChange('home', 'greeting', v)} />
        <LocalizedInput label="Name" value={localData.home.name} onChange={(v) => handleChange('home', 'name', v)} />
        <LocalizedInput label="Job Title" value={localData.home.jobTitle} onChange={(v) => handleChange('home', 'jobTitle', v)} />
        <LocalizedInput label="Description" value={localData.home.description} onChange={(v) => handleChange('home', 'description', v)} multiline />
        <LocalizedInput label="Button Text" value={localData.home.buttonText} onChange={(v) => handleChange('home', 'buttonText', v)} />
        <TextField fullWidth label="Main Image URL" value={localData.home.mainImage} onChange={(e) => handleChange('home', 'mainImage', e.target.value)} sx={{ mt: 2 }} />
      </Paper>

      {/* About Section */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>About Section</Typography>
        <LocalizedInput label="Title" value={localData.about.title} onChange={(v) => handleChange('about', 'title', v)} />
        <LocalizedInput label="Content" value={localData.about.content} onChange={(v) => handleChange('about', 'content', v)} multiline />
        <TextField fullWidth label="Profile Image URL" value={localData.about.profileImage} onChange={(e) => handleChange('about', 'profileImage', e.target.value)} sx={{ mt: 2 }} />
      </Paper>

      {/* Resume Section */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Resume Section</Typography>
        <LocalizedInput label="Section Title" value={localData.resume.title} onChange={(v) => handleChange('resume', 'title', v)} />

        {/* Qualifications */}
        <Divider sx={{ my: 4 }} />
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>Qualifications</Typography>
        {localData.resume.qualifications.map((q, index) => (
          <Box key={index} sx={{ p: 2, mb: 2, border: '1px solid #eee', borderRadius: 2 }}>
            <LocalizedInput label="Title / Degree" value={q.title} onChange={(v) => {
              const arr = [...localData.resume.qualifications]; arr[index].title = v;
              handleChange('resume', 'qualifications', arr);
            }} />
            <LocalizedInput label="Institution" value={q.institution} onChange={(v) => {
              const arr = [...localData.resume.qualifications]; arr[index].institution = v;
              handleChange('resume', 'qualifications', arr);
            }} />
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField fullWidth label="Year (e.g. 2018 – 2022)" value={q.year} onChange={(e) => {
                const arr = [...localData.resume.qualifications]; arr[index].year = e.target.value;
                handleChange('resume', 'qualifications', arr);
              }} />
            </Box>
            <LocalizedInput label="Description" value={q.description} onChange={(v) => {
              const arr = [...localData.resume.qualifications]; arr[index].description = v;
              handleChange('resume', 'qualifications', arr);
            }} multiline />
            <Button color="error" size="small" onClick={() => handleChange('resume', 'qualifications', localData.resume.qualifications.filter((_, i) => i !== index))}>Delete</Button>
          </Box>
        ))}
        <Button variant="outlined" size="small" onClick={() => handleChange('resume', 'qualifications', [...localData.resume.qualifications, { title:{en:'',ar:''}, institution:{en:'',ar:''}, year:'', description:{en:'',ar:''} }])}>+ Add Qualification</Button>

        {/* Summary */}
        <Divider sx={{ my: 4 }} />
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>Summary</Typography>
        <LocalizedInput label="Summary Text" value={localData.resume.summary} onChange={(v) => handleChange('resume', 'summary', v)} multiline />

        {/* Experience */}
        <Divider sx={{ my: 4 }} />
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>Previous Experience</Typography>
        {localData.resume.experience.map((exp, index) => (
          <Box key={index} sx={{ p: 2, mb: 2, border: '1px solid #eee', borderRadius: 2 }}>
            <LocalizedInput label="Role" value={exp.role} onChange={(v) => {
              const arr = [...localData.resume.experience]; arr[index].role = v;
              handleChange('resume', 'experience', arr);
            }} />
            <LocalizedInput label="Company" value={exp.company} onChange={(v) => {
              const arr = [...localData.resume.experience]; arr[index].company = v;
              handleChange('resume', 'experience', arr);
            }} />
            <LocalizedInput label="Period" value={exp.period} onChange={(v) => {
              const arr = [...localData.resume.experience]; arr[index].period = v;
              handleChange('resume', 'experience', arr);
            }} />
            <LocalizedInput label="Description" value={exp.description} onChange={(v) => {
              const arr = [...localData.resume.experience]; arr[index].description = v;
              handleChange('resume', 'experience', arr);
            }} multiline />
            <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1, mt: 1 }}>Skills (with icons)</Typography>
            {(exp.skills || []).map((sk, si) => (
              <Box key={si} sx={{ display: 'flex', gap: 2, mb: 1 }}>
                <LocalizedInput label={`Skill ${si+1} Name`} value={sk.name} onChange={(v) => {
                  const arr = [...localData.resume.experience]; arr[index].skills[si].name = v;
                  handleChange('resume', 'experience', arr);
                }} />
                <TextField label="Icon (e.g. logos:react)" value={sk.icon} onChange={(e) => {
                  const arr = [...localData.resume.experience]; arr[index].skills[si].icon = e.target.value;
                  handleChange('resume', 'experience', arr);
                }} sx={{ minWidth: 220 }} />
                <Button color="error" size="small" onClick={() => {
                  const arr = [...localData.resume.experience]; arr[index].skills = arr[index].skills.filter((_,i)=>i!==si);
                  handleChange('resume', 'experience', arr);
                }}>✕</Button>
              </Box>
            ))}
            <Button size="small" variant="outlined" onClick={() => {
              const arr = [...localData.resume.experience]; arr[index].skills = [...(arr[index].skills||[]), {name:{en:'',ar:''},icon:''}];
              handleChange('resume', 'experience', arr);
            }}>+ Add Skill</Button>
            <Box sx={{ mt: 1 }}>
              <Button color="error" size="small" onClick={() => handleChange('resume', 'experience', localData.resume.experience.filter((_, i) => i !== index))}>Delete Experience</Button>
            </Box>
          </Box>
        ))}
        <Button variant="outlined" size="small" onClick={() => handleChange('resume', 'experience', [...localData.resume.experience, { role:{en:'',ar:''}, company:{en:'',ar:''}, period:{en:'',ar:''}, description:{en:'',ar:''}, skills:[] }])}>+ Add Experience</Button>

        {/* Courses */}
        <Divider sx={{ my: 4 }} />
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>Courses</Typography>
        {localData.resume.courses.map((course, index) => (
          <Box key={index} sx={{ p: 2, mb: 2, border: '1px solid #eee', borderRadius: 2 }}>
            <LocalizedInput label="Course Name" value={course.name} onChange={(v) => {
              const arr = [...localData.resume.courses]; arr[index].name = v;
              handleChange('resume', 'courses', arr);
            }} />
            <LocalizedInput label="Provider" value={course.provider} onChange={(v) => {
              const arr = [...localData.resume.courses]; arr[index].provider = v;
              handleChange('resume', 'courses', arr);
            }} />
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField fullWidth label="Year" value={course.year} onChange={(e) => {
                const arr = [...localData.resume.courses]; arr[index].year = e.target.value;
                handleChange('resume', 'courses', arr);
              }} />
              <TextField fullWidth label="Icon (e.g. logos:react)" value={course.icon} onChange={(e) => {
                const arr = [...localData.resume.courses]; arr[index].icon = e.target.value;
                handleChange('resume', 'courses', arr);
              }} />
            </Box>
            <Button color="error" size="small" onClick={() => handleChange('resume', 'courses', localData.resume.courses.filter((_, i) => i !== index))}>Delete</Button>
          </Box>
        ))}
        <Button variant="outlined" size="small" onClick={() => handleChange('resume', 'courses', [...localData.resume.courses, { name:{en:'',ar:''}, provider:{en:'',ar:''}, year:'', icon:'' }])}>+ Add Course</Button>

        {/* Certifications */}
        <Divider sx={{ my: 4 }} />
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>Professional Certifications</Typography>
        {localData.resume.certifications.map((cert, index) => (
          <Box key={index} sx={{ p: 2, mb: 2, border: '1px solid #eee', borderRadius: 2 }}>
            <LocalizedInput label="Certificate Name" value={cert.name} onChange={(v) => {
              const arr = [...localData.resume.certifications]; arr[index].name = v;
              handleChange('resume', 'certifications', arr);
            }} />
            <LocalizedInput label="Issuer" value={cert.issuer} onChange={(v) => {
              const arr = [...localData.resume.certifications]; arr[index].issuer = v;
              handleChange('resume', 'certifications', arr);
            }} />
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField fullWidth label="Year" value={cert.year} onChange={(e) => {
                const arr = [...localData.resume.certifications]; arr[index].year = e.target.value;
                handleChange('resume', 'certifications', arr);
              }} />
              <TextField fullWidth label="Icon (e.g. logos:react)" value={cert.icon} onChange={(e) => {
                const arr = [...localData.resume.certifications]; arr[index].icon = e.target.value;
                handleChange('resume', 'certifications', arr);
              }} />
            </Box>
            <Button color="error" size="small" onClick={() => handleChange('resume', 'certifications', localData.resume.certifications.filter((_, i) => i !== index))}>Delete</Button>
          </Box>
        ))}
        <Button variant="outlined" size="small" onClick={() => handleChange('resume', 'certifications', [...localData.resume.certifications, { name:{en:'',ar:''}, issuer:{en:'',ar:''}, year:'', icon:'' }])}>+ Add Certification</Button>
      </Paper>

      {/* Portfolio Section */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Portfolio Section</Typography>
        <LocalizedInput label="Section Title" value={localData.portfolio.title} onChange={(v) => handleChange('portfolio', 'title', v)} />
        
        <Divider sx={{ my: 4 }} />
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Categories</Typography>
        {localData.portfolio.categories.map((cat, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <LocalizedInput label={`Category ${index + 1}`} value={cat} onChange={(v) => {
              const newCats = [...localData.portfolio.categories];
              newCats[index] = v;
              handleChange('portfolio', 'categories', newCats);
            }} />
          </Box>
        ))}
        
        <Divider sx={{ my: 4 }} />
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Items</Typography>
        {localData.portfolio.items.map((item, index) => (
          <Box key={index} sx={{ p: 2, mb: 2, border: '1px solid #eee', borderRadius: 1, display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField label="Category (EN reference)" value={item.categoryEn} onChange={(e) => {
              const newItems = [...localData.portfolio.items];
              newItems[index].categoryEn = e.target.value;
              handleChange('portfolio', 'items', newItems);
            }} />
            <TextField fullWidth label="Image URL" value={item.image} onChange={(e) => {
              const newItems = [...localData.portfolio.items];
              newItems[index].image = e.target.value;
              handleChange('portfolio', 'items', newItems);
            }} />
          </Box>
        ))}
      </Paper>

      {/* Contact Section */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Contact Section</Typography>
        <LocalizedInput label="Section Title" value={localData.contact.title} onChange={(v) => handleChange('contact', 'title', v)} />
        <LocalizedInput label="Address" value={localData.contact.address} onChange={(v) => handleChange('contact', 'address', v)} />
        <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 4 }}>
          <TextField fullWidth label="Email" value={localData.contact.email} onChange={(e) => handleChange('contact', 'email', e.target.value)} />
          <TextField fullWidth label="Phone" value={localData.contact.phone} onChange={(e) => handleChange('contact', 'phone', e.target.value)} />
        </Box>
        <Divider sx={{ my: 3 }} />
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>Social Media Links</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {(['instagram', 'facebook', 'whatsapp', 'linkedin', 'twitter'] as const).map((platform) => (
            <TextField
              key={platform}
              fullWidth
              label={platform.charAt(0).toUpperCase() + platform.slice(1) + ' URL'}
              value={localData.contact.socialLinks[platform]}
              onChange={(e) => handleChange('contact', 'socialLinks', { ...localData.contact.socialLinks, [platform]: e.target.value })}
            />
          ))}
        </Box>
      </Paper>

      {/* Navigation Section */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Navigation Links</Typography>
        {localData.navigation.map((nav, index) => (
          <Box key={index} sx={{ p: 2, mb: 2, border: '1px solid #eee', borderRadius: 1 }}>
            <LocalizedInput label="Label" value={nav.label} onChange={(v) => {
              const newNav = [...localData.navigation];
              newNav[index].label = v;
              handleArrayChange('navigation', newNav);
            }} />
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <TextField fullWidth label="Path" value={nav.path} onChange={(e) => {
                const newNav = [...localData.navigation];
                newNav[index].path = e.target.value;
                handleArrayChange('navigation', newNav);
              }} />
              <TextField fullWidth label="Icon (Iconify)" value={nav.icon} onChange={(e) => {
                const newNav = [...localData.navigation];
                newNav[index].icon = e.target.value;
                handleArrayChange('navigation', newNav);
              }} />
              <Button color="error" onClick={() => {
                const newNav = localData.navigation.filter((_, i) => i !== index);
                handleArrayChange('navigation', newNav);
              }}>Delete</Button>
            </Box>
          </Box>
        ))}
        <Button variant="outlined" onClick={() => {
          handleArrayChange('navigation', [...localData.navigation, { id: Date.now().toString(), label: {en:'NEW LINK', ar:'رابط جديد'}, path: '/PortfolioEmployee/new', icon: 'mingcute:star-line' }]);
        }}>
          + Add Navigation Link
        </Button>
      </Paper>

    </Box>
  );
}
