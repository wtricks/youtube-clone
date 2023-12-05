# YouTube Clone

This project is a simple YouTube clone that replicates the basic functionalities of the YouTube website. It has three main screens: Home, Profile, and Video Player.

## Live Demo

Check out the live demo [here](https://wtricks.github.io/youtube-clone).

## Screenshots

![Home Screen](screenshots/home.png)
*Add screenshots of Profile and Video Player screens as well*

## Technologies Used

- HTML
- CSS
- JavaScript
- YouTube Data API v3

## Features

- **Home Screen:** Displays a list of recommended videos.
- **Profile Screen:** Shows user details and uploaded videos.
- **Video Player Screen:** Allows users to watch selected videos with basic playback controls.

## Getting Started

To run this project locally, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/wtricks/youtube-clone.git
   ```

2. Open the project folder in your code editor.

3. Open the `index.html` file in your web browser.

## Configuration

To use the YouTube Data API, you need to obtain an API key. Follow these steps:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Enable the YouTube Data API v3 for your project.
4. Create API credentials (API key) and restrict it for use with the YouTube Data API.

Copy your API key and replace the placeholder in the `scripts/youtube.js` file:

```javascript
const apiKey = 'YOUR_API_KEY';
```

## Contributing

If you'd like to contribute to the project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/new-feature`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Special thanks to the creators of the YouTube Data API for providing access to YouTube's data.
