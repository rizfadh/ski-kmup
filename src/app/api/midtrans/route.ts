import db from "@/lib/db";
import crypto from "crypto";
import { parse } from "date-fns";

type verifySignatureType = {
  orderId: any;
  statusCode: string;
  grossAmount: string;
  signatureKey: string;
};

const verifySignature = ({
  orderId,
  statusCode,
  grossAmount,
  signatureKey,
}: verifySignatureType) => {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const key = orderId + statusCode + grossAmount + serverKey;
  const hash = crypto.createHash("sha512").update(key).digest("hex");

  return hash === signatureKey;
};

export async function POST(req: Request) {
  try {
    const {
      transaction_time,
      transaction_status,
      transaction_id,
      status_code,
      signature_key,
      payment_type,
      order_id,
      gross_amount,
      fraud_status,
    } = await req.json();

    const verify = verifySignature({
      orderId: order_id,
      statusCode: status_code,
      grossAmount: gross_amount,
      signatureKey: signature_key,
    });

    if (!verify) return new Response("Invalid signature", { status: 400 });

    let status = "Inisialisasi";

    if (transaction_status == "capture") {
      if (fraud_status == "accept") {
        status = "Sukses";
      }
    } else if (transaction_status == "settlement") {
      status = "Sukses";
    } else if (
      transaction_status == "cancel" ||
      transaction_status == "deny" ||
      transaction_status == "expire"
    ) {
      status = "Gagal";
    } else if (transaction_status == "pending") {
      status = "Pending";
    }

    const amount = parseInt(gross_amount);
    const time = parse(transaction_time, "yyyy-MM-dd HH:mm:ss", new Date());
    const paid = status === "Sukses" ? true : false;

    const cashHistory = await db.cashPaymentHistory.findUnique({
      where: {
        id: transaction_id,
      },
      select: {
        id: true,
      },
    });

    if (!cashHistory) {
      await db.cashPaymentHistory.create({
        data: {
          id: transaction_id,
          paymentId: order_id,
          status,
          paymentType: payment_type,
          amount,
          time,
        },
      });

      return new Response("Success", { status: 200 });
    }

    await db.cashPaymentHistory.update({
      where: {
        id: transaction_id,
      },
      data: {
        status,
        paymentType: payment_type,
        amount,
        time,
        cashPayment: {
          update: {
            paid,
          },
        },
      },
    });

    return new Response("Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
