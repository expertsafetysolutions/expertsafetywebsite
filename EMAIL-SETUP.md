# Enquiry Email Setup

The Contact page and every product/service enquiry form send their
submissions through `/api/enquiry`, which emails them via
[Resend](https://resend.com). Until this is configured, enquiries are only
logged on the server and won't reach an inbox — follow the steps below to
turn that on.

## 1. Create a Resend account and API key

1. Sign up at [resend.com](https://resend.com) (free tier: 3,000 emails/month,
   no card required).
2. Go to **API Keys** and create a new key.

## 2. Add the environment variable

**Local development:** copy `.env.local.example` to `.env.local` and paste
the key in as `RESEND_API_KEY`.

**Production (Vercel):** go to your project → **Settings → Environment
Variables** and add:

| Name | Value |
|---|---|
| `RESEND_API_KEY` | the key from step 1 |
| `ENQUIRY_TO_EMAIL` | the inbox that should receive enquiries (e.g. `expertsafetysolution@gmail.com`) |

Redeploy after adding environment variables — Vercel doesn't apply them to
already-running deployments.

## 3. (Optional, recommended before launch) Verify your own domain

By default, enquiry emails are sent from Resend's shared test address
(`onboarding@resend.dev`), which works immediately but looks unfamiliar to
recipients. Once the final domain is live:

1. In Resend, go to **Domains** → **Add Domain** and follow the DNS records
   they give you (added wherever the domain's DNS is managed).
2. Once verified, set `ENQUIRY_FROM_EMAIL` to an address on that domain, e.g.
   `enquiries@expertsafety.in`.

## Testing it

Submit the form on `/contact` (or any product/service page). If
`RESEND_API_KEY` is set correctly, the enquiry arrives by email within a few
seconds. If something's misconfigured, the request still succeeds for the
visitor (the form always shows "Enquiry received") but the server log will
show `[enquiry] email send failed, logging instead:` with the reason —
check your hosting provider's function logs.
