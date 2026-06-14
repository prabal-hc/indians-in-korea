"use client";

import { useEffect, useState } from "react";
import { PageTitle } from "@/components/admin/PageTitle";
import { LoadingSkeleton } from "@/components/admin/LoadingSkeleton";
import {
  AboutForm,
  type AboutFormValues,
} from "@/components/admin/forms/AboutForm";
import {
  getAboutPageData,
  saveAbout,
  saveBoardMembers,
  saveContacts,
  type BoardMember,
  type ContactItem,
} from "@/services/admin/about.service";

export default function AdminAboutPage() {
  const [contentValues, setContentValues] = useState<AboutFormValues | null>(
    null,
  );
  const [boardValues, setBoardValues] = useState<BoardMember[]>([]);
  const [contactValues, setContactValues] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getAboutPageData().then(
      ({ content, vision, board, advisors, core, contacts, socials }) => {
        if (content) {
          setContentValues({
            headline: content.headline,
            subheadline: content.subheadline ?? "",
            description: content.description ?? "",
            mission: content.mission ?? "",
            established: content.established ?? "",
            members: content.members ?? "",
            events: content.events ?? "",
            ctaLabel: content.ctaLabel ?? "",
            ctaUrl: content.ctaUrl ?? "",
            heroImage: content.heroImage ?? "",
            visionItems:
              vision.length > 0
                ? vision.map((v) => v.content)
                : Array(8).fill(""),
          });
        }
        // Merge all board types for the board tab
        setBoardValues([...board, ...advisors, ...core]);
        // Merge all contact types for the contacts tab
        setContactValues([...contacts, ...socials]);
        setLoading(false);
      },
    );
  }, []);

  const flash = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3500);
  };

  const handleSaveContent = async (updated: AboutFormValues) => {
    setSaving(true);
    try {
      await saveAbout(updated);
      setContentValues(updated);
      flash("Content saved successfully.");
    } catch {
      alert("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveBoard = async (members: BoardMember[]) => {
    setSaving(true);
    try {
      await saveBoardMembers(members);
      setBoardValues(members);
      flash("Board saved successfully.");
    } catch {
      alert("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveContacts = async (contacts: ContactItem[]) => {
    setSaving(true);
    try {
      await saveContacts(contacts);
      setContactValues(contacts);
      flash("Contacts saved successfully.");
    } catch {
      alert("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageTitle
        title="About Us"
        subtitle="Manage content, board members, and contact links."
      />

      {success && (
        <p className="rounded-3xl bg-emerald-50 border border-emerald-200 px-5 py-4 text-sm font-semibold text-emerald-700">
          ✓ {success}
        </p>
      )}

      {loading ? (
        <LoadingSkeleton rows={6} columns={1} />
      ) : (
        <AboutForm
          initialContent={contentValues ?? undefined}
          onSubmitContent={handleSaveContent}
          initialBoard={boardValues}
          onSubmitBoard={handleSaveBoard}
          initialContacts={contactValues}
          onSubmitContacts={handleSaveContacts}
          saving={saving}
        />
      )}
    </div>
  );
}
