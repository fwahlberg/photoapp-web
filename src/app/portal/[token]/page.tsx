import { fetchJSON } from "@/lib/api";
import { notFound } from "next/navigation";
//Testing
type Shoot = {
  id: number;
  title: string;
  date: string;
  location?: string | null;
};

type Gallery = {
  id: number;
  title: string;
  delivered: boolean;
  url?: string | null;
};

type ClientPortal = {
  id: number;
  name: string;
  protectionLevel: "NONE" | "PARTIAL" | "FULL";
  shoots: Shoot[];
  galleries: Gallery[];
};

async function getPortal(token: string): Promise<ClientPortal | null> {
  try {
    return await fetchJSON<ClientPortal>(`/portal/${token}`);
  } catch (_err) {
    return null;
  }
}

export default async function PortalPage(props: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await props.params;

  const client = await getPortal(token);

  if (!client) return notFound();

  const isPartial = client.protectionLevel === "PARTIAL";

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">
          {client.name}&apos;s Client Portal
        </h1>
        {isPartial && (
          <p className="text-sm text-gray-500">
            This link gives limited, view-only access. For invoices or changes
            to bookings, contact your photographer directly.
          </p>
        )}
      </header>

      <section className="rounded-xl border p-4">
        <h2 className="mb-3 text-lg font-semibold">Upcoming shoots</h2>
        {client.shoots.length === 0 ? (
          <p className="text-sm text-gray-500">
            No upcoming shoots are currently scheduled.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b text-xs uppercase text-gray-500">
              <tr>
                <th className="py-2">Title</th>
                <th className="py-2">Date</th>
                <th className="py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {client.shoots.map((shoot) => (
                <tr key={shoot.id} className="border-b last:border-0">
                  <td className="py-2">{shoot.title}</td>
                  <td className="py-2">
                    {new Date(shoot.date).toLocaleString("en-GB", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="py-2">{shoot.location || "TBC"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="mb-3 text-lg font-semibold">Galleries</h2>
        {client.galleries.length === 0 ? (
          <p className="text-sm text-gray-500">
            No galleries have been delivered yet.
          </p>
        ) : (
          <ul className="space-y-2 text-sm">
            {client.galleries.map((gallery) => (
              <li
                key={gallery.id}
                className="flex items-center justify-between rounded border px-3 py-2"
              >
                <div>
                  <div className="font-medium">{gallery.title}</div>
                  <div className="text-xs text-gray-500">
                    {gallery.delivered ? "Delivered" : "Processing"}
                  </div>
                </div>
                {gallery.url && (
                  <a
                    href={gallery.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 underline"
                  >
                    Open
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
