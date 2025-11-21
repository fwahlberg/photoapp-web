import { fetchJSON } from "@/lib/api";

type Client = {
  id: number;
  name: string;
  email?: string | null;
  portalToken: string;
};

async function getClients(): Promise<Client[]> {
  return fetchJSON<Client[]>("/clients");
}

async function createClient(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim() || undefined;
  if (!name) return;

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`, {
    method: "POST",
    body: JSON.stringify({ name, email }),
    headers: { "Content-Type": "application/json" },
  });
}

export default async function AdminPage() {
  const clients = await getClients();

  const totalClients = clients.length;
  const activePortals = clients.length; // later: filter by status
  const invoicesOutstanding = 0; // placeholder for future wiring

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top nav */}
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
                Admin dashboard · internal view
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <button className="rounded-full border border-slate-700 px-3 py-1 text-slate-300 hover:border-slate-500 hover:text-slate-100">
              Settings
            </button>
            <div className="h-8 w-px bg-slate-800" />
            <span className="text-slate-400">Felix</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8">
        {/* Page title + description */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Client overview
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Create new venue/client accounts and jump straight into their
            portals. More controls (shoots, galleries, invoices) will plug in
            here as we build them.
          </p>
        </div>

        {/* Stats cards */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Total clients
              </span>
            </div>
            <p className="mt-3 text-3xl font-semibold">{totalClients}</p>
            <p className="mt-1 text-xs text-slate-500">
              Unique venues or clients in the system.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Active portals
              </span>
            </div>
            <p className="mt-3 text-3xl font-semibold">{activePortals}</p>
            <p className="mt-1 text-xs text-slate-500">
              Portals currently shareable with clients.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Invoices outstanding
              </span>
            </div>
            <p className="mt-3 text-3xl font-semibold">
              £{invoicesOutstanding.toFixed(0)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Placeholder — will pull from invoice data later.
            </p>
          </div>
        </section>

        {/* Main grid: create + list */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
          {/* Create client card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h2 className="text-lg font-semibold tracking-tight">
              Create new client
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Typically a venue, promoter, or private client. You can share
              their portal link as soon as they’re created.
            </p>

            <form action={createClient} className="mt-5 space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">
                  Client name
                </label>
                <input
                  name="name"
                  placeholder="e.g. Salvation York"
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">
                  Email (optional)
                </label>
                <input
                  name="email"
                  placeholder="client@venue.co.uk"
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none"
                />
                <p className="text-[10px] text-slate-500">
                  Used later for automated emails, invoices, and portal access
                  reminders.
                </p>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-slate-200"
              >
                + Create client
              </button>
            </form>
          </div>

          {/* Clients table / list */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Clients
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Quick access to all client portals. Search and filtering will
                  live here soon.
                </p>
              </div>
              {/* Placeholder search input (not wired yet) */}
              <div className="hidden items-center rounded-md border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 sm:flex">
                <span className="mr-2 text-slate-500">🔍</span>
                <span className="text-slate-500">Search (coming soon)</span>
              </div>
            </div>

            {clients.length === 0 ? (
              <p className="text-sm text-slate-400">
                No clients yet. Create your first one on the left.
              </p>
            ) : (
              <div className="overflow-hidden rounded-xl border border-slate-800">
                <table className="min-w-full border-separate border-spacing-0 text-sm">
                  <thead className="bg-slate-950/80">
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="border-b border-slate-800 px-4 py-2 text-left">
                        Client
                      </th>
                      <th className="border-b border-slate-800 px-4 py-2 text-left">
                        Email
                      </th>
                      <th className="border-b border-slate-800 px-4 py-2 text-right">
                        Portal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-900/60">
                    {clients.map((client, idx) => (
                      <tr
                        key={client.id}
                        className={
                          idx % 2 === 0
                            ? "border-t border-slate-800/80"
                            : "border-t border-slate-800/80 bg-slate-900/80"
                        }
                      >
                        <td className="px-4 py-3 align-middle">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-50">
                              {client.name}
                            </span>
                            <span className="text-[10px] uppercase tracking-wide text-slate-500">
                              Client ID: {client.id}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 align-middle">
                          {client.email ? (
                            <span className="text-xs text-slate-300 break-all">
                              {client.email}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500">
                              No email set
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right align-middle">
                          <a
                            href={`/portal/${client.portalToken}`}
                            className="text-xs font-semibold text-sky-400 hover:text-sky-300 hover:underline"
                          >
                            Open portal →
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* Footer note */}
        <footer className="mt-4 border-t border-slate-900 pt-4 text-[11px] text-slate-500">
          Roadmap: add shoots, galleries, and invoice management here, with
          per-client stats and filters.
        </footer>
      </main>
    </div>
  );
}
