# Task Tracker CLI

A simple command-line task tracker built with Node.js.

## Features

- Add tasks
- Update tasks
- Delete tasks
- Mark tasks as completed
- List all tasks

## Prerequisites

This tool runs on Node.js. If you don't have it installed, you will need to do that first.

1. Download and install [Node.js](https://nodejs.org/) (this automatically installs `npm` for you).
2. Verify the installation by opening your terminal and running:
   ```bash
   node -v
   npm -v

## Installation

```bash
git clone https://github.com/lancelord6/task_tracker.git
cd task_tracker
npm install
npm link
```


## Usage
Now you can run the following on any terminal window :
```bash
task_tracker add "Learn Git"
task_tracker list
task_tracker update 1 "Learn Express.js"
task_tracker mark-in-progress 1
task_tracker mark-done 1
task_tracker delete 1
```

## Technologies

- JavaScript
- Node.js
- File System (fs)
