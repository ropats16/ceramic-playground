import { MainContext } from '../context';
import { useState, useContext, useCallback, useEffect } from 'react';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { IDX } from '@ceramicstudio/idx';

import styles from '../styles/Home.module.css'

export const ReadProfile = () => {

    const { currentAccount } = useContext(MainContext);
    const [name, setName] = useState('');
    const [pfp, setPFP] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState('');

    // Define endpoint
    const endpoint = "https://ceramic-clay.3boxlabs.com"

    const ceramic = new CeramicClient(endpoint);
    const idx = new IDX({ ceramic });

    const fetchData = useCallback(async () => {

        try {
            const data = await idx.get(
                'basicProfile',
                `${currentAccount}@eip155:1`,
            );

            console.log(data);

            if (data.name) { setName(data.name) };
            if (data.avatar) { setPFP(data.avatar) };
        } catch (error) {
            console.log('error :', error.message);
            setLoaded(true);
            setError(error.message);
        }
    }, [currentAccount]);

    useEffect(() => {
        if (currentAccount) {
            fetchData();
        }
    }, [currentAccount, fetchData]);

    return (
        <>
            <button className={styles.button} onClick={fetchData} >
                Read Profile
            </button>
            {error && <div style={{ marginTop: '20px', color: 'red' }}>Error: {error}</div>}
        </>
    )
};