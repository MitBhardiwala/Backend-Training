import cron from "node-cron";
import { transporter } from "./smtp.config.ts";
import prisma from "./db.ts";

const SMTP_EMAIL = process.env.SMTP_USER_MAIL;

export const setupCronJobs = () => {
  const now = new Date();
  cron.schedule("* * * * *", async () => {
    console.log(`Cron job running at: ${now.toLocaleTimeString()}`);
    // Add your desired task logic here
    await sendPendingLeaveReminder();
  });
};

const sendPendingLeaveReminder = async () => {
  try {
    const pendingLeaveRequest = await prisma.leaveRequest.findMany({
      where: {
        status: "pending",
      },
      select: {
        id: true,
        RequestedTo: {
          select: {
            email: true,
          },
        },
        RequestedBy: {
          select: {
            email: true,
          },
        },
      },
    });

    // console.log(sendPendingLeaveReminder);
    //sample above query output:
    //     [
    //   {
    //     id: 15,
    //     RequestedTo: { email: 'faculty1@gmail.com' },
    //     RequestedBy: { email: 'student5@gmail.com' }
    //   },
    //   {
    //     id: 17,
    //     RequestedTo: { email: 'faculty1@gmail.com' },
    //     RequestedBy: { email: 'student1@gmail.com' }
    //   },
    // ]

    const facultyEmails = pendingLeaveRequest.map(
      (leave) => leave.RequestedTo.email
    );
    const uniqueFacultyList = [...new Set(facultyEmails)];
    uniqueFacultyList.map(async (email) => {
      await transporter.sendMail({
        from: SMTP_EMAIL,
        to: email,
        subject: "Pending leave request",
        html: `<p>You have pending leave request. Please update the leave status.</p>`,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
