import { google } from "googleapis";

export interface LeadRow {
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
}

export async function appendLeadRow(row: LeadRow): Promise<boolean> {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  const saEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const saKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!sheetId || !saEmail || !saKey) {
    throw new Error("Google Sheets env vars not configured");
  }
  const auth = new google.auth.JWT({
    email: saEmail,
    key: saKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Leads!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[row.submittedAt, row.name, row.email, row.phone, row.message]],
    },
  });
  return true;
}
