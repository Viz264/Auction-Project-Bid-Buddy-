'use server';

import { items } from "@/db/schema";
import { database } from "@/db/database";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getSignedUrlForS3Object } from "@/lib/s3";

export async function createUploadUrlAction(key: string, type: string) {
    return await getSignedUrlForS3Object(key, type);
}

export async function createItemAction({
    fileName,
    name, 
    startingPrice,
    endDate,
}: {fileName: string, name: string, startingPrice: Number, endDate: Date}) {
    const session = await auth();

    if(!session) {
        throw new Error("Unauthorized");
    }

    const user = session.user;

    if(!user || !user.id) {
        throw new Error("Unauthorized");
    }

    await database.insert(items).values({
        name,
        startingPrice,
        fileKey: fileName,
        userId: user.id,
        endDate,
    });

    redirect("/");
}