import { site } from "@/lib/site";
import { ZoomableImage } from "./ZoomableImage";

/**
 * Bank transfer details for clients paying by NEFT/RTGS/UPI: a full-width
 * details table, then the cancelled cheque and UPI QR side by side (70/30 —
 * the cheque needs the width to stay legible, the QR just needs to be
 * scannable). Both images tap-to-zoom via <ZoomableImage>.
 */
export function BankDetailsCard() {
  const { bankDetails } = site;

  const rows: { label: string; value: string; mono?: boolean }[] = [
    { label: "Bank", value: bankDetails.bankName },
    { label: "Account Name", value: bankDetails.accountName },
    { label: "Account Number", value: bankDetails.accountNumber, mono: true },
    { label: "IFSC Code", value: bankDetails.ifsc, mono: true },
    { label: "Branch", value: bankDetails.branch },
  ];

  return (
    <div className="rounded-lg border border-paper-300 bg-white p-6 shadow-card">
      <h2 className="font-display text-lg font-bold text-ink-900">
        Bank Details for Payment
      </h2>
      <p className="mt-1 text-xs text-steel">
        For NEFT / RTGS / UPI transfers against a confirmed order or invoice.
      </p>

      <dl className="mt-5 divide-y divide-paper-300 overflow-hidden rounded border border-paper-300">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-4 px-3.5 py-2.5 text-sm">
            <dt className="text-steel">{row.label}</dt>
            <dd
              className={
                row.mono
                  ? "text-right font-mono font-medium text-ink-900"
                  : "text-right font-medium text-ink-900"
              }
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid grid-cols-10 gap-4 border-t border-paper-300 pt-5">
        <div className="col-span-7">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wide text-steel">
            Cancelled cheque (for NEFT/RTGS account verification)
          </p>
          <ZoomableImage
            src={bankDetails.cancelledChequeImage}
            alt={`Cancelled cheque for ${site.name}'s ${bankDetails.bankName} account, marked CANCELLED`}
            width={1100}
            height={511}
            containerClassName="overflow-hidden rounded border border-paper-300"
            className="h-auto w-full"
          />
        </div>
        <div className="col-span-3">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wide text-steel">
            Scan to pay
          </p>
          <ZoomableImage
            src={bankDetails.qrCodeImage}
            alt={`UPI QR code to pay ${site.name}`}
            width={200}
            height={200}
            containerClassName="overflow-hidden rounded border border-paper-300"
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
