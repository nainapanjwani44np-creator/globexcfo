// cronJobs.js — scheduled tasks
const cron = require('node-cron');
const nodemailer = require('nodemailer');

// ─── Email transporter ────────────────────────────────────────────────────────
// Supports Gmail (with App Password) or any SMTP provider
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

// ─── Generate CSV from submissions ───────────────────────────────────────────
function generateCSV(submissions) {
  const headers = ['#', 'Name', 'Company', 'Email', 'Phone', 'Services', 'Message', 'Submitted At'];

  const rows = submissions.map((sub, index) => {
    const date = sub.submittedAt
      ? new Date(sub.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      : new Date(parseInt(sub._id.toString().substring(0, 8), 16) * 1000)
          .toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    return [
      index + 1,
      (sub.name || '').replace(/"/g, '""'),
      (sub.companyName || '').replace(/"/g, '""'),
      (sub.email || '').replace(/"/g, '""'),
      (sub.contactNumber || '').replace(/"/g, '""'),
      ((sub.selectedOptions || []).join(' | ')).replace(/"/g, '""'),
      (sub.userMessage || '').replace(/\n/g, ' ').replace(/"/g, '""'),
      date
    ];
  });

  return [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
}

// ─── Send email with CSV attachment ──────────────────────────────────────────
async function sendSubmissionsEmail(db, collectionName) {
  const REPORT_EMAIL = process.env.REPORT_EMAIL;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;

  if (!REPORT_EMAIL || !SMTP_USER || !SMTP_PASS) {
    console.log(`[${new Date().toISOString()}] ⚠️  Cron: Email env vars not set — skipping report`);
    return;
  }

  try {
    // Fetch last 12 hours of submissions
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);

    const submissions = await db.collection(collectionName).find({
      $or: [
        { submittedAt: { $gte: twelveHoursAgo } },
        // fallback for older docs without submittedAt — use ObjectId timestamp
        {
          _id: {
            $gte: require('mongodb').ObjectId.createFromTime(
              Math.floor(twelveHoursAgo.getTime() / 1000)
            )
          }
        }
      ]
    }).sort({ _id: -1 }).toArray();

    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    if (submissions.length === 0) {
      console.log(`[${new Date().toISOString()}] 📭 Cron: No new submissions in last 12 hours — no email sent`);
      return;
    }

    const csvContent = generateCSV(submissions);
    const filename = `globexcfo-submissions-${new Date().toISOString().slice(0, 10)}.csv`;

    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"GlobexCFO Admin" <${SMTP_USER}>`,
      to: REPORT_EMAIL,
      subject: `GlobexCFO: ${submissions.length} New Submission(s) — Last 12 Hours (${now})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a365d; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">GlobexCFO Admin Report</h1>
            <p style="color: #90cdf4; margin: 8px 0 0;">Last 12 Hours Summary</p>
          </div>
          <div style="background: #f7fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #2d3748; margin: 0 0 16px;">
              <strong>${submissions.length}</strong> new form submission(s) received in the last 12 hours.
            </p>
            <p style="color: #718096; font-size: 14px; margin: 0;">
              The full details are attached as a CSV file which can be opened in Excel or Google Sheets.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead>
                <tr style="background: #edf2f7;">
                  <th style="padding: 8px 12px; text-align: left; color: #4a5568;">Name</th>
                  <th style="padding: 8px 12px; text-align: left; color: #4a5568;">Email</th>
                  <th style="padding: 8px 12px; text-align: left; color: #4a5568;">Company</th>
                </tr>
              </thead>
              <tbody>
                ${submissions.map((s, i) => `
                  <tr style="background: ${i % 2 === 0 ? 'white' : '#f7fafc'};">
                    <td style="padding: 8px 12px; color: #2d3748;">${s.name || '-'}</td>
                    <td style="padding: 8px 12px; color: #2d3748;">${s.email || '-'}</td>
                    <td style="padding: 8px 12px; color: #2d3748;">${s.companyName || '-'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #a0aec0; font-size: 12px; margin: 0;">
              This is an automated report from GlobexCFO website. Report generated at ${now} IST.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename,
          content: csvContent,
          contentType: 'text/csv'
        }
      ]
    });

    console.log(`[${new Date().toISOString()}] ✅ Cron: Email sent to ${REPORT_EMAIL} with ${submissions.length} submissions`);

  } catch (error) {
    console.error(`[${new Date().toISOString()}] ❌ Cron: Failed to send email:`, error.message);
  }
}

// ─── Register cron jobs ───────────────────────────────────────────────────────
function startCronJobs(db, collectionName) {
  // Run every 12 hours at 8:00 AM and 8:00 PM IST (2:30 UTC and 14:30 UTC)
  cron.schedule('30 2,14 * * *', () => {
    console.log(`[${new Date().toISOString()}] ⏰ Cron: Running 12-hour submissions report...`);
    sendSubmissionsEmail(db, collectionName);
  }, {
    timezone: 'UTC'
  });

  console.log(`[${new Date().toISOString()}] ✅ Cron jobs registered — reports will run at 8:00 AM and 8:00 PM IST`);
}

module.exports = { startCronJobs };
