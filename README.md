# Project README

## Overview
This project is a React application created using the create-react-app scaffolding tool. It includes a comprehensive implementation of Storybook, which allows for an interactive exploration and testing of the various React components used throughout the application.

## Special Considerations
This React project incorporates several design and user experience considerations:

### Selective Activation of Delete Button: 
The 'Delete Selected' button is only active when at least one table row is selected. If no rows are selected, the button remains disabled.

### More Friendly & Responable Bulk Selection: 
The bulk select checkbox responds to user actions for a seamless experience. It automatically checks when all rows are selected individually and unchecks when the last selected row is deselected.

### Triggering Search: 
Unlike the instantaneous search on typing, the project requires a user to either press 'Enter' or click the 'Search' button in the search bar to initiate the search.

### Clear Input Option: 
A clear input button in the search bar allows users to erase all input text. However, initiating the search still requires pressing 'Enter' or the 'Search' button.

### User-Friendly Editing: 
In edit mode, an additional 'Revert' button appears between the save and delete buttons. This allows users to cancel all edits and exit the editing state conveniently.

### Page Transition Effects: 
Switching pages resets all current page effects, including edit and selected states. This design choice reflects the assumption that page switching indicates the user's intent to cease current page interactions.

### No Result and Empty State Handling: 
The application gracefully handles scenarios with no matching search results or when there are no users in the system, informing users appropriately.

### Fixed Table Height: 
To maintain a consistent page layout and prevent flickering or size changes, the table height is fixed. This stability enhances the user experience by keeping the pagination bar position constant.

These considerations were implemented to enhance usability and ensure a smooth, user-friendly interface.

## Project Features

### React 
Create-App Foundation: The project is bootstrapped with create-react-app, ensuring a solid and tested foundation for React development.

### Storybook Integration: 
A key feature of this project is the integration of Storybook. This tool provides a sandbox to build and visualize UI components in isolation, making it easier to develop and review the appearance and behavior of these components without the need to run the entire application.

### Component Stories: 
Most, if not all, components in the project have corresponding stories in Storybook. These stories are designed to demonstrate different states and use-cases for each component, providing a comprehensive overview of the components' capabilities.

### Custom SCSS Implementation: 
The styling of components is achieved using custom-written SCSS. This approach allows for greater control over the look and feel of the application and ensures that the styling is scalable and maintainable.

### Development and Usage
To run the project locally:

Clone the repository to your local machine.
Install the dependencies by running npm install.
Start the application by running npm start. This will launch the app on the default React development server port in your browser.
To view and interact with the Storybook components:

Navigate to the Storybook directory within the project.
Run npm run storybook. This will open the Storybook interface in your browser, where you can browse and interact with the component stories.
Note on Ports
The project adheres to the original configuration settings of the create-react-app package. Therefore, the application will run on the default port as specified by React's development server. There is no need for manual port configuration unless specifically required for your development environment.

