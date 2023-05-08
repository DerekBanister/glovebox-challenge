import { createSlice, current } from '@reduxjs/toolkit';
import exp from '../data/provider'
import { v4 as uuidv4 } from 'uuid';

// define the initial state of the slice
const initialState = {
    policies: [],
    policyTypes: [],

};

// createSlice takes an object with the name of the slice, the initial state, and an object with the reducers
export const policiesSlice = createSlice({
    name: 'policies',
    initialState,
    reducers: {
        getPolicies(state, action) {
            // get the policies from the action payload
            const policies = action.payload;
            // im doing this so I can use the unique id to find the exact policy that was clicked when updating the store and subsequent policytype
            const newPolicies = policies.map((policy) => {
                const policyWithId = { ...policy, id: uuidv4() };

                // convert the agency name to an acronym because avengers are dope
                if (policyWithId.agencyName === "Strategic Homeland Intervention Enforcement and Logistics Division") {
                    policyWithId.agencyName = "🛡️ S.H.I.E.L.D.";
                }
                return policyWithId;
            });
            // assign the new array of policies with unique ids to the state
            state.policies = newPolicies;
        },

        getPolicyTypes(state, action) {
            state.policyTypes = action.payload;
        },
        updatePolicy(state, action) {
            const { newType, policyId, policy } = action.payload;
            // console.log("Clicked policy from payload (found)", policy);
            // console.log(newType, policyId);

            // Can generate a new policy number aswell if I would like for the updated policy
            // const newPolicyNum = uuidv4();

            if (policy) {
                // update the type object with the new type and the policyId
                const updatedPolicy = {
                    ...policy,
                    // policyNumber: newPolicyNum,
                    type: {
                        id: policyId,
                        name: newType,
                    },
                };
                // console.log("updatedPolicy", updatedPolicy);

                // find the index of the policy that matches the uuid of the policy that was clicked
                const policyIndex = state.policies.findIndex(
                    (p) => p.id === policy.id
                );

                //  get the array of policies from the state
                const updatedPolicies = [...state.policies];
                console.log("updatedPolicies array", updatedPolicies)
                // update the matching policy from the store with the updated policy
                updatedPolicies[policyIndex] = updatedPolicy;

                // return the state along with the updated policies
                return { ...state, policies: updatedPolicies };


            }
            // if the policy is not found, return the state
            return state;
        }

    },
});

// export all of the actions from the slice
export const {
    getPolicies,
    getPolicyTypes,
    updatePolicy,
} = policiesSlice.actions;

// main functions that are exported and used in the component to fetch the policies
// and render them to the DOM
export const fetchPolicies = () => async (dispatch) => {
    // try catch block is used to handle errors if promise is rejected
    try {
        // fetch the policies from the provider
        const policies = await exp.getPolicies();
        // dispatch the getPoliciesSuccess action to update the state with the policies
        dispatch(getPolicies(policies));
    } catch (error) {
        console.log(error);
    }
};

export const fetchPolicyTypes = () => async (dispatch) => {
    try {
        const policyTypes = await exp.getPolicyTypes();
        dispatch(getPolicyTypes(policyTypes));
    } catch (error) {
        console.log(error);
    }
};


export default policiesSlice.reducer;
