"use server";

import { PermissionLevels } from "@/_Enums/PermissionLevels";
import { TeamCollectionWithFullRecords } from "@/_Interfaces/TeamCollections/TeamCollection";
import { User } from "@/_Interfaces/Users/User";
import Col from "@/components/Col";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import PostCardMedia from "@/components/Posts/Media/PostCardMedia";
import PostCard from "@/components/Posts/PostCard";
import PostCardBody from "@/components/Posts/PostCardBody";
import PostCardHeader from "@/components/Posts/PostCardHeader";
import Row from "@/components/Row";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { safeUUID } from "@/lib/crypto/crypto";
import { fetchAllTeamCollectionsFromTeamMember } from "@/lib/database/team-collections/fetchAllTeamCollectionsFromTeamMember";
import { fetchUserByHandle } from "@/lib/database/users/fetchUserByHandle";
import { fetchUserByID } from "@/lib/database/users/fetchUserByID";
import { fetchUserProfileImage } from "@/lib/database/users/fetchUserProfileImage";
import { updateWebVisits } from "@/lib/utils/statistics/updateWebStats";
import { unixToDate } from "@/lib/utils/unixToDate";
import { QuestionMarkCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { UUID } from "crypto";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function AccountPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const identifier = id.replace("%40", "@");

    // Fetch user
    let user : User | null = null;

    if (identifier.startsWith("@")) user = await fetchUserByHandle(identifier, false);
    else user = await fetchUserByID(identifier, false);

    if (!user) return notFound();

    // Ensure current user is signed in & member
    const { success, msg, data: currentUser } = await signinValidation(PermissionLevels.MEM);

    if (!success || !currentUser) return (
        <Col
            className="
                w-full
                items-start
                p-2
                
                gap-2
                overflow-y-auto
            "
        >
            <ErrorMessage description={msg} />
        </Col>
    );

    await updateWebVisits();

    const profileImage = await fetchUserProfileImage(user.profileImage ?? safeUUID() as UUID);
    const profileImageSrc = profileImage ? `/cdn/profile_images/${profileImage.id}.${profileImage.ext}` : null;

    const collections: TeamCollectionWithFullRecords[] = await fetchAllTeamCollectionsFromTeamMember(user.uid);

    return (
        <Col
            className="
                w-full
                items-start
                p-2
                
                gap-2
                overflow-y-auto
            "
        >
            <Col
                className="
                    w-full
                    p-1
                    px-2
                    
                    bg-neutral-600

                    border-2
                    border-neutral-300
                    rounded-md

                    gap-2
                "
            >
                <Col className="md:hidden w-full items-center gap-2">
                    <Col className="relative w-2/3 aspect-square border-2 border-dotted rounded-xl">
                        {
                            profileImageSrc ?
                            <Image
                                src={profileImageSrc}
                                alt={`${user.username}'s Profile`}
                                fill
                                className="object-cover rounded-xl"
                                priority={true}
                            />
                            :
                            <Col className="w-full h-full justify-center items-center">
                                <UserIcon className="w-2/3" />
                                <Row className="items-center gap-1">
                                    <QuestionMarkCircleIcon className="w-5 h-5" />
                                    <p className="text-xs">Unknown Profile Image</p>
                                </Row>
                            </Col>
                        }
                    </Col>

                    <Col className="w-7/8">
                        <Col className="w-full items-center">
                            <p className="text-md font-semibold">{user.username}</p>
                            <p className="text-sm text-primary-1/75 font-semibold">{user.handle}</p>
                            {
                                user.perm_level === PermissionLevels.MEM ?
                                    <p className="text-md">MEMBER</p> :
                                user.perm_level === PermissionLevels.PRIVILAGED_MEM ?
                                    <p className="text-md font-semibold text-cyan-500">PRIV. MEM</p> :
                                user.perm_level === PermissionLevels.JANITOR ?
                                    <p className="text-md font-semibold text-lime-500">JANITOR</p> :
                                user.perm_level === PermissionLevels.MOD ?
                                    <p className="text-md font-semibold text-yellow-500">MOD</p> :
                                user.perm_level === PermissionLevels.LEAD_MOD ?
                                    <p className="text-md font-semibold text-red-500">LEAD MOD</p> :
                                user.perm_level === PermissionLevels.ADMIN ?
                                    <p className="text-md font-semibold text-rose-500">ADMIN</p> :
                                    <p className="text-md font-semibold text-purple-500">LEAD ADMIN</p>
                            }
                            <p className="text-xs text-primary-1/75 font-semibold">User created: {unixToDate(user.created_timestamp)}</p>
                            <p className="text-xs text-primary-1/75 font-semibold">Last sign in: {user.last_signin ? unixToDate(user.last_signin) : "Never"}</p>
                        </Col>
                    </Col>
                </Col>

                <Row className="hidden md:flex w-full items-start gap-2">
                    <Col className="relative w-2/8 aspect-square border-2 border-dotted rounded-xl">
                        {
                            profileImageSrc ?
                            <Image
                                src={profileImageSrc}
                                alt={`${user.username}'s Profile`}
                                fill
                                className="object-cover rounded-xl"
                                priority={true}
                            />
                            :
                            <Col className="w-full h-full justify-center items-center">
                                <UserIcon className="w-2/3" />
                                <Row className="items-center gap-1">
                                    <QuestionMarkCircleIcon className="w-4 h-4" />
                                    <p className="text-2xs">Unknown Profile Image</p>
                                </Row>
                            </Col>
                        }
                    </Col>

                    <Col className="w-6/8">
                        <Row className="w-full items-center gap-2">
                            <p className="text-4xl font-semibold">{user.username}</p>
                            <p className="text-xl font-semibold">·</p>
                            {
                                user.perm_level === PermissionLevels.MEM ?
                                    <p className=":text-md">MEMBER</p> :
                                user.perm_level === PermissionLevels.PRIVILAGED_MEM ?
                                    <p className="text-md font-semibold text-cyan-500">PRIV. MEM</p> :
                                user.perm_level === PermissionLevels.JANITOR ?
                                    <p className="text-md font-semibold text-lime-500">JANITOR</p> :
                                user.perm_level === PermissionLevels.MOD ?
                                    <p className="text-md font-semibold text-yellow-500">MOD</p> :
                                user.perm_level === PermissionLevels.LEAD_MOD ?
                                    <p className="text-md font-semibold text-red-500">LEAD MOD</p> :
                                user.perm_level === PermissionLevels.ADMIN ?
                                    <p className="text-md font-semibold text-rose-500">ADMIN</p> :
                                    <p className="text-md font-semibold text-purple-500">LEAD ADMIN</p>
                            }
                        </Row>
                        <p className="text-md text-primary-1/75 font-semibold">{user.handle}</p>
                        <p className="text-xs text-primary-1/75 font-semibold">User created: {unixToDate(user.created_timestamp)}</p>
                        <p className="text-xs text-primary-1/75 font-semibold">Last sign in: {user.last_signin ? unixToDate(user.last_signin) : "Never"}</p>
                    </Col>
                </Row>
            </Col>

            <Col className="w-full gap-2">
                {
                    collections.map(collection => (
                        <PostCard key={collection.id}>
                            <PostCardHeader
                                title={collection.title}
                                timestamp={unixToDate(collection.uploadedAt)}
                                postedByUID={collection.uploader}
                            />
                            
                            <PostCardBody body={collection.description} />
    
                            <PostCardMedia
                                collectionMedia={{
                                    collectionID: collection.id,
                                    collectionFiles: collection.files
                                }}
                            />
                        </PostCard>
                    ))
                }
            </Col>
        </Col>
    );
}