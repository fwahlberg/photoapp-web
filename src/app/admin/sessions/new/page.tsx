"use client";

import React, { useState } from "react";

// New Session / Sessions creation screen for the Photo Portal admin
// - Drop this into: src/app/admin/sessions/new/page.tsx
// - Currently local-only UI: not wired to backend yet

export default function NewSessionPage() {
  const [mode, setMode] = useState<"single" | "recurring">("single");

  const [recurringConfig, setRecurringConfig] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    daysOfWeek: [] as string[],
    recurrenceType: "Weekly",
    maxOccurrences: "",
  });

  const updateRecurring = (patch: Partial<typeof recurringConfig>) => {
    setRecurringConfig((prev) => ({ ...prev, ...patch }));
  };

  const previewOccurrences =
    mode === "recurring" ? generatePreviewOccurrences(recurringConfig, 6) : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top bar */}
      <header className="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-white/90 backdrop-blur">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
            Sessions
          </div>
          <div className="text-lg font-semibold tracking-tight text-slate-900">
            Create new {mode === "single" ? "session" : "recurring sessions"}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 rounded-lg text-xs border border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-100 transition">
            Cancel
          </button>
          <button className="px-3 py-1.5 rounded-lg text-xs bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition">
            Save session
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col xl:flex-row gap-4 p-6">
        {/* Left: Form */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-4">
          {/* Mode toggle */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMode("single")}
                className={`px-3 py-1.5 text-[11px] rounded-full border ${
                  mode === "single"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-slate-50 border-slate-200 text-slate-500"
                }`}
              >
                Single session
              </button>
              <button
                type="button"
                onClick={() => setMode("recurring")}
                className={`px-3 py-1.5 text-[11px] rounded-full border ${
                  mode === "recurring"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-slate-50 border-slate-200 text-slate-500"
                }`}
              >
                Recurring sessions
              </button>
            </div>
            <span className="text-[11px] text-slate-400">
              {mode === "single"
                ? "Ideal for one-off shoots, weddings, events."
                : "Set up repeating client work once and let the calendar handle the rest."}
            </span>
          </div>

          {/* Basic details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <Field label="Client">
              <ClientSelect />
            </Field>
            <Field label="Session name / internal title">
              <input
                type="text"
                placeholder="e.g. Quarterly headshots, Saturday brand content, etc."
                className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400"
              />
            </Field>
            <Field label="Location">
              <input
                type="text"
                placeholder="e.g. York studio, Client office, Venue name"
                className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400"
              />
            </Field>
            <Field label="Assigned photographer / team member">
              <TeamMemberSelect />
            </Field>
          </div>

          {/* Timing */}
          {mode === "single" ? (
            <SingleSessionTiming />
          ) : (
            <RecurringSessionTiming
              config={recurringConfig}
              onChange={updateRecurring}
            />
          )}

          {/* Commercials */}
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <Field label="Rate template">
              <RateTemplateSelect />
            </Field>
            <Field label="Estimated fee">
              <div className="flex items-center rounded-lg border border-slate-200 px-2.5 py-1.5 bg-slate-50">
                <span className="text-slate-400 mr-1">£</span>
                <input
                  type="number"
                  placeholder="Auto from template"
                  className="w-full bg-transparent outline-none text-xs"
                />
              </div>
            </Field>
            <Field label="Billable to">
              <select className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400">
                <option>Default client contact</option>
                <option>Accounts contact</option>
                <option>Custom...</option>
              </select>
            </Field>
          </div>

          {/* Notes */}
          <div className="mt-2 text-xs">
            <Field label="Internal notes">
              <textarea
                rows={3}
                placeholder="Brief, requirements, reminders for the team. Not visible to clients."
                className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400 resize-none"
              />
            </Field>
          </div>
        </div>

        {/* Right: Summary & preview */}
        <aside className="w-full xl:w-96 flex flex-col gap-4">
          {/* Summary card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-xs">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500 mb-1">
                  Session summary
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  What you&apos;ll create
                </div>
              </div>
            </div>

            <ul className="mt-3 space-y-2 text-[11px] text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📸</span>
                <span>
                  <strong className="font-medium text-slate-900">
                    Client & location
                  </strong>
                  <br />
                  Link this session to a client and location so delivery and
                  invoicing are grouped correctly.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">🗓️</span>
                <span>
                  <strong className="font-medium text-slate-900">
                    {mode === "single"
                      ? "Single date & time"
                      : "Recurring pattern"}
                  </strong>
                  <br />
                  {mode === "single"
                    ? "Start and end times can cross midnight – the app will still treat this as one session."
                    : "Choose start/end dates, days of the week and a time window, and we&apos;ll generate the sessions for you."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">💰</span>
                <span>
                  <strong className="font-medium text-slate-900">
                    Rates & invoicing
                  </strong>
                  <br />
                  Attach a rate template so future invoices can auto-pull these
                  sessions with the correct fee.
                </span>
              </li>
            </ul>
          </div>

          {/* Recurring preview (only when recurring mode) */}
          {mode === "recurring" && (
            <div className="bg-slate-900 text-slate-50 rounded-2xl p-4 text-xs shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Pattern preview
                </div>
                <span className="text-[11px] text-slate-400">
                  Upcoming examples
                </span>
              </div>

              {previewOccurrences.length === 0 ? (
                <p className="text-[11px] text-slate-300">
                  Choose a start date, time window, and at least one day of the
                  week to see the first few sessions that will be generated.
                </p>
              ) : (
                <>
                  <p className="text-[11px] text-slate-100 mb-2">
                    {buildPreviewSummary(
                      recurringConfig,
                      previewOccurrences.length
                    )}
                  </p>
                  <ul className="space-y-1.5 text-[11px]">
                    {previewOccurrences.map((occ) => (
                      <li
                        key={occ.iso}
                        className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900/60 px-2 py-1.5"
                      >
                        <span className="text-slate-50">{occ.label}</span>
                        <span className="text-slate-300 text-[11px]">
                          {occ.timeRange}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[10px] text-slate-400">
                    Actual dates will be created when you save. You can still
                    edit or cancel individual sessions later from the schedule.
                  </p>
                </>
              )}
            </div>
          )}

          {/* Help / tips */}
          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-3 text-[11px] text-slate-600">
            <div className="font-medium text-slate-800 mb-1">Tips</div>
            <ul className="list-disc list-inside space-y-1">
              <li>Use recurring sessions for long-term retainers and regular clients.</li>
              <li>Attach a rate template now to make invoicing later basically one click.</li>
              <li>You can still override times, fees, or cancel individual dates later.</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-xs">
      <span className="text-[11px] font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}

function ClientSelect() {
  const clients = [
    "TechCore Ltd",
    "Greenleaf Naturals",
    "Urban Fitness",
    "Emma & Josh (wedding)",
    "Harper family",
  ];

  return (
    <div className="relative">
      <select className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400">
        <option value="">Select client...</option>
        {clients.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}

function TeamMemberSelect() {
  const members = ["Felix", "Amy", "Verity"];
  return (
    <select className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400">
      <option value="">Choose team member...</option>
      {members.map((m) => (
        <option key={m}>{m}</option>
      ))}
    </select>
  );
}

function RateTemplateSelect() {
  const templates = [
    "Event – Flat evening rate",
    "Corporate – Half day",
    "Corporate – Full day",
    "Portraits – Session fee",
    "Weddings – Full day package",
  ];

  return (
    <select className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400">
      <option value="">Select rate template...</option>
      {templates.map((t) => (
        <option key={t}>{t}</option>
      ))}
    </select>
  );
}

function SingleSessionTiming() {
  return (
    <div className="mt-2 border border-slate-200 rounded-2xl p-3 text-xs bg-slate-50/60">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
          Date & time
        </div>
        <span className="text-[11px] text-slate-400">For one specific session</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Field label="Date">
          <input
            type="date"
            className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400"
          />
        </Field>
        <Field label="Start time">
          <input
            type="time"
            className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400"
          />
        </Field>
        <Field label="End time">
          <input
            type="time"
            className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400"
          />
        </Field>
      </div>
      <p className="mt-2 text-[11px] text-slate-500">
        Sessions that run past midnight are fully supported. Choose the calendar date for when you start; the system will
        automatically handle the end time on the next day.
      </p>
    </div>
  );
}

// Recurring timing config props
interface RecurringConfig {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  daysOfWeek: string[];
  recurrenceType: string;
  maxOccurrences: string;
}

function RecurringSessionTiming({
  config,
  onChange,
}: {
  config: RecurringConfig;
  onChange: (patch: Partial<RecurringConfig>) => void;
}) {
  const toggleDay = (day: string) => {
    const exists = config.daysOfWeek.includes(day);
    if (exists) {
      onChange({ daysOfWeek: config.daysOfWeek.filter((d) => d !== day) });
    } else {
      onChange({ daysOfWeek: [...config.daysOfWeek, day] });
    }
  };

  return (
    <div className="mt-2 border border-slate-200 rounded-2xl p-3 text-xs bg-slate-50/60 space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
          Recurring pattern
        </div>
        <span className="text-[11px] text-slate-400">
          Generate multiple future sessions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Field label="Start date">
          <input
            type="date"
            value={config.startDate}
            onChange={(e) => onChange({ startDate: e.target.value })}
            className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400"
          />
        </Field>
        <Field label="End date (optional)">
          <input
            type="date"
            value={config.endDate}
            onChange={(e) => onChange({ endDate: e.target.value })}
            className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400"
          />
        </Field>
        <Field label="Time window">
          <div className="flex items-center gap-1.5">
            <input
              type="time"
              value={config.startTime}
              onChange={(e) => onChange({ startTime: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400"
            />
            <span className="text-[11px] text-slate-400">to</span>
            <input
              type="time"
              value={config.endTime}
              onChange={(e) => onChange({ endTime: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400"
            />
          </div>
        </Field>
      </div>

      <div className="mt-1">
        <div className="text-[11px] font-medium text-slate-600 mb-1">
          Days of the week
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => {
            const active = config.daysOfWeek.includes(d);
            return (
              <button
                key={d}
                type="button"
                onClick={() => toggleDay(d)}
                className={`px-2.5 py-1 rounded-full border text-[11px] ${
                  active
                    ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                    : "border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-800"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
        <Field label="Recurrence type">
          <select
            value={config.recurrenceType}
            onChange={(e) => onChange({ recurrenceType: e.target.value })}
            className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400"
          >
            <option>Weekly</option>
            <option>Every 2 weeks</option>
            <option>Monthly (by weekday)</option>
            <option>Monthly (by date)</option>
          </select>
        </Field>
        <Field label="Max occurrences (optional)">
          <input
            type="number"
            value={config.maxOccurrences}
            onChange={(e) => onChange({ maxOccurrences: e.target.value })}
            placeholder="e.g. 12"
            className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400"
          />
        </Field>
      </div>

      <p className="mt-1 text-[11px] text-slate-500">
        Recurring sessions will be generated as individual entries between your
        start and end dates so you can still edit, cancel, or reassign specific
        dates without affecting the whole pattern.
      </p>
    </div>
  );
}

// --- Pattern preview helpers ---

const DAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const INDEX_DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface OccurrencePreview {
  iso: string;
  label: string;
  timeRange: string;
}

function generatePreviewOccurrences(
  config: RecurringConfig,
  max: number
): OccurrencePreview[] {
  const {
    startDate,
    endDate,
    startTime,
    endTime,
    daysOfWeek,
    recurrenceType,
    maxOccurrences,
  } = config;

  if (!startDate || !startTime || !endTime || daysOfWeek.length === 0) {
    return [];
  }

  const start = new Date(startDate + "T00:00:00");
  if (isNaN(start.getTime())) return [];

  const hasEnd = !!endDate;
  const end = hasEnd ? new Date(endDate + "T23:59:59") : undefined;

  // Soft safety limit: don't preview beyond ~1 year from start
  const hardEnd = new Date(start.getTime());
  hardEnd.setDate(hardEnd.getDate() + 365);

  const limitDate = end && end < hardEnd ? end : hardEnd;

  const selectedDayIndexes = daysOfWeek
    .map((d) => DAY_INDEX[d] ?? -1)
    .filter((i) => i >= 0);

  const previews: OccurrencePreview[] = [];
  let current = new Date(start.getTime());

  const isEveryTwoWeeks = recurrenceType === "Every 2 weeks";
  const isMonthlyWeekday = recurrenceType === "Monthly (by weekday)";
  const isMonthlyDate = recurrenceType === "Monthly (by date)";

  const hardMax = maxOccurrences
    ? Math.min(max, Number(maxOccurrences) || max)
    : max;

  while (previews.length < hardMax && current <= limitDate) {
    const dayIdx = current.getDay();

    const matchesDay = selectedDayIndexes.includes(dayIdx);
    if (matchesDay) {
      const label = buildDateLabel(current);
      const iso = current.toISOString();
      previews.push({
        iso,
        label,
        timeRange: buildTimeRange(startTime, endTime),
      });
    }

    if (isEveryTwoWeeks) {
      current.setDate(current.getDate() + 7);
    } else if (isMonthlyWeekday || isMonthlyDate) {
      current.setDate(current.getDate() + 7);
    } else {
      current.setDate(current.getDate() + 1);
    }
  }

  return previews;
}

function buildDateLabel(d: Date): string {
  const dayName = INDEX_DAY[d.getDay()];
  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleString(undefined, { month: "short" });
  return `${dayName} ${day} ${month}`;
}

function buildTimeRange(startTime: string, endTime: string): string {
  if (!startTime || !endTime) return "";
  return `${startTime}–${endTime}`;
}

function buildPreviewSummary(
  config: RecurringConfig,
  count: number
): string {
  const { startDate, endDate, daysOfWeek, recurrenceType } = config;
  const daysLabel = daysOfWeek.join(", ");

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  const startLbl = start
    ? `${start.getDate().toString().padStart(2, "0")} ${start.toLocaleString(
        undefined,
        {
          month: "short",
        }
      )}`
    : "start";

  const endLbl = end
    ? `${end.getDate().toString().padStart(2, "0")} ${end.toLocaleString(
        undefined,
        {
          month: "short",
        }
      )}`
    : "no fixed end date";

  return `${recurrenceType} on ${daysLabel} · first ${count} sessions shown (${startLbl} to ${endLbl}).`;
}
