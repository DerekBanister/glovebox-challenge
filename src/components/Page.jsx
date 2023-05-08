import React from 'react';
import PolicyList from './policyList';
import '../App.css';

const Page = () => {

    return (
        // content class is used to create space for the footer so it doesn't overlap the content
        <div className='content'>
            <PolicyList />
        </div>
    );
};

export default Page;
