const backendUri =  () => process.env.NEXT_PUBLIC_BACKEND_URI;

export interface aliasInfo {
    url: string;
    alias?: string;
}

export interface Alias {
    url: string;
    alias: string;
}

export async function createAlias(aliasInfo: aliasInfo, jwt: string): Promise<string> {
    const response = await fetch(`${backendUri()}/api/alias`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(aliasInfo),
    });

    if (!response.ok) {
        throw new Error('Alias creation failed');
    }

    const data = await response.json();
    return data.alias;
}

export async function getAliases(jwt: string): Promise<Alias[]> {
    const response = await fetch(`${backendUri()}/api/user/me/aliases`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch aliases');
    }

    const data = await response.json();
    return data;
}

export async function updateAlias(alias: string, aliasInfo: Alias, jwt: string): Promise<string> {
    const response = await fetch(`${backendUri()}/api/alias/${alias}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(aliasInfo),
    });

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error);
    }

    const data = await response.json();
    return data.alias;
}
