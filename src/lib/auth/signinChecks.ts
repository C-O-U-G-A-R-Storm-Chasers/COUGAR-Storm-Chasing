import { SigninChecksResult } from "@/_Interfaces/SigninChecksResult";

export async function signinChecks(disallowedUserTypes?: Array<UserTypes>): Promise<SigninChecksResult> {
    const result: SigninChecksResult = {
        redirectRequired: false,
        permissionsMissing: false,
        permissionsMessage: "You don't have permission to view this page!",
        userData: null
    };

    const userData: UserCookie | null = await fetchServerCookie("user");

    if (!userData || !userData.data) {
        result.redirectRequired = true;
        
        return result;
    }

    if (disallowedUserTypes && disallowedUserTypes.length > 0) {
        if (disallowedUserTypes.includes(userData.type)) {
            result.permissionsMissing = true;

            return result;
        }
    }

    result.userData = userData;

    return result;
}