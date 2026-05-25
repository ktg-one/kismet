import "server-only";
import { google } from "googleapis";
import { getLeadSheetsEnv } from "@/lib/env";

export interface LeadRow {
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
}

export async function appendLeadRow(row: LeadRow): Promise<boolean> {
  const { googleSheetsId, googleServiceAccountEmail, googleServiceAccountKey } = getLeadSheetsEnv();

  const auth = new google.auth.JWT({
    email: googleServiceAccountEmail,
    // GOOGLE_SERVICE_ACCOUNT_KEY is stored as a single line with literal \n sequences.
    // Replace them with real newlines for the Google JWT library.
    key: googleServiceAccountKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: googleSheetsId,
    range: "Leads!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[row.submittedAt, row.name, row.email, row.phone, row.message]],
    },
  });
  return true;
}
