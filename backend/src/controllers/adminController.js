import mongoose from "mongoose";
import ContactMessage from "../models/ContactMessage.js";
import Donation from "../models/Donation.js";
import HttpError from "../utils/HttpError.js";
import NewsletterSubscription from "../models/NewsletterSubscription.js";

export async function getDashboardSummary(_request, response, next) {
  try {
    const [
      newMessages,
      totalMessages,
      pendingDonations,
      successfulDonations,
      latestMessages,
    ] = await Promise.all([
      ContactMessage.countDocuments({ adminStatus: "new" }),
      ContactMessage.countDocuments(),
      Donation.countDocuments({ status: "pending" }),
      Donation.aggregate([
        { $match: { status: "success" } },
        {
          $group: {
            _id: "$currency",
            count: { $sum: 1 },
            amount: { $sum: "$amount" },
          },
        },
      ]),
      ContactMessage.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email subject adminStatus createdAt")
        .lean(),
    ]);
    response.json({
      stats: {
        newMessages,
        totalMessages,
        pendingDonations,
        successfulDonations: successfulDonations.reduce(
          (sum, item) => sum + item.count,
          0,
        ),
        donatedByCurrency: successfulDonations.map(
          ({ _id: currency, count, amount }) => ({ currency, count, amount }),
        ),
      },
      latestMessages: latestMessages.map(({ _id, ...item }) => ({
        id: String(_id),
        ...item,
      })),
    });
  } catch (error) {
    next(error);
  }
}

export async function listMessages(request, response, next) {
  try {
    const filter = {};
    if (["new", "replied", "archived"].includes(request.query.status))
      filter.adminStatus = request.query.status;
    const messages = await ContactMessage.find(filter)
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    response.json({
      items: messages.map(({ _id, ...item }) => ({ id: String(_id), ...item })),
    });
  } catch (error) {
    next(error);
  }
}

export async function updateMessageStatus(request, response, next) {
  const { status } = request.body || {};
  if (!["new", "replied", "archived"].includes(status))
    return next(new HttpError(400, "Choose a valid enquiry status."));
  try {
    if (!mongoose.isValidObjectId(request.params.id))
      throw new HttpError(404, "Enquiry not found.");
    const message = await ContactMessage.findByIdAndUpdate(
      request.params.id,
      { adminStatus: status },
      { new: true },
    ).lean();
    if (!message) throw new HttpError(404, "Enquiry not found.");
    const { _id, ...item } = message;
    response.json({ item: { id: String(_id), ...item } });
  } catch (error) {
    next(error);
  }
}

export async function deleteMessage(request, response, next) {
  try {
    if (!mongoose.isValidObjectId(request.params.id))
      throw new HttpError(404, "Enquiry not found.");
    const deleted = await ContactMessage.findByIdAndDelete(request.params.id);
    if (!deleted) throw new HttpError(404, "Enquiry not found.");
    response.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function listNewsletterSubscribers(request, response, next) {
  try {
    const filter = {};
    if (request.query.status === "active") filter.active = true;
    if (request.query.status === "unsubscribed") filter.active = false;
    const [items, activeCount, unsubscribedCount] = await Promise.all([
      NewsletterSubscription.find(filter)
        .sort({ subscribedAt: -1 })
        .limit(1000)
        .lean(),
      NewsletterSubscription.countDocuments({ active: true }),
      NewsletterSubscription.countDocuments({ active: false }),
    ]);

    response.json({
      items: items.map(({ _id, __v, ...item }) => ({
        id: String(_id),
        ...item,
      })),
      counts: { active: activeCount, unsubscribed: unsubscribedCount },
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteNewsletterSubscriber(request, response, next) {
  try {
    if (!mongoose.isValidObjectId(request.params.id))
      throw new HttpError(404, "Subscriber not found.");
    const deleted = await NewsletterSubscription.findByIdAndDelete(
      request.params.id,
    );
    if (!deleted) throw new HttpError(404, "Subscriber not found.");
    response.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function listDonations(request, response, next) {
  try {
    const filter = {};
    if (["pending", "success", "failed"].includes(request.query.status))
      filter.status = request.query.status;
    const donations = await Donation.find(filter)
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    response.json({
      items: donations.map(({ _id, ...item }) => ({
        id: String(_id),
        ...item,
      })),
    });
  } catch (error) {
    next(error);
  }
}
