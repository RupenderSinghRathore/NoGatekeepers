import { useState } from "react";
import { submitTip } from "../api";
import { TipCard } from "../components/TipCard";

const categoryOptions = ["Scholarship", "Faculty", "Club", "Department Norm", "Recruiting"];
const urgencyOptions = ["Critical", "Soon", "FYI"];

const initialForm = {
  title: "",
  category: categoryOptions[0],
  college: "",
  branch: "",
  urgency: urgencyOptions[1],
  deadlineDate: "",
  description: "",
  whatMostPeopleMiss: "",
};

export const SubmitPage = () => {
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");

  const previewTip = {
    ...formData,
    id: "preview",
    verificationCount: 0,
    postedBy: "Verified Senior",
    description: formData.description || "Your note preview will appear here as you fill the form.",
    deadlineDate: formData.deadlineDate || new Date().toISOString(),
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitTip({
      ...formData,
      deadlineDate: new Date(formData.deadlineDate).toISOString(),
    });
    setMessage("Tip submitted for admin review.");
    setFormData(initialForm);
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
      <section className="border border-paper/15 bg-white/[0.03] p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-amber">Senior Submission Desk</p>
        <h2 className="mt-3 font-display text-4xl">Send the advice people usually learn too late</h2>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            { name: "title", label: "Title", type: "text", full: true },
            { name: "college", label: "College", type: "text" },
            { name: "branch", label: "Branch", type: "text" },
            { name: "deadlineDate", label: "Deadline date", type: "date" },
          ].map((field) => (
            <label key={field.name} className={field.full ? "md:col-span-2" : ""}>
              <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-paper/55">{field.label}</span>
              <input
                name={field.name}
                type={field.type}
                required
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full border border-paper/15 bg-ink px-4 py-3 text-paper outline-none focus:border-amber"
              />
            </label>
          ))}

          <label>
            <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-paper/55">Category</span>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-paper/15 bg-ink px-4 py-3 text-paper outline-none focus:border-amber"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-paper/55">Urgency</span>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="w-full border border-paper/15 bg-ink px-4 py-3 text-paper outline-none focus:border-amber"
            >
              {urgencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="md:col-span-2">
            <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-paper/55">Description</span>
            <textarea
              name="description"
              rows="5"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-paper/15 bg-ink px-4 py-3 text-paper outline-none focus:border-amber"
            />
          </label>

          <label className="md:col-span-2">
            <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-paper/55">What most people miss</span>
            <textarea
              name="whatMostPeopleMiss"
              rows="4"
              required
              value={formData.whatMostPeopleMiss}
              onChange={handleChange}
              className="w-full border border-paper/15 bg-ink px-4 py-3 text-paper outline-none focus:border-amber"
            />
          </label>

          <div className="md:col-span-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              className="border border-amber bg-amber px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-transparent hover:text-amber"
            >
              Submit Tip
            </button>
            {message && <p className="text-sm text-emerald-300">{message}</p>}
          </div>
        </form>
      </section>

      <aside className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-amber">Live Preview</p>
        <TipCard tip={previewTip} />
        <div className="border border-paper/10 bg-white/[0.03] p-5 text-sm leading-7 text-paper/70">
          <p className="font-semibold text-paper">Preview note</p>
          <p className="mt-2">The admin queue starts all new submissions as pending so seniors can post quickly while moderators review accuracy.</p>
        </div>
      </aside>
    </div>
  );
};
