import { useState, useEffect } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { useToast } from "@/hooks/use-toast";
import { 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Upload, 
  FileText, 
  Layers, 
  Briefcase, 
  GraduationCap,
  Mail, 
  Save, 
  Lock,
  ArrowLeft,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

export const Admin = () => {
  const { profile, aboutHighlights, projects, skills, experiences, education, API_BASE_URL, refreshData } = usePortfolio();
  const { toast } = useToast();

  const [token, setToken] = useState(localStorage.getItem("admin_token") || "");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [activeTab, setActiveTab] = useState("profile");

  // Profile Form State
  const [profileForm, setProfileForm] = useState(profile);
  const [cvFile, setCvFile] = useState(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Experience State & Modal
  const [expList, setExpList] = useState(experiences);
  const [editingExp, setEditingExp] = useState(null);
  const [expForm, setExpForm] = useState({ role: "", company: "", location: "", period: "", description: "" });
  const [isSavingExp, setIsSavingExp] = useState(false);

  // Education State & Modal
  const [eduList, setEduList] = useState(education);
  const [editingEdu, setEditingEdu] = useState(null);
  const [eduForm, setEduForm] = useState({ degree: "", institution: "", location: "", period: "", description: "" });
  const [isSavingEdu, setIsSavingEdu] = useState(false);

  // Projects State & Modal
  const [projectList, setProjectList] = useState(projects);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({ title: "", description: "", tags: "", demoUrl: "", githubUrl: "", image: "" });
  const [projectImageFile, setProjectImageFile] = useState(null);
  const [isSavingProject, setIsSavingProject] = useState(false);

  // Skills State & Modal
  const [skillList, setSkillList] = useState(skills);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillForm, setSkillForm] = useState({ name: "", category: "frontend", image: "" });
  const [skillImageFile, setSkillImageFile] = useState(null);
  const [isSavingSkill, setIsSavingSkill] = useState(false);

  // About Highlights State & Modal
  const [highlightList, setHighlightList] = useState(aboutHighlights || []);
  const [editingHighlight, setEditingHighlight] = useState(null);
  const [highlightForm, setHighlightForm] = useState({ title: "", description: "", icon: "code", order: 1 });
  const [isSavingHighlight, setIsSavingHighlight] = useState(false);

  // Messages State
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => { setProfileForm(profile); }, [profile]);
  useEffect(() => { setExpList(experiences); }, [experiences]);
  useEffect(() => { setEduList(education); }, [education]);
  useEffect(() => { setProjectList(projects); }, [projects]);
  useEffect(() => { setSkillList(skills); }, [skills]);
  useEffect(() => { setHighlightList(aboutHighlights || []); }, [aboutHighlights]);

  const fetchMessages = async () => {
    if (!token) return;
    setLoadingMessages(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.warn("Could not load messages from server", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (token && activeTab === "messages") {
      fetchMessages();
    }
  }, [token, activeTab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json();
        localStorage.setItem("admin_token", data.token);
        setToken(data.token);
        toast({ title: "Welcome back Admin!", description: "Logged in successfully." });
      } else {
        if (loginEmail === "admin@portfolio.com" && loginPassword === "admin123") {
          const fakeToken = "demo-admin-token";
          localStorage.setItem("admin_token", fakeToken);
          setToken(fakeToken);
          toast({ title: "Admin Login Successful", description: "Demo session initiated." });
        } else {
          toast({
            title: "Authentication Failed",
            description: "Invalid credentials. Default is admin@portfolio.com / admin123",
            variant: "destructive",
          });
        }
      }
    } catch (err) {
      toast({ title: "Error", description: "Network error during authentication", variant: "destructive" });
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken("");
    toast({ title: "Logged out", description: "You have been signed out." });
  };

  const uploadFileToCloudinary = async (file, folder = "portfolio") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "File upload failed");
    }
    const data = await res.json();
    return data.url;
  };

  // Save Profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);

    try {
      let cvUrl = profileForm.cvUrl;
      if (cvFile) {
        cvUrl = await uploadFileToCloudinary(cvFile, "portfolio/cv");
      }

      const updated = { ...profileForm, cvUrl };

      const res = await fetch(`${API_BASE_URL}/admin/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      }).catch(() => null);

      if (res && res.ok) {
        toast({ title: "Success", description: "Profile and CV updated in database!" });
      } else {
        toast({ title: "Updated locally", description: "Profile & CV saved in memory." });
      }
      refreshData();
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Experience Save & Delete
  const handleSaveExp = async (e) => {
    e.preventDefault();
    setIsSavingExp(true);
    try {
      const url = editingExp?.id ? `${API_BASE_URL}/admin/experiences/${editingExp.id}` : `${API_BASE_URL}/admin/experiences`;
      const method = editingExp?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(expForm),
      }).catch(() => null);

      if (res && res.ok) {
        toast({ title: "Saved", description: "Work experience updated!" });
      } else {
        if (editingExp?.id) {
          setExpList(expList.map((x) => (x.id === editingExp.id ? { ...expForm, id: x.id } : x)));
        } else {
          setExpList([{ ...expForm, id: Date.now().toString() }, ...expList]);
        }
        toast({ title: "Saved locally", description: "Work experience updated." });
      }
      setEditingExp(null);
      setExpForm({ role: "", company: "", location: "", period: "", description: "" });
      refreshData();
    } finally {
      setIsSavingExp(false);
    }
  };

  const handleDeleteExp = async (id) => {
    if (!confirm("Delete this experience?")) return;
    await fetch(`${API_BASE_URL}/admin/experiences/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }).catch(() => null);
    setExpList(expList.filter((x) => x.id !== id));
    toast({ title: "Deleted", description: "Experience removed." });
    refreshData();
  };

  // Education Save & Delete
  const handleSaveEdu = async (e) => {
    e.preventDefault();
    setIsSavingEdu(true);
    try {
      const url = editingEdu?.id ? `${API_BASE_URL}/admin/education/${editingEdu.id}` : `${API_BASE_URL}/admin/education`;
      const method = editingEdu?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(eduForm),
      }).catch(() => null);

      if (res && res.ok) {
        toast({ title: "Saved", description: "Education record updated!" });
      } else {
        if (editingEdu?.id) {
          setEduList(eduList.map((x) => (x.id === editingEdu.id ? { ...eduForm, id: x.id } : x)));
        } else {
          setEduList([{ ...eduForm, id: Date.now().toString() }, ...eduList]);
        }
        toast({ title: "Saved locally", description: "Education updated." });
      }
      setEditingEdu(null);
      setEduForm({ degree: "", institution: "", location: "", period: "", description: "" });
      refreshData();
    } finally {
      setIsSavingEdu(false);
    }
  };

  const handleDeleteEdu = async (id) => {
    if (!confirm("Delete this education record?")) return;
    await fetch(`${API_BASE_URL}/admin/education/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }).catch(() => null);
    setEduList(eduList.filter((x) => x.id !== id));
    toast({ title: "Deleted", description: "Education record removed." });
    refreshData();
  };

  // Project Save & Delete
  const handleSaveProject = async (e) => {
    e.preventDefault();
    setIsSavingProject(true);

    try {
      let imageUrl = projectForm.image;
      if (projectImageFile) {
        imageUrl = await uploadFileToCloudinary(projectImageFile, "portfolio/projects");
      }

      const payload = {
        ...projectForm,
        image: imageUrl,
        tags: typeof projectForm.tags === "string" ? projectForm.tags.split(",").map((t) => t.trim()) : projectForm.tags,
      };

      const url = editingProject?.id ? `${API_BASE_URL}/admin/projects/${editingProject.id}` : `${API_BASE_URL}/admin/projects`;
      const method = editingProject?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (res && res.ok) {
        toast({ title: "Saved", description: "Project saved successfully!" });
      } else {
        if (editingProject?.id) {
          setProjectList(projectList.map((p) => (p.id === editingProject.id ? { ...payload, id: p.id } : p)));
        } else {
          setProjectList([{ ...payload, id: Date.now().toString() }, ...projectList]);
        }
        toast({ title: "Saved locally", description: "Project list updated." });
      }

      setEditingProject(null);
      setProjectForm({ title: "", description: "", tags: "", demoUrl: "", githubUrl: "", image: "" });
      setProjectImageFile(null);
      refreshData();
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsSavingProject(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Delete project?")) return;
    await fetch(`${API_BASE_URL}/admin/projects/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }).catch(() => null);
    setProjectList(projectList.filter((p) => p.id !== id));
    toast({ title: "Deleted", description: "Project removed." });
    refreshData();
  };

  // Skill Save & Delete
  const handleSaveSkill = async (e) => {
    e.preventDefault();
    setIsSavingSkill(true);

    try {
      let imageUrl = skillForm.image;
      if (skillImageFile) {
        imageUrl = await uploadFileToCloudinary(skillImageFile, "portfolio/skills");
      }

      const payload = { ...skillForm, order: Number(skillForm.order) || 0, image: imageUrl };
      const url = editingSkill?.id ? `${API_BASE_URL}/admin/skills/${editingSkill.id}` : `${API_BASE_URL}/admin/skills`;
      const method = editingSkill?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (res && res.ok) {
        toast({ title: "Saved", description: "Skill saved!" });
      } else {
        if (editingSkill?.id) {
          setSkillList(skillList.map((s) => (s.id === editingSkill.id ? { ...payload, id: s.id } : s)));
        } else {
          setSkillList([...skillList, { ...payload, id: Date.now().toString() }]);
        }
        toast({ title: "Saved locally", description: "Skill list updated." });
      }

      setEditingSkill(null);
      setSkillForm({ name: "", category: "frontend", image: "" });
      setSkillImageFile(null);
      refreshData();
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsSavingSkill(false);
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!confirm("Delete skill?")) return;
    await fetch(`${API_BASE_URL}/admin/skills/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }).catch(() => null);
    setSkillList(skillList.filter((s) => s.id !== id));
    toast({ title: "Deleted", description: "Skill removed." });
    refreshData();
  };

  // About Highlight Save & Delete
  const handleSaveHighlight = async (e) => {
    e.preventDefault();
    setIsSavingHighlight(true);

    try {
      const payload = {
        ...highlightForm,
        order: Number(highlightForm.order) || 0,
      };

      const url = editingHighlight?.id ? `${API_BASE_URL}/admin/highlights/${editingHighlight.id}` : `${API_BASE_URL}/admin/highlights`;
      const method = editingHighlight?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (res && res.ok) {
        toast({ title: "Saved", description: "About focus card saved!" });
      } else {
        if (editingHighlight?.id) {
          setHighlightList(highlightList.map((h) => (h.id === editingHighlight.id ? { ...payload, id: h.id } : h)));
        } else {
          setHighlightList([...highlightList, { ...payload, id: Date.now().toString() }]);
        }
        toast({ title: "Saved locally", description: "Focus card list updated." });
      }

      setEditingHighlight(null);
      setHighlightForm({ title: "", description: "", icon: "code", order: highlightList.length + 1 });
      refreshData();
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsSavingHighlight(false);
    }
  };

  const handleDeleteHighlight = async (id) => {
    if (!confirm("Delete this focus card highlight?")) return;
    await fetch(`${API_BASE_URL}/admin/highlights/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }).catch(() => null);
    setHighlightList(highlightList.filter((h) => h.id !== id));
    toast({ title: "Deleted", description: "Focus card removed." });
    refreshData();
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-card p-8 rounded-xl shadow-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary">
              <ArrowLeft size={16} /> Back to Portfolio
            </Link>
            <div className="p-2 rounded-full bg-primary/10">
              <Lock className="w-5 h-5 text-primary" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-1">Admin Portal</h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Log in to manage portfolio content, resume, experiences, and messages.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@portfolio.com"
                required
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <button type="submit" disabled={isAuthenticating} className="cosmic-button w-full flex justify-center items-center py-2 text-white font-medium">
              {isAuthenticating ? "Logging in..." : "Login to Admin"}
            </button>
          </form>

          <div className="mt-6 p-3 bg-secondary/40 rounded-md text-xs text-muted-foreground text-center">
            Default credentials: <span className="font-semibold text-foreground">admin@portfolio.com</span> / <span className="font-semibold text-foreground">admin123</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xl font-bold text-gradient">
            Portfolio Admin
          </Link>
          <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">
            CMS Mode
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/" target="_blank" className="text-sm text-muted-foreground hover:text-primary">
            View Live Site ↗
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border border-destructive/40 text-destructive hover:bg-destructive/10">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="flex-1 container mx-auto max-w-6xl py-8 px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-2">
          <button onClick={() => setActiveTab("profile")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${activeTab === "profile" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground/80"}`}>
            <FileText size={18} /> Profile & Resume
          </button>
          <button onClick={() => setActiveTab("about")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${activeTab === "about" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground/80"}`}>
            <Sparkles size={18} /> About Focus Cards ({highlightList.length})
          </button>
          <button onClick={() => setActiveTab("experiences")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${activeTab === "experiences" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground/80"}`}>
            <Briefcase size={18} /> Work Experience ({expList.length})
          </button>
          <button onClick={() => setActiveTab("education")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${activeTab === "education" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground/80"}`}>
            <GraduationCap size={18} /> Education ({eduList.length})
          </button>
          <button onClick={() => setActiveTab("projects")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${activeTab === "projects" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground/80"}`}>
            <Briefcase size={18} /> Projects ({projectList.length})
          </button>
          <button onClick={() => setActiveTab("skills")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${activeTab === "skills" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground/80"}`}>
            <Layers size={18} /> Skills ({skillList.length})
          </button>
          <button onClick={() => setActiveTab("messages")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${activeTab === "messages" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground/80"}`}>
            <Mail size={18} /> Messages ({messages.length})
          </button>
        </div>

        <div className="md:col-span-3 bg-card p-6 rounded-xl border border-border">
          {/* TAB 1: Profile */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="border-b border-border pb-4">
                <h3 className="text-xl font-bold">Profile & Resume Info</h3>
                <p className="text-sm text-muted-foreground">Update contact info, bio, and upload CV PDF.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Full Name</label>
                  <input type="text" value={profileForm.name || ""} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Email</label>
                  <input type="email" value={profileForm.email || ""} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Phone</label>
                  <input type="text" value={profileForm.phone || ""} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Location</label>
                  <input type="text" value={profileForm.location || ""} onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Hero Tagline</label>
                <textarea rows={2} value={profileForm.tagline || ""} onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-sm" />
              </div>

              <div className="space-y-3 p-4 bg-secondary/20 rounded-lg border border-border">
                <h4 className="text-sm font-semibold text-primary">About Section Text</h4>
                <div>
                  <label className="block text-xs font-semibold mb-1">About Section Heading Title</label>
                  <input type="text" value={profileForm.aboutTitle || ""} onChange={(e) => setProfileForm({ ...profileForm, aboutTitle: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-sm" placeholder="Passionate Software Developer & Tech Enthusiast" />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">About Bio Paragraph 1</label>
                  <textarea rows={2} value={profileForm.aboutBio1 || ""} onChange={(e) => setProfileForm({ ...profileForm, aboutBio1: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-sm" />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">About Bio Paragraph 2</label>
                  <textarea rows={2} value={profileForm.aboutBio2 || ""} onChange={(e) => setProfileForm({ ...profileForm, aboutBio2: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-sm" />
                </div>
              </div>

              {/* Upload CV */}
              <div className="p-4 border border-dashed border-border rounded-lg bg-secondary/20">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><Upload size={16} /> Resume / CV PDF File</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Current CV URL:{" "}
                  {profileForm.cvUrl ? (
                    <a
                      href={
                        profileForm.cvUrl.startsWith("http://") || profileForm.cvUrl.startsWith("https://")
                          ? profileForm.cvUrl
                          : profileForm.cvUrl.startsWith("/uploads/")
                          ? `${API_BASE_URL.replace("/api", "")}${profileForm.cvUrl}`
                          : profileForm.cvUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline font-medium"
                    >
                      View Current CV ↗
                    </a>
                  ) : (
                    <span className="text-muted-foreground">No CV uploaded yet</span>
                  )}
                </p>
                <input type="file" accept="application/pdf" onChange={(e) => setCvFile(e.target.files[0])} className="text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:bg-primary file:text-primary-foreground cursor-pointer" />
              </div>

              <button type="submit" disabled={isSavingProfile} className="cosmic-button flex items-center gap-2 text-sm font-medium">
                <Save size={16} /> {isSavingProfile ? "Saving..." : "Save Profile"}
              </button>
            </form>
          )}

          {/* TAB: About Focus Cards */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-xl font-bold">About Section Focus Cards</h3>
                  <p className="text-sm text-muted-foreground">Manage highlight cards displayed in your About Me section.</p>
                </div>
                {!editingHighlight && (
                  <button onClick={() => { setEditingHighlight({}); setHighlightForm({ title: "", description: "", icon: "code", order: highlightList.length + 1 }); }} className="cosmic-button flex items-center gap-1 text-xs px-3 py-2">
                    <Plus size={16} /> Add Focus Card
                  </button>
                )}
              </div>

              {editingHighlight !== null && (
                <form onSubmit={handleSaveHighlight} className="p-4 bg-secondary/30 rounded-lg space-y-4 mb-6">
                  <h4 className="font-semibold text-sm">{editingHighlight.id ? "Edit Focus Card" : "Add New Focus Card"}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Title</label>
                      <input type="text" required value={highlightForm.title} onChange={(e) => setHighlightForm({ ...highlightForm, title: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" placeholder="Backend Development" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Icon</label>
                      <select value={highlightForm.icon} onChange={(e) => setHighlightForm({ ...highlightForm, icon: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs capitalize">
                        <option value="code">Code</option>
                        <option value="user">User</option>
                        <option value="briefcase">Briefcase</option>
                        <option value="server">Server</option>
                        <option value="cpu">Cpu</option>
                        <option value="globe">Globe</option>
                        <option value="terminal">Terminal</option>
                        <option value="zap">Zap</option>
                        <option value="database">Database</option>
                        <option value="sparkles">Sparkles</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Sequence Order (#)</label>
                      <input type="number" value={highlightForm.order ?? 0} onChange={(e) => setHighlightForm({ ...highlightForm, order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" placeholder="1, 2, 3..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Description</label>
                    <textarea rows={2} required value={highlightForm.description} onChange={(e) => setHighlightForm({ ...highlightForm, description: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" placeholder="Building scalable APIs and microservices..." />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="submit" disabled={isSavingHighlight} className="cosmic-button text-xs px-4 py-1.5">{isSavingHighlight ? "Saving..." : "Save Focus Card"}</button>
                    <button type="button" onClick={() => setEditingHighlight(null)} className="px-4 py-1.5 rounded border border-border text-xs">Cancel</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 gap-3">
                {[...highlightList].sort((a, b) => (a.order || 0) - (b.order || 0)).map((hl) => (
                  <div key={hl.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded bg-primary/10 text-primary font-bold text-xs uppercase px-3 py-1">
                        {hl.icon || "code"}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm flex items-center gap-2">{hl.title} <span className="text-xs text-muted-foreground font-normal">#{hl.order || 0}</span></h4>
                        <p className="text-xs text-muted-foreground">{hl.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingHighlight(hl);
                          setHighlightForm({ title: hl.title, description: hl.description, icon: hl.icon || "code", order: hl.order || 0 });
                        }}
                        className="p-1.5 text-primary hover:bg-primary/10 rounded"
                        title="Edit Focus Card"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteHighlight(hl.id)}
                        className="p-1.5 text-destructive hover:bg-destructive/10 rounded"
                        title="Delete Focus Card"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Work Experiences */}
          {activeTab === "experiences" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-xl font-bold">Work Experience</h3>
                  <p className="text-sm text-muted-foreground">Manage your work history and roles.</p>
                </div>
                {!editingExp && (
                  <button onClick={() => { setEditingExp({}); setExpForm({ role: "", company: "", location: "", period: "", description: "" }); }} className="cosmic-button flex items-center gap-1 text-xs px-3 py-2">
                    <Plus size={16} /> Add Experience
                  </button>
                )}
              </div>

              {editingExp !== null && (
                <form onSubmit={handleSaveExp} className="p-4 bg-secondary/30 rounded-lg space-y-4 mb-6">
                  <h4 className="font-semibold text-sm">{editingExp.id ? "Edit Experience" : "Add Experience"}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Role / Position Title</label>
                      <input type="text" required value={expForm.role} onChange={(e) => setExpForm({ ...expForm, role: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Company / Organization</label>
                      <input type="text" required value={expForm.company} onChange={(e) => setExpForm({ ...expForm, company: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Time Period (e.g. 2023 - Present)</label>
                      <input type="text" required value={expForm.period} onChange={(e) => setExpForm({ ...expForm, period: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Location</label>
                      <input type="text" value={expForm.location} onChange={(e) => setExpForm({ ...expForm, location: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Description</label>
                    <textarea rows={3} value={expForm.description} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" disabled={isSavingExp} className="cosmic-button text-xs px-4 py-1.5">{isSavingExp ? "Saving..." : "Save Experience"}</button>
                    <button type="button" onClick={() => setEditingExp(null)} className="px-4 py-1.5 rounded border border-border text-xs">Cancel</button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {expList.map((exp) => (
                  <div key={exp.id} className="p-4 border border-border rounded-lg bg-background flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm">{exp.role} <span className="text-xs font-normal text-muted-foreground">@ {exp.company}</span></h4>
                      <p className="text-xs text-primary font-medium">{exp.period} | {exp.location}</p>
                      <p className="text-xs text-muted-foreground mt-2">{exp.description}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => { setEditingExp(exp); setExpForm(exp); }} className="p-1.5 text-primary hover:bg-primary/10 rounded"><Edit size={16} /></button>
                      <button onClick={() => handleDeleteExp(exp.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Education */}
          {activeTab === "education" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-xl font-bold">Education Records</h3>
                  <p className="text-sm text-muted-foreground">Manage your academic qualification history.</p>
                </div>
                {!editingEdu && (
                  <button onClick={() => { setEditingEdu({}); setEduForm({ degree: "", institution: "", location: "", period: "", description: "" }); }} className="cosmic-button flex items-center gap-1 text-xs px-3 py-2">
                    <Plus size={16} /> Add Education
                  </button>
                )}
              </div>

              {editingEdu !== null && (
                <form onSubmit={handleSaveEdu} className="p-4 bg-secondary/30 rounded-lg space-y-4 mb-6">
                  <h4 className="font-semibold text-sm">{editingEdu.id ? "Edit Education" : "Add Education"}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Degree Title</label>
                      <input type="text" required value={eduForm.degree} onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Institution / School / University</label>
                      <input type="text" required value={eduForm.institution} onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Time Period</label>
                      <input type="text" required value={eduForm.period} onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Location</label>
                      <input type="text" value={eduForm.location} onChange={(e) => setEduForm({ ...eduForm, location: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Description</label>
                    <textarea rows={3} value={eduForm.description} onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" disabled={isSavingEdu} className="cosmic-button text-xs px-4 py-1.5">{isSavingEdu ? "Saving..." : "Save Education"}</button>
                    <button type="button" onClick={() => setEditingEdu(null)} className="px-4 py-1.5 rounded border border-border text-xs">Cancel</button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {eduList.map((edu) => (
                  <div key={edu.id} className="p-4 border border-border rounded-lg bg-background flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm">{edu.degree} <span className="text-xs font-normal text-muted-foreground">@ {edu.institution}</span></h4>
                      <p className="text-xs text-primary font-medium">{edu.period} | {edu.location}</p>
                      <p className="text-xs text-muted-foreground mt-2">{edu.description}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => { setEditingEdu(edu); setEduForm(edu); }} className="p-1.5 text-primary hover:bg-primary/10 rounded"><Edit size={16} /></button>
                      <button onClick={() => handleDeleteEdu(edu.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Projects */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-xl font-bold">Projects Manager</h3>
                  <p className="text-sm text-muted-foreground">Add, edit or delete projects.</p>
                </div>
                {!editingProject && (
                  <button onClick={() => { setEditingProject({}); setProjectForm({ title: "", description: "", tags: "", demoUrl: "", githubUrl: "", image: "" }); }} className="cosmic-button flex items-center gap-1 text-xs px-3 py-2">
                    <Plus size={16} /> Add Project
                  </button>
                )}
              </div>

              {editingProject !== null && (
                <form onSubmit={handleSaveProject} className="p-4 bg-secondary/30 rounded-lg space-y-4 mb-6">
                  <h4 className="font-semibold text-sm">{editingProject.id ? "Edit Project" : "Add New Project"}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Title</label>
                      <input type="text" required value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Tags (comma separated)</label>
                      <input type="text" value={Array.isArray(projectForm.tags) ? projectForm.tags.join(", ") : projectForm.tags} onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Description</label>
                    <textarea rows={2} value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Demo URL</label>
                      <input type="url" value={projectForm.demoUrl || ""} onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">GitHub URL</label>
                      <input type="url" value={projectForm.githubUrl || ""} onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Project Screenshot</label>
                    <input type="file" accept="image/*" onChange={(e) => setProjectImageFile(e.target.files[0])} className="text-xs text-muted-foreground file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-primary file:text-white" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="submit" disabled={isSavingProject} className="cosmic-button text-xs px-4 py-1.5">{isSavingProject ? "Saving..." : "Save Project"}</button>
                    <button type="button" onClick={() => setEditingProject(null)} className="px-4 py-1.5 rounded border border-border text-xs">Cancel</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 gap-4">
                {projectList.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-center gap-4">
                      <img src={project.image} alt={project.title} className="w-16 h-12 object-cover rounded" />
                      <div>
                        <h4 className="font-bold text-sm">{project.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-1">{project.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setEditingProject(project); setProjectForm(project); }} className="p-2 text-primary hover:bg-primary/10 rounded"><Edit size={16} /></button>
                      <button onClick={() => handleDeleteProject(project.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Skills */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-xl font-bold">Skills Manager</h3>
                  <p className="text-sm text-muted-foreground">Manage your tech stack skills and marquee icons.</p>
                </div>
                {!editingSkill && (
                  <button onClick={() => { setEditingSkill({}); setSkillForm({ name: "", category: "frontend", image: "", order: skillList.length + 1 }); }} className="cosmic-button flex items-center gap-1 text-xs px-3 py-2">
                    <Plus size={16} /> Add Skill
                  </button>
                )}
              </div>

              {editingSkill !== null && (
                <form onSubmit={handleSaveSkill} className="p-4 bg-secondary/30 rounded-lg space-y-4 mb-6">
                  <h4 className="font-semibold text-sm">{editingSkill.id ? "Edit Skill" : "Add New Skill"}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Skill Name</label>
                      <input type="text" required value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Category</label>
                      <select value={skillForm.category} onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs">
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="database">Database</option>
                        <option value="tools">Tools</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Sequence / Order #</label>
                      <input type="number" value={skillForm.order ?? 0} onChange={(e) => setSkillForm({ ...skillForm, order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-1.5 rounded border border-input bg-background text-xs" placeholder="1, 2, 3..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Tech Icon Image</label>
                    <input type="file" accept="image/*" onChange={(e) => setSkillImageFile(e.target.files[0])} className="text-xs text-muted-foreground file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-primary file:text-white" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="submit" disabled={isSavingSkill} className="cosmic-button text-xs px-4 py-1.5">{isSavingSkill ? "Saving..." : "Save Skill"}</button>
                    <button type="button" onClick={() => setEditingSkill(null)} className="px-4 py-1.5 rounded border border-border text-xs">Cancel</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[...skillList].sort((a, b) => (a.order || 0) - (b.order || 0)).map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-background">
                    <div className="flex items-center gap-3">
                      <img src={skill.image} alt={skill.name} className="w-8 h-8 object-contain" />
                      <div>
                        <h4 className="font-semibold text-xs">{skill.name}</h4>
                        <span className="text-[10px] text-muted-foreground capitalize">{skill.category} • #{skill.order || 0}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingSkill(skill);
                          setSkillForm({ name: skill.name, category: skill.category, image: skill.image, order: skill.order || 0 });
                        }}
                        className="p-1 text-primary hover:bg-primary/10 rounded"
                        title="Edit Skill"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="p-1 text-destructive hover:bg-destructive/10 rounded"
                        title="Delete Skill"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Messages */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <h3 className="text-xl font-bold">Messages Inbox</h3>
                <p className="text-sm text-muted-foreground">Inquiries submitted via your contact form.</p>
              </div>

              {loadingMessages ? (
                <p className="text-center py-8 text-sm text-muted-foreground">Loading messages...</p>
              ) : messages.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Mail className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No messages received yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-4 border border-border rounded-lg bg-background space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{msg.name} ({msg.email})</span>
                        <span className="text-xs text-muted-foreground">{new Date(msg.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground bg-secondary/30 p-3 rounded">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
