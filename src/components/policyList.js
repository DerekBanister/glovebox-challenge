import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolicies, fetchPolicyTypes } from '../features/policiesSlice';
import PolicyCard from './policyCard';


function PolicyList() {

    const dispatch = useDispatch();
    //grab the policies, policyTypes from the global state (store)
    const policyTypes = useSelector((state) => state.policies.policyTypes);
    const policies = useSelector((state) => state.policies.policies);

    // Using useCallback to memoize the fetchPolicies action, so it will only be created once preventing 
    // unnecessary re-renders
    // this component was loading repeatedly so this was added to prevent that
    const fetchPolicyTypesMemoized = useCallback(() => {
        dispatch(fetchPolicyTypes());
    }, [dispatch]);

    const fetchPoliciesMemoized = useCallback(() => {
        dispatch(fetchPolicies());
    }, [dispatch]);

    // dispatching the memoized fetchPolicyTypes and fetchPolicies actions when the component mounts
    useEffect(() => {
        fetchPoliciesMemoized();
        fetchPolicyTypesMemoized();
    }, [fetchPoliciesMemoized, fetchPolicyTypesMemoized]);

    // console log still running two times, not sure why. got it down from 4 to 2 by adding the useCallback hook
    console.log("state policies", policies);
    console.log("state policyTypes", policyTypes);

    // Groups policies by carrierID by creating an object with the carrierID as the key and an array of policies as the value
    // reduce method takes two arguments, the accumulator and the current value. 
    // the accumulator (key) is the object that is being built up as the function runs
    // the current value is the current policy in the array
    const groupedPolicies = policies.reduce((accumulator, policy) => {

        // define the carrierID and capitalize the first letter
        const carrierID = policy.carrierID.charAt(0).toUpperCase() + policy.carrierID.slice(1);

        // if the carrierID doesn't exist in the accumulator, create it and set it to an empty array
        if (!accumulator[carrierID]) {
            // carrierID is the key, and the value is an empty array
            accumulator[carrierID] = [];
        }

        // push each policyWithId into the array for the carrierID it corresponds to
        accumulator[carrierID].push(policy);

        // at the end of this reduce method, the accumulator will be an object with the carrierIDs as the keys and an array of policies as the value
        return accumulator;
    }, {});


    return (

        // grid layout for the policy cards using tailwindcss, 1 column on small screens, 2 columns on medium screens, 3 columns on large screens
        // got rid of sm:grid-cols-2 because of the way the cards wrapped on small/medium screens
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 mx-16">

            {/* map over the keys of the groupedPolicies object, which are the carrierIDs */}
            {Object.keys(groupedPolicies).map((carrierID) => (
                <div key={carrierID}>
                    {/* display the carrierID as a header, this will be the title of the card. apply flex so we can center the text */}
                    <h2 className="text-3xl bg-darkblue text-white font-semibold text-center  py-2 px-4 mb-4 rounded-lg shadow-md border-b border-gray-300">{carrierID}</h2>

                    {/* map over the array of policies for each carrierID */}
                    {groupedPolicies[carrierID].map((policy) => (
                        <PolicyCard key={policy.id} policy={policy} policyTypes={policyTypes} dispatch={dispatch}> </PolicyCard>
                    ))}
                </div>
            ))}
        </div>
    );


}

export default PolicyList;
