"use client";
import LinkShortener from "@/components/linkShortener";
import AliasList from "@/components/aliasList";
import { useAuth } from "@/utils/authContext";
import { redirect } from 'next/navigation';
import { useState, useEffect } from "react";
import { Alias, getAliases } from "@/utils/aliasService";

export default function DashboardPage() {
    const { token } = useAuth();

    const [myAliases, setMyAliases] = useState<Alias[]>([]);


    if (!token) {
        redirect('/login');
    }

    useEffect(() => {
        if (!token) {
            return;
        }

        getAliases(token)
            .then(setMyAliases)
    }, [token]);

    return (
        <>
            <LinkShortener />
            <AliasList title="My Aliases" list={myAliases} />
        </>
    );
}