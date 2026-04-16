import MainLayout from "./(main)/layout";
import MainNotFound from "./(main)/main-not-found";

export default async function NotFound() {
    return (
        <MainLayout>
            <MainNotFound />
        </MainLayout>
    );
}