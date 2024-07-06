import db from "@/lib/db";
import crypto from "crypto";

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
      transaction_status,
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

    let status = "Init";

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

    const paid = status === "Sukses" ? true : false;

    await db.cashPaymentHistory.update({
      where: {
        id: order_id,
      },
      data: {
        status,
        paymentType: payment_type,
        cashPayment: {
          update: {
            paid,
          },
        },
      },
    });

    return new Response("Success", { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Error", { status: 500 });
  }
}
