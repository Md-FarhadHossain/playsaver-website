import { getAllUninstallFeedback } from "@/lib/db";
import { MessageSquare, BarChart } from "lucide-react";
import { format } from "date-fns";

export default async function AdminFeedback() {
  const feedback = await getAllUninstallFeedback();
  
  // Calculate stats
  const totalFeedback = feedback.length;
  const reasonCounts = feedback.reduce((acc, curr) => {
    acc[curr.reason] = (acc[curr.reason] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const REASON_LABELS: Record<string, string> = {
    "broken": "Broken / Not tracking",
    "distracting": "Pop-up annoying",
    "not-useful": "Not useful",
    "buggy": "Bugs / Glitches",
    "slowed-down": "Slowed browser",
    "other": "Other",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Uninstall Feedback</h1>
        <p className="text-muted-foreground mt-1">Review reasons why users uninstalled the extension.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-violet-500/10 text-violet-500 rounded-full">
              <BarChart size={24} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Total Feedback</p>
              <p className="text-3xl font-bold text-foreground">{totalFeedback}</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm col-span-1 md:col-span-2">
          <p className="text-sm font-semibold mb-3">Top Reasons</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.entries(reasonCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([key, count]) => (
              <div key={key} className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                <span className="text-xs font-medium truncate mr-2" title={REASON_LABELS[key] || key}>
                  {REASON_LABELS[key] || key}
                </span>
                <span className="text-sm font-bold bg-background px-2 py-0.5 rounded-md border border-border">
                  {count}
                </span>
              </div>
            ))}
            {totalFeedback === 0 && (
              <p className="text-sm text-muted-foreground italic col-span-3">No data yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {feedback.length === 0 ? (
          <div className="p-10 text-center flex flex-col items-center">
            <div className="bg-muted p-4 rounded-full mb-4">
              <MessageSquare size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No feedback yet</h3>
            <p className="text-muted-foreground max-w-sm mt-2">When users uninstall the extension and fill out the form, their responses will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-medium w-48">Date</th>
                  <th className="px-6 py-4 font-medium w-48">Reason</th>
                  <th className="px-6 py-4 font-medium">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {feedback.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-muted-foreground">
                      {format(new Date(item.created_at), 'MMM d, yyyy h:mm a')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-violet-500/10 text-violet-600 px-2.5 py-1 text-xs font-semibold border border-violet-500/20">
                        {REASON_LABELS[item.reason] || item.reason}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-foreground max-w-md truncate" title={item.details || ""}>
                        {item.details ? (
                          <span className="flex items-center gap-2">
                            <span className="text-muted-foreground">"</span>
                            {item.details}
                            <span className="text-muted-foreground">"</span>
                          </span>
                        ) : (
                          <span className="text-muted-foreground italic">No additional details</span>
                        )}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
