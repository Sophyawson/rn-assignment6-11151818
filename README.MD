# rn-assignment6-11151818

## Installation and Setup

1. Visual Studio
2. Node.js
3. Github with a github account
4. Expo CLI

## Description of the task

- Open the command line/command prompt.
- Enter the code "npm install  -g expo-cli
- Navigate to the directory where you would like to create the project.
- Next enter the code "npx create-expo-app -- template".
- "--template" makes you choose a template for the project created. Choose blank template.
- Enter a new name for the project.
- Close the command line/command prompt.
- Open Visual Studio and complete the task.

## Code using Local System (Asynstorage)

- npm install @react-native-async-storage/async-storage
- react-native link @react-native-async-storage/async-storage

## Compoments

### Description of the HomeScreen

The HomeScreen component shows a list of products  with images, their names, their descriptions, and their prices. It has a button that allows users to add these products to a cart. The shopping bag is clicked to move unto the CartScreen. Has Asynstorage that saves the cart contents so that they remain available even if the app is closed and reopened.

### Description of the CartScreen

The CartScreen shows the selected items from the Homescreen and it has a button to allow you users to remove an unwanted item from the cart. it shows the total amount for the selected items and has a button to checkout these items

### The App.js

The App component is the main entry point of the application..This javascript file contains a code that sets up a basic structure for a React Native application using Expo. It imports and uses various components to create a functional app layout with better navigation thata allows users to navigate between the Home and Cart screens.
  
## screenshots of the application

### screenshot of the HomeScreen

![Screenshot of the OPENFASHIONAPP ](/assets/HomeScreen1.jpeg)

![Screenshot of the OPENFASHIONAPP ](/assets/HomeScreen2.jpeg)

### screenshot of the CartScreen

![Screenshot of the OPENFASHIONAPP  ](/assets/CartScreen1.jpeg)

![Screenshot of the OPENFASHIONAPP ](/assets/CartScreen2.jpeg)

![Screenshot of the OPENFASHIONAPP ](/assets/CartScreen3.jpeg)

### Author

Beatrice Sophia Nhyira Yawson - 11151818
