"use server";

import { TeamCollectionWithFullRecords } from "@/_Interfaces/TeamCollections/TeamCollection";
import config from "../../../lib/cougar-config.json";
import { UUID } from "crypto";
import { SupportedImageExtension } from "@/_Types/SupportedImageExtension";
import Row from "@/components/Row";
import Col from "@/components/Col";
import PostCardMediaTile from "./PostCardMediaTile";

export interface MediaFilePreview {
    index: number,
    id: UUID,
    ext: SupportedImageExtension // This shouldn't ever need to use SupportedVideoExtension, because previews only use thumbnails,
    isImage: boolean
}

export default async function PostCardMedia(
    {
        collectionMedia
    }:
    {
        collectionMedia?: {
            collectionID: TeamCollectionWithFullRecords["id"],
            collectionFiles: TeamCollectionWithFullRecords["files"]
        }
    }
) {
    if (collectionMedia && collectionMedia.collectionFiles.length > 0) {
        const imageExtensions = config.supported_image_mimes.map(mime => mime.replace("image/", ""));

        // Only select the first up-to-five records for previewing
        const files = collectionMedia.collectionFiles.slice(0, 6);
        const remainingRecordCount = collectionMedia.collectionFiles.length - files.length;

        // Collect files as previews and assign an index
        const previews = files.map((file, index) => {
            const isImage = imageExtensions.includes(file.ext.toLowerCase());

            const preview: MediaFilePreview = {
                index,
                id: isImage ? file.id : file.thumb.id,
                ext: isImage ? file.ext as SupportedImageExtension : file.thumb.ext,
                isImage
            };

            return preview;
        }).filter(file => file !== null && file !== undefined);

        return (
            <Col className="w-full">
                <Row className="w-full">
                    <Col className="w-2/3">
                        {
                            previews[0] &&
                            <PostCardMediaTile
                                collectionID={collectionMedia.collectionID}
                                preview={previews[0]}
                                isImage={previews[0].isImage}
                                remainingRecordCount={remainingRecordCount + 1}
                                finalTile={false}
                            />
                        }
                    </Col>

                    <Col className="w-1/3">
                        {
                            previews[1] &&
                            <PostCardMediaTile
                                collectionID={collectionMedia.collectionID}
                                preview={previews[1]}
                                isImage={previews[1].isImage}
                                remainingRecordCount={remainingRecordCount + 1}
                                finalTile={false}
                            />
                        }
                        {
                            previews[2] &&
                            <PostCardMediaTile
                                collectionID={collectionMedia.collectionID}
                                preview={previews[2]}
                                isImage={previews[2].isImage}
                                remainingRecordCount={remainingRecordCount + 1}
                                finalTile={false}
                            />
                        }
                    </Col>
                </Row>

                <Row className="w-full">
                    <Col className="w-1/3">
                        {
                            previews[3] &&
                            <PostCardMediaTile
                                collectionID={collectionMedia.collectionID}
                                preview={previews[3]}
                                isImage={previews[3].isImage}
                                remainingRecordCount={remainingRecordCount + 1}
                                finalTile={false}
                            />
                        }
                        {
                            previews[4] &&
                            <PostCardMediaTile
                                collectionID={collectionMedia.collectionID}
                                preview={previews[4]}
                                isImage={previews[4].isImage}
                                remainingRecordCount={remainingRecordCount + 1}
                                finalTile={false}
                            />
                        }
                    </Col>

                    <Col className="w-2/3">
                        {
                            previews[5] &&
                            <PostCardMediaTile
                                collectionID={collectionMedia.collectionID}
                                preview={previews[5]}
                                isImage={previews[5].isImage}
                                remainingRecordCount={remainingRecordCount + 1}
                                finalTile={previews.length === 6}
                            />
                        }
                    </Col>
                </Row>
            </Col>
        );
    }
}