import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { useEffect, useState } from "react";
import { COUNTRIES, readProfile, writeProfile, countryOf, AVATAR_EMOJIS, type UserProfile } from "@/lib/user-store";
import { User, Mail, Phone, MapPin, Cake, Globe, Check, Save, Pencil, X, Camera } from "lucide-react";

export const Route = createFileRoute("/personal-info")({
  head: () => ({ meta: [{ title: "Personal information · Velocity" }] }),
  component: PersonalInfo,
});

function PersonalInfo() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);

  useEffect(() => {
    setProfile(readProfile());
  }, []);

  if (!profile) {
    return (
      <MobileFrame>
        <div className="h-full w-full gradient-dawn" />
      </MobileFrame>
    );
  }

  const c = countryOf(profile.country);

  function upd<K extends keyof UserProfile>(k: K, v: UserProfile[K]) {
    setProfile((p) => (p ? { ...p, [k]: v } : p));
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    writeProfile(profile);
    setSaved(true);
    setEditing(false);
    setTimeout(() => {
      setSaved(false);
      navigate({ to: "/profile" });
    }, 700);
  }

  const disabled = !editing;

  return (
    <MobileFrame>
      <div className="relative h-full w-full gradient-dawn overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-24 -left-16 size-64 rounded-full bg-fuchsia-500/25 blur-3xl" />

        <TopBar
          title="Personal information"
          subtitle={editing ? "Editing…" : "View & edit details"}
          showBack
          right={
            !editing ? (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="grid h-10 place-items-center gap-1.5 rounded-2xl gradient-primary text-primary-foreground px-3 shadow-glow active:scale-95 transition"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-bold">
                  <Pencil className="size-3.5" /> Edit
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => { setProfile(readProfile()); setEditing(false); }}
                className="grid size-10 place-items-center rounded-2xl glass-panel active:scale-95 transition"
                aria-label="Cancel"
              >
                <X className="size-4" />
              </button>
            )
          }
        />

        <form
          onSubmit={save}
          className="relative h-[calc(100%-72px)] overflow-y-auto no-scrollbar px-5 pb-6 stagger"
        >
          {/* Avatar block */}
          <div className="flex flex-col items-center pt-2 pb-4">
            <div className="relative">
              <div className="grid size-24 place-items-center rounded-[28px] gradient-sunrise text-primary-foreground font-display text-4xl font-extrabold shadow-glow">
                {profile.avatarEmoji ? (
                  <span className="text-5xl leading-none">{profile.avatarEmoji}</span>
                ) : (
                  profile.avatarInitials || "V"
                )}
              </div>
              {editing && (
                <button
                  type="button"
                  onClick={() => setEmojiOpen((o) => !o)}
                  className="absolute -bottom-1 -right-1 grid size-9 place-items-center rounded-full bg-background border-2 border-primary shadow-glow active:scale-95 transition"
                  aria-label="Change photo"
                >
                  <Camera className="size-4 text-primary" />
                </button>
              )}
            </div>

            {editing && (
              <button
                type="button"
                onClick={() => setEmojiOpen((o) => !o)}
                className="mt-3 text-xs font-bold text-primary uppercase tracking-widest"
              >
                Change photo
              </button>
            )}

            {emojiOpen && editing && (
              <div className="mt-3 w-full rounded-3xl glass-strong p-3 animate-fade-in">
                <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center">
                  Pick your travel avatar
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_EMOJIS.map((e) => {
                    const active = profile.avatarEmoji === e;
                    return (
                      <button
                        type="button"
                        key={e}
                        onClick={() => { upd("avatarEmoji", e); setEmojiOpen(false); }}
                        className={
                          "aspect-square grid place-items-center rounded-2xl text-2xl transition " +
                          (active
                            ? "gradient-sunrise shadow-glow scale-105"
                            : "bg-surface border border-foreground/10 hover:bg-foreground/5")
                        }
                      >
                        {e}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <EditField icon={User} label="Full name" value={profile.name} onChange={(v) => upd("name", v)} disabled={disabled} />
            <EditField icon={Mail} label="Email" type="email" value={profile.email} onChange={(v) => upd("email", v)} disabled={disabled} />
            <EditField icon={Phone} label="Phone" type="tel" value={profile.phone} onChange={(v) => upd("phone", v)} disabled={disabled} />

            {/* Country picker */}
            <div>
              <span className="mb-1.5 ml-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Country
              </span>
              <button
                type="button"
                disabled={disabled}
                onClick={() => setCountryOpen((o) => !o)}
                className="flex h-13 w-full items-center gap-3 rounded-2xl bg-surface border border-foreground/10 px-4 py-3 shadow-soft disabled:opacity-70"
              >
                <Globe className="size-4 text-primary" />
                <span className="flex-1 text-left text-sm font-semibold flex items-center gap-2">
                  <span className="text-lg leading-none">{c.flag}</span>
                  {c.name}
                  <span className="text-xs text-muted-foreground">· {c.dial}</span>
                </span>
                {!disabled && (
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    Change
                  </span>
                )}
              </button>
              {countryOpen && !disabled && (
                <div className="mt-2 grid grid-cols-1 gap-1 rounded-2xl bg-surface border border-foreground/10 p-2 shadow-elevated animate-fade-in">
                  {COUNTRIES.map((cc) => {
                    const selected = cc.code === profile.country;
                    return (
                      <button
                        type="button"
                        key={cc.code}
                        onClick={() => {
                          upd("country", cc.code);
                          setCountryOpen(false);
                        }}
                        className={
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition " +
                          (selected ? "bg-primary/15" : "hover:bg-foreground/5")
                        }
                      >
                        <span className="text-lg">{cc.flag}</span>
                        <span className="flex-1 text-left font-semibold">{cc.name}</span>
                        <span className="text-xs text-muted-foreground">{cc.dial}</span>
                        {selected && <Check className="size-4 text-primary" strokeWidth={3} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <EditField icon={MapPin} label="City" value={profile.city} onChange={(v) => upd("city", v)} placeholder="Karachi" disabled={disabled} />
            <EditField icon={Cake} label="Date of birth" type="date" value={profile.dob} onChange={(v) => upd("dob", v)} disabled={disabled} />

            {/* Gender */}
            <div>
              <span className="mb-1.5 ml-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Gender
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(["male", "female", "other"] as const).map((g) => {
                  const active = profile.gender === g;
                  return (
                    <button
                      type="button"
                      key={g}
                      disabled={disabled}
                      onClick={() => upd("gender", g)}
                      className={
                        "h-12 rounded-2xl text-sm font-semibold capitalize transition disabled:opacity-70 " +
                        (active
                          ? "gradient-sunrise text-primary-foreground shadow-glow"
                          : "bg-surface border border-foreground/10 text-foreground/80")
                      }
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {editing ? (
            <button
              type="submit"
              className="btn-shimmer mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl gradient-sunrise font-bold text-primary-foreground shadow-glow active:scale-[0.98] transition-transform"
            >
              {saved ? (
                <><Check className="size-5" strokeWidth={3} /> Saved</>
              ) : (
                <><Save className="size-5" /> Save changes</>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-foreground/10 bg-surface font-bold text-foreground/90 active:scale-[0.98] transition-transform"
            >
              <Pencil className="size-4" /> Edit information
            </button>
          )}
          <p className="mt-3 text-center text-[10px] text-muted-foreground">
            {editing ? "Review, then tap Save to sync everywhere." : "Tap Edit to update your details."}
          </p>
        </form>
      </div>
    </MobileFrame>
  );
}

function EditField({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 ml-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className={"flex h-13 items-center gap-3 rounded-2xl bg-surface border border-foreground/10 px-4 py-3 shadow-soft transition " + (disabled ? "opacity-80" : "focus-within:ring-2 focus-within:ring-primary/50")}>
        <Icon className="size-4 text-muted-foreground" />
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 disabled:cursor-default"
        />
      </div>
    </label>
  );
}
