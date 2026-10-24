import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    console.log(`[Sending OTP] Email: ${email}`);

    const { data, error } = await resend.emails.send({
      from: 'HebronPrep <onboarding@resend.dev>',
      to: [email],
      subject: 'Your 6-Digit HebronPrep Verification Code',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1A365D;">
          <h2>Welcome to HebronPrep 🧬</h2>
          <p>Your 6-digit email verification code is:</p>
          <h1 style="background: #f1f5f9; padding: 12px; text-align: center; font-family: monospace; letter-spacing: 6px; color: #1A365D; border-radius: 8px;">${otp}</h1>
          <p style="font-size: 12px; color: #64748b;">This code expires shortly.</p>
        </div>
      `,
    });

    if (error) {
      console.error('[Resend Error]:', error);
      return NextResponse.json({ success: false, error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('[Server Error]:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}