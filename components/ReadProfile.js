import { MainContext } from '../context';
import { useState, useContext, useCallback, useEffect } from 'react';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { IDX } from '@ceramicstudio/idx';

import styles from '../styles/Home.module.css'

export const ReadProfile = () => {

    const { currentAccount } = useContext(MainContext);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState('');

    // Define endpoint
    const endpoint = "https://ceramic-clay.3boxlabs.com"

    const ceramic = new CeramicClient(endpoint);
    const idx = new IDX({ ceramic });

    const data = {};

    const fetchData = useCallback(async () => {
        try {
            const data = await idx.get(
                'basicProfile',
                `${currentAccount}@eip155:1`,
            );

            setError('');
            console.log(data);

            if (data.name) data['name'] = data.name;
            if (data.avatar) data['avatar'] = data.avatar;
            // if (data.name) setName(data.name);
            // if (data.avatar) setPFP(data.avatar);
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
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            {data.length != undefined ?
                <div>
                    <div>{data.name}</div>
                    <div>{data.avatar}</div>
                </div>
                :
                <button className={styles.button} onClick={fetchData} >
                    Read Profile
                </button>
            }
        </>
    )
};