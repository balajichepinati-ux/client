import nodemailer from 'nodemailer';

export const sendNotificationEmail = async (subject: string, htmlContent: string) => {
  try {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notificationRecipient = process.env.NOTIFICATION_RECIPIENT || 'praveenrajgandham@gmail.com';

    // 1. Fallback to console logs if SMTP details are missing
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.log('\n✉️ --- SIMULATED OUTBOX EMAIL ALERT ---');
      console.log(`To: ${notificationRecipient}`);
      console.log(`Subject: ${subject}`);
      console.log('Content (HTML Body preview):');
      console.log(htmlContent.replace(/<[^>]*>/g, ' ').substring(0, 300) + '...');
      console.log('-------------------------------------\n');
      return true;
    }

    // 2. Real SMTP Client setup
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"ZERO ERROR IT Notification" <${smtpUser}>`,
      to: notificationRecipient,
      subject: subject,
      html: htmlContent,
    });

    console.log(`✉️ Email notification successfully sent to ${notificationRecipient}`);
    return true;
  } catch (error) {
    console.error('Failed sending email notification:', error);
    return false;
  }
};
