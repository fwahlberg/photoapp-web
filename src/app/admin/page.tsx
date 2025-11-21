import { fetchJSON } from "@/lib/api";

type Client = {
  id: number;
  name: string;
  email?: string | null;
  portalToken: string;
};

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

async function getClients(): Promise<Client[]> {
  return fetchJSON<Client[]>("/clients");
}

export default async function AdminPage() {
  const clients = await getClients();

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-6">
      <section className="rounded-xl border p-4">
        <h1 className="mb-4 text-2xl font-semibold">Admin – Clients</h1>
        <form action={createClient} className="space-y-3">
          <div className="flex gap-3">
            <input
              name="name"
              placeholder="Client name"
              className="flex-1 rounded border px-3 py-2"
              required
            />
            <input
              name="email"
              placeholder="Email (optional)"
              className="flex-1 rounded border px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-black px-4 py-2 text-sm font-medium text-white"
          >
            Create client
          </button>
        </form>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="mb-4 text-xl font-semibold">Existing clients</h2>
        <ul className="space-y-2 text-sm">
          {clients.map((client) => (
            <li
              key={client.id}
              className="flex items-center justify-between rounded border px-3 py-2"
            >
              <div>
                <div className="font-medium">{client.name}</div>
                {client.email && (
                  <div className="text-xs text-gray-500">{client.email}</div>
                )}
              </div>
              <a
                href={`/portal/${client.portalToken}`}
                className="text-xs text-blue-600 underline"
              >
                Open portal
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
