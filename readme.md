# Cubedash

Falling Boxes is a simple, interactive browser game created using JavaScript, HTML, and CSS. The objective is to maneuver a player box to avoid falling obstacles and achieve the highest score possible. The game is designed with adjustable difficulty levels and a responsive user interface.

- [Features](#features)
- [How to Play](#how-to-play)
- [How It Works](#how-it-works)
- [Controls](#controls)
- [Difficulty Levels](#difficulty-levels)
- [Technologies Used](#technologies-used)

## Features

- **Responsive Gameplay**: Players can control the box using `W`, `A`, `S`, `D` or arrow keys.
- **Dynamic Difficulty**: Choose between Easy, Medium, and Hard modes, which adjust the speed and spawn rate of falling boxes.
- **Real-Time Score Tracking**: The game tracks your current score and displays it during gameplay.
- **High Score Persistence**: Your highest score is saved using `localStorage`, so it remains even after you close and reopen the game.
- **Customizable Settings**: Dimensions and movement speeds can be adjusted easily by modifying the game variables in the JavaScript file.
- **Simple, Intuitive Controls**: Designed for quick and easy gameplay, perfect for casual gaming.

## How to Play

### Starting the Game

Open [this link](https://bendik-bruun-olsen.github.io/Cubedash/) in a modern web browser to start the game.

## How It Works

1. **Starting the Game**:

   - On loading the game, you are presented with a menu where you can select the difficulty level and start the game.
   - Once the "Start" button is clicked, the menu fades out, and the game begins after a brief countdown.

2. **Gameplay**:

   - The player controls a box that moves up, down, left, and right within the play area.
   - Falling boxes of random colors and positions spawn at the top of the play area and move downwards.
   - Avoid colliding with the falling boxes to keep playing.
   - Each falling box successfully avoided increases your score.

3. **Collision and Game Over**:

   - If the player's box collides with a falling box, the game ends.
   - The menu reappears, and the player can restart the game or adjust the difficulty level.

4. **High Score**:
   - The game keeps track of the highest score achieved across all sessions using `localStorage`.

## Controls

- **`W` or `Arrow Up`**: Move Up
- **`A` or `Arrow Left`**: Move Left
- **`S` or `Arrow Down`**: Move Down
- **`D` or `Arrow Right`**: Move Right

## Difficulty Levels

- **Easy**: Slower falling boxes and longer spawn intervals.
- **Medium**: Moderate speed and spawn rate.
- **Hard**: Faster falling boxes and shorter spawn intervals.

## Technologies Used

- **HTML**: For structuring the game layout.
- **CSS**: For styling the elements, including animations and transitions.
- **JavaScript**: For implementing game logic and interactivity.
