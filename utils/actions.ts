"use server";

import { profileSchema } from "./schemas";
import db from "./db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createProfileAction = async (prevState: any, formData: FormData) => {
  try {
    const user = await currentUser();
    console.log(user);
    if (!user) {
      throw new Error("No user found. Please log in or sign up");
    }

    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);
    // console.log(validatedFields);
    await db.profile.create({
      data: {
        clerkId: user?.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedFields,
      },
    });
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    // console.log(error);
    return {
      message: error instanceof Error ? error.message : "An error occurred.",
    };
  }
  redirect("/");
};

export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });

  return profile?.profileImage;
};
