import { MainContext } from '../context';
import { useState, useContext } from 'react';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { DID } from 'dids';
import { getResolver as getKeyResolver } from 'key-did-resolver';
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver';
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import { IDX } from '@ceramicstudio/idx';

import styles from '../styles/Home.module.css'

export const UpdateProfile = () => {

    const [name, setName] = useState('');
    const [pfp, setPFP] = useState('');
    const { currentAccount } = useContext(MainContext);
    const endpoint = "https://ceramic-clay.3boxlabs.com"
    const ceramic = new CeramicClient(endpoint);

    const updateDIDProfile = async () => {
        const provider = new EthereumAuthProvider(window.ethereum, currentAccount);
        const threeIdConnect = new ThreeIdConnect();
        await threeIdConnect.connect(provider);

        const did = new DID({
            provider: threeIdConnect.getDidProvider(),
            resolver: {
                ...get3IDResolver(ceramic),
                ...getKeyResolver(),
            }
        })

        ceramic.setDID(did);
        await ceramic.did.authenticate();

        const idx = new IDX({ ceramic });

        await idx.set('basicProfile', {
            name,
            avatar: pfp
        })

        console.log("Profile Updated!");
    }

    return (
        <>
            <input className={styles.input} placeholder='Name' onChange={e => setName(e.target.value)} />
            <input className={styles.input} placeholder='Profile Image' onChange={e => setPFP(e.target.value)} />
            {name && <h3>{name}</h3>}
            {pfp && <img style={{ width: '250px' }} src={pfp} />}
            <button className={styles.button} onClick={updateDIDProfile}>
                Update Profile
            </button>
        </>
    )
};