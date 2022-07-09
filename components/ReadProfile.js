import { MainContext } from '../context';
import { useState, useContext, useCallback, useEffect } from 'react';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { IDX } from '@ceramicstudio/idx';

import styles from '../styles/Home.module.css'

export const ReadProfile = async () => {

    const { currentAccount, endpoint } = useContext(MainContext);

    const [name, setName] = useState('');
    const [pfp, setPFP] = useState('');
    const [loaded, setLoaded] = useState(false);

    const ceramic = new CeramicClient(endpoint);

    const fetchData = useCallback(async () => {
        try {
            const idx = new IDX({ ceramic });
            const data = await idx.get(
                'basicProfile',
                `${currentAccount}@eip155:1`,
            );

            console.log(data);

            if (data.name) { setName(data.name) };
            if (data.avatar) { setPFP(data.avatar) };
        } catch (error) {
            console.log('error :', error);
            setLoaded(true);
        }
    }, [currentAccount]);

    console.log("oustide");

    useEffect(() => {
        console.log("inside");
        if (currentAccount) {
            fetchData();
        }
    }, [currentAccount, fetchData]);
};