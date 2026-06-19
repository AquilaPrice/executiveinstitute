import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, LogOut, X, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type Tab = "blog" | "services" | "programs" | "roles";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const Admin = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("blog");

  useEffect(() => {
    if (loading) return;
    if (!session) navigate("/auth", { replace: true });
  }, [session, loading, navigate]);

  if (loading || !session) {
    return (
      <Layout>
        <div className="pt-32 pb-24 container-tight text-center">Loading...</div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="pt-32 pb-24 container-tight max-w-xl">
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <ShieldCheck className="h-10 w-10 text-accent mx-auto" />
            <h1 className="heading-serif text-3xl text-primary mt-4">No admin access</h1>
            <p className="text-sm text-muted-foreground mt-3">
              You're signed in as <strong>{session.user.email}</strong>, but you don't have admin
              permissions yet. Ask an existing admin to grant your account the admin role, or — if
              this is the first account — open the Cloud dashboard and add a row to the
              <code className="mx-1 px-1.5 py-0.5 bg-muted rounded text-xs">user_roles</code>
              table:
            </p>
            <pre className="mt-4 text-left text-xs bg-muted p-3 rounded-lg overflow-auto">{`user_id: ${session.user.id}\nrole:    admin`}</pre>
            <Button onClick={signOut} variant="outline" className="mt-6">
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-28 pb-20 bg-gradient-soft min-h-screen">
        <div className="container-tight">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow">Admin Dashboard</p>
              <h1 className="heading-serif text-4xl text-primary mt-1">Content Manager</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:inline">
                {session.user.email}
              </span>
              <Button onClick={signOut} variant="outline" size="sm">
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-border mb-6">
            {(["blog", "services", "programs", "roles"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-sm font-semibold capitalize border-b-2 -mb-px transition-colors ${
                  tab === t
                    ? "border-accent text-accent"
                    : "border-transparent text-foreground/60 hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "blog" && <BlogManager />}
          {tab === "services" && <ServicesManager />}
          {tab === "programs" && <ProgramsManager />}
          {tab === "roles" && <RolesManager />}
        </div>
      </section>
    </Layout>
  );
};

/* ---------------- Blog ---------------- */
const BlogManager = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    setRows(data ?? []);
  };
  useEffect(() => {
    load();
  }, []);

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      title: String(fd.get("title")),
      slug: slugify(String(fd.get("slug") || fd.get("title"))),
      excerpt: String(fd.get("excerpt") || ""),
      content: String(fd.get("content")),
      cover_image: String(fd.get("cover_image") || "") || null,
      author: String(fd.get("author") || "") || null,
      published: fd.get("published") === "on",
      published_at: fd.get("published") === "on" ? new Date().toISOString() : null,
    };
    const res = editing
      ? await supabase.from("blog_posts").update(payload).eq("id", editing.id)
      : await supabase.from("blog_posts").insert(payload);
    if (res.error) return toast.error(res.error.message);
    toast.success("Saved");
    setOpen(false);
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Blog posts ({rows.length})</h2>
        <Button
          variant="hero"
          size="sm"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" /> New post
        </Button>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {rows.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border last:border-0"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold truncate">{r.title}</span>
                {r.published ? (
                  <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold uppercase">
                    Live
                  </span>
                ) : (
                  <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-bold uppercase">
                    Draft
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">/{r.slug}</p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setEditing(r);
                  setOpen(true);
                }}
                className="p-2 rounded hover:bg-muted"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => remove(r.id)}
                className="p-2 rounded hover:bg-destructive/10 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="p-8 text-center text-sm text-muted-foreground">No posts yet.</div>
        )}
      </div>

      {open && (
        <Modal onClose={() => setOpen(false)} title={editing ? "Edit post" : "New post"}>
          <form onSubmit={save} className="space-y-4">
            <Field label="Title" name="title" defaultValue={editing?.title} required />
            <Field label="Slug (auto from title if blank)" name="slug" defaultValue={editing?.slug} />
            <Field label="Author" name="author" defaultValue={editing?.author ?? "TEEIL Editorial"} />
            <Field
              label="Cover image URL (optional)"
              name="cover_image"
              defaultValue={editing?.cover_image}
            />
            <Field
              label="Excerpt"
              name="excerpt"
              defaultValue={editing?.excerpt}
              textarea
              rows={2}
            />
            <Field
              label="Content (supports line breaks)"
              name="content"
              defaultValue={editing?.content}
              required
              textarea
              rows={10}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="published"
                defaultChecked={editing?.published ?? true}
              />
              Publish (visible on site)
            </label>
            <Button type="submit" variant="hero" className="w-full">
              Save
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

/* ---------------- Services ---------------- */
const ServicesManager = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("display_order");
    setRows(data ?? []);
  };
  useEffect(() => {
    load();
  }, []);

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      title: String(fd.get("title")),
      slug: slugify(String(fd.get("slug") || fd.get("title"))),
      description: String(fd.get("description")),
      icon: String(fd.get("icon") || "Sparkles"),
      display_order: Number(fd.get("display_order") || 0),
      active: fd.get("active") === "on",
    };
    const res = editing
      ? await supabase.from("services").update(payload).eq("id", editing.id)
      : await supabase.from("services").insert(payload);
    if (res.error) return toast.error(res.error.message);
    toast.success("Saved");
    setOpen(false);
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Services ({rows.length})</h2>
        <Button
          variant="hero"
          size="sm"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" /> New service
        </Button>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {rows.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border last:border-0"
          >
            <div className="min-w-0">
              <div className="font-semibold truncate">{r.title}</div>
              <p className="text-xs text-muted-foreground truncate">{r.description}</p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setEditing(r);
                  setOpen(true);
                }}
                className="p-2 rounded hover:bg-muted"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => remove(r.id)}
                className="p-2 rounded hover:bg-destructive/10 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <Modal onClose={() => setOpen(false)} title={editing ? "Edit service" : "New service"}>
          <form onSubmit={save} className="space-y-4">
            <Field label="Title" name="title" defaultValue={editing?.title} required />
            <Field label="Slug" name="slug" defaultValue={editing?.slug} />
            <Field
              label="Description"
              name="description"
              defaultValue={editing?.description}
              required
              textarea
              rows={4}
            />
            <Field
              label="Icon (Lucide name: Sparkles, Briefcase, Code2, Crown, GraduationCap, Handshake, Heart, Mic, Target, etc.)"
              name="icon"
              defaultValue={editing?.icon ?? "Sparkles"}
            />
            <Field
              label="Display order"
              name="display_order"
              type="number"
              defaultValue={editing?.display_order ?? 0}
            />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="active" defaultChecked={editing?.active ?? true} />
              Active
            </label>
            <Button type="submit" variant="hero" className="w-full">
              Save
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

/* ---------------- Programs ---------------- */
const ProgramsManager = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("programs").select("*").order("display_order");
    setRows(data ?? []);
  };
  useEffect(() => {
    load();
  }, []);

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      title: String(fd.get("title")),
      slug: slugify(String(fd.get("slug") || fd.get("title"))),
      track: String(fd.get("track")),
      summary: String(fd.get("summary") || "") || null,
      description: String(fd.get("description")),
      duration: String(fd.get("duration") || "") || null,
      format: String(fd.get("format") || "") || null,
      cover_image: String(fd.get("cover_image") || "") || null,
      display_order: Number(fd.get("display_order") || 0),
      active: fd.get("active") === "on",
    };
    const res = editing
      ? await supabase.from("programs").update(payload).eq("id", editing.id)
      : await supabase.from("programs").insert(payload);
    if (res.error) return toast.error(res.error.message);
    toast.success("Saved");
    setOpen(false);
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this program?")) return;
    const { error } = await supabase.from("programs").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Programs ({rows.length})</h2>
        <Button
          variant="hero"
          size="sm"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" /> New program
        </Button>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {rows.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border last:border-0"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold truncate">{r.title}</span>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">
                  {r.track}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{r.summary}</p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setEditing(r);
                  setOpen(true);
                }}
                className="p-2 rounded hover:bg-muted"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => remove(r.id)}
                className="p-2 rounded hover:bg-destructive/10 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <Modal onClose={() => setOpen(false)} title={editing ? "Edit program" : "New program"}>
          <form onSubmit={save} className="space-y-4">
            <Field label="Title" name="title" defaultValue={editing?.title} required />
            <Field label="Slug" name="slug" defaultValue={editing?.slug} />
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                Track
              </label>
              <select
                name="track"
                defaultValue={editing?.track ?? "Children"}
                className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm"
              >
                <option>Children</option>
                <option>Teens</option>
                <option>Adults</option>
              </select>
            </div>
            <Field label="Tagline / summary" name="summary" defaultValue={editing?.summary} />
            <Field
              label="Description"
              name="description"
              defaultValue={editing?.description}
              required
              textarea
              rows={5}
            />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Duration" name="duration" defaultValue={editing?.duration} />
              <Field label="Format" name="format" defaultValue={editing?.format} />
            </div>
            <Field
              label="Cover image URL (optional)"
              name="cover_image"
              defaultValue={editing?.cover_image}
            />
            <Field
              label="Display order"
              name="display_order"
              type="number"
              defaultValue={editing?.display_order ?? 0}
            />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="active" defaultChecked={editing?.active ?? true} />
              Active
            </label>
            <Button type="submit" variant="hero" className="w-full">
              Save
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

/* ---------------- Roles ---------------- */
const RolesManager = () => {
  const [rows, setRows] = useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase.from("user_roles").select("*").order("created_at");
    setRows(data ?? []);
  };
  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Remove this role?")) return;
    const { error } = await supabase.from("user_roles").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const add = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const user_id = String(fd.get("user_id")).trim();
    if (!user_id) return;
    const { error } = await supabase
      .from("user_roles")
      .insert({ user_id, role: "admin" });
    if (error) return toast.error(error.message);
    toast.success("Admin granted");
    (e.currentTarget as HTMLFormElement).reset();
    load();
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="text-lg font-bold mb-1">Grant admin role</h2>
        <p className="text-xs text-muted-foreground mb-4">
          Paste the user's ID (find it in the Cloud → Users area). The user must have signed up
          first.
        </p>
        <form onSubmit={add} className="flex gap-2">
          <input
            name="user_id"
            placeholder="user id (uuid)"
            className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
          />
          <Button type="submit" variant="hero" size="sm">
            Grant admin
          </Button>
        </form>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border font-bold">Admins & roles</div>
        {rows.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border last:border-0"
          >
            <div className="min-w-0">
              <div className="font-mono text-xs truncate">{r.user_id}</div>
              <p className="text-xs text-accent font-bold uppercase">{r.role}</p>
            </div>
            <button
              onClick={() => remove(r.id)}
              className="p-2 rounded hover:bg-destructive/10 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="p-6 text-sm text-muted-foreground text-center">No roles yet.</div>
        )}
      </div>
    </div>
  );
};

/* ---------------- shared UI ---------------- */
const Field = ({
  label,
  name,
  defaultValue,
  type = "text",
  textarea,
  rows,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: any;
  type?: string;
  textarea?: boolean;
  rows?: number;
  required?: boolean;
}) => (
  <div>
    <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
      {label}
    </label>
    {textarea ? (
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        rows={rows ?? 3}
        required={required}
        className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent"
      />
    ) : (
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent"
      />
    )}
  </div>
);

const Modal = ({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}) => (
  <div
    className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div
      className="bg-card border border-border rounded-2xl shadow-elegant w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card">
        <h3 className="font-bold text-lg">{title}</h3>
        <button onClick={onClose} className="p-1 rounded hover:bg-muted">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

export default Admin;
