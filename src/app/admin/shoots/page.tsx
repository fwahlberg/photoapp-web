// src/app/admin/shoots/page.tsx

type Client = {
  id: number;
  name: string;
};

type Shoot = {
  id: number;
  clientName: string;
  date: string;
  timeRange: string;
  type: string;
  location: string;
  status: "Scheduled" | "Confirmed" | "Delivered";
};

// Temporary mock data – will be replaced with real API data later
const mockClients: Client[] = [
  { id: 1, name: "Salvation York" },
  { id: 2, name: "Flares York" },
  { id: 3, name: "Ziggy’s" },
  { id: 4, name: "Private – Smith Wedding" },
];

const mockShoots: Shoot[] = [
  {
    id: 1,
    clientName: "Salvation York",
    date: "Fri 22 Nov",
    timeRange: "22:30 – 02:00",
    type: "Nightclub",
    location: "Salvation",
    status: "Confirmed",
  },
  {
    id: 2,
    clientName: "Flares York",
    date: "Sat 23 Nov",
    timeRange: "21:00 – 01:00",
    type: "Nightclub",
    location: "Flares",
    status: "Scheduled",
  },
  {
    id: 3,
    clientName: "Private – Smith Wedding",
    date: "Sun 24 Nov",
    timeRange: "12:00 – 20:00",
    type: "Wedding",
    location: "York Barn",
    status: "Scheduled",
  },
];

export default function ShootSchedulingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top nav (matches admin dashboard vibe) */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-900">
              FP
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">
                Photo Portal
              </div>
              <p className="text-xs text-slate-400">
                Shoot scheduling · internal view
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a href="/admin" className="hover:text-slate-100">
              Clients
            </a>
            <span className="text-slate-600">·</span>
            <span className="text-slate-100 font-medium">Shoots</span>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8">
        {/* Heading */}
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Schedule shoots
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Plan upcoming work across venues, weddings and events. This page
              will eventually sync with the backend calendar and invoices.
            </p>
          </div>

          {/* Fake filter controls – not wired yet */}
          <div className="flex gap-2 text-xs">
            <button className="rounded-md border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-300 hover:border-slate-600 hover:text-slate-50">
              This week
            </button>
            <button className="rounded-md border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-300 hover:border-slate-600 hover:text-slate-50">
              This month
            </button>
          </div>
        </div>

        {/* Grid: form + upcoming list */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)]">
          {/* Schedule form (purely UI for now) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h2 className="text-lg font-semibold tracking-tight">
              New shoot booking
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              This form isn&apos;t wired up yet – treat it as the blueprint for
              the real scheduler. We&apos;ll hook it into the Nest API next.
            </p>

            <form className="mt-5 space-y-4">
              {/* Client */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">
                  Client / venue
                </label>
                <select
                  name="clientId"
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 focus:border-slate-400 focus:outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select client…
                  </option>
                  {mockClients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date and time */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 focus:border-slate-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-300">
                      Start
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 focus:border-slate-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-300">
                      End
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 focus:border-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Type + location */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300">
                    Shoot type
                  </label>
                  <select
                    name="type"
                    className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 focus:border-slate-400 focus:outline-none"
                    defaultValue="Nightclub"
                  >
                    <option>Nightclub</option>
                    <option>Bar / promo</option>
                    <option>Wedding</option>
                    <option>Corporate</option>
                    <option>Portraits</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300">
                    Location
                  </label>
                  <input
                    name="location"
                    placeholder="e.g. Salvation, York Barn…"
                    className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">
                  Notes / brief (optional)
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Key timings, must-have shots, dress code, contact on the night…"
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none"
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 text-xs">
                <p className="text-[11px] text-slate-500">
                  When wired up, this will create a shoot, attach it to the
                  client, and show it in their portal automatically.
                </p>
                <button
                  type="button"
                  className="cursor-not-allowed rounded-md bg-slate-700 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-200 opacity-60"
                  title="Backend wiring coming soon"
                >
                  Save (coming soon)
                </button>
              </div>
            </form>
          </div>

          {/* Upcoming shoots */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Upcoming shoots
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Mock data for now. Once connected, this will pull from the
                  real shoot table and support filters, status and exports.
                </p>
              </div>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-slate-300">
                {mockShoots.length} scheduled
              </span>
            </div>

            <div className="space-y-3">
              {mockShoots.map((shoot) => (
                <div
                  key={shoot.id}
                  className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-wide text-slate-500">
                      {shoot.date} · {shoot.timeRange}
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-50">
                      {shoot.clientName}
                    </div>
                    <div className="text-xs text-slate-400">
                      {shoot.type} · {shoot.location}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1 md:pt-0">
                    <span
                      className={
                        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium " +
                        (shoot.status === "Confirmed"
                          ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                          : shoot.status === "Delivered"
                          ? "bg-sky-500/10 text-sky-300 border border-sky-500/40"
                          : "bg-amber-500/10 text-amber-300 border border-amber-500/40")
                      }
                    >
                      {shoot.status}
                    </span>
                    <button className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-[11px] text-slate-200 hover:border-slate-500">
                      View (future)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-4 border-t border-slate-900 pt-4 text-[11px] text-slate-500">
          Roadmap for this page: connect to Nest endpoints, add per-photographer
          assignments, and calendar / iCal exports.
        </footer>
      </main>
    </div>
  );
}
