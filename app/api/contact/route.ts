import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

import { google } from "googleapis";

const SHEET_ID =
  process.env.GOOGLE_SHEET_ID!;

const auth =
  new google.auth.GoogleAuth({
    credentials: {
      client_email:
        process.env.GOOGLE_CLIENT_EMAIL,

      private_key:
        process.env.GOOGLE_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        ),
    },

    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      mobile,
      category,
      message,
    } = body;

    // GOOGLE SHEETS
    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    await sheets.spreadsheets.values.append(
      {
        spreadsheetId: SHEET_ID,

        range: "Sheet1!A:F",

        valueInputOption:
          "USER_ENTERED",

        requestBody: {
          values: [
            [
              new Date().toLocaleString(
                "en-IN",
                {
                  timeZone:
                    "Asia/Kolkata",
                }
              ),

              name,

              mobile,

              email,

              category,

              message,
            ],
          ],
        },
      }
    );

    // EMAIL
    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        auth: {
          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS,
        },
      });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: "meanttobe.orginals@gmail.com",

      subject:
        "New Contact Form Submission",

      html: `
        <h2>New Contact Form Entry</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Mobile:</strong> ${mobile}</p>

        <p><strong>Category:</strong> ${category}</p>

        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}