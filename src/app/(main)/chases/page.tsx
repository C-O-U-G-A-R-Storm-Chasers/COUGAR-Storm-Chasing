import { PermissionLevels } from "@/_Enums/PermissionLevels";
import { PlannedChase } from "@/_Interfaces/Chasers/PlannedChase";
import Col from "@/components/Col";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import ListTable from "@/components/Tables/ListTable/ListTable";
import ListTableContent from "@/components/Tables/ListTable/ListTableContent";
import ListTableContentLink from "@/components/Tables/ListTable/ListTableContentLink";
import ListTableContentRow from "@/components/Tables/ListTable/ListTableContentRow";
import ListTableHeader from "@/components/Tables/ListTable/ListTableHeader";
import ListTableHeaderRow from "@/components/Tables/ListTable/ListTableHeaderRow";
import ListTableSearchRow from "@/components/Tables/ListTable/ListTableSearchRow";
import InfoHeader from "@/components/Text/Headers/InfoHeader";
import { signinValidation } from "@/lib/auth/SigninValidation/signinValidation";
import { fetchAllPlannedChases } from "@/lib/database/chases/fetchAllPlannedChases";
import { searchThroughObjects } from "@/lib/utils/search/searchThroughObjects";
import { unixToDate } from "@/lib/utils/unixToDate";

export default async function ChasesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const params = await searchParams;
    const query = params.q;

    const { success, msg } = await signinValidation(PermissionLevels.ADMIN);

    if (!success) return <ErrorMessage description={msg} />;

    let chases = await fetchAllPlannedChases();

    console.log("Chases before:", chases);

    if (chases && query && query.trim().length > 0) chases = await searchThroughObjects<PlannedChase>(chases, query);

    console.log("Chases After:", chases);

    return (
        <Col className="w-full h-full items-center justify-center">
            <Col
                className="
                    flex
                    flex-col
                    items-center
                    w-3/4
                    p-2
                    
                    bg-sky-700

                    border-1
                    border-sky-500

                    rounded-md
                    
                    gap-2
                "
            >
                <InfoHeader textContent="Chases" />

                <ListTable>
                    <ListTableSearchRow searchTerm="chases" />
                    
                    <ListTableHeaderRow>
                        <ListTableHeader>Title</ListTableHeader>
                        <ListTableHeader>ID</ListTableHeader>
                        <ListTableHeader>Chasers</ListTableHeader>
                        <ListTableHeader>Start Date</ListTableHeader>
                        <ListTableHeader>End Date</ListTableHeader>
                        <ListTableHeader>Created</ListTableHeader>
                        <ListTableHeader>Updated</ListTableHeader>
                    </ListTableHeaderRow>
                    {
                        (!chases || chases.length === 0) ?
                        <ListTableContentRow>
                            <ListTableContent>No results found</ListTableContent>
                        </ListTableContentRow>
                        :
                        chases.map(async chase => (
                            <ListTableContentRow key={chase.id}>
                                <ListTableContentLink href={`/chases/${chase.id}`}>{chase.title}</ListTableContentLink>
                                <ListTableContent>{chase.id}</ListTableContent>
                                <ListTableContent>{chase.chasers.join(", ")}</ListTableContent>
                                <ListTableContent>{chase.start_date}</ListTableContent>
                                <ListTableContent>{chase.end_date}</ListTableContent>
                                <ListTableContent>{unixToDate(chase.created_timestamp)}</ListTableContent>
                                <ListTableContent>{unixToDate(chase.updated_timestamp)}</ListTableContent>
                            </ListTableContentRow>
                        ))
                    }
                </ListTable>
            </Col>
        </Col>
    );
}