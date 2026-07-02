"use server";

import { PermissionLevels } from "@/_Enums/PermissionLevels";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { safeUUID } from "@/lib/crypto/crypto";
import { UUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { uploadMediaFiles } from "@/lib/utils/files/uploadMediaFiles";
import { insertPost } from "@/lib/database/posts/insertPost";
import { Post } from "@/_Interfaces/Posts/Post";
import { MediaFile } from "@/_Interfaces/Files/MediaFile";

export async function POST(request: NextRequest) {
    const { success, msg, data: user } = await signinValidation(PermissionLevels.MEM);
        
    if (!success || !user) return NextResponse.json({
        success: false,
        msg: `Only members can create posts: ${msg}`
    });

    const data = await request.formData();
    const body = data.get("body") as string;
    const files = data.getAll("media") as File[] | null;

    if (process.env.NODE_ENV === "development") console.log({ body, files });

    // Upload media
    let media: MediaFile["id"][] = [];
    if (files && files.length > 0) {
        const uploadFilesResult = await uploadMediaFiles(user.uid, files, "/user_media");

        if (!uploadFilesResult.success || !uploadFilesResult.data) return NextResponse.json(uploadFilesResult);

        media = uploadFilesResult.data.map(mediaFile => mediaFile.id);
    }

    const timestamp = Date.now();

    // Insert post
    const post: Post = {
        id: safeUUID() as UUID,
        uploader: user.uid,
        uploadedAt: timestamp,
        body,
        files: media
    };

    const insertPostResult = await insertPost(post);

    if (!insertPostResult) return NextResponse.json({
        success: false,
        msg: `Unknown error: Unable to create post!`
    });

    if (process.env.NODE_ENV === "development") console.log({ post });

    return NextResponse.json({
        success: true,
        data: post.id
    });
}