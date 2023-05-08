# GloveBox React Challenge

## Instructions

Fork this repo and add the following functionality to this React App. Once you are finished, send us a link to your fork.

## Objectives

1. Inside `component/Page.jsx` load a list of policies from the `getPolicies` method imported from `data/provider.js`.
2. These policies should get stored in redux and brought into the component by utilizing a `useSelector` hook.
3. Group the records in the policies array by `carrierID` then render one list for each carrier - with each list containing the policies associated with that carrier.
4. Style the page with some basic css to make it visually appealing.
5. Place an edit button on each policy. When clicked show a policy edit form with the following:

	- Select input with options populated from the `getPolicyTypes` method imported from `data/provider.js`. The default option selected should reflect the current policy type.
	- Save button that when pressed persists the policy type update into the policies redux store and hides the edit form.

## Requirements

- Both the policies array retrieved from `getPolicies` and the policyTypes array from `getPolicyTypes` should be stored in the redux store.
- The update policy type form, when submitted should update the policy type for the appropriate policy inside the redux store
- Both the `getPolicies` and `getPolicyTypes` methods should be called only once per application load
- The UI should look good in both mobile and desktop with elements wrapping when necessary. The design should be simple and modern with space around each element.