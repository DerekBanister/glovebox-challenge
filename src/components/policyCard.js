import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePolicy } from '../features/policiesSlice';

// need the policy that was clicked on from parent component (policyList) and the list of policy types from the redux store
function PolicyCard({ policy, policyTypes }) {

    // using local state to know whether the edit menu is open or not
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();

    const handleSaveClick = () => {
        // Get the selected policy type from the radio button input elements
        // using the id generated in the slice to match the policy in the store to the policy in the list


        // fix it
        const selectedPolicyType = policyTypes.find(policyType => document.getElementById(`policy-${policyType.id}`).checked);


        if (!selectedPolicyType) {
            // If no policy type is selected: alert user, return and do not dispatch the update
            alert('Please select a policy type');
            return;
        }
        // Dispatch the updatePolicy action with the policyId and newType, and policy associated with the policy card that was clicked
        dispatch(updatePolicy({ policyId: selectedPolicyType.id, newType: selectedPolicyType.name, policy: policy }));
        // Close the menu
        setMenuOpen(false);
    };

    // store the updated policy to use in the policy card
    // conditionally render the updated policy if it exists, which it will if the save button in the edit menu is clicked
    const updatedPolicy = useSelector(state => state.policies.policy);

    // Toggle the menu open state by setting it to the opposite of what it currently is
    const toggleEditMenu = () => {
        setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    };

    return (
        <div className="bg-neutral-100 rounded-lg shadow-lg flex mb-5">
            <div className="w-full sm:w-auto">
                <div className="px-4 py-5 sm:p-6">

                    <div className="text-3xl font-bold mb-1">{policy.primaryHolder.firstName} {policy.primaryHolder.lastName}</div>
                    <div className="text-md mb-12">{policy.agencyName}</div>

                    <div className="text-lg font-semibold mb-2">
                        <span className="text-gray-650 text-lg">Policy: </span>
                        {/*if the updated policy exists, show the updated policy type, otherwise show the policy type from the store */}
                        {updatedPolicy ? updatedPolicy.type.name : policy.type.name} | {policy.policyNumber}
                        <div>

                            <button
                                className="rounded-md hover:opacity-50 hover:scale-105 bg-darkblue text-xs text-white px-3 py-1 mt-1"
                                onClick={() => toggleEditMenu()}
                                // Hide the edit button when the menu is open
                                style={{ display: menuOpen ? 'none' : 'block' }}
                            >
                                Edit
                            </button>
                        </div>
                        {/* Show the save button only when the menu is open */}
                        {menuOpen && (
                            // flex block to make list append vertically.  flex-row is default
                            <div className="flex-block mt-6">
                                <button
                                    className="rounded-md hover:opacity-50 hover:scale-105 bg-red-500 text-xs text-white px-2 py-1 mt-2 ml-2 mb-2"
                                    onClick={() => toggleEditMenu()}
                                >
                                    X
                                </button>
                                <button
                                    className="rounded-md hover:opacity-50 hover:scale-105 bg-darkblue text-xs text-white px-1 py-1 mt-2 ml-2 mb-2 mr-3 "
                                    onClick={() => handleSaveClick()}
                                >
                                    Save
                                </button>

                                {policyTypes.map((policyType) => (
                                    <div key={policyType.id} className="flex items-center">
                                        {/* each radio button needs a unique id, so we use the policy type id */}
                                        <input
                                            type="radio"
                                            id={`policy-${policyType.id}`}
                                            name="policy"
                                            value={policyType.id}
                                            className="mr-2 hover:checked:bg-grey cursor-pointer"
                                            // defaultChecked sets the default selection to the policy type that the policy currently has
                                            defaultChecked={policyType.name === policy.type.name}
                                        />
                                        {/* htmlFor attribute associates the label with the input */}
                                        <label htmlFor={`policy-${policyType.id}`} className="text-sm text-gray-700 hover:bg-gray-200 cursor-pointer">
                                            {policyType.name} Policy
                                        </label>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PolicyCard;