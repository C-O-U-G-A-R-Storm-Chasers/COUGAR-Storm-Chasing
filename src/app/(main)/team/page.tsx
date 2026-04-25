"use server";

import Col from "@/components/Col";
import InfoBulletStandard from "@/components/Text/Bullets/InfoBulletStandard";
import InfoPageTitle from "@/components/Text/Headers/InfoPageTitle";
import InfoHeader from "@/components/Text/Headers/InfoHeader";
import InfoParagraph from "@/components/Text/InfoParagraph";
import InfoSubheader from "@/components/Text/Headers/InfoSubheader";
import InfoSectionseparator from "@/components/Text/InfoSectionSeparator";
import Image from "next/image";
import config from "../../../lib/cougar-config.json";

export default async function TeamPage() {
    return (
        <Col className="w-full items-center">
            <Col className="w-2/5 items-center p-2 px-5 bg-white/85 text-slate-950 rounded-md gap-5">

                <InfoPageTitle textContent="Meet Our Team Members" />
                
                <InfoSectionseparator>
                    <InfoHeader textContent="Mario G" />
                    <InfoSubheader textContent="Field Operations Director" />
                    <InfoBulletStandard textContent="Field Operations Director" />
                    <InfoBulletStandard textContent="Lead Storm Chaser" />
                    <InfoBulletStandard textContent="Media Operations Coordinator" />
                </InfoSectionseparator>

                <InfoSectionseparator>
                    <InfoParagraph textContent="Mario is one of the chasers on the ground. His main job is to chase, but also to help forecast and to be the lead vehicle when leading the other chasers. He also edits most of our storm chasing videos on our YouTube!" />
                </InfoSectionseparator>

                <InfoSectionseparator>
                    <Image
                        src={config["team_headshots"]["chesse"]}
                        alt="Team member headshot"
                        width={512}
                        height={512}
                        className="w-50 h-50 bg-slate-200 rounded-md"
                    />
                    <InfoHeader textContent="Caleb H" />
                    <InfoSubheader textContent="Research & Technology Director" />
                    <InfoBulletStandard textContent="Field Chaser" />
                    <InfoBulletStandard textContent="Certified SKYWARN Spotter" />
                    <InfoBulletStandard textContent="Software & Web Engineer" />
                    <InfoBulletStandard textContent="S.T.I.P. Helper" />
                </InfoSectionseparator>

                <InfoSectionseparator>
                    <InfoParagraph textContent="Caleb is one of the four storm chasers on our team. He helps with choosing target areas and is helping with the development of our probe, and the development of this website! He also does most of the managing of the Facebook page and steps in to help review models for forecasting when Nicholas P is not available." />
                </InfoSectionseparator>

                <InfoSectionseparator>
                    <InfoHeader textContent="Nicholas P" />
                    <InfoSubheader textContent="Lead Atmospheric Analyst & Systems Engineer" />
                    <InfoBulletStandard textContent="Director of Communications" />
                    <InfoBulletStandard textContent="S.T.I.P. Project Lead" />
                    <InfoBulletStandard textContent="Forecast Operations Specialist" />
                </InfoSectionseparator>

                <InfoSectionseparator>
                    <InfoParagraph textContent="Nicholas's primary role as overwatch is to be a second pair of eyes for all chasers out in the field and help with forecasting, positioning and making sure we're up to date while we're on the ground chasing and is also lead coder for our probe which is still in development." />
                </InfoSectionseparator>

                <InfoSectionseparator>
                    <InfoHeader textContent="Chase C" />
                    <InfoSubheader textContent="Field Chaser & Social Media Coordinator" />
                    <InfoBulletStandard textContent="Field Chaser" />
                    <InfoBulletStandard textContent="Reed Timmer Jr. (This is an inside joke!)" />
                    <InfoBulletStandard textContent="Digital Content Manager" />
                    <InfoBulletStandard textContent="Field Operations Member" />
                </InfoSectionseparator>

                <InfoSectionseparator>
                    <InfoParagraph textContent="Chase is one of our more aggressive chasers and is the one who got our amazing footage of the March 10th, 2026 Kankakee (Illinois) EF3; his more aggressive style of chasing is in contrast to the others who wish to stay further back which allows us to get a full picture of up close and far away shots of each storm when footage is captured." />
                </InfoSectionseparator>

                <InfoSectionseparator>
                    <InfoHeader textContent="Nicole G" />
                    <InfoSubheader textContent="Community Outreach & Field Support Specialist" />
                    <InfoBulletStandard textContent="Certified SKYWARN Spotter" />
                    <InfoBulletStandard textContent="Field Operations Support" />
                    <InfoBulletStandard textContent="Designated Driver" />
                </InfoSectionseparator>

                <InfoSectionseparator>
                    <InfoParagraph textContent="Nicole storm chases primarily with Mario, as they are a mother-son duo. Nicole is the primary driver during their chases, while not being afraid to go into most environments to chase. Together, they have chased Wisconsin, Illinois, Iowa, Arkansas and Mississippi." />
                </InfoSectionseparator>

            </Col>
        </Col>
    );
}